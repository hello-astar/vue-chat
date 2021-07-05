<!--
 * @Author: astar
 * @Date: 2021-05-06 18:08:54
 * @LastEditors: astar
 * @LastEditTime: 2021-07-05 18:19:26
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\views\chat\components\chatAside.vue
-->
<template>
  <aside class="chat-aside">
    <div class="userinfo">
      <s-avatar shape="circle" :src="userInfo.avatar" size="large" @click="$router.push('/home')"/>
      <div class="username">
        <span>{{userInfo.userName}}</span><br>
        <span class="signature">{{userInfo.signature}}</span>
      </div>
      <i class="iconfont icon-zhifeiji" style="float: right" @click="$router.push('/chat/detail')"></i>
    </div>
    <div class="search">
      <s-search-box v-model="formData.searchPerson"></s-search-box>
    </div>
    <p class="contact-header"><i class="iconfont icon-zhifeiji"></i>最近联系人/群</p>
    <ul class="contact-list scrollbar">
      <li class="contact-item" :class="{ 'active': item._id === currentReceiver._id }" v-for="(item, idx) in groupList" :key="idx" @click="changeCurrentReceiver(item, true)">
        <s-avatar class="contact-item__avatar" :src="item.avatar" size="large"></s-avatar>
        <div class="contact-item__content">
          <p class="header">{{item.name}}</p>
          <p class="message" v-if="item.sender">{{item.sender.userName}}: {{(item.content || []).reduce((str, item) => str + getSimpleMessageFromJSON(item), '')}}</p>
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
import { getRecentContacts, addGroup, userDetailReq } from '@/request';
import eventBus from '@/views/chat/eventBus';
import { getSimpleMessageFromJSON } from '@/utils/editor.js';
import { debounce } from '@/utils'

export default {
  data () {
    return {
      getSimpleMessageFromJSON,
      userInfo: {},
      $bus: null, // 兄弟组件通信工具
      formData: {
        searchPerson: '', // 搜索最近联系人
        groupName: ''
      },
      showAddGroup: false, // 是否展示添加群组dialog
      groupList: [], // 群组列表
      currentReceiver: {} // 当前聊天人或群
    }
  },
  async created () {
    this.$bus = new eventBus('chat-aside');
    this.$bus.addListener(eventBus.CHANGE_CURRENT_RECEIVER, this.changeCurrentReceiver);
    this.$bus.addListener(eventBus.REQUEST_CONTACT_LIST, this.getRecentContacts);
    await this.getRecentContacts();
    if (this.$route.params.receiver) {
      this.changeCurrentReceiver(this.$route.params.receiver, true);
    } else {
      this.changeCurrentReceiver(this.groupList[0], true);
    }
    userDetailReq().then(({ data }) => {
      this.userInfo = data
    })
  },
  beforeDestroy () {
    this.$bus.offListen();
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
    getRecentContacts () {
      return getRecentContacts({ pageNo: 1, pageSize: 20, keyword: this.formData.searchPerson }).then(({ data = [] })=> {
        if (data.length) {
          this.groupList = data;
        }
      });
    },
    /**
    * 切换当前聊天对象
    * @author astar
    * @date 2021-05-06 20:52
    */
    changeCurrentReceiver (receiver, broadcast = false) {
      // 判断当前receiver是否在groupList中
      let item = this.groupList.find(item => item._id === receiver._id);
      !item && this.groupList.unshift(receiver);
      this.currentReceiver = { ...item, ...receiver };
      this.groupList = this.groupList.map(item => item._id === this.currentReceiver._id ? this.currentReceiver : item);
      broadcast && this.$bus.broadcast(eventBus.CHANGE_CURRENT_RECEIVER, this.currentReceiver);
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
  }
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
      display: inline-block;
      margin-left: 10px;
      vertical-align: middle;
      .signature {
        font-size: 12px;
        color: rgb(201, 197, 197);
      }
    }
  }
  .search {
    padding: 10px;
  }
  .contact-header {
    color: #fff;
    padding: 10px;
  }
  .contact-list {
    flex: 1;
    overflow: auto;
    .contact-item {
      display: flex;
      flex-direction: row;
      cursor: pointer;
      padding: 12px 8px;
      color: #fff;
      &__avatar {
        flex-shrink: 0;
        margin-right: 10px;
      }
      &__content {
        flex: 1;
        overflow-x: auto;
        .header {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .message {
          color: rgb(216, 215, 215);
          font-size: 12px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
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