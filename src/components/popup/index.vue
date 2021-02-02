<!--
 * @Author: astar
 * @Date: 2021-01-30 16:24:58
 * @LastEditors: astar
 * @LastEditTime: 2021-02-01 14:19:22
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\components\popup\index.vue
-->
<template>
<transition name="mask">
  <div class="popup" @click.self="visible=false" :style="popupStyle" v-show="visible">
    <transition name="slide">
      <div class="popup-container" :style="style" v-show="visible">
        <slot></slot>
      </div>
    </transition>
  </div>
</transition>
</template>
<script>
export default {
  data () {
    return {
      visible: false
    }
  },
  computed: {
    popupStyle () {
      return {
        top: this.top,
        left: this.left,
        bottom: this.bottom,
        right: this.right,
        height: `calc(100% - ${this.top || `0px`} - ${this.bottom || `0px`})`,
        width: `calc(100% - ${this.left || `0px`} - ${this.right || `0px`})`
      }
    },
    style () {
      const mapPlace = {
        'top': { top: 0, left: 0 },
        'left': { top: 0, left: 0 },
        'right': { top: 0, right: 0 },
        'bottom': { bottom: 0, left: 0 }
      }
      return {
        ...mapPlace[this.place],
        height: this.height
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
    place: {
      type: String,
      default: 'bottom',
      validate: value => ['top, bottom', 'left', 'right'].includes(value)
    },
    bottom: String,
    top: String,
    left: String,
    right: String,
    height: {
      type: String
    }
  }
}
</script>
<style lang="scss" scoped>
.popup {
  position: fixed;
  overflow: hidden;
  &-container {
    box-sizing: border-box;
    padding: 10px;
    position: absolute;
    background: #fff;
    width: 100%;
  }
}
.mask-leave-active {
  transition: visibility .3s;
}
.slide-enter-active, .slide-leave-active {
  transition: transform .3s;
}
.slide-enter, .slide-leave-to {
  transform: translateY(100%);
}
</style>