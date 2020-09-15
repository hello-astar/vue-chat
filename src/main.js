import Vue from "vue";
import App from "./App.vue";
import "@/assets/styles/reset.css";
import "@/assets/styles/common.scss";
import router from './router';
import store from '@/store';
import VConsole from 'vconsole';

var vConsole = new VConsole();
console.log(vConsole);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
