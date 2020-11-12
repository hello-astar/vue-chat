<!--
 * @author: cmx
 * @Date: 2020-09-15 18:10:44
 * @LastEditors: cmx
 * @LastEditTime: 2020-11-12 11:18:50
 * @Description: 输入名字登录
 * @FilePath: \vue-chat\src\views\login\index.vue
-->
<template>
<div class="panel-wrapper login-wrapper">
  <div class="panel-container">
    <div class="panel-container__input">
      <div class="input__cell">
        <i class="iconfont icon-login"></i>
      </div>
      <input-cell class="input__cell" v-model="name" placeholder="请输入用户名"></input-cell>
      <input-cell class="input__cell" type="password" v-model="password" placeholder="请输入密码"></input-cell>
    </div>
    <button class="panel-container__btn" @click="login">登录</button>
    <div class="panel-container__tip" @click="gotoRegister">还没有账号？点我注册</div>
  </div>
</div>
</template>
<script>
import { userLoginReq } from '@/request';
import { setToken } from '@/utils/token';

export default {
  name: 'login',
  data () {
    return {
      name: '',
      password: ''
    }
  },
  methods: {
    gotoRegister () {
      this.$router.push('/register');
    },
    login () {
      userLoginReq({
        name: this.name.trim(),
        password: this.password.trim()
      }).then(res => {
        if (res.result === 1) {
          setToken(res.data.token);
          this.$store.commit('user/SET_USER_INFO', res.data);
          this.$router.push('/home');
        } else {
          this.$toast.text(res.msg, 'top');
        }
      }, _ => {
        this.$toast.text(_.message, 'top')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
.login-wrapper {
  .icon-login {
    font-size: 40px;
  }
}
</style>
