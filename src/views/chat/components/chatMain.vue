<!--
 * @Author: astar
 * @Date: 2021-05-06 18:09:05
 * @LastEditors: astar
 * @LastEditTime: 2021-05-06 18:10:05
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\views\chat\components\chatMain.vue
-->
<template>
  <main class="main-content" ref="chat">
    <header class="contact-name">
      {{current.name}}
      <i style="float: right" v-if="current.receiverId" class="iconfont icon-zhankai" @click="showGroupInfo=true"></i>
    </header>
    <div class="chat-box" ref="box">
      <div class="no-data" v-show="!chatRecord.length">
        暂时没有新消息
      </div>
      <pull-refresh :refreshNext="refreshNext">
        <div slot="main" class="chat-box__item" :class="[item.sender._id === userInfo._id ? 'reverse' : 'normal']" v-for="item in chatRecord" :key="item._id">
          <s-avatar class="chat-box__item_avatar" :src="item.sender.avatar" size="medium" v-press="atSomeone(item)" @click="showUserInfo=true;currentUser=item.sender"/>
          <div class="chat-box__item_content" :class="{'img': KINDS.IMG === item.content[0].kind}">
            <message v-for="(ele, idx) in item.content" :item="ele" :key="idx"></message>
          </div>
        </div>
      </pull-refresh>
    </div>
    <input-box ref="inputBox" @send="sendMessage" class="input-box"></input-box>
  </main>
</template>
<script>
export default {
  data () {}
}
</script>
