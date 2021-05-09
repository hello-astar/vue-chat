<!--
 * @Description: 
 * @Author: astar
 * @Date: 2021-05-09 20:22:07
 * @LastEditTime: 2021-05-10 00:20:03
 * @LastEditors: astar
-->
<template>
  <s-dialog
    title="用户信息"
    width="320px"
    v-model="showUserInfo"
    :confirmTxt="isMyFriend ? '发消息' : '加为好友'"
    @confirm="confirm"
  >
    <user-info :currentUser="info"></user-info>
  </s-dialog>
</template>
<script>
import userInfo from './userInfo';
import { addFriend, checkIsMyFriend } from '@/request';
import eventBus from '@/views/chat/eventBus';

export default {
  data () {
    return {
      $bus: null,
      showUserInfo: false,
      isMyFriend: false
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
  created () {
    this.$bus = new eventBus('user-info-dialog');
  },
  methods: {
    /**
    * 判断是否为我的好友
    * @author astar
    * @date 2021-05-09 20:36
    */
    checkIsMyFriend () {
      checkIsMyFriend({ userId: this.info._id }).then(({ data }) => {
        this.isMyFriend = data;
      })
    },
    /**
    * 添加好友
    * @author astar
    * @date 2021-05-09 10:57
    */
    addFriend () {
      addFriend({ friendId: this.info._id }).then(() => {
        this.showUserInfo = false;
        this.$toast.text('添加好友成功');
        this.isMyFriend = true;
      })
    },
    confirm () {
      if (this.isMyFriend) {
        this.showUserInfo = false;
        this.$bus.broadcast(
          eventBus.REQUEST_CONTACT_LIST,
          {
            name: this.info.userName,
            _id: this.info._id,
            avatar: this.info.avatar,
            isGroup: false
          }
        );
      } else {
        this.addFriend()
      }
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