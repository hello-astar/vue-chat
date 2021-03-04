<!--
 * @Author: astar
 * @Date: 2021-01-30 14:59:41
 * @LastEditors: astar
 * @LastEditTime: 2021-03-04 10:28:21
 * @Description: 表情包popup
 * @FilePath: \vue-chat\src\views\chat\components\expression\index.vue
-->
<template>
<div class="expression" @click="selectExpression">
  <expression-item
    v-for="(item, index) in expressions"
    :key="index"
    :value="item"
    :data-index="index"
  ></expression-item>
</div>
</template>
<script>
import expressions from './config.js';
import expressionItem from './expressionItem';

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
        if (this.expressions[index]) {
          this.onSelectExpression(`<img name="emoji-${this.expressions[index]}" class="emoji-icon" style="background-position: 0 ${-30 * index}px"/>`)
        }
      }
    }
  },
  components: {
    expressionItem
  }
}
</script>