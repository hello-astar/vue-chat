<!--
 * @Author: astar
 * @Date: 2020-10-13 14:39:31
 * @LastEditors: astar
 * @LastEditTime: 2021-07-04 21:08:55
 * @Description: layout
 * @FilePath: \vue-chat\src\views\layout\index.vue
-->
<template>
  <div class="layout">
    <nav class="layout-nav">
      <div class="layout-nav__content">
        <i class="iconfont icon-shouye home" @click="$router.push('/home')"></i>
        <ul class="list">
          <li @click="$router.push('/me')">
            <s-avatar class="avatar-img" shape="circle" :src="userInfo.avatar" size="small"></s-avatar>
            {{userInfo.userName}}
          </li>
          <li>
            <svg-icon class="icon" icon-name="logout" @click="showLogoutDialog=true"></svg-icon>
          </li>
        </ul>
      </div>
    </nav>
    <main class="layout-main">
      <router-view></router-view>
    </main>
    <s-dialog title="退出登录" v-model="showLogoutDialog" @confirm="logout" @cancel="showLogoutDialog=false">
      真的要离开吗亲？
    </s-dialog>
  </div>
</template>
<script>
import { removeToken } from '@/utils/token';
import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      showLogoutDialog: false
    }
  },
  methods: {
    logout () {
      removeToken();
      this.$router.push('/login');
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
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
      .home {
        cursor: pointer;
        font-size: 22px;
      }
      .list li {
        display: inline-block;
        cursor: pointer;
        &:not(:last-child) {
          margin-right: 20px;
        }
        .icon {
          width: 20px;
          height: 20px
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