<!--
 * @Author: astar
 * @Date: 2021-05-06 18:09:05
 * @LastEditors: astar
 * @LastEditTime: 2021-05-06 21:21:44
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\views\chat\components\chatMain.vue
-->
<template>
  <main class="main-content" ref="chat">
    <header class="contact-name">
      {{currentReceiver.name}}
      <i style="float: right" v-if="currentReceiver._id" class="iconfont icon-zhankai" @click="showGroupInfo=true"></i>
    </header>
    <div class="chat-box" ref="box">
      <div class="no-data" v-show="!chatRecord.length">
        暂时没有新消息
      </div>
      <pull-refresh :refreshNext="getRecord">
        <div slot="main" class="chat-box__item" :class="[item.sender._id === userInfo._id ? 'reverse' : 'normal']" v-for="item in chatRecord" :key="item._id">
          <s-avatar class="chat-box__item_avatar" :src="item.sender.avatar" size="medium" v-press="atSomeone(item)" @click="showUserInfo=true;currentUser=item.sender"/>
          <div class="chat-box__item_content" :class="{'img': KINDS.IMG === item.content[0].kind}">
            <message v-for="(ele, idx) in item.content" :item="ele" :key="idx"></message>
          </div>
        </div>
      </pull-refresh>
    </div>
    <input-box ref="inputBox" @send="sendMessage" class="input-box"></input-box>
    <s-popup v-model="showGroupInfo" place="right" :x="pos.x" :y="pos.y" :width="popupWidth" :height="popupHeight">
      <info :id="currentReceiver._id" isGroup @close="showGroupInfo=false"></info>
    </s-popup>
    <s-dialog class="user-info-dialog" title="用户信息" width="320px" v-model="showUserInfo" @confirm="showUserInfo=false">
      <s-avatar :src="currentUser.avatar" size="large"></s-avatar>
      <div>
        <span>用户名：{{currentUser.userName}}</span>
        <i class="iconfont icon-fuzhi" @click="copy(currentUser.userName)"></i>
        <br>
        <span>用户ID：{{currentUser._id}}</span>
        <i class="iconfont icon-fuzhi" @click="copy(currentUser._id)"></i>
      </div>
    </s-dialog>
  </main>
</template>
<script>
import inputBox from './inputBox';
import message from './message';
import info from './info';
import { io } from 'socket.io-client';
import { getAuthorization } from '@/utils';
import { removeToken } from '@/utils/token';
import { getSimpleMessageFromJSON, KINDS } from '@/utils/editor.js';
import { getHistoryChatByCount } from '@/request';
import eventBus from '@/views/chat/eventBus';
import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      KINDS,
      pageSize: 20, // 聊天记录分页
      totalDone: false, // 聊天记录是否全部加载完成
      bus: null, // 兄弟组件通信工具
      currentReceiver: {}, // 当前聊天人或群
      currentUser: {}, // 当前点击用户信息
      chatRecord: [], // 聊天记录列表
      showGroupInfo: false, // 展示群聊基本信息
      showUserInfo: false, // 展示用户基本信息
      socket: null, // socket
      reConnectCount: 5,
      reConnectId: null,
      popupWidth: '0px',
      popupHeight: '0px',
      pos: {x: '0px', y: '0px' }
    }
  },
  created () {
    this.initSocket();
    this.bus = new eventBus('chat-main');
    this.bus.addListener(eventBus.CHANGE_CURRENT_RECEIVER, this.initRecord);
  },
  methods: {
    initSocket () {
      this.socket = io(process.env.VUE_APP_BASE_API, {
        withCredentials: true,
        extraHeaders: {
          'authorization': getAuthorization()
        }
      });

      this.socket.on("message", message => {
        this.chatRecord.push(message);
        if (message.sender._id !== this.userInfo._id) {
          let content = message.content.reduce((str, item) => str + getSimpleMessageFromJSON(item), '');
          this.$notify(message.sender.userName || message.sender.groupName, content, { icon: message.sender.avatar, tag: message._id });
        }
        this.$nextTick(() => {
          if (this.$refs.box) {
            this.$refs.box.scrollTop = this.$refs.box.scrollHeight - this.$refs.box.clientHeight;
          }
        });
      });

      this.socket.on("error", error => {
        this.$toast.text(error);
        if (error.type === 'logout') {
          removeToken();
          this.$router.push('/login');
        }
      });

      this.socket.on("connect_error", error => {
        console.log(error)
        if (this.reConnectId) {
          clearTimeout(this.reConnectId);
          this.reConnectId = null;
        }
        if (this.reConnectCount) {
          this.reConnectId = setTimeout(() => {
            console.warn('[socket] - reconnect');
            this.reConnectCount--;
            this.socket.connect();
          }, 1000);
        } else {
          this.$toast.text('连接失败，请重新连接')
        }
      });
    },
    /**
    * 初始化聊天记录
    * @author astar
    * @date 2021-05-06 20:56
    */
    initRecord (currentReceiver) {
      this.totalDone = false;
      this.chatRecord = [];
      this.currentReceiver = currentReceiver;
      this.getRecord().then(() => {
        this.$nextTick(() => {
          if (this.$refs.box) {
            this.$refs.box.scrollTop = this.$refs.box.scrollHeight - this.$refs.box.clientHeight;
          }
        });
      }, _ => {
        this.$toast.text(_);
      });
    },
    /**
    * 根据起始startId加载聊天记录
    * @author astar
    * @date 2021-05-06 20:57
    */
    getRecord () {
      return new Promise((resolve, reject) => {
        if (!this.totalDone) {
          getHistoryChatByCount({ receiverId: this.currentReceiver._id, startId: this.chatRecord.length ? this.chatRecord[0]._id : null, fetchCount: this.pageSize }).then(res => {
            if (res.code === 1) {
              this.chatRecord = res.data.concat(this.chatRecord);
              if (!res.data.length) {
                this.totalDone = true;
              }
              resolve(res.data && res.data.length ? true : false);
            } else {
              reject(res.msg);
            }
          })
        } else {
          resolve(false)
        }
      })
    },
    /**
    * 发送信息
    * @author astar
    * @date 2021-05-06 21:09
    */
    sendMessage (content) {
      if (this.socket) {
        if (!content || !content.length) {
          this.$toast.text('不能发送空数据', 'top');
          return;
        }
        this.socket.emit('message', { receiverId: this.current.receiverId, content, isGroup: 1 });
      } else {
        console.warn('[socket] - socket not initialized yet');
      }
    },
    /**
     * 长按艾特@
     * @author astar
     * @date 2021-04-01 17:01
     * @param {Object} item - 艾特某人
     * @returns {*}
     */
    atSomeone (item) {
      const _this = this;
      return function () {
        _this.$refs.inputBox.insertHTMLFromJson({
          kind: KINDS.AT,
          value: item.sender.userName
        })
      }
    }
  },
  beforeDestroy () {
    this.bus.offListen();
    this.socket.disconnect();
    this.socket = null;
    if (this.reConnectId) {
      clearTimeout(this.reConnectId);
      this.reConnectId = null;
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  components: {
    inputBox,
    message,
    info
  }
}
</script>
