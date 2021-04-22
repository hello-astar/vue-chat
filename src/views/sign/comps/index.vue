<!--
 * @Author: astar
 * @Date: 2021-01-25 17:06:52
 * @LastEditors: astar
 * @LastEditTime: 2021-04-23 00:55:08
 * @Description: 登录注册页面
 * @FilePath: \vue-chat\src\views\sign\comps\index.vue
-->
<template>
<div class="sign-page">
  <div class="panel-wrapper register-wrapper">
    <div class="panel-container">
      <div class="panel-container__input">
        <div class="input__cell">
          <s-upload-img ref="avatar" v-model="formData.avatar" v-if="formConfig.avatar.show"></s-upload-img>
          <i class="iconfont icon-login" v-else></i>
        </div>
        <s-input-cell type="text" autocomplete="off" class="input__cell" v-model="formData.userName" placeholder="请输入用户名" v-if="formConfig.userName.show"></s-input-cell>
        <s-input-cell type="password" autocomplete="off" class="input__cell" v-model="formData.password" placeholder="请输入密码" v-if="formConfig.password.show"></s-input-cell>
        <s-input-cell type="text" autocomplete="off" class="input__cell" v-model="formData.captcha" placeholder="请输入验证码" v-if="formConfig.captcha.show">
          <img :src="captchaImg" alt="验证码" v-throttle:click="[getCaptchaImg, 1000]">
        </s-input-cell>
      </div>
      <button class="panel-container__btn" v-throttle:click="[submit, 1000]">{{ mapTypeName }}</button>
      <div class="panel-container__tip" @click="linkTo">{{ mapTip }}</div>
    </div>
  </div>
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
        avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg-bbs.csdn.net%2Fupload%2F201307%2F23%2F1374569161_463818.png&refer=http%3A%2F%2Fimg-bbs.csdn.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621696556&t=0e119bf9a7011da57ff03e4abb5b6677',
        userName: 'ad',
        password: '123456',
        captcha: 'ssss'
      },
      formConfig: {
        avatar: {
          show: this.type === REGISTER,
          validate: value => value,
          msg: '请选择头像'
        },
        userName: {
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
          validate: value => value && value.trim(),
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
        formData[key] = this.formData[key].trim()
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
        this.$router.push('/home');
      }).catch(() => {
        this.getCaptchaImg();
      })
    },
    register (formData) {
      // this.$refs.avatar.upload().then(res => {
      //   console.log(res)
        userRegisterReq(formData).then(() => {
          this.$toast.text('注册成功');
          this.$router.push('/login');
        }).catch(() => {
          this.getCaptchaImg();
        })
      // });
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
