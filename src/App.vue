<template>
  <div id="app">
    <Index />
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import Index from "@/views/Index.vue";
export default {
  name: "app",
  components: {
    // HelloWorld
    Index
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
  height: 100vh;
  background: url('./assets/images/bg.jpg') no-repeat center;
  background-size: 100% 100%;
  overflow: auto;
}
</style>
