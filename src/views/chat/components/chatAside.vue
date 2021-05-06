<!--
 * @Author: astar
 * @Date: 2021-05-06 18:08:54
 * @LastEditors: astar
 * @LastEditTime: 2021-05-06 18:31:55
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\views\chat\components\chatAside.vue
-->
<template>
  <aside class="sidebar">
    <div class="userinfo">
      <s-avatar shape="circle" :src="userInfo.avatar" size="large"/>
      <span class="username">{{userInfo.userName}}</span>
    </div>
    <s-search-box class="search" v-model="searchPerson"></s-search-box>
    <ul class="contact-list scrollbar">
      <li class="contact-item" v-for="item in groupList" :key="item._id" @click="current = { receiverId: item._id, name: item.groupName }">
        <s-avatar :src="item.avatar" size="large"></s-avatar>
        {{item.groupName}}
      </li>
    </ul>
    <s-button type="primary" @click="showAddGroup=true">创建群聊</s-button>
  </aside>
</template>
<script>
import { mapGetters } from 'vuex';
import { getGroups, addGroup } from '@/request';

export default {
  data () {
    return {
      searchPerson: '', // 搜索最近联系人
      addGropForm: {
        groupName: ''
      },
      showAddGroup: false, // 是否展示添加群组dialog
      groupList: [] // 群组列表
    }
  },
  created () {
    this.getGroups()
  },
  methods: {
    /**
     * 获取群组列表
     * @author astar
     * @date 2021-05-06 18:24
     */
    getGroups () {
      getGroups().then(({ data = [] })=> {
        if (data.length) {
          this.groupList = data
          this.current = { receiverId: data[0]._id, name: data[0].groupName }
        }
      })
    },
    /**
     * 创建群组
     * @author astar
     * @date 2021-04-19 16:50
     */
    addGroup () {
      addGroup({ groupName: this.addGropForm.groupName.trim() }).then(res => {
        this.getGroups();
        this.showAddGroup = false;
        this.$toast.text(res.msg);
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