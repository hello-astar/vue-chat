<template>
  <div id="app">
    <div class="app-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="scss" scoped>
#app {
  position: relative;
  height: 100%;
  background: url('https://w.wallhaven.cc/full/l3/wallhaven-l3mkqp.png') no-repeat center;
  // background: #eee;
  background-size: cover;
  overflow: auto;
  z-index: 1;
  &:after {
    position: absolute;
    top: 0;
    left: 0;
    content: ' ';
    display: block;
    width: 100%;
    height: 100%;
    background: inherit;
    filter: blur(2px);
    z-index: 2;
  }
  .app-content {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    z-index: 3;
  }
}
</style>
