/*
 * @Author: astar
 * @Date: 2020-09-09 16:50:59
 * @LastEditors: astar
 * @LastEditTime: 2021-07-06 14:54:38
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\main.js
 */
import Vue from "vue";
import App from "./App.vue";
import "@/assets/styles/reset.css";
import "@/assets/styles/common.scss";
import store from '@/store';
import setRem from '@/utils/setRem';
import notify from '@/utils/notify';
import { installComponent, installPlugin } from '@/components';
import installRouter from '@/router';
import * as directives from '@/directives';
import '@/icons'; // 引入svg图片，svg-sprite-loader自动将多个svg图片打包成svg-sprite
import './registerServiceWorker'
setRem(document, window);

// import VConsole from 'vconsole';
// var vConsole = new VConsole();
// console.log(vConsole);

// 注册插件
installPlugin(Vue);
// 注册全局组件
installComponent(Vue);
// 注册自定义指令
for (const key in directives) {
  Vue.use(directives[key]);
}
// 注册路由
const router = installRouter(Vue);

Vue.config.productionTip = false;

if (
  window.Notification &&
  (window.Notification.permission === 'default' || window.Notification.permission === 'denied')
) {
  window.Notification.requestPermission();
}

Vue.prototype.$notify = notify;
export const vm = new Vue({
  render: h => h(App),
  router,
  store,
  mounted () {
    // You'll need this for renderAfterDocumentEvent.
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount("#app");
