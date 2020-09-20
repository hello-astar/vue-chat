<!--
 * @author: cmx
 * @Date: 2020-09-15 18:10:44
 * @LastEditors: astar
 * @LastEditTime: 2020-09-20 21:48:29
 * @Description: 输入名字登录
 * @FilePath: \vue-chat\src\views\login.vue
-->
<template>
<div class="panel-wrapper register-wrapper">
  <div class="panel-container">
    <div class="panel-container__input">
      <div class="input__cell">
        <upload-img ref="avatar" @change="changeFile"></upload-img>
      </div>
      <input-cell type="text" autocomplete="off" class="input__cell" v-model="name" placeholder="请输入用户名"></input-cell>
      <input-cell type="password" autocomplete="off" class="input__cell" v-model="password" placeholder="请输入密码"></input-cell>
    </div>
    <button class="panel-container__btn" @click="register">注册</button>
    <div class="panel-container__tip" @click="gotoLogin">有账号了？点我登录</div>
  </div>
</div>
</template>
<script>
import { userRegisterReq } from '@/request';
import uploadImg from '@/components/uploadImg';

export default {
  name: 'register',
  data () {
    return {
      file: '',
      name: '',
      password: ''
    }
  },
  created () {

  },
  methods: {
    gotoLogin () {
      this.$router.push('/login')
    },
    changeFile (e) {
      this.file = e;
    },
    register () {
      if (!this.file) {
        return this.$toast.text('请选择头像', 'top');
      }
      if (!this.name.trim()) {
        return this.$toast.text('请输入用户名', 'top');
      }
      if (!this.password.trim()) {
        return this.$toast.text('请输入密码', 'top');
      }
      this.$refs.avatar.upload().then(res => {
        userRegisterReq({
        name: this.name.trim(),
        password: this.password.trim(),
        avatar: `http://qgyfalxn6.hn-bkt.clouddn.com/${res.key}`
      }).then(res => {
        if (res.result === 1) {
          this.gotoLogin();
        } else {
          this.$toast.text(res.msg, 'top');
        }
      })
      });
    }
  },
  components: {
    uploadImg
  }
}
</script>
<style lang="scss" scoped>
@import '../login/index.scss';
</style>
