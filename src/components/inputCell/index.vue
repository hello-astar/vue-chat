<!--
 * @Description: 输入框
 * @Author: astar
 * @Date: 2020-09-20 17:16:54
 * @LastEditTime: 2020-09-21 01:33:52
 * @LastEditors: astar
-->
<template>
<div class="input-cell">
  <input
    :class="['input']"
    :type="type"
    v-model="text"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    @input="input"
  >
  <span class="input-cell__line"></span>
</div>
</template>
<script>
export default {
  name: 'input-cell',
  props: {
    placeholder: String,
    type: {
      type: String,
      default: 'text',
      validator: (value) => {
        return ['text', 'password', 'number'].includes(value);
      }
    },
    autocomplete: String
  },
  data () {
    return {
      text: ''
    }
  },
  methods: {
    input () {
      this.$emit('input', this.text)
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
