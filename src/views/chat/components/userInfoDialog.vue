<!--
 * @Description: 
 * @Author: astar
 * @Date: 2021-05-09 20:22:07
 * @LastEditTime: 2021-05-09 20:36:44
 * @LastEditors: astar
-->
<template>
  <s-dialog
    title="用户信息"
    width="320px"
    v-model="showUserInfo"
    confirmTxt="加为好友"
    @confirm="addFriend(info)"
  >
    <user-info :currentUser="info"></user-info>
  </s-dialog>
</template>
<script>
import userInfo from './userInfo';
import { addFriend } from '@/request';
export default {
  data () {
    return {
      showUserInfo: false
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    /**
    * 判断是否为我的好友
    * @author astar
    * @date 2021-05-09 20:36
    */
    checkIsMyFriend () {

    },
    /**
    * 添加好友
    * @author astar
    * @date 2021-05-09 10:57
    */
    addFriend (item) {
      addFriend({ friendId: item._id }).then(() => {
        this.showUserInfo = false;
        this.$toast.text('添加好友成功')
      })
    }
  },
  watch: {
    value (val) {
      this.showUserInfo = val
    },
    showUserInfo (val) {
      this.$emit('input', val)
    },
    'info._id' (val) {
      if (val) {
        this.checkIsMyFriend()
      }
    }
  },
  components: {
    userInfo
  }
}
</script>