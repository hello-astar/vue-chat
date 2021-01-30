<!--
 * @Author: astar
 * @Date: 2021-01-30 14:59:41
 * @LastEditors: astar
 * @LastEditTime: 2021-01-30 18:27:18
 * @Description: 表情包popup
 * @FilePath: \vue-chat\src\views\chat\components\expression.vue
-->
<template>
<div class="expression">
  <span v-for="(item, index) in expressions" :key="index" :style="{ 'background-position': `left ${-30 * index}px` }" class="icon"></span>
</div>
</template>
<script>
import expressions from './expressions.js';

export default {
  data () {
    return {
      expressions
    }
  },
  created () {
    console.log(expressions)
  }
}
</script>
<style lang="scss" scoped>
.expression {
  .icon {
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url('~@/assets/images/biaoqing.png') no-repeat;
    background-size: 30px auto;
  }
}
</style>