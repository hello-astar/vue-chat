<!--
 * @Description: 
 * @Author: astar
 * @Date: 2021-04-22 22:08:36
 * @LastEditTime: 2022-01-30 19:10:01
 * @LastEditors: astar
-->
<template>
  <div class="chat-info">
    <i class="iconfont icon-shouqi" style="float: right" @click="$emit('close')"></i>
    <section class="chat-info-section">
      <div class="chat-info-section_header">
        基本信息
      </div>
      <p>
        <span>群名称：{{info.groupName}}</span>
        <i class="iconfont icon-bianji icon" @click="showChangeGroupName=true"></i>
      </p>
      <p>群创始人：{{info.groupOwner && info.groupOwner.userName}}</p>
      <!-- <p>公告：明天不能迟到</p> -->
    </section>
    <section class="chat-info-section">
      <div class="chat-info-section_header">群成员({{info.members && info.members.length}})</div>
      <ul class="flex user-list">
        <li v-for="item in info.members" :key="item._id" @click="showUserInfo=true;currentUser=item">
          <s-avatar :src="item.avatar" shape="circle"></s-avatar>
          <p>{{item.userName}}</p>
        </li>
        <li>
          <i class="iconfont icon-tianjia add-icon" @click="showJoinMember=true"></i>
        </li>
      </ul>
    </section>
    <footer class="chat-info-footer">
      <s-button type="danger" @click="showExitGroup=true">退出该群</s-button>
    </footer>
    <s-dialog title="拉人进群" v-model="showJoinMember" @cancel="showJoinMember=false" @confirm="joinMembertoGroup">
      <s-input-cell no-border v-model="formData.userId" type="text" placeholder="请输入用户ID"></s-input-cell>
    </s-dialog>
    <s-dialog title="修改群名称" v-model="showChangeGroupName" @cancel="showChangeGroupName=false" @confirm="changeGroupName">
      <s-input-cell no-border v-model="formData.groupName"></s-input-cell>
    </s-dialog>
    <s-dialog title="退出群组" v-model="showExitGroup" @confirm="exitGroup">
      确定退出吗？退出后再也收不到群组消息。
    </s-dialog>
    <user-info-dialog :info="currentUser" v-model="showUserInfo" @chat-with-friend="$emit('close')"></user-info-dialog>
  </div>
</template>
<script>
import { getGroupInfoByGroupId, updateGroupNameByGroupId, joinMembertoGroup, exitGroup } from '@/request';
import userInfoDialog from './userInfoDialog';
import eventBus from '@/views/chat/eventBus';

export default {
  data () {
    return {
      info: {},
      $bus: null,
      formData: {
        groupName: '',
        userId: ''
      },
      currentUser: {},
      showJoinMember: false,
      showChangeGroupName: false,
      showExitGroup: false,
      showUserInfo: false
    }
  },
  props: {
    // isGroup: Boolean,
    id: String
  },
  created () {
    this.$bus = new eventBus('chat-info');
  },
  methods: {
    /**
    * 获取群信息
    * @author astar
    * @date 2021-05-04 20:02
    */
    getInfo () {
      return getGroupInfoByGroupId({
        groupId: this.id
      }).then(({ data }) => {
        this.info = data
        this.formData = {
          groupName: data.groupName,
          userId: ''
        }
      })
    },
    /**
    * 修改群名称
    * @author astar
    * @date 2021-05-04 20:02
    */
    changeGroupName () {
      updateGroupNameByGroupId({
        groupId: this.id,
        groupName: this.formData.groupName.trim()
      }).then(async () => {
        await this.getInfo()
        this.showChangeGroupName = false
        this.$bus.broadcast(eventBus.CHANGE_CURRENT_RECEIVER, { _id: this.id, name: this.info.groupName })
      })
    },
    /**
    * 拉人进群
    * @author astar
    * @date 2021-05-04 20:02
    */
    joinMembertoGroup () {
      joinMembertoGroup({ userId: this.formData.userId, groupId: this.id }).then(() => {
        this.getInfo()
        this.showJoinMember = false
      })
    },
    /**
    * 退出群组
    * @author astar
    * @date 2021-05-04 18:29
    */
    exitGroup () {
      exitGroup({ groupId: this.id }).then(() => {
        this.$router.back()
      })
    }
  },
  watch: {
    id (val) {
      if (!val) return
      this.getInfo()
    }
  },
  components: {
    userInfoDialog
  }
}
</script>
<style lang="scss" scoped>
.chat-info {
  background: #fff;
  color: #666;
  padding: 20px;
  padding-bottom: 80px;
  line-height: 25px;
  height: 100%;
  overflow-y: auto;
  .chat-info-section {
    &_header {
      font-weight: 800;
      font-size: 18px;
      line-height: 40px;
      margin: 10px 0;
    }
    .icon {
      margin-left: 8px;
      vertical-align: middle;
      font-size: 18px;
    }
    .flex {
      display: flex;
      flex-wrap: wrap;
      .input-cell {
        width: 250px;
      }
      &.user-list {
        margin: 0 -5px;
        li {
          margin: 0 5px 10px;
          width: 45px;
          min-height: 45px;
          text-align: center;
          p {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .add-icon {
            float: left;
            font-size: 20px;
            padding: 8px;
          }
        }
      }
    }
  }
  .chat-info-footer {
    text-align: center;
  }
}
</style>