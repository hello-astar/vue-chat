<!--
 * @Author: astar
 * @Date: 2021-01-25 17:06:52
 * @LastEditors: astar
 * @LastEditTime: 2021-02-01 10:40:00
 * @Description: 登录注册页面
 * @FilePath: \vue-chat\src\views\sign\comps\index.vue
-->
<template>
<div class="panel-wrapper register-wrapper">
  <div class="panel-container">
    <div class="panel-container__input">
      <div class="input__cell">
        <upload-img ref="avatar" v-model="formData.avatar" v-if="formConfig.avatar.show"></upload-img>
        <i class="iconfont icon-login" v-else></i>
      </div>
      <input-cell type="text" autocomplete="off" class="input__cell" v-model="formData.name" placeholder="请输入用户名" v-if="formConfig.name.show"></input-cell>
      <input-cell type="password" autocomplete="off" class="input__cell" v-model="formData.password" placeholder="请输入密码" v-if="formConfig.password.show"></input-cell>
      <input-cell type="text" sutocomplete="off" class="input__cell" v-model="formData.captcha" placeholder="请输入验证码" v-if="formConfig.captcha.show">
        <img :src="captchaImg" alt="验证码" v-throttle="[getCaptchaImg, 'click', 1000]">
      </input-cell>
    </div>
    <button class="panel-container__btn" v-throttle="[submit, 'click', 1000]">{{ mapTypeName }}</button>
    <div class="panel-container__tip" @click="linkTo">{{ mapTip }}</div>
  </div>
</div>
</template>
<script>
import { userRegisterReq, userLoginReq, captchaGetImg } from '@/request';
import { setToken } from '@/utils/token';
import uploadImg from '@/components/uploadImg';
import PUBLIC_KEY from '@/config/rsaPublicKey';

const REGISTER = 'register'
const LOGIN = 'login'
// eslint-disable-next-line no-undef
let encrypt = new JSEncrypt();
encrypt.setPublicKey(PUBLIC_KEY);

export default {
  props: {
    type: {
      type: String,
      required: true,
      validator: value => [REGISTER, LOGIN].includes(value)
    }
  },
  computed: {
    mapTypeName () {
      return this.type === LOGIN ? '登录' : '注册'
    },
    mapTip () {
      return this.type === LOGIN ? '还没有账号？点我注册' : '有账号了？点我登录'
    }
  },
  data () {
    return {
      captchaImg: '', // 验证图片
      formData: {
        avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3155998395,3600507640&fm=26&gp=0.jpg',
        name: 'astar',
        password: '123456',
        captcha: ''
      },
      formConfig: {
        avatar: {
          show: this.type === REGISTER,
          validate: value => value,
          msg: '请选择头像'
        },
        name: {
          show: true,
          validate: value => value && value.trim(),
          msg: '请输入用户名'
        },
        password: {
          show: true,
          validate: value => value && value.trim(),
          msg: '请输入密码'
        },
        captcha: {
          show: true,
          validate: value => value && value.trim() && !isNaN(value),
          msg: '请输入验证码'
        }
      }
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
    submit () {
      // 校验数据
      let formData = {}
      for (let key in this.formData) {
        if (!this.formConfig[key].show) continue
        if (this.formConfig[key].show && !this.formConfig[key].validate(this.formData[key])) {
          return this.$toast.text(this.formConfig[key].msg, 'top')
        }
        formData[key] = this.formData[key]
      }
      this.type === LOGIN ? this.login(formData) : this.register(formData)
    },
    linkTo () {
      this.$router.push(this.type === LOGIN ? '/register' : '/login')
    },
    login (formData) {
      userLoginReq({
        captcha: formData.captcha.trim(),
        loginData: encrypt.encrypt(JSON.stringify(formData))
      }).then(res => {
        console.log(res)
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
    },
    register (formData) {
      // this.$refs.avatar.upload().then(res => {
      //   console.log(res)
        userRegisterReq({
          captcha: formData.captcha.trim(),
          registerData: encrypt.encrypt(JSON.stringify(formData))
        }).then(res => {
          if (res.result === 1) {
            this.$router.push('/login');
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
@import './index.scss';
</style>
