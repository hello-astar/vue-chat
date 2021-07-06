<!--
 * @Author: astar
 * @Date: 2021-02-25 11:35:09
 * @LastEditors: astar
 * @LastEditTime: 2021-07-06 21:27:24
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\views\error\404.vue
-->
<template>
  <div class="page-404">
    <div class="page-404__content">
      <svg-icon icon-name="404" class="svg-icon"></svg-icon>
      <s-button type="danger" @click="$router.push('/')">回到首页</s-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page-404 {
  &__content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    text-align: center;
    .svg-icon {
      width: 200px;
      height: 200px;
    }
  }
}
</style>