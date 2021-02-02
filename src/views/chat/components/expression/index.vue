<!--
 * @Author: astar
 * @Date: 2021-01-30 14:59:41
 * @LastEditors: astar
 * @LastEditTime: 2021-02-02 18:33:55
 * @Description: 表情包popup
 * @FilePath: \vue-chat\src\views\chat\components\expression\index.vue
-->
<template>
<div class="expression">
  <span
    v-for="(item, index) in expressions"
    :key="index"
    :style="{ 'background-position': `0 ${-25 * index / 100}rem` }"
    class="emoji-icon"
    @click="selectExpression(index, item)"
  ></span>
</div>
</template>
<script>
import expressions from './config.js';

export default {
  data () {
    return {
      expressions
    }
  },
  props: {
    onSelectExpression: {
      required: true,
      type: Function
    }
  },
  methods: {
    selectExpression (index, item) {
      this.onSelectExpression(`<span name=${item} class="emoji-icon" style="{background-position: 0 ${-25 * index / 100}rem }"></span>`)
    }
  }
}
</script>
<style lang="scss">
.expression {
  .emoji-icon {
    display: inline-block;
    width: 25px;
    height: 25px;
    background: url('~@/assets/images/biaoqing.png');
    background-size: 25px auto;
    background-repeat: no-repeat;
  }
}
.emoji-icon {
    display: inline-block;
    width: 25px;
    height: 25px;
    background: url('~@/assets/images/biaoqing.png');
    background-size: 25px auto;
    background-repeat: no-repeat;
  }
</style>