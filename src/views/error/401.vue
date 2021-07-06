<!--
 * @Author: astar
 * @Date: 2021-02-25 11:35:15
 * @LastEditors: astar
 * @LastEditTime: 2021-07-06 18:41:08
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\views\error\401.vue
-->
<template>
  <div class="page-401">
    <div class="page-401__content">
      <svg-icon icon-name="401" class="svg-icon"></svg-icon>
      <s-button type="primary" @click="$router.push('/login')">未授权，去登录</s-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.page-401 {
  &__content {
    position: fixed;
    top: 50%;
    left: 50%;
    text-align: center;
    width: 180px;
    transform: translate(-50%, -50%);
    .svg-icon {
      width: 100%;
      height: 180px;
      margin-bottom: 20px;
    }
  }
}
</style>