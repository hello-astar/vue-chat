<!--
 * @Author: astar
 * @Date: 2020-09-09 16:50:59
 * @LastEditors: astar
 * @LastEditTime: 2021-07-04 17:40:39
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
  name: "app"
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
