<template>
  <div class="vue-chat">
    <div class="content">
      <aside class="sidebar">
        <div class="userinfo">
          <avatar shape="circle" :src="require('@/assets/images/avatar.jpg')" size="medium"/>
          天天十点睡
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
        <div class="chat-box">
          <!-- <div class="no-data">
            暂时没有新消息
          </div> -->
          <div class="chat-box__item" v-for="item in chatRecord" :key="item.id">
            <avatar :src="require('@/assets/images/avatar.jpg')" size="medium"/>
            <div class="chat-box__item_content">
              你好~
            </div>
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
import { setUUID, removeUUID, getUUID } from '@/utils/uuid';
import searchBox from '@/components/searchBox'
import avatar from '@/components/avatar'
export default {
  name: "Index",
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
  created () {
    userLoginReq({
      name: 'astar',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQELFmCuo6ugExbw6NbyhYEvA8LHnErT7QZtQ&usqp=CAU'
    }).then(res => {
      if (res.result === 1) {
        setUUID(res.data.uuid);
        this.initWebsocket();
      }
    }, _ => {
      console.log('请求失败', _)
    })
  },
  methods: {
    initWebsocket () {
      let CreateWebSocket = function (urlValue) {
        const { WebSocket, MozWebSocket } = window;
        if (WebSocket) return new WebSocket(urlValue);
        if (MozWebSocket) return new MozWebSocket(urlValue);
        return null;
      }
      this.webSocket = CreateWebSocket(`ws://${BASE_URL}/chat`);
      if (this.webSocket) {
        this.webSocket.onopen = () => {
          console.log('连接成功！')
        }
        this.webSocket.onmessage = (evt) => {
          const res = JSON.parse(evt.data)
          if (res.result === 1) {
            const { type, message, onlineList } = res.data
            if (type === 0) {
              this.onlineList = onlineList
            } else if (type === 1) {
              this.chatRecord.push(message)
            }
          }
        }
        this.webSocket.onerror = function (evt) {
          console.log('通信发生错误', evt)
        },
        // 关闭连接
        this.webSocket.onclose = function () {
          removeUUID()
        }
      }
    },
    sendMessage () {
      this.webSocket.send(JSON.stringify({ type: 1, uuid: getUUID(), content: this.text }))
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
        margin: 0 -5px;
        .contact-item {
          display: inline-block;
          cursor: pointer;
          padding: 12px 5px;
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
        &__item {
          display: flex;
          padding: 10px 20px;
          .chat-box__item_content {
            position: relative;
            padding: 10px;
            background: #fff;
            border-radius: 4px;
            margin-left: 20px;
            color: #999;
            font-size: 13px;
            &:after {
              position: absolute;
              top: 10px;
              left: -12px;
              content: '\20';
              display: block;
              width: 0;
              height: 0;
              border: 6px solid transparent;
              border-right-color: #fff;
            }
          }
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
