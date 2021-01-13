<!--
 * @author: cmx
 * @Date: 2020-09-15 18:10:44
 * @LastEditors: cmx
 * @LastEditTime: 2021-01-13 18:02:51
 * @Description: 输入名字登录
 * @FilePath: \vue-chat\src\views\register\index.vue
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
      <input-cell type="text" sutocomplete="off" class="input__cell" v-model="captcha" placeholder="请输入验证码">
        <img :src="captchaImg" alt="" @click="getCaptchaImg">
      </input-cell>
    </div>
    <button class="panel-container__btn" @click="register">注册</button>
    <div class="panel-container__tip" @click="gotoLogin">有账号了？点我登录</div>
  </div>
</div>
</template>
<script>
import { userRegisterReq, captchaGetImg } from '@/request';
import uploadImg from '@/components/uploadImg';
import PUBLIC_KEY from '@/config/rsaPublicKey';

export default {
  name: 'register',
  data () {
    return {
      captchaImg: '', // 验证图片
      file: '',
      name: '',
      password: '',
      captcha: ''
    }
  },
  created () {
    this.getCaptchaImg()
  },
  methods: {
    // 刷新验证码
    getCaptchaImg () {
      this.captchaImg = `${captchaGetImg}?timer=${new Date().getTime()}`
    },
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
      if (!this.captcha.trim()) {
        return this.$toast.text('请输入验证码', 'top');
      }
      // this.$refs.avatar.upload().then(res => {
      // eslint-disable-next-line no-undef
      let encrypt = new JSEncrypt();
      encrypt.setPublicKey(PUBLIC_KEY);
      userRegisterReq({
        captcha: this.captcha.trim(),
        name: this.name.trim(),
        password: encrypt.encrypt(JSON.stringify({ password: this.password.trim()})),
        avatar: 'https://w.wallhaven.cc/full/ox/wallhaven-oxkjgm.jpg' // `http://qgyfalxn6.hn-bkt.clouddn.com/${res.key}`
      }).then(res => {
        if (res.result === 1) {
          this.gotoLogin();
        } else {
          this.$toast.text(res.msg, 'top');
        }
      })
      // });
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
