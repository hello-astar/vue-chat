<template>
  <div ref="chat" class="vue-chat" :class="{'vue-chat-small-device': !isLarge}">
    <chat-aside class="vue-chat_sidebar" :class="{'vue-chat-small-device_sidebar': !isLarge}"></chat-aside>
    <chat-main class="vue-chat_main" :class="{'vue-chat-small-device_main': !isLarge}" @show-info="gotoInfo"></chat-main>
    <!-- 群组或用户详细信息 -->
    <s-popup v-model="showInfo" place="right" :x="pos.x" :y="pos.y" :width="chatWidth" :height="chatHeight">
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

export default {
  name: "chat",
  props: {
    isLarge: Boolean, // 根据屏幕大小添加className
  },
  data () {
    return {
      showInfo: false, // 是否展示详细信息
      currentInfoId: null, // 当前详情的id
      chatWidth: '0px',
      chatHeight: '0px',
      pos: {x: '0px', y: '0px' }
    }
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
      this.$nextTick(this.computePopupStyle);
    },
    /**
     * 计算info popup的左下角位置
     * @author astar
     * @date 2021-04-01 15:07
     */
    computePopupStyle () {
      let $el = this.$refs.chat;
      this.chatWidth = window.getComputedStyle($el).width;
      this.chatHeight = window.getComputedStyle($el).height;
      let { x, y } = getElementPagePosition($el) || { x: '0', y: '0' };
      this.pos = { y: y + ' + ' + this.chatHeight, x }
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
.vue-chat {
  display: flex;
  width: 100%;
  height: 100%;
  &_sidebar {
    flex-shrink: 0;
    width: 30%;
    background: #303942;
  }
  &_main {
    width: 100%;
    background: #eee;
    /deep/ .home-icon {
      display: none;
    }
  }
}
  // 兼容屏幕小于ipad的设备
.vue-chat-small-device {
  &_sidebar {
    display: none; // 小屏上不展示sidebar
  }
  &_main {
    /deep/ .home-icon {
      display: inline-block;
    }
    /deep/ .input-box {
      flex: 0 0 50px;
      width: 100%;
      background: #fff;
    }
  }
}
</style>

