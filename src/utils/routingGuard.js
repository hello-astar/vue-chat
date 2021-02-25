/*
 * @Author: astar
 * @Date: 2021-02-23 17:47:13
 * @LastEditors: astar
 * @LastEditTime: 2021-02-25 15:14:51
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\utils\routingGuard.js
 */
import { getToken } from '@/utils/token';
import store from '@/store';
import Vue from 'vue';

export default (to, from, next) => {
  if (to.meta && to.meta.noNeedToken) {
    next();
  } else if (!getToken()) {
    Vue.$toast.text('请先登录');
    next('/login');
  } else if (store.getters.userInfo._id) {
    next();
  } else {
    store.dispatch('user/getUserInfo').then(() => {
      next();
    });
  }
}