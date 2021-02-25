<!--
 * @Author: astar
 * @Date: 2021-02-25 11:57:11
 * @LastEditors: astar
 * @LastEditTime: 2021-02-25 15:06:42
 * @Description: 展示svg图片
 * @FilePath: \vue-chat\src\components\svgIcon\index.vue
-->
<template>
<svg class="svg-icon" aria-hidden="true">
  <use :xlink:href="icon"></use>
</svg>
</template>
<script>
export default {
  name: 'svg-icon',
  props: {
    iconName: {
      type: String,
      required: true
    }
  },
  computed: {
    icon () {
      return `#icon-${this.iconName}`
    }
  }
}
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 30px;
  height: 30px;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}
</style>