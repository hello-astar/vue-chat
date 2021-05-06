<template>
  <div class="vue-chat" :class="className">
    <div class="content">
      <chat-aside class="sidebar"></chat-aside>
      <main class="main-content" ref="chat">
        <header class="contact-name">
          {{current.name}}
          <i style="float: right" v-if="current.receiverId" class="iconfont icon-zhankai" @click="showGroupInfo=true"></i>
        </header>
        <div class="chat-box" ref="box">
          <div class="no-data" v-show="!chatRecord.length">
            暂时没有新消息
          </div>
          <pull-refresh :refreshNext="refreshNext">
            <div slot="main" class="chat-box__item" :class="[item.sender._id === userInfo._id ? 'reverse' : 'normal']" v-for="item in chatRecord" :key="item._id">
              <s-avatar class="chat-box__item_avatar" :src="item.sender.avatar" size="medium" v-press="atSomeone(item)" @click="showUserInfo=true;currentUser=item.sender"/>
              <div class="chat-box__item_content" :class="{'img': KINDS.IMG === item.content[0].kind}">
                <message v-for="(ele, idx) in item.content" :item="ele" :key="idx"></message>
              </div>
            </div>
          </pull-refresh>
        </div>
        <input-box ref="inputBox" @send="sendMessage" class="input-box"></input-box>
      </main>
    </div>
    <s-dialog title="创建群组" v-model="showAddGroup" @confirm="addGroup" @cancel="showAddGroup=false">
      <s-input-cell autocomplete="off" v-model="formData.groupName" placeholder="请输入群组名"></s-input-cell>
    </s-dialog>
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
    <s-popup v-model="showGroupInfo" place="right" :x="pos.x" :y="pos.y" :width="popupWidth" :height="popupHeight">
      <info :id="current.receiverId" isGroup @close="showGroupInfo=false"></info>
    </s-popup>
  </div>
</template>

<script>
import { io } from 'socket.io-client';
import { mapGetters } from 'vuex';
import { getAuthorization, getElementPagePosition } from '@/utils';
import inputBox from './components/inputBox';
import info from './components/info';
import chatAside from './components/chatAside';
import { removeToken } from '@/utils/token';
import { getFriends, getGroups, getHistoryChatByCount, addGroup, getRecentConcats } from '@/request';
import { getSize } from '@/utils/setRem';
import { KINDS, getSimpleMessageFromJSON } from '@/utils/editor.js';
import message from './components/message';
// import eventBus from './eventBus';

