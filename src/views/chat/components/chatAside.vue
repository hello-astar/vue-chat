<!--
 * @Author: astar
 * @Date: 2021-05-06 18:08:54
 * @LastEditors: astar
 * @LastEditTime: 2021-05-09 23:33:40
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\views\chat\components\chatAside.vue
-->
<template>
  <aside class="chat-aside">
    <div class="userinfo" @click="$router.push('/chat/detail')">
      <s-avatar shape="circle" :src="userInfo.avatar" size="large"/>
      <span class="username">{{userInfo.userName}}</span>
    </div>
    <div class="search">
      <s-search-box v-model="formData.searchPerson"></s-search-box>
    </div>
    <ul class="contact-list scrollbar">
      <li class="contact-item" :class="{ 'active': item._id === currentReceiver._id }" v-for="(item, idx) in groupList" :key="idx" @click="changeCurrentReceiver(item)">
        <s-avatar class="contact-item__avatar" :src="item.avatar" size="large"></s-avatar>
        <div class="contact-item__content">
          <p class="header">{{item.name}}</p>
          <p class="message">{{(item.content || []).reduce((str, item) => str + getSimpleMessageFromJSON(item), '')}}</p>
        </div>
      </li>
    </ul>
    <div class="footer">
      <s-button type="primary" @click="showAddGroup=true">创建群聊</s-button>
    </div>
    <s-dialog title="创建群组" v-model="showAddGroup" @confirm="addGroup" @cancel="showAddGroup=false">
      <s-input-cell no-border autocomplete="off" v-model="formData.groupName" placeholder="请输入群组名"></s-input-cell>
    </s-dialog>
  </aside>
</template>
<script>
import { mapGetters } from 'vuex';
import { getRecentContacts, addGroup } from '@/request';
import eventBus from '@/views/chat/eventBus';
import { getSimpleMessageFromJSON } from '@/utils/editor.js';
import { debounce } from '@/utils'

export default {
  data () {
    return {
      getSimpleMessageFromJSON,
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
    this.getRecentContacts(this.$route.params.receiver);
    this.bus = new eventBus('chat-aside');
    this.bus.addListener(eventBus.REQUEST_CONTACT_LIST, this.getRecentContacts);
  },
  beforeDestroy () {
    this.bus.offListen();
  },
  watch: {
    'formData.searchPerson': debounce(function () {
      // this.getRecentContacts();
    }, 500)
  },
  methods: {
    /**
     * 获取群组列表
     * @author astar
     * @date 2021-05-06 18:24
     */
    getRecentContacts (initData) {
      getRecentContacts({ pageNo: 1, pageSize: 20, keyword: this.formData.searchPerson }).then(({ data = [] })=> {
        if (data.length) {
          if (initData) {
            let item = data.find(item => item._id === initData._id);
            !item && data.unshift(initData);
            this.changeCurrentReceiver(item || data[0]);
          } else {
            this.changeCurrentReceiver(data[0]);
          }
          this.groupList = data;
        }
      });
    },
    /**
    * 切换当前聊天对象
    * @author astar
    * @date 2021-05-06 20:52
    */
    changeCurrentReceiver ({ _id, name, isGroup }) {
      if (this.currentReceiver._id === _id) return;
      this.currentReceiver = { _id, name, isGroup };
      this.bus.broadcast(eventBus.CHANGE_CURRENT_RECEIVER, this.currentReceiver);
    },
    /**
     * 创建群组
     * @author astar
     * @date 2021-04-19 16:50
     */
    addGroup () {
      addGroup({ groupName: this.formData.groupName.trim() }).then(() => {
        this.getRecentContacts();
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
    color: rgb(244, 244, 244);
    padding: 10px;
    .username {
      margin-left: 10px;
    }
  }
  .search {
    padding: 10px;
  }
  .contact-list {
    flex: 1;
    overflow: auto;
    .contact-item {
      display: flex;
      cursor: pointer;
      padding: 12px 8px;
      color: #fff;
      &__avatar {
        margin-right: 10px;
      }
      &__content {
        .message {
          color: rgb(216, 215, 215);
          font-size: 12px;
        }
      }
      &.active {
        background: #626f7c;
      }
    }
  }
  .footer {
    padding: 10px;
    text-align: center;
  }
}
</style>