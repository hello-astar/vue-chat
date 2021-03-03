<!--
 * @Author: astar
 * @Date: 2021-01-30 14:59:41
 * @LastEditors: astar
 * @LastEditTime: 2021-03-03 18:31:49
 * @Description: 表情包popup
 * @FilePath: \vue-chat\src\views\chat\components\expression\index.vue
-->
<template>
<div class="expression" @click="selectExpression">
  <span
    v-for="(item, index) in expressions"
    :key="index"
    :style="{ 'background-position': `0 ${-30 * index}px` }"
    class="emoji-icon"
    :data-index="index"
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
    selectExpression ({ target }) {
      if (target.nodeName.toLowerCase() === 'span') {
        const index = target.dataset.index
        this.onSelectExpression(`<img name="emoji-${this.expressions[index]}" class="emoji-icon" style="background-position: 0 ${-30 * index}px"/>`)
      }
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