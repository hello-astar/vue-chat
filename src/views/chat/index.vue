<template>
  <div ref="chat" class="vue-chat" :class="{'vue-chat-small-device': !isLarge}">
    <chat-aside class="vue-chat_sidebar" :class="{'vue-chat-small-device_sidebar': !isLarge, 'hidden': !showContact }"></chat-aside>
    <chat-main
      class="vue-chat_main"
      :class="{'vue-chat-small-device_main': !isLarge, 'hidden': showContact}"
      @show-contact="showContact=true"
      @show-info="gotoInfo"></chat-main>
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
import eventBus from '@/views/chat/eventBus';

export default {
  name: "chat",
  props: {
    isLarge: Boolean, // 根据屏幕大小添加className
  },
  data () {
    return {
      $bus: null,
      showContact: false, // 是否展示最近联系人列表
      showInfo: false, // 是否展示详细信息
      currentInfoId: null, // 当前详情的id
      chatWidth: '0px',
      chatHeight: '0px',
      pos: {x: '0px', y: '0px' }
    }
  },
  created () {
    this.$bus = new eventBus('chat-index');
    this.$bus.addListener(eventBus.CHANGE_CURRENT_RECEIVER, () => this.showContact = false);
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
    width: 100%;
    &.hidden {
      display: none;
    }
  }
  &_main {
    /deep/ .home-icon {
      display: inline-block;
      margin-right: 5px;
      vertical-align: bottom;
    }
    /deep/ .input-box {
      flex: 0 0 50px;
      width: 100%;
      background: #fff;
    }
    &.hidden {
      display: none;
    }
  }
}
</style>

