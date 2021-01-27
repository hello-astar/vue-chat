<!--
 * @Author: astar
 * @Date: 2020-10-13 14:39:31
 * @LastEditors: astar
 * @LastEditTime: 2021-01-27 14:27:50
 * @Description: layout
 * @FilePath: \vue-chat\src\views\layout\index.vue
-->
<template>
  <div class="layout">
    <nav class="layout-nav">
      <div class="layout-nav__content">
        <div class="avatar" @click="$router.push('/')"><img src="@/assets/images/avatar.jpg" alt="">Astar</div>
        <ul class="list">
          <li><img src="@/assets/images/logout.svg" alt="" class="icon" @click="logout"></li>
        </ul>
      </div>
    </nav>
    <main class="layout-main">
      <router-view></router-view>
    </main>
  </div>
</template>
<script>
import { removeToken } from '@/utils/token';
export default {
  methods: {
    logout () {
      removeToken()
      this.$router.push('/login')
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
  overflow: auto;
  background: #090723;
  color: #fff;
  &-nav {
    padding: 10px 2%;
    box-shadow: rgba(255,255,255,.2)  0 1px 5px 0px;
    &__content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
      .avatar {
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
        cursor: pointer;
        .icon {
          width:20px;
          height:20px
        }
      }
    }
  }
  &-main {
    flex: 1;
    overflow: auto;
  }
}
</style>