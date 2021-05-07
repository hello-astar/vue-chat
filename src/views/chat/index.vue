<template>
  <div class="vue-chat" :class="className">
    <div class="vue-chat__content">
      <chat-aside class="vue-chat__content_sidebar"></chat-aside>
      <chat-main ref="chatMain" class="vue-chat__content_main" @show-info="gotoInfo"></chat-main>
    </div>
    <!-- 群组或用户详细信息 -->
    <s-popup v-model="showInfo" place="right" :x="pos.x" :y="pos.y" :width="chatMainWidth" :height="chatMainHeight">
      <chat-info :id="currentInfoId" isGroup @close="showInfo=false"></chat-info>
    </s-popup>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getElementPagePosition } from '@/utils';
import chatAside from './components/chatAside';
import chatMain from './components/chatMain';
import chatInfo from './components/chatInfo';
import { getSize } from '@/utils/setRem';

export default {
  name: "chat",
  data () {
    return {
      className: [], // 根据屏幕大小添加className
      showInfo: false, // 是否展示详细信息
      currentInfoId: null, // 当前详情的id
      chatMainWidth: '0px',
      chatMainHeight: '0px',
      pos: {x: '0px', y: '0px' }
    }
  },
  created () {
    this.getClass();
  },
  mounted () {
    this.computePopupStyle();
    window.addEventListener(
      'resize',
      this.resizePage,
      false
    );
  },
  methods: {
    /**
     * 页面resize的时候重新计算布局
     * @author astar
     * @date 2021-05-07 14:36
     */
    resizePage () {
      this.getClass();
      this.computePopupStyle();
    },
    /**
     * 根据屏幕大小获取布局css
     * @author astar
     * @date 2021-05-07 14:06
     */
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
     * 计算info popup的左下角位置
     * @author astar
     * @date 2021-04-01 15:07
     */
    computePopupStyle () {
      let $el = this.$refs.chatMain.$el;
      this.chatMainWidth = window.getComputedStyle($el).width;
      this.chatMainHeight = window.getComputedStyle($el).height;
      let { x, y } = getElementPagePosition($el) || { x: '0', y: '0' };
      this.pos = { y: y + ' + ' + this.chatMainHeight, x }
    },
    gotoInfo (id) {
      this.currentInfoId = id;
      this.showInfo = true;
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizePage);
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  components: {
    chatAside,
    chatMain,
    chatInfo
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
  .vue-chat__content {
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
    &_sidebar {
      width: 30%;
      background: #303942;
      padding: 10px;
    }
    &_main {
      width: 100%;
      background: #eee;
    }
  }
}
// 兼容屏幕小于ipad的设备
.vue-chat-small-device {
  min-width: auto;
  min-height: auto;
  .vue-chat__content {
    width: 100%;
    height: 100%;
    .vue-chat__content_sidebar {
      display: none; // 小屏上不展示sidebar
    }
    .vue-chat__content_main {
      /deep/ .input-box {
        flex: 0 0 50px;
        width: 100%;
        background: #fff;
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

