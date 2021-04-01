<!--
 * @Author: astar
 * @Date: 2021-01-30 14:59:41
 * @LastEditors: astar
 * @LastEditTime: 2021-04-01 18:07:26
 * @Description: 表情包popup
 * @FilePath: \vue-chat\src\views\chat\components\emojiPopup\index.vue
-->
<template>
<div class="expression" @click="selectExpression" v-html="renderEMOJIS()">
</div>
</template>
<script>
import { EMOJIS, getHTMLFromJSON, KINDS } from '@/utils/editor.js'

export default {
  data () {
    return {
      EMOJIS
    }
  },
  props: {
    onSelectExpression: {
      required: true,
      type: Function
    }
  },
  methods: {
    getHTMLFromJSON,
    renderEMOJIS () {
      return this.EMOJIS.map(item => {
        return getHTMLFromJSON({ kind: KINDS.EMOJI, value: item })
      }).join('')
    },
    selectExpression ({ target }) {
      if (target.dataset.kind === KINDS.EMOJI) {
        this.onSelectExpression({ kind: KINDS.EMOJI, value: target.dataset.value })
      }
    }
  }
}
</script>