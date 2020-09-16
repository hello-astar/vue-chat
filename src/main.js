import Vue from "vue";
import App from "./App.vue";
import "@/assets/styles/reset.css";
import "@/assets/styles/common.scss";
import router from './router';
import store from '@/store';
import VConsole from 'vconsole';
import { getUUID } from '@/utils/uuid';

var vConsole = new VConsole();
console.log(vConsole);

Vue.config.productionTip = false;

router.beforeEach ((to, from, next) => {
  if (to.name === 'login' || getUUID()) {
    next()
  } else {
    next('/login')
  }
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
