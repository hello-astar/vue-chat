<!--
 * @Author: astar
 * @Date: 2021-01-30 16:24:58
 * @LastEditors: astar
 * @LastEditTime: 2021-03-01 17:47:01
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\components\popup\index.vue
-->
<template>
<transition name="mask">
  <div class="popup" @click.self="visible=false" v-show="visible">
    <div class="popup-container" :style="style">
      <transition name="slide">
        <div class="popup-container__content" v-show="visible">
          <slot></slot>
        </div>
      </transition>
    </div>
  </div>
</transition>
</template>
<script>
export default {
  name: 's-popup',
  data () {
    return {
      visible: false
    }
  },
  computed: {
    style () {
      const mapPlace = {
        'top': { top: 0, left: 0 },
        'left': { top: 0, left: 0 },
        'right': { top: 0, right: 0 },
        'bottom': { bottom: 0, left: 0 }
      }
      return {
        ...mapPlace[this.place],
        left: this.x,
        bottom: `calc(100% - ${this.y})`,
        height: this.height,
        width: this.width
      }
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  watch: {
    visible: {
      handler: function (val) {
        this.$emit('change', val)
      }
    },
    value: {
      immediate: true,
      handler: function (val) {
        this.visible = val
      }
    }
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    place: { // 从哪个角度弹出
      type: String,
      default: 'bottom',
      validate: value => ['top, bottom', 'left', 'right'].includes(value)
    },
    x: String, // 内容左下角x
    y: String, // 内容左下角y
    height: { // 内容高度
      type: String,
      default: '200px'
    },
    width: { // 内容宽度
      type: String,
      default: '200px'
    }
  }
}
</script>
<style lang="scss" scoped>
.popup {
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  &-container {
    box-sizing: border-box;
    position: absolute;
    overflow: hidden;
    background: transparent;
    &__content {
      background: #fff;
      height: 100%;
      padding: 10px;
      overflow: auto;
    }
  }
}
.mask-leave-active {
  transition: visibility .1s;
}
.slide-enter-active, .slide-leave-active {
  transition: transform .1s;
}
.slide-enter, .slide-leave-to {
  transform: translateY(100%);
}
</style>