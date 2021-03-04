<!--
 * @Author: astar
 * @Date: 2021-03-04 10:11:57
 * @LastEditors: astar
 * @LastEditTime: 2021-03-04 10:30:35
 * @Description: 单个表情渲染
 * @FilePath: \vue-chat\src\views\chat\components\expression\expressionItem.vue
-->
<template>
  <span
    class="emoji-icon"
    :style="{ 'background-position': `0 ${-30 * index}px` }"
  ></span>
</template>
<script>
import expressions from './config.js';
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  computed: {
    index () {
      return expressions.findIndex(item => item === this.value)
    }
  }
}
</script>
<style lang="scss">
.emoji-icon {
  display: inline-block;
  width: 30px;
  height: 30px;
  background: url('~@/assets/images/biaoqing.png');
  background-size: 30px auto;
  background-repeat: no-repeat;
}
</style>