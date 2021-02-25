<!--
 * @Author: astar
 * @Date: 2021-02-25 11:35:15
 * @LastEditors: astar
 * @LastEditTime: 2021-02-25 15:41:18
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\views\error\401.vue
-->
<template>
  <div class="page-401">
    <svg-icon icon-name="401" class="svg-icon"></svg-icon>
    <div @click="$router.push('/login')">
      <svg-icon icon-name="arrow" class="svg-icon"></svg-icon>
      去登录
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page-401 {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  height: 100vh;
  width: 100vw;
  .svg-icon {
    display: inline-block;
    width: 180px;
    height: 180px;
  }
}
</style>