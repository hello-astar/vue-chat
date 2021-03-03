<!--
 * @Author: astar
 * @Date: 2021-02-24 13:50:24
 * @LastEditors: astar
 * @LastEditTime: 2021-03-02 17:16:51
 * @Description: 测试环境用于测试
 * @FilePath: \vue-chat\src\views\test\aaa.vue
-->
<template>
<div class="test" :style="{ ...style, 'margin-top': ttt + 100 + 'px', width: bbb + 'px', height: ccc + 'px', paddingTop: '20px' }">
  <div style="width: 100%; background: yellow">
    content
    <img width="200" src="https://w.wallhaven.cc/full/ox/wallhaven-oxkjgm.jpg">
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      ttt: 200,
      bbb: 300,
      ccc: 60
    }
  },
  created () {
    console.log(this.ccc)
  },
  computed: {
    style () {
      return {
        'padding-left': this.ttt + 'px'
      }
    }
  }
}
</script>
<style>
</style>