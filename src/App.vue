<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
#app {
  height: 100%;
  background: url('./assets/images/bg.jpg') no-repeat center;
  background-size: 100% 100%;
  overflow: auto;
}
</style>
