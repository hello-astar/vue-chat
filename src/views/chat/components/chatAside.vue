<!--
 * @Author: astar
 * @Date: 2021-05-06 18:08:54
 * @LastEditors: astar
 * @LastEditTime: 2021-05-07 15:17:59
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\views\chat\components\chatAside.vue
-->
<template>
  <aside class="chat-aside">
    <div class="userinfo">
      <s-avatar shape="circle" :src="userInfo.avatar" size="large"/>
      <span class="username">{{userInfo.userName}}</span>
    </div>
    <s-search-box class="search" v-model="formData.searchPerson"></s-search-box>
    <ul class="contact-list scrollbar">
      <li class="contact-item" v-for="(item, idx) in groupList" :key="idx" @click="changeCurrentReceiver(item.receiver)">
        <s-avatar :src="item.receiver.avatar" size="large"></s-avatar>
        {{item.receiver.groupName}}
      </li>
    </ul>
    <s-button type="primary" @click="showAddGroup=true">创建群聊</s-button>
    <s-dialog title="创建群组" v-model="showAddGroup" @confirm="addGroup" @cancel="showAddGroup=false">
      <s-input-cell autocomplete="off" v-model="formData.groupName" placeholder="请输入群组名"></s-input-cell>
    </s-dialog>
  </aside>
</template>
<script>
import { mapGetters } from 'vuex';
import { getRecentConcats, addGroup } from '@/request';
import eventBus from '@/views/chat/eventBus';

export default {
  data () {
    return {
      bus: null, // 兄弟组件通信工具
      formData: {
        searchPerson: '', // 搜索最近联系人
        groupName: ''
      },
      showAddGroup: false, // 是否展示添加群组dialog
      groupList: [], // 群组列表
      currentReceiver: {} // 当前聊天人或群
    }
  },
  created () {
    this.getGroups();
    this.bus = new eventBus('chat-aside');
    this.bus.addListener(eventBus.REQUEST_GROUP_LIST, this.getGroups);
  },
  beforeDestroy () {
    this.bus.offListen();
  },
  methods: {
    /**
     * 获取群组列表
     * @author astar
     * @date 2021-05-06 18:24
     */
    getGroups () {
      getRecentConcats({ pageNo: 1, pageSize: 20 }).then(({ data = [] })=> {
        if (data.length) {
          this.groupList = data;
          this.changeCurrentReceiver(data[0].receiver);
        }
      });
    },
    /**
    * 切换当前聊天对象
    * @author astar
    * @date 2021-05-06 20:52
    */
    changeCurrentReceiver (receiver) {
      if (!receiver) return;
      this.currentReceiver = { _id: receiver._id, name: receiver.groupName || receiver.userName, isGroup: receiver.isGroup };
      this.bus.broadcast(eventBus.CHANGE_CURRENT_RECEIVER, this.currentReceiver);
    },
    /**
     * 创建群组
     * @author astar
     * @date 2021-04-19 16:50
     */
    addGroup () {
      addGroup({ groupName: this.formData.groupName.trim() }).then(res => {
        this.groupList.unshift({ receiver: res.data }); // 将新添加的群组存入最近联系人列表
        this.changeCurrentReceiver(res.data);
        this.showAddGroup = false;
      }).catch(_ => {
        console.log(_)
      })
    },
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
}
</script>
<style lang="scss" scoped>
.chat-aside {
  display: flex;
  flex-direction: column;
  .userinfo {
    margin-top: 10px;
    color: rgb(244, 244, 244);
    .username {
      margin-left: 10px;
    }
  }
  .search {
    margin: 20px 0;
    background-color: #26292e;
  }
  .contact-list {
    flex: 1;
    overflow: auto;
    margin: 0 -5px;
    .contact-item {
      // display: inline-block;
      cursor: pointer;
      padding: 12px 5px;
      color: #fff;
    }
  }
}
</style>