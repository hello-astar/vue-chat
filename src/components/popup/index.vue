<!--
 * @Author: astar
 * @Date: 2021-01-30 16:24:58
 * @LastEditors: astar
 * @LastEditTime: 2021-01-30 18:17:57
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\components\popup\index.vue
-->
<template>
  <div class="popup" v-if="visible">
    <div class="popup-container" :style="style">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible: false
    }
  },
  computed: {
    style () {
      const mapPlace = {
        'top': { top: this.top || 0, left: 0 },
        'left': { top: 0, left: this.left || 0 },
        'right': { top: 0, right: this.right || 0 },
        'bottom': { bottom: this.bottom || 0, left: 0 }
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  &-modal {
  }
  &-container {
    box-sizing: border-box;
    padding: 10px;
    position: absolute;
    background: #fff;
    width: 100%;
  }
}
</style>