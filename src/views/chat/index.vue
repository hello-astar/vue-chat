<template>
  <div class="vue-chat" :class="className">
    <div class="content">
      <chat-aside class="sidebar"></chat-aside>
      <chat-main class="main-content"></chat-main>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getElementPagePosition } from '@/utils';
import chatAside from './components/chatAside';
import chatMain from './components/chatMain';
import { getRecentConcats } from '@/request';
import { getSize } from '@/utils/setRem';

export default {
  name: "chat",
  data () {
    return {
      className: []
    }
  },
  created () {
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
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  components: {
    chatAside,
    chatMain
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

