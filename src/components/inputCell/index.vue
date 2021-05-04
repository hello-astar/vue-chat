<!--
 * @Description: 输入框
 * @Author: astar
 * @Date: 2020-09-20 17:16:54
 * @LastEditTime: 2021-05-05 00:35:26
 * @LastEditors: astar
-->
<template>
<div class="input-cell" :class="{'no-border': noBorder}">
  <div>
    <slot name="label">{{label}}</slot>
  </div>
  <input
    :class="['input']"
    :type="type"
    v-model="text"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    @input="input"
  >
  <div>
    <slot></slot>
  </div>
  <span v-if="!noBorder" class="input-cell__line"></span>
</div>
</template>
<script>
export default {
  name: 's-input-cell',
  props: {
    placeholder: String,
    type: {
      type: String,
      default: 'text',
      validator: (value) => {
        return ['text', 'password', 'number'].includes(value);
      }
    },
    autocomplete: String,
    label: String,
    value: String,
    noBorder: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: function (val) {
        this.text = val
      }
    }
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
