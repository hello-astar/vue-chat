<!--
 * @Description: 通用按钮
 * @Author: astar
 * @Date: 2021-04-21 00:05:57
 * @LastEditTime: 2021-05-05 01:23:36
 * @LastEditors: astar
-->
<template>
  <button class="s-button" :class="buttonClass" v-on="$listeners">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 's-button',
  props: {
    type: {
      type: String, // primary / text / danger
      default: 'text'
    },
    plain: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'large'
    }
  },
  computed: {
    buttonClass () {
      return [
        this.type,
        this.plain ? 'plain' : '',
        this.size
      ].filter(item => item).map(item => `s-button__${item}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.s-button {
  display: inline-block;
  background: none;
  outline: 0;
  border: 0;
  &__primary {
    background:rgb(29, 29, 29);
    color: rgba(255,255,255,.8);
    border: 1px solid rgb(29, 29, 29);
  }
  &__text {
    border: 0;
  }
  &__danger {
    background: rgb(168, 69, 69);
    border: 1px solid rgb(168, 69, 69);
    color: rgb(253, 250, 250);
  }
  &__plain {
    background: transparent;
  }
  &__small {

  }
  &__medium {

  }
  &__large {
    width: 150px;
    line-height: 30px;
    border-radius: 4px;
  }
}
</style>