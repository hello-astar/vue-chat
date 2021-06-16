<!--
 * @Description: 
 * @Author: astar
 * @Date: 2021-05-09 19:06:04
 * @LastEditTime: 2021-06-16 19:17:00
 * @LastEditors: astar
-->
<template>
  <div class="user-info-pane">
    <s-avatar :src="currentUser.avatar" size="large"></s-avatar>
    <div>
      <span>用户名：{{currentUser.userName}}</span>
      <i class="iconfont icon-fuzhi" @click="copy(currentUser.userName)"></i>
      <br>
      <span>用户ID：{{currentUser._id}}</span>
      <i class="iconfont icon-fuzhi" @click="copy(currentUser._id)"></i>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    currentUser: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    /**
    * 复制粘贴
    * @author astar
    * @date 2021-05-05 19:17
    */
    copy (value) {
      let content = document.createElement('input');
      content.value = value;
      document.body.appendChild(content);
      content.select();
      document.execCommand('Copy');
      document.body.removeChild(content);
      this.$toast.text('复制成功');
    }
  }
}
</script>
<style lang="scss" scoped>
.user-info-pane {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  .s-avatar {
    margin-right: 20px;
    flex-shrink: 0;
  }
  .iconfont {
    margin-left: 10px;
    font-size: 18px;
    vertical-align: middle;
  }
}
</style>