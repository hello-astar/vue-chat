<!--
 * @Description: 通用按钮
 * @Author: astar
 * @Date: 2021-04-21 00:05:57
 * @LastEditTime: 2021-04-23 00:56:18
 * @LastEditors: astar
-->
<template>
  <button v-on="$listeners">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 's-button'
}
</script>