<template>
  <div class="vue-chat">
    <div class="content">
      <aside class="sidebar">
        <div class="userinfo">
          <avatar shape="circle" :src="require('@/assets/images/avatar.jpg')" size="medium"/>
          天天十点睡
        </div>
        <search-box class="search" v-model="searchTxt"></search-box>
        <ul class="contact-list scrollbar">
          <li class="contact-item" v-for="item in 1" :key="item">
            <img src="@/assets/images/avatar1.jpeg" alt="">
            <div class="contact-info">
              <header class="name">公共聊天室</header>
              <section class="message">在吗？</section>
            </div>
          </li>
        </ul>
      </aside>
      <main class="main-content">
        <header class="contact-name">
          公共聊天室
        </header>
        <div class="chat-box">
          <div class="no-data">
            暂时没有新消息
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
import { userLoginReq } from '@/request';

import searchBox from '@/components/searchBox'
import avatar from '@/components/avatar'
export default {
  name: "Index",
  data () {
    return {
      webSocket: null,
      text: '',
      searchTxt: ''
    }
  },
  components: {
    avatar,
    searchBox
  },
  created () {
    let CreateWebSocket = function (urlValue) {
      const { WebSocket, MozWebSocket } = window;
      if (WebSocket) return new WebSocket(urlValue);
      if (MozWebSocket) return new MozWebSocket(urlValue);
      return null;
    }
    this.webSocket = CreateWebSocket(`ws://${BASE_URL}/chat`);
    if (this.webSocket) {
      this.webSocket.onopen = (evt) => {
        console.log('连接成功！', evt)
      }
      this.webSocket.onmessage = function (evt) {
        // 这是服务端返回的数据
        console.log("服务端说" + evt.data)
      }
      // 关闭连接
      this.webSocket.onclose = function (evt) {
        console.log("Connection closed.", evt)
      }
    }
  },
  mounted () {
    userLoginReq({
      name: 'astar'
    }).then(res => {
      console.log(res, '============')
    })
  },
  methods: {
    sendMessage () {
      console.log('发送')
      this.webSocket.send({ message: this.text })
      this.text = ''
    },
    breakMessage () {
      this.text += '\n'
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.vue-chat {
  position: relative;
  width: 100%;
  min-height: 600px;
  min-width: 800px;
  overflow: auto;
  padding: calc((100vh - 600px) / 2) 0;
  .content {
    display: flex;
    margin: 0 auto;
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
      }
      .contact-list {
        flex: 1;
        overflow: auto;
        overflow: auto;
        .contact-item {
          cursor: pointer;
          padding: 12px 0;
          border-top: 1px solid rgba(49, 49, 49, 0.8);
          &:last-child {
            border-bottom: 1px solid rgba(49, 49, 49, 0.8);
          }
          img {
            width: 40px;
            height: 40px;
            border-radius: 3px;
          }
          .contact-info {
            display: inline-block;
            margin-left: 20px;
            vertical-align: top;
            color: rgb(244, 244, 244);
            .name {

            }
            .message {
              font-size: 12px;
              color: rgba(244, 244, 244, .6);
            }
          }
        }
      }
    }
    .main-content {
      position: relative;
      width: 70%;
      background: #eee;
      .contact-name {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        // background: rgb(247, 252, 255);
        padding: 0 20px;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid rgb(221, 221, 221);
        font-weight: 600;
        font-size: 15px;
        color: rgb(56, 56, 56);
      }
      .chat-box {
        overflow: auto;
        padding: 50px 0 180px;
        .no-data {
          text-align: center;
          margin-top: 40px;
          font-size: 12px;
          color: rgba(0, 0, 0, .2);
        }
      }
      .input-box {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 180px;
        background: #fff;
        textarea {
          display: block;
          width: 100%;
          height: 73%;
          padding: 10px;
          border: none;
          outline: none;
          font-family: "Micrsofot Yahei";
          resize: none;
        }
        .send {
          width: 100%;
          height: 27%;
          line-height: 30%;
          padding: 8px 12px;
          text-align: right;
          button {
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
</style>
