<!--
 * @Author: astar
 * @Date: 2021-05-06 18:09:05
 * @LastEditors: astar
 * @LastEditTime: 2021-06-17 14:49:42
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\views\chat\components\chatMain.vue
-->
<template>
  <main class="chat-main" ref="chat">
    <header class="contact-name">
      <i class="iconfont icon-shouye home-icon" @click="$router.replace('/chat/detail')"></i>
      {{currentReceiver.name}}
      <i style="float: right" v-if="currentReceiver._id && currentReceiver.isGroup" class="iconfont icon-zhankai" @click="$emit('show-info', currentReceiver._id)"></i>
    </header>
    <div class="chat-box" ref="box">
      <div class="no-data" v-show="!chatRecord.length">
        暂时没有新消息
      </div>
      <pull-refresh :refreshNext="getRecord">
        <div slot="main" class="chat-box__item" :class="[item.sender._id === userInfo._id ? 'reverse' : 'normal']" v-for="item in chatRecord" :key="item._id">
          <s-avatar class="chat-box__item_avatar" :src="item.sender.avatar" size="medium" v-press="atSomeone(item)" @click="showUserInfo=true;currentUser=item.sender"/>
          <div>
            <p class="chat-box__item_name">{{item.sender.userName}}</p>
            <div class="chat-box__item_content" :class="{'img': KINDS.IMG === item.content[0].kind}">
              <message v-for="(ele, idx) in item.content" :item="ele" :key="idx"></message>
            </div>
          </div>
        </div>
      </pull-refresh>
    </div>
    <input-box ref="inputBox" @send="sendMessage" class="input-box"></input-box>
    <user-info-dialog v-model="showUserInfo" :info="currentUser"></user-info-dialog>
  </main>
