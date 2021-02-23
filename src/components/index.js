/*
 * @Author: astar
 * @Date: 2021-02-04 14:09:13
 * @LastEditors: astar
 * @LastEditTime: 2021-02-23 17:16:48
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\components\index.js
 */
import { requireAll } from '@/utils';

export const installComponent = Vue => {
  requireAll(require.context('./', true, /index.vue/)).forEach(module => {
    Vue.component(module.default.name, module.default);
  });
}

export const installPlugin = Vue => {
  requireAll(require.context('./', true, /plugin.js/)).forEach(module => {
    Vue.use(module.default);
  });
}