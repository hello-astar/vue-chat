<!--
 * @author: cmx
 * @Date: 2020-10-13 14:39:31
 * @LastEditors: cmx
 * @LastEditTime: 2020-11-12 20:52:52
 * @Description: 网站首页
 * @FilePath: \vue-chat\src\views\layout\index.vue
-->
<template>
  <div class="layout">
    <nav class="layout-nav">
      <div class="layout-nav__content">
        <div class="icon" @click="$router.push('/')"><img src="@/assets/images/avatar.jpg" alt="">Astar</div>
        <ul class="list">
          <li><img src="@/assets/images/logout.svg" alt="" style="width:20px; height:20px" @click="logout"></li>
        </ul>
      </div>
    </nav>
    <main class="layout-main">
      <router-view></router-view>
    </main>
  </div>
</template>
<script>
export default {
  methods: {
    logout () {
      console.log('退出登录')
    }
  }
}
</script>
<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  min-width: 1290px;
  background: url('~@/assets/images/bg.jpg') no-repeat center;
  background-size: cover;
  overflow: auto;
  &-nav {
    // background: #090723;
    padding: 10px 60px;
    box-shadow: rgba(0,0,0,.2)  0 1px 5px 0px;
    &__content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 1000px;
      margin: 0 auto;
      .icon {
        cursor: pointer;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 20px;
        }
      }
      .list li {
        display: inline-block;
      }
    }
  }
  &-main {
    flex: 1;
    overflow: auto;
  }
  &-footer {

  }
}
</style>