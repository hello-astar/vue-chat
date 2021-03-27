<!--
 * @Author: astar
 * @Date: 2020-09-09 16:50:59
 * @LastEditors: astar
 * @LastEditTime: 2021-03-28 00:21:25
 * @Description: 入口页面
 * @FilePath: \vue-chat\src\App.vue
-->
<template>
  <div id="app">
    <div class="app-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="scss" scoped>
#app {
  position: relative;
  height: 100%;
  // background: #eee;
  .app-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
}
</style>
