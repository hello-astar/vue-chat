<!--
 * @Author: astar
 * @Date: 2021-01-30 14:59:41
 * @LastEditors: cmx
 * @LastEditTime: 2021-04-01 14:52:30
 * @Description: 表情包popup
 * @FilePath: \vue-chat\src\views\chat\components\expression\index.vue
-->
<template>
<div class="expression" @click="selectExpression">
  <expression-item
    v-for="(item, index) in expressions"
    :key="index"
    :value="item"
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
      if (target.nodeName.toLowerCase() === 'i' && target.dataset.name) {
        this.onSelectExpression(target.outerHTML)
      }
    }
  },
  components: {
    expressionItem
  }
}
</script>