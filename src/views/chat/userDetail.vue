<!--
 * @Author: astar
 * @Date: 2021-05-08 10:38:53
 * @LastEditors: astar
 * @LastEditTime: 2021-05-10 00:20:36
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\views\chat\userDetail.vue
-->
<template>
  <div class="my-detail">
    <div class="my-detail__info">
      <user-info :currentUser="userInfo"></user-info>
    </div>
    <div class="tab">
      <s-button @click="type = 1">好朋友</s-button>
      <s-button @click="type = 2">群组</s-button>
    </div>
    <ul class="list">
      <li v-for="item in list" :key="item._id" @click="chatWidth(item)">
        <s-avatar :src="item.avatar" size="large"></s-avatar>
        {{item.groupName || item.userName}}
      </li>
    </ul>
  </div>
</template>
<script>
import { getMyFriends, getMyGroups } from '@/request';
import { mapGetters } from 'vuex';
import userInfo from './components/userInfo';

export default {
  data () {
    return {
      type: 1, // 1好友 2群组
      list: []
    }
  },
  watch: {
    type: {
      immediate: true,
      handler: function () {
        this.getList()
      }
    }
  },
  methods: {
    /**
    * 获取我的好友和群
    * @author astar
    * @date 2021-05-10 00:18
    */
    getList () {
      let func = this.type === 1 ? getMyFriends : getMyGroups;
      func().then(({ data }) => {
        this.list = data
      })
    },
    /**
    * 给好友或群发消息
    * @author astar
    * @date 2021-05-10 00:18
    */
    chatWidth (item) {
      this.$router.push({
        name: 'chat-index',
        params: {
          receiver: {
            name: item.groupName || item.userName,
            _id: item._id,
            avatar: item.avatar,
            isGroup: this.type === 2
          }
        }
      });
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  components: {
    userInfo
  }
}
</script>
<style lang="scss" scoped>
.my-detail {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #f6f6f6;
  &__info {
    padding: 20px;
    margin-bottom: 10px;
    background: #fff;
  }
  .tab {
    background: #fff;
  }
  .list {
    flex: 1;
    overflow-y: auto;
    background: #fff;
    padding: 0 20px;
    li {
      margin: 10px 0;
    }
  }
}
</style>