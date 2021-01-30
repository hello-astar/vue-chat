<!--
 * @Author: astar
 * @Date: 2021-01-30 15:21:05
 * @LastEditors: astar
 * @LastEditTime: 2021-01-30 18:03:51
 * @Description: 聊天输入框
 * @FilePath: \vue-chat\src\views\chat\components\inputBox.vue
-->
<template>
<div class="input-box" ref="inputbox">
  <i class="iconfont icon-biaoqing" @click="showExpression = true"></i>
  <div
    class="input"
    contenteditable
    @keyup.enter="$emit('send')"
    placeholder="按Enter发送"
  />
  <popup v-model="showExpression" place="bottom" :bottom="popupBottom">
    <expression></expression>
  </popup>
</div>
</template>
<script>
import expression from './expression';
import popup from '@/components/popup';
export default {
  data () {
    return {
      text: '',
      popupBottom: '0px',
      showExpression: false
    }
  },
  created () {
    this.$nextTick(() => {
      this.popupBottom = window.getComputedStyle(this.$refs.inputbox).height
    })
  },
  components: {
    expression,
    popup
  }
}
</script>
<style lang="scss" scoped>
.input-box {
  position: relative;
  .icon-biaoqing {
    position: absolute;
    top: 5px;
    left: 10px;
    cursor: pointer;
  }
  // textarea {
  //   display: inline-block;
  //   box-sizing: border-box;
  //   width: 100%;
  //   height: 100%;
  //   padding: 10px 35px 10px;
  //   border: none;
  //   outline: none;
  //   resize: none;
  // }
  .input {
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 10px 35px 10px;
    outline: none;
    overflow: auto;
    background: #fff;
    font-size: 12px;
  }
}
</style> 