</template>
<script>
import inputBox from './inputBox';
import message from './message';
import userInfoDialog from './userInfoDialog';
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
      $bus: null, // 兄弟组件通信工具
      currentReceiver: {}, // 当前聊天人或群
      currentUser: {}, // 当前点击用户信息
      chatRecord: [], // 聊天记录列表
      showUserInfo: false, // 展示用户基本信息
      $socket: null, // socket
      reConnectCount: 5, // 连接失败可尝试五次重连
      reConnectId: null
    }
  },
  created () {
    this.initSocket();
    this.$bus = new eventBus('chat-main');
    // 修改当前receiver，重新获取聊天记录
    this.$bus.addListener(eventBus.CHANGE_CURRENT_RECEIVER, this.initRecord);
  },
  methods: {
    /**
     * 初始化socket，监听服务器端返回
     * @author astar
     * @date 2021-05-07 14:49
     */
    initSocket () {
      this.$socket = io(process.env.VUE_APP_BASE_API, {
        withCredentials: true,
        extraHeaders: {
          'authorization': getAuthorization()
        }
      });
      this.$socket.on('connect', () => {
        this.reConnectCount = 5;
      });
      this.$socket.on('message', this.receiveMessage);
      this.$socket.on('error', this.receiveErrorMessage);
      this.$socket.on('connect_error', this.connectError);
    },
    /**
     * 收到消息
     * @author astar
     * @date 2021-05-07 14:51
     * @param {Object} message - 一条消息
     */
    receiveMessage (message) {
      this.$bus.broadcast(eventBus.REQUEST_CONTACT_LIST) // 重新获取左侧栏最近聊天历史
      if ([message.receiver._id, message.sender._id].includes(this.currentReceiver._id)) {
        this.chatRecord.push(message);
      }
      if (message.sender._id !== this.userInfo._id) {
        let content = message.content.reduce((str, item) => str + getSimpleMessageFromJSON(item), '');
        this.$notify(message.sender.userName, content, { icon: message.sender.avatar, tag: message._id });
      }
      this.$nextTick(() => {
        if (this.$refs.box) {
          this.$refs.box.scrollTop = this.$refs.box.scrollHeight - this.$refs.box.clientHeight;
        }
      });
    },
    /**
     * 收到错误信息
     * @author astar
     * @date 2021-05-07 14:53
     * @param {Object} error - { type, msg }
     */
    receiveErrorMessage (error) {
      this.$toast.text(error.msg);
      if (error.type === 'logout') {
        removeToken();
        this.$router.push('/login');
      }
    },
    /**
     * 连接socket失败等, 将尝试重新连接5次
     * @author astar
     * @date 2021-05-07 14:55
     */
    connectError (error) {
      console.log(error)
      if (this.reConnectId) {
        clearTimeout(this.reConnectId);
        this.reConnectId = null;
      }
      if (this.reConnectCount) {
        this.reConnectId = setTimeout(() => {
          console.warn('[socket] - reconnect');
          this.reConnectCount--;
          this.$socket.connect();
        }, 1000);
      } else {
        this.$toast.text('连接失败，请重新连接');
      }
    },
    /**
    * 初始化聊天记录
    * @author astar
    * @date 2021-05-06 20:56
    */
    initRecord (currentReceiver) {
      this.totalDone = false;
      this.chatRecord = [];
      this.currentReceiver = { ...this.currentReceiver, ...currentReceiver };
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
          getHistoryChatByCount({ receiverId: this.currentReceiver._id, isGroup: this.currentReceiver.isGroup, startId: this.chatRecord.length ? this.chatRecord[0]._id : null, fetchCount: this.pageSize }).then(res => {
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
      if (this.$socket) {
        if (!content || !content.length) {
          this.$toast.text('不能发送空数据', 'top');
          return;
        }
        this.$socket.emit('message', { receiverId: this.currentReceiver._id, content, isGroup: this.currentReceiver.isGroup });
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
    this.$bus.offListen();
    this.$socket.disconnect();
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
    userInfoDialog
  }
}
</script>
<style lang="scss" scoped>
.chat-main {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  .contact-name {
    flex: 0 0 50px; // 高度50
    width: 100%;
    padding: 0 20px;
    line-height: 50px;
    border-bottom: 1px solid rgb(221, 221, 221);
    font-weight: 600;
    font-size: 15px;
    color: rgb(56, 56, 56);
  }
  .chat-box {
    flex: 1;
    overflow: auto;
    .no-data {
      text-align: center;
      margin-top: 40px;
      font-size: 12px;
      color: rgba(0, 0, 0, .2);
    }
    &__item {
      display: flex;
      padding: 10px 20px;
      &_avatar {
        flex: 0 0 auto;
      }
      .chat-box__item_name {
        font-size: 12px;
        margin: -5px 20px 5px;
        color: #999;
      }
      .chat-box__item_content {
        position: relative;
        padding: 10px;
        background: #fff;
        border-radius: 4px;
        color: #000;
        font-size: 13px;
        word-break: break-all;
        &:after {
          position: absolute;
          top: 10px;
          content: '\20';
          display: block;
          width: 0;
          height: 0;
          border: 6px solid transparent;
        }
      }
      &.normal {
        .chat-box__item_content {
          margin-left: 20px;
          margin-right: 55px;
          &:after {
            left: -12px;
            border-right-color: #fff;
          }
        }
      }
      &.reverse {
        flex-direction: row-reverse;
        .chat-box__item_name {
          text-align: right;
        }
        .chat-box__item_content {
          margin-right: 20px;
          margin-left: 55px;
          // background: rgb(128,177,53);
          background: #a7d6c6;
          &:after {
            right: -12px;
            // border-left-color: rgb(128,177,53);
            border-left-color: #a7d6c6;
          }
        }
      }
      .img {
        padding: 0;
        background: transparent !important;
        &:after {
          display: none;
        }
      }
    }
  }
  .input-box {
    flex: 0 0 180px;
    width: 100%;
    overflow: hidden;
  }
}
</style>
