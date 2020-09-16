<!--
 * @author: cmx
 * @Date: 2020-09-15 18:10:44
 * @LastEditors: cmx
 * @LastEditTime: 2020-09-16 10:36:35
 * @Description: 输入名字登录
 * @FilePath: \vue-chat\src\views\login.vue
-->
<template>
<div class="login">
  <input type="text" v-model="name" @keyup.enter="login">
</div>
</template>
<script>
import { userLoginReq } from '@/request';
import { setUUID } from '@/utils/uuid';

export default {
  name: 'login',
  data () {
    return {
      name: ''
    }
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