<!--
 * @Description: 
 * @Author: astar
 * @Date: 2021-05-09 20:22:07
 * @LastEditTime: 2021-06-16 19:17:41
 * @LastEditors: astar
-->
<template>
  <s-dialog
    title="用户信息"
    width="320px"
    v-model="showUserInfo"
    :confirmTxt="isMyFriend ? '发消息' : '加为好友'"
    :disabled="isMe"
    @confirm="confirm"
  >
    <user-info-pane :currentUser="info"></user-info-pane>
  </s-dialog>
</template>
<script>
import userInfoPane from './userInfoPane';
import { addFriend, checkIsMyFriend } from '@/request';
import eventBus from '@/views/chat/eventBus';
import { mapGetters } from "vuex";

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
        this.$emit('chat-with-friend');
      } else {
        this.addFriend();
      }
    }
  },
  watch: {
    value (val) {
      this.showUserInfo = val;
    },
    showUserInfo (val) {
      this.$emit('input', val);
    },
    'info._id' (val) {
      if (val) {
        this.checkIsMyFriend();
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    isMe () {
      return this.info._id === this.userInfo._id
    }
  },
  components: {
    userInfoPane
  }
}
</script>