<!--
 * @Description: 头像组件
 * @Author: astar
 * @Date: 2020-09-08 21:10:10
 * @LastEditTime: 2021-05-04 22:24:56
 * @LastEditors: astar
-->
<template>
  <span class="s-avatar" :class="classes" :style="styles" v-press="press" v-on="$listeners">
    <slot>
      <img :style="imgStyles" :src="src" :alt="alt" @error="error">
    </slot>
  </span>
</template>
<script>
export default {
  name: 's-avatar',
  props: {
    shape: { // 形状
      type: String,
      default: 'square',
      validator(val) {
        return ['circle', 'square'].includes(val);
      }
    },
    fit: { // fill / contain / cover / none / scale-down
      type: String,
      default: 'cover'
    },
    size: {
      type: [Number, String],
      default: 'medium',
      validator(val) {
        if (typeof val === 'string') {
          return ['large', 'medium', 'small'].includes(val);
        }
        return typeof val === 'number';
      }
    },
    src: {
      type: String,
      default: ''
    },
    alt: String
  },
  methods: {
    error(e) {
      this.$emit('error', e)
    },
    press () {
      this.$emit('press')
    }
  },
  computed: {
    classes () {
      const { size, shape } = this
      let classList = []

      if (size && typeof size === 'string') {
        classList.push(`avatar-size__${size}`);
      }

      if (shape) {
        classList.push(`avatar-shape__${shape}`);
      }

      return classList.join(' ');
    },
    styles () {
      const { size } = this
      return typeof size === 'number' ? {
        height: `${size}px`,
        width: `${size}px`,
        lineHeight: `${size}px`
      } : {}
    },
    imgStyles () {
      const { fit } = this
      return {
        objectFit: fit
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.s-avatar {
  display: inline-block;
  box-sizing: border-box;
  vertical-align: middle;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  >img {
    display: block;
    height: 100%;
    width: 100%;
  }
  &.avatar-size__large {
    width: 42px;
    height: 42px;
    line-height: 42px;
  }
  &.avatar-size__medium {
    width: 36px;
    height: 36px;
    line-height: 36px;
  }
  &.avatar-size__small {
    width: 28px;
    height: 28px;
    line-height: 28px;
  }
  &.avatar-shape {
    &__circle {
      border-radius: 50%;
    }
    &__square {
      border-radius: 4px;
    }
  }
}
</style>
