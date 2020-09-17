<template>
  <div class="vue-chat">
    <div class="content">
      <aside class="sidebar">
        <div class="userinfo">
          <avatar shape="circle" :src="userInfo.avatar" size="medium"/>
          {{userInfo.name}}
        </div>
        <search-box class="search" v-model="searchPerson"></search-box>
        <ul class="contact-list scrollbar">
          <li class="contact-item" v-for="item in onlineList" :key="item.uuid">
            <avatar :src="item.avatar" size="large"></avatar>
          </li>
        </ul>
      </aside>
      <main class="main-content">
        <header class="contact-name">
          公共聊天室
        </header>
        <div class="chat-box" ref="box">
          <div class="no-data" v-show="!chatRecord.length">
            暂时没有新消息
          </div>
          <div class="chat-box__item" :class="item.uuid === userInfo.uuid ? 'reverse' : 'normal'" v-for="item in chatRecord" :key="item.id">
            <avatar class="chat-box__item_avatar" :src="item.avatar" size="medium"/>
            <div class="chat-box__item_content" v-html="item.content"></div>
          </div>
        </div>
        <div class="input-box">
          <textarea
            v-model="text"
            @keyup.enter.exact="sendMessage"
            @keyup.ctrl.enter="breakMessage"
            placeholder="按Enter发送，Ctrl+Enter可换行"
          />
          <div class="send">
            <button @click="sendMessage">发送</button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { BASE_URL } from '@/config';
import { WebsocketClass } from '@/utils/socket';
import searchBox from '@/components/searchBox';
import avatar from '@/components/avatar';
import { mapGetters } from 'vuex';
import { getUUID } from '@/utils/uuid';

// const avatarRandomList = [
//   'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=90606386,735058472&fm=26&gp=0.jpg',
//   'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3119911064,951905419&fm=26&gp=0.jpg',
//   'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=406680416,4142076527&fm=26&gp=0.jpg',
//   'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3449046293,781770504&fm=26&gp=0.jpg',
//   'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=263274051,1344594427&fm=26&gp=0.jpg',
//   'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4257961807,989795269&fm=26&gp=0.jpg',
//   'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1432880367,267558725&fm=26&gp=0.jpg',
//   'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3908966968,3041558363&fm=26&gp=0.jpg',
//   'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4252112164,4061229145&fm=26&gp=0.jpg',
//   'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1157958367,3068515202&fm=26&gp=0.jpg'
// ]
export default {
  name: "chat",
  data () {
    return {
      webSocket: null, // 当前websocket
      text: '', // 输入内容
      searchPerson: '', // 搜索联系人
      onlineList: [], // 当前在线人
      chatRecord: [] // 当前聊天记录
    }
  },
  components: {
    avatar,
    searchBox
  },
  mounted () {
    this.initWebsocket();
  },
  methods: {
    initWebsocket () {
      this.webSocket = new WebsocketClass({
        url: `ws://${BASE_URL}/chat/room`,
        params: {
          uuid: getUUID()
        },
        onMessage: (evt) => {
          const res = JSON.parse(evt.data);
          if (res.result === 1) {
            const { type, records, onlineList } = res.data;
            if (type === 0) { // 获取在线人
              this.onlineList = onlineList;
            } else if (type === 1) { // 获取聊天内容
              this.chatRecord = records;
              this.$nextTick(() => {
                if (this.$refs.box) {
                  this.$refs.box.scrollTop = this.$refs.box.scrollHeight - this.$refs.box.clientHeight;
                }
              })
            }
          }
        },
        onClose: () => {
          console.log('断开了')
        }
      });
    },
    sendMessage () {
      if (this.webSocket) {
        this.webSocket.send(JSON.stringify({ type: 1, uuid: this.userInfo.uuid, content: this.text }));
        this.text = ''
      } else {
        console.log('socket 还未初始化')
      }
    },
    breakMessage () {
      this.text += '\n'
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.vue-chat {
  width: 100%;
  height: 100%;
  .content {
    display: flex;
    width: 100%;
    height: 100%;
    background: rgb(239, 243, 246);
    .sidebar {
      display: none; // 小屏上不展示sidebar
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
        flex: 0 0 50px;
        width: 100%;
        background: #fff;
        textarea {
          display: block;
          width: 100%;
          height: 73%;
          padding: 10px;
          border: none;
          outline: none;
          resize: none;
        }
        .send {
          display: none;
        }
      }
    }
  }
}

// 兼容屏幕大于ipad的设备
$dprs: 1, 2, 3, 4;
@each $dpr in $dprs {
  @media screen and (min-width:#{$dpr * 768}px) and (resolution:#{$dpr}dppx) {
    .vue-chat {
      position: relative;
      min-height: 610px;
      min-width: 800px;
      overflow: auto;
      .content {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 800px;
        height: 600px;
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
          .input-box {
            flex: 0 0 180px;
            .send {
              display: block;
              width: 100%;
              height: 27%;
              line-height: 30%;
              padding: 8px 12px;
              text-align: right;
              button {
                height: 100%;
                outline: 0;
                cursor: pointer;
                background: #303942;
                border: solid 1px #ddd;
                padding: 6px 10px;
                color: #fff;
                border-radius: 4px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
