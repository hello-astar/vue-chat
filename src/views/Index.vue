<template>
  <div class="vue-chat">
    <div class="content">
      <section class="sidebar">
        <div class="userinfo">
          <img src="@/assets/images/avatar.jpg" alt="">
          天天十点睡
        </div>
        <div class="searchbox">
          <div class="search-icon"></div>
          <input type="text" placeholder="搜索">
        </div>
        <div>
          <ul class="contact-list scrollbar">
            <li class="contact-item" v-for="item in 10" :key="item">
              <img src="@/assets/images/avatar1.jpeg" alt="">
              <div class="contact-info">
                <header class="name">汤婆婆</header>
                <section class="message">在吗？</section>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <section class="main-content">
        <header class="contact-name">
          汤婆婆
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
      </section>
    </div>
  </div>
</template>

<script>
// import 
export default {
  name: "Index",
  data () {
    return {
      text: ''
    }
  },
  methods: {
    sendMessage () {
      // sendMessage().then(res => {
      //   this.text = ''
      // })
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
      width: 30%;
      background: #303942;
      padding: 10px;
      .userinfo {
        margin-top: 10px;
        color: rgb(244, 244, 244);
        line-height: 60px;
        img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin-right: 20px;
          margin-left: 15px;
        }
      }
      .searchbox {
        margin: 20px auto;
        width: 100%;
        height: 32px;
        background-color: #26292e;
        border-radius: 3px;
        .search-icon {
          display: inline-block;
          width: 32px;
          height: 32px;
          background: url('../assets/images/search.png') no-repeat center;
          background-size: 25px 25px;
        }
        input {
          display: inline-block;
          vertical-align: top;
          height: 32px;
          line-height: 32px;
          background-color: #26292e;
          outline: 0;
          border: none;
          padding-left: 5px;
          color: rgb(244, 244, 244);
        }
      }
      .contact-list {
        height: 390px;
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
