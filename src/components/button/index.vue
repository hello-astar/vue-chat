<!--
 * @Description: 通用按钮
 * @Author: astar
 * @Date: 2021-04-21 00:05:57
 * @LastEditTime: 2021-05-05 19:02:09
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
  @mixin button($type, $bgColor, $color, $borderColor) {
    &.s-button__#{$type} {
      background-color: $bgColor;
      color: $color;
      border-width: 1px;
      border-style: solid;
      border-color: $borderColor;
      &.s-button__plain {
        color: $bgColor;
        background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.8) 100%);
      }
    }
  }
  @include button('primary',rgb(29, 29, 29), rgba(255,255,255,.8), rgb(29, 29, 29));
  @include button('text', transparent, rgb(29, 29, 29), transparent);
  @include button('danger', rgb(168, 69, 69), rgb(253, 250, 250),rgb(168, 69, 69));
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