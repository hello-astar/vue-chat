<!--
 * @Author: astar
 * @Date: 2021-01-25 17:06:52
 * @LastEditors: astar
 * @LastEditTime: 2022-01-27 18:08:21
 * @Description: 登录注册页面
 * @FilePath: \vue-chat\src\views\sign\comps\index.vue
-->
<template>
<div class="sign-page">
  <div class="panel-wrapper register-wrapper">
    <div class="panel-container">
      <i class="panel-container__header iconfont icon-Welcome"></i>
      <div class="panel-container__input">
        <s-upload-img ref="pickImg" size="large" class="input__cell" v-model="formData.avatar" v-if="formConfig.avatar.show"></s-upload-img>
        <s-input-cell type="text" autocomplete="off" class="input__cell" v-model="formData.userName" placeholder="请输入用户名" v-if="formConfig.userName.show"></s-input-cell>
        <s-input-cell type="password" autocomplete="off" class="input__cell" v-model="formData.password" placeholder="请输入密码" v-if="formConfig.password.show"></s-input-cell>
        <s-input-cell type="text" autocomplete="off" class="input__cell" v-model="formData.captcha" placeholder="请输入验证码" v-if="formConfig.captcha.show">
          <img :src="captchaImg" alt="验证码" v-throttle:click="[getCaptchaImg, 1000]">
        </s-input-cell>
      </div>
      <s-button type="primary" class="panel-container__btn" v-throttle:click="[submit, 1000]">{{ mapTypeName }}</s-button>
      <div class="panel-container__tip" @click="linkTo">{{ mapTip }}</div>
    </div>
  </div>
  <footer class="sign-page__footer">
    备案号：<a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2021088341号</a>
  </footer>
</div>
</template>
<script>
import { userRegisterReq, userLoginReq, captchaGetImg } from '@/request';
import { setToken } from '@/utils/token';
import PUBLIC_KEY from '@/config/rsaPublicKey';
import asyncLoadJS from '@/utils/asyncLoadJS';
const REGISTER = 'register'
const LOGIN = 'login'

export default {
  props: {
    type: {
      type: String,
      required: true,
      validator: value => [REGISTER, LOGIN].includes(value)
    }
  },
  computed: {
    isLogin () {
      return this.type === LOGIN
    },
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
        avatar: '',
        userName: '',
        password: '',
        captcha: ''
      },
      formConfig: {
        avatar: {
          show: this.type === REGISTER,
          validate: value => value,
          getValue: async () => {
            let res = await this.$refs.pickImg.upload()
            return res
          },
          msg: '请选择头像',
        },
        userName: {
          show: true,
          validate: value => value && value.trim(),
          getValue: value => value.trim(),
          msg: '请输入用户名'
        },
        password: {
          show: true,
          validate: value => value && value.trim(),
          getValue: value => value.trim(),
          msg: '请输入密码'
        },
        captcha: {
          show: true,
          validate: value => value && value.trim(),
          getValue: value => value.trim(),
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
    async submit () {
      // 校验数据
      let formData = {}
      for (let key in this.formData) {
        if (!this.formConfig[key].show) continue
        if (this.formConfig[key].show && !this.formConfig[key].validate(this.formData[key])) {
          return this.$toast.text(this.formConfig[key].msg, 'top')
        }
        formData[key] = await this.formConfig[key].getValue(this.formData[key])
      }
      asyncLoadJS('jsEncrypt').then(() => {
        import('jsEncrypt').then(module => {
          let jsEncrypt = module.default;
          let encrypt = new jsEncrypt();
          encrypt.setPublicKey(PUBLIC_KEY);
          formData.password = encrypt.encrypt(formData.password);
          this.type === LOGIN ? this.login(formData) : this.register(formData);
        })
      }).catch(e => {
        console.log('js加载失败', e);
      })
    },
    linkTo () {
      this.$router.push(this.type === LOGIN ? '/register' : '/login')
    },
    login (formData) {
      userLoginReq(formData).then(res => {
        setToken(res.data.token);
        this.$store.commit('user/SET_USER_INFO', res.data);
        this.$router.push('/');
      }).catch(() => {
        this.getCaptchaImg();
      })
    },
    register (formData) {
      userRegisterReq(formData).then(() => {
        this.$toast.text('注册成功');
        this.$router.push('/login');
      }).catch(() => {
        this.getCaptchaImg();
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
