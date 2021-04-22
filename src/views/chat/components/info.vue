<!--
 * @Description: 
 * @Author: astar
 * @Date: 2021-04-22 22:08:36
 * @LastEditTime: 2021-04-23 00:20:16
 * @LastEditors: astar
-->
<template>
  <div class="chat-info">
    <span v-if="!editing">{{info.groupName}}</span>
    <s-input-cell type="text" v-else v-model="groupName"></s-input-cell>
    <s-button @click="changeGroupName">{{editing ? '确定' : '修改'}}</s-button>
    <div>
      <s-input-cell type="text" v-model="userId"></s-input-cell>
      <s-button @click="joinMembertoGroup">
        <i class="iconfont icon-icon_tianjiahaoyou"></i>拉人进群
      </s-button>
    </div>
    <div>群公告</div>
    <div>群成员</div>
    <ul>
      <li v-for="item in info.members" :key="item._id">
        <img :src="item.avatar" alt="" width="50" height="50">
        {{item.userName}}
      </li>
    </ul>
    <s-button>删除并退出</s-button>
  </div>
</template>
<script>
import { getGroupInfoByGroupId, updateGroupNameByGroupId, joinMembertoGroup } from '@/request'
export default {
  data () {
    return {
      id: this.$route.query.id,
      isGroup: this.$route.query.isGroup,
      editing: false,
      groupName: '',
      userId: '',
      info: {}
    }
  },
  methods: {
    getInfo () {
      getGroupInfoByGroupId({
        groupId: this.id
      }).then(({ data }) => {
        this.info = data
      })
    },
    changeGroupName () {
      if (this.editing) {
        updateGroupNameByGroupId({
          groupId: this.id,
          groupName: this.groupName.trim()
        }).then(() => {
          this.editing = false
          this.getInfo()
        })
      } else {
        this.editing = true
      }
    },
    joinMembertoGroup () {
      joinMembertoGroup({ userId: this.userId, groupId: this.id }).then(res => {
        console.log(res)
        this.getInfo()
      })
    }
  },
  created () {
    this.getInfo()
  }
}
</script>
<style scoped>
.chat-info {
  width: 500px;
  height: 600px;
  background: #fff;
  color: #666;
}
</style>