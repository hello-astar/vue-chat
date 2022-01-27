<!--
 * @Description: 
 * @Author: astar
 * @Date: 2021-07-04 19:47:45
 * @LastEditTime: 2022-01-27 18:09:28
 * @LastEditors: astar
-->
<template>
  <div class="me-page">
    <main class="me-page__container">
      <header class="header">个人信息</header> 
      <s-input-cell label-width="60px" no-border label="用户名" v-model="formData.userName" type="text" placeholder="请输入用户名"></s-input-cell>
      <s-input-cell label-width="60px" no-border label="头像" type="none">
        <s-upload-img ref="pickImg" size="large" v-model="formData.avatar"></s-upload-img>
      </s-input-cell>
      <s-input-cell label-width="60px" no-border label="旧密码" v-model="formData.oldPassword" placeholder="请输入旧密码" type="password"></s-input-cell>
      <s-input-cell label-width="60px" no-border label="新密码" v-model="formData.newPassword" placeholder="请输入新密码" type="password"></s-input-cell>
      <s-input-cell label-width="60px" no-border label="签名" v-model="formData.signature" placeholder="请输入个性签名" type="textarea"></s-input-cell>
      <div class="footer">
        <s-button type="danger" @click="submit">保存</s-button>
        <s-button type="danger" plain @click="$router.back()">取消</s-button>
        <s-button type="primary" @click="showLogoutDialog=true">
          <svg-icon class="icon" icon-name="logout"></svg-icon>
          退出登录
        </s-button>
      </div>
    </main>
    <s-dialog title="退出登录" v-model="showLogoutDialog" @confirm="logout" @cancel="showLogoutDialog=false">
      真的要离开吗亲？
    </s-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import PUBLIC_KEY from '@/config/rsaPublicKey';
import asyncLoadJS from '@/utils/asyncLoadJS';
import { userDetailReq, editUser } from '@/request';
import { setToken, removeToken } from '@/utils/token';

export default {
  data () {
    return {
      formData: {
        userName: '',
        avatar: '',
        oldPassword: '',
        newPassword: '',
        signature: ''
      },
      showLogoutDialog: false
    }
  },
  created () {
    userDetailReq().then(({ data }) => {
      this.formData.userName = data.userName
      this.formData.avatar = data.avatar
      this.formData.signature = data.signature
    })
  },
  methods: {
    async submit () {
      if (!this.formData.userName || !this.formData.userName.trim()) {
        return this.$toast.text('用户名不能为空')
      }
      if (!this.formData.avatar) {
        return this.$toast.text('头像不能为空')
      }
      if (this.formData.avatar !== this.userInfo.avatar) {
        let res = await this.$refs.pickImg.upload()
        this.formData.avatar = res || ''
      }
      let formData = {}
      for (let key in this.formData) {
        if (this.formData[key] && this.formData[key].trim()) {
          formData[key] = this.formData[key].trim()
        }
      }
      // 修改新密码必须输入旧密码
      if (formData.oldPassword && formData.newPassword) {
        await asyncLoadJS('jsEncrypt');
        let module = await import('jsEncrypt')
        let jsEncrypt = module.default;
        let encrypt = new jsEncrypt();
        encrypt.setPublicKey(PUBLIC_KEY);
        formData.oldPassword = encrypt.encrypt(formData.oldPassword);
        formData.newPassword = encrypt.encrypt(formData.newPassword);
      } else { // 不输入不传
        delete formData.oldPassword;
        delete formData.newPassword;
      }
      if (!Object.keys(formData).length) return;
      editUser(formData).then(({ data, msg }) => {
        this.$toast.text(msg);
        setToken(data);
        this.$store.dispatch('user/getUserInfoByToken');
      })
    },
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
.me-page {
  position: relative;
  height: 100%;
  overflow: auto;
  background: #fff;
  &__container {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    width: 500px;
    max-width: 100%;
    padding: 0 4%;
    .header {
      font-size: 18px;
      padding: 30px 0;
      font-weight: 800;
      text-align: center;
    }
    .input-cell {
      margin-bottom: 30px;
    }
    .footer {
      margin: 50px 0;
      text-align: center;
      .s-button {
        margin: 0 10px 20px;
      }
      .icon {
        width: 20px;
      }
    }
  }
}
</style>