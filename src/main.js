import Vue from "vue";
import App from "./App.vue";
import "@/assets/styles/reset.css";
import "@/assets/styles/common.scss";
import router from './router';
import store from '@/store';
import { getToken, removeToken } from '@/utils/token';
import setRem from '@/utils/setRem';
import inputCell from '@/components/inputCell';
import toastPlugin from '@/components/toast/plugin';
setRem(document, window);

// import VConsole from 'vconsole';
// var vConsole = new VConsole();
// console.log(vConsole);

Vue.component(inputCell.name, inputCell);
Vue.use(toastPlugin);

Vue.config.productionTip = false;

router.beforeEach ((to, from, next) => {
  if (['login', 'register'].includes(to.name)) {
    next();
  } else if (!getToken()) {
    next('/login');
  } else if (store.getters.userInfo._id) {
    next()
  } else {
    store.dispatch('user/getUserInfo').then(() => {
      next();
    }, _ => {
      console.log(_)
      removeToken();
      next('/login');
    });
    next();
  }
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
