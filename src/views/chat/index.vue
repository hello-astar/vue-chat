<template>
  <div class="vue-chat">
    <div class="content">
      <aside class="sidebar">
        <div class="userinfo">
          <s-avatar shape="circle" :src="userInfo.avatar" size="medium"/>
          {{userInfo.name}}
        </div>
        <search-box class="search" v-model="searchPerson"></search-box>
        <ul class="contact-list scrollbar">
          <li class="contact-item" v-for="item in onlineList" :key="item._id">
            <s-avatar :src="item.avatar" size="large"></s-avatar>
          </li>
        </ul>
      </aside>
      <main class="main-content">
        <header class="contact-name">
          群聊
        </header>
        <div class="chat-box" ref="box">
          <div class="no-data" v-show="!chatRecord.length">
            暂时没有新消息
          </div>
          <pull-refresh :refreshNext="refreshNext">
            <div slot="main" class="chat-box__item" :class="item.userId === userInfo._id ? 'reverse' : 'normal'" v-for="item in chatRecord" :key="item._id">
              <s-avatar class="chat-box__item_avatar" :src="item.avatar" size="medium"/>
              <div class="chat-box__item_content">
                <template v-for="(ele, idx) in item.content">
                  <span v-if="ele.kind==='text'" :key="idx">{{ele.value}}</span>
                  <span v-if="ele.kind==='emoji'" :key="idx" class="emoji-icon" :style="{ 'background-position': `0 ${-30 * expressions.findIndex(item => item === ele.value) / 100}rem` }"></span>
                </template>
              </div>
            </div>
          </pull-refresh>
        </div>
        <input-box @send="sendMessage" class="input-box"></input-box>
      </main>
    </div>
  </div>
</template>

<script>
import { io } from 'socket.io-client';
import { BASE_URL } from '@/config';
import searchBox from '@/components/searchBox';
import { mapGetters } from 'vuex';
import { getToken } from '@/utils/token';
import inputBox from './components/inputBox';
import expressions from './components/expression/config';
import { removeToken } from '@/utils/token';
import { getHistoryChatByCount } from '@/request';

export default {
  name: "chat",
  data () {
    return {
      pageSize: 20,
      totalDone: false,
      expressions,
      socket: null, // socket
      reConnectCount: 10,
      reConnectId: null,
      searchPerson: '', // 搜索联系人
      onlineList: [], // 当前在线人
      chatRecord: [] // 当前聊天记录
    }
  },
  created () {
    this.reConnectCount = 10;
    this.initSocket();
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
  methods: {
    refreshNext () {
      return new Promise((resolve, reject) => {
        if (!this.totalDone) {
          getHistoryChatByCount({ exitsCount: this.chatRecord.length, fetchCount: this.pageSize }).then(res => {
            if (res.result === 1) {
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
      this.socket = io(`http://${BASE_URL}`, {
        withCredentials: true,
        extraHeaders: {
          'authorization': 'Bearer ' + getToken()
        }
      });

      this.socket.on("online-list", list => {
        this.onlineList = list;
      });

      this.socket.on("message", message => {
        this.chatRecord.push(message);
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
            console.log('重新连接');
            this.reConnectCount--;
            this.socket.connect();
          }, 1000);
        } else {
          this.$toast.text('连接失败，请重新连接')
        }
      });
    },
    sendMessage (message) {
      if (this.socket) {
        if (!message || !message.length) {
          this.$toast.text('不能发送空数据', 'top');
          return;
        }
        this.socket.emit('message', message);
      } else {
        console.log('socket 还未初始化');
      }
    }
  },
  beforeDestroy () {
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
    searchBox,
    inputBox
  }
}
</script>
<style lang="scss" scoped>
.vue-chat {
  position: relative;
  min-height: 610px;
  min-width: 800px;
  height: 100%;
  width: 100%;
  overflow: auto;
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
          display: inline-block;
          cursor: pointer;
          padding: 12px 5px;
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
              background: rgb(128,177,53);
              &:after {
                right: -12px;
                border-left-color: rgb(128,177,53);
              }
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
$dprs: 1, 2, 3, 4;
@each $dpr in $dprs {
  @media screen and (max-width:#{$dpr * 768}px) and (min-resolution:#{$dpr}dppx) {
    .vue-chat {
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
  }
}
</style>
