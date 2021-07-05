<!--
 * @Author: astar
 * @Date: 2021-05-08 10:38:53
 * @LastEditors: astar
 * @LastEditTime: 2021-07-05 18:23:38
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\views\chat\userDetail.vue
-->
<template>
  <div class="my-detail">
    <div class="my-detail__info">
      <user-info-pane :currentUser="userInfo"></user-info-pane>
    </div>
    <div class="tab">
      <s-button class="tab-button" :class="{ active: type === value }" @click="type = value" v-for="value in TYPE_LIST" :key="value">{{TYPE_LIST.getLabelByValue(value)}}</s-button>
    </div>
    <ul class="list">
      <li class="list-item" v-for="item in list" :key="item._id" @click="chatWidth(item)">
        <s-avatar class="list-item__avatar" :src="item.avatar" size="large"></s-avatar>
        <div class="list-item__info">
          <p>{{item.groupName || item.userName}}</p>
          <p class="signature" v-if="item.signature">个性签名：{{item.signature}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { getMyFriends, getMyGroups } from '@/request';
import { mapGetters } from 'vuex';
import userInfoPane from './components/userInfoPane';
import { Enum } from '@/utils'

const TYPE_LIST = new Enum({
  FRIEND: [1, '我的好友'],
  GROUP: [2, '我的群组']
})

export default {
  data () {
    return {
      TYPE_LIST,
      type: TYPE_LIST.FRIEND, // 1好友 2群组
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
      let func = this.type === TYPE_LIST.FRIEND ? getMyFriends : getMyGroups;
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
      this.$router.replace({
        name: 'chat-index',
        params: {
          receiver: {
            name: item.groupName || item.userName,
            _id: item._id,
            avatar: item.avatar,
            isGroup: this.type === TYPE_LIST.GROUP
          }
        }
      });
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  components: {
    userInfoPane
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
    padding: 5px;
    background: #fff;
    &-button {
      &.active {
        // position: relative;
        // &:after {
        //   position: absolute;
        //   bottom: 0;
        //   left: 10%;
        //   content: '\20';
        //   height: 2px;
        //   width: 80%;
        //   background: #110d3d;
        // }
      }
    }
  }
  .list {
    flex: 1;
    overflow-y: auto;
    background: #fff;
    padding: 0 20px;
    .list-item {
      margin: 10px 0;
      cursor: pointer;
      &__avatar {
        margin-right: 15px;
      }
      &__info {
        display: inline-block;
        vertical-align: middle;
        .signature {
          color: #999;
          font-size: 12px;
        }
      }
    }
  }
}
</style>