export default {
  name: "chat",
  data () {
    return {
      className: [],
      current: { // 当前群聊
        receiverId: '',
        name: ''
      },
      currentUser: {
        avatar: '',
        userName: '',
        _id: ''
      }, // 当前展示用户信息的用户
      KINDS,
      pageSize: 20,
      totalDone: false,
      socket: null, // socket
      reConnectCount: 5,
      reConnectId: null,
      searchPerson: '', // 搜索联系人
      chatRecord: [], // 当前聊天记录
      showAddGroup: false,
      formData: {
        groupName: ''
      },
      groupList: [],
      friendList: [],
      showUserInfo: false,
      showGroupInfo: false,
      popupWidth: '0px',
      popupHeight: '0px',
      pos: {x: '0px', y: '0px' }
    }
  },
  watch: {
    'current.receiverId' () {
      this.initRecord()
    }
  },
  created () {
    // this.bus = new eventBus('main');
    // this.bus.addListener(eventBus.REQUEST_GROUP_LIST, function (data) {
    //   console.log(data)
    // })
    this.initSocket();
    const _this = this;
    this.$nextTick(() => {
      this.computePopupStyle()
    });
    this.getClass();
    window.addEventListener(
      "resize",
      function () {
        _this.getClass();
        _this.computePopupStyle();
      },
      false
    );
    // 获取用户群组
    this.getGroups();
    getRecentConcats({ pageNo: 1, pageSize: 20 }).then(({ data }) => {
      console.log(data)
    })
  },
  methods: {
    getClass () {
      let { isLarge } = getSize(window, document);
      if (!isLarge) {
        this.className = [
          'vue-chat-small-device'
        ]
        return;
      }
      this.className = []
    },
    /**
    * 复制粘贴
    * @author astar
    * @date 2021-05-05 19:17
    */
    copy (value) {
      let content = document.createElement('input');
      content.value = value;
      document.body.appendChild(content);
      content.select();
      document.execCommand('Copy');
      document.body.removeChild(content);
      this.$toast.text('复制成功');
    },
    /**
     * 计算emoji popup的位置
     * @author astar
     * @date 2021-04-01 15:07
     */
    computePopupStyle () {
      if (!this.$refs.chat) return;
      this.popupWidth = window.getComputedStyle(this.$refs.chat).width;
      this.popupHeight = window.getComputedStyle(this.$refs.chat).height;
      let { x, y } = getElementPagePosition(this.$refs.chat) || {x: '0', y: '0'};
      this.pos = { y: y + ' + ' + this.popupHeight, x }
    },
    initRecord () {
      this.totalDone = false
      this.chatRecord = []
      this.refreshNext().then(() => {
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
     * 创建群组
     * @author astar
     * @date 2021-04-19 16:50
     */
    addGroup () {
      addGroup({ groupName: this.formData.groupName.trim() }).then(res => {
        this.getGroups();
        this.showAddGroup = false;
        this.$toast.text(res.msg);
      }).catch(_ => {
        console.log(_)
      })
    },
    getGroups () {
      getGroups().then(({ data = [] })=> {
        if (data.length) {
          this.groupList = data
          this.current = { receiverId: data[0]._id, name: data[0].groupName }
        }
      })
    },
    getFriends () {
      getFriends()
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
    },
    refreshNext () {
      return new Promise((resolve, reject) => {
        if (!this.totalDone) {
          getHistoryChatByCount({ receiverId: this.current.receiverId, startId: this.chatRecord.length ? this.chatRecord[0]._id : null, fetchCount: this.pageSize }).then(res => {
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
    }
  },
  beforeDestroy () {
    // this.bus.offListener();
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
    info,
    message,
    chatAside
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
.vue-chat {
  position: relative;
  min-height: 610px;
  min-width: 800px;
  height: 100%;
  width: 100%;
  overflow: auto;
  @include bg-filter('~@/assets/images/chat_bg.jpg');
  .content {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 800px;
    height: 600px;
    // width: 100%;
    // height: 100%;
    background: rgb(239, 243, 246);
    .sidebar {
      display: flex;
      flex-direction: column;
      width: 30%;
      background: #303942;
      padding: 10px;
      .userinfo {
        margin-top: 10px;
        color: rgb(244, 244, 244);
        .username {
          margin-left: 10px;
        }
      }
      .search {
        margin: 20px 0;
        background-color: #26292e;
      }
      .contact-list {
        flex: 1;
        overflow: auto;
        margin: 0 -5px;
        .contact-item {
          // display: inline-block;
          cursor: pointer;
          padding: 12px 5px;
          color: #fff;
        }
      }
    }
    .main-content {
      display: flex;
      flex-direction: column;
      width: 100%;
      background: #eee;
      .contact-name {
        flex: 0 0 50px;
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
  }
}
// 兼容屏幕小于ipad的设备
.vue-chat-small-device {
  min-width: auto;
  min-height: auto;
  .content {
    width: 100%;
    height: 100%;
    .sidebar {
      display: none; // 小屏上不展示sidebar
    }
    .main-content {
      .input-box {
        flex: 0 0 50px;
        width: 100%;
        background: #fff;
        textarea {
          display: block;
          width: 100%;
          height: 100%;
          padding: 10px;
          border: none;
          outline: none;
          resize: none;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
/deep/ .user-info-dialog .dialog-container_content {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  .s-avatar {
    margin-right: 20px;
    flex-shrink: 0;
  }
  .iconfont {
    margin-left: 10px;
    font-size: 18px;
    vertical-align: middle;
  }
}
</style>

