<!--
 * @Author: astar
 * @Date: 2020-09-09 16:50:59
 * @LastEditors: astar
 * @LastEditTime: 2022-01-15 02:19:00
 * @Description: 入口页面
 * @FilePath: \vue-chat\src\App.vue
-->
<template>
  <div id="app">
    <router-view class="app-content"></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  // created () {
  //   // 监听serviceworker更新
  //   document.addEventListener('swUpdated', this.showRefreshUI, { once: true })
  // },
  // methods: {
  //   showRefreshUI (e) {
  //     console.log('通知用户刷新页面，获取最新版本', e)
  //     console.log(e.sw)
  //     // 激活新的sw
  //     // skipWaiting，搭配clientsClaim，新sw获取了页面控制权
  //     // 通知用户让他们选择是否立马刷新页面 // 防止出现前面操作由旧sw控制，后面由新sw控制的情况
  //   }
  // },
  // beforeDestroy () {
  //   document.removeEventListener('swUpdated', this.showRefreshUI, { once: true })
  // }
};
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
  .app-content {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
}
</style>
