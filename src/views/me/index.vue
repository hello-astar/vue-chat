<!--
 * @Description: 
 * @Author: astar
 * @Date: 2021-07-04 19:47:45
 * @LastEditTime: 2021-07-05 00:29:25
 * @LastEditors: astar
-->
<template>
  <div class="me-page">
    <main class="me-page__container">
      <header class="header">修改个人信息</header> 
      <s-input-cell label-width="60px" no-border label="用户名" v-model="formData.userName" type="text" placeholder="请输入用户名"></s-input-cell>
      <s-input-cell label-width="60px" no-border label="头像" type="none">
        <s-upload-img ref="pickImg" v-model="formData.avatar" shape="square"></s-upload-img>
      </s-input-cell>
      <s-input-cell label-width="60px" no-border label="旧密码" v-model="formData.oldPassword" placeholder="请输入旧密码" type="password"></s-input-cell>
      <s-input-cell label-width="60px" no-border label="新密码" v-model="formData.newPassword" placeholder="请输入新密码" type="password"></s-input-cell>
      <s-input-cell label-width="60px" no-border label="签名" v-model="formData.signature" placeholder="请输入个性签名" type="textarea"></s-input-cell>
      <div class="footer">
        <s-button class="footer" type="danger" @click="submit">保存</s-button>
      </div>
    </main>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      formData: {
        userName: '',
        avatar: '',
        oldPassword: '',
        newPassword: '',
        signature: ''
      }
    }
  },
  created () {
    this.formData.userName = this.userInfo.userName
    this.formData.avatar = this.userInfo.avatar
  },
  methods: {
    submit () {
      this.$refs.pickImg.upload().then(res => {
        console.log(res.data)
      })
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
    }
  }
}
</style>