<!--
 * @author: cmx
 * @Date: 2020-09-15 18:10:44
 * @LastEditors: astar
 * @LastEditTime: 2020-09-16 20:08:29
 * @Description: 输入名字登录
 * @FilePath: \vue-chat\src\views\login.vue
-->
<template>
<div class="login-wrapper">
  <div class="login-container">
    <header class="login-container__header">登录</header>
    <div class="login-container__input">
      <input type="text" v-model="name" placeholder="请输入用户名" @keyup.enter="login">
    </div>
    <button class="login-container__btn" @click="login">登录</button>
  </div>
</div>
</template>
<script>
import { userRegisterReq, userLoginReq } from '@/request';
import { setUUID } from '@/utils/uuid';

export default {
  name: 'login',
  data () {
    return {
      name: ''
    }
  },
  created () {
    userRegisterReq({
      name: 'astar1',
      avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3119911064,951905419&fm=26&gp=0.jpg'
    })
  },
  methods: {
    login () {
      userLoginReq({
        name: this.name
      }).then(res => {
        if (res.result === 1) {
          setUUID(res.data.uuid);
          this.$store.commit('user/SET_USER_INFO', res.data);
          this.$router.push('/chat')
        }
      }, _ => {
        console.log('请求失败', _)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login-wrapper {
  position: relative;
  height: 100%;
  .login-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 400px;
    height: 300px;
    background: #fff;
    border-radius: 4px;
    text-align: center;
    &__header {
      line-height: 50px;
    }
    &__input {
      margin-top: 50px;
    }
    &__btn {
      display: inline-block;
      width: 150px;
      margin-top: 50px;
      line-height: 30px;
      border-radius: 4px;
      background: #000;
      color: #fff;
      outline: 0;
      border: 0;
    }
  }
}
</style>
