<!--
 * @Author: astar
 * @Date: 2021-05-08 10:41:26
 * @LastEditors: astar
 * @LastEditTime: 2021-07-04 20:50:00
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\views\layout\chat.vue
-->
<template>
  <div class="chat-layout" :class="{ 'chat-layout-small-device': !isLarge}">
    <div class="chat-layout__content" :class="{ 'chat-layout-small-device__content': !isLarge}">
      <router-view :isLarge="isLarge"></router-view>
    </div>
  </div>
</template>
<script>
import { getSize } from '@/utils/setRem';
export default {
  data () {
    return {
      isLarge: false
    }
  },
  created () {
    this.getClass()
  },
  mounted () {
    window.addEventListener(
      'resize',
      this.getClass,
      false
    );
  },
  methods: {
    /**
     * 根据屏幕大小获取布局css
     * @author astar
     * @date 2021-05-07 14:06
     */
    getClass () {
      let { isLarge } = getSize(window, document);
      this.isLarge = isLarge;
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/styles/mixin.scss";
.chat-layout {
  position: relative;
  min-height: 610px;
  min-width: 800px;
  height: 100%;
  width: 100%;
  overflow: auto;
  @include bg-filter('~@/assets/images/chat_bg.jpg');
  &__content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 800px;
    height: 600px;
    background: rgb(239, 243, 246);
  }
}
// 兼容屏幕小于ipad的设备
.chat-layout-small-device {
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
  width: 100%;
  height: 100%;
  &:before {
    display: none;
  }
  &__content {
    position: static;
    width: 100%;
    height: 100%;
  }
}
</style>