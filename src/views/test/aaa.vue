<!--
 * @Author: astar
 * @Date: 2021-04-30 16:34:47
 * @LastEditors: astar
 * @LastEditTime: 2021-05-07 14:09:33
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\views\test\aaa.vue
-->
<template>
<div class="frame">
  <div class="bg"></div>
</div>
</template>
<script>
export default {
  mounted () {
    let container = document.querySelector('.bg');
    const RADIUS = 80;

    document.addEventListener('mousemove', function (event) {
      let x = event.clientX;
      let y = event.clientY;

      console.log(x, y)
      
      let circle = `circle(${RADIUS / 100 + 'rem'} at ${x / 100 + 'rem'} ${y /100 + 'rem'})`;
      container.style['-webkit-clip-path'] = circle;
      container.style['clip-path'] = circle;
    });
  }
}
</script>

<style lang="scss" scoped>
.frame {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    background-image: url(https://hacks.mozilla.org/files/2017/06/benko-game.png);
    background-repeat: repeat-x;
    background-position: left center;
    width: 100%;
    height: 100%;
    
    -webkit-clip-path: circle(80px);
    clip-path: circle(80px);
  }
}
</style>