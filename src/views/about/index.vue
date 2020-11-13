<!--
 * @author: cmx
 * @Date: 2020-10-13 14:37:02
 * @LastEditors: cmx
 * @LastEditTime: 2020-11-13 15:37:41
 * @Description: about页面
 * @FilePath: \vue-chat\src\views\about\index.vue
-->
<template>
<div class="about-container" @scroll="lazyLoad">
  <div class="about-container__scroll">
    <section class="bg bg-1">
      HELLO
    </section>
    <section class="bg bg-2 lazy">
      ASTAR
    </section>
    <section class="bg bg-3 lazy">
      BYE
    </section>
  </div>
  </div>
</template>

<script>
export default {
  methods: {
    lazyLoad () {
      let clientHeight = document.querySelector('.about-container').clientHeight
      let scrollObj = document.querySelector('.about-container')
      let lazyImages = document.querySelectorAll('.lazy')
      let scrollTop = scrollObj.scrollTop
      for (let i = 0; i < lazyImages.length; i++) {
        if (scrollTop + clientHeight > lazyImages[i].offsetTop) {
          lazyImages[i].classList.remove('lazy')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.about-container {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  &__scroll {
    section {
      width: 100%;
      height: 100vh;
      background: rgba(0, 0, 0, .7);
      color: #fff;
      line-height: 100vh;
      text-align: center;
      font-size: 40px;
    }
    .bg {
      background-size: cover;
      background-position: center center;
      background-attachment: fixed;
      &.bg-1 {
        background-image: url('https://w.wallhaven.cc/full/2e/wallhaven-2eroxm.jpg');
      }
      &.bg-2 {
        background-image: url('https://w.wallhaven.cc/full/ym/wallhaven-ym1wp7.jpg');
      }
      &.bg-3 {
        background-image: url('https://w.wallhaven.cc/full/vg/wallhaven-vg7lv3.jpg');
      }
      &.lazy {
        background-image: none;
      }
    }
  }
}
</style>