<!--
 * @Description: 输入框
 * @Author: astar
 * @Date: 2020-09-20 17:16:54
 * @LastEditTime: 2021-07-05 00:19:59
 * @LastEditors: astar
-->
<template>
<div class="input-cell" :class="{'no-border': noBorder}">
  <div class="input-cell__label" :style="{width: labelWidth}">
    <slot name="label">{{label}}</slot>
  </div>
  <textarea v-if="type === 'textarea'" class="input textarea" rows="5" v-model="text" :placeholder="placeholder" :autocomplete="autocomplete" @input="input"></textarea>
  <input
    v-else-if="type !== 'none'"
    :class="['input']"
    :type="type"
    v-model="text"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    @input="input"
  >
  <div class="input-cell__slot">
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
      validator: (value) => {
        return ['text', 'password', 'number', 'none', 'textarea'].includes(value);
      }
    },
    autocomplete: String,
    label: String,
    value: String,
    noBorder: {
      type: Boolean,
      default: false
    },
    labelWidth: {
      type: String
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
