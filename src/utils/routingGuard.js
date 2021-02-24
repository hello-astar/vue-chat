/*
 * @Author: astar
 * @Date: 2021-02-23 17:47:13
 * @LastEditors: astar
 * @LastEditTime: 2021-02-24 14:40:01
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\utils\routingGuard.js
 */
import { getToken } from '@/utils/token';
import store from '@/store';

export default (to, from, next) => {
  if (to.meta && to.meta.noNeedToken) {
    next();
  } else if (!getToken()) {
    next('/login');
  } else if (store.getters.userInfo._id) {
    next();
  } else {
    store.dispatch('user/getUserInfo').then((res) => {
      console.log(res)
      next();
    });
    // next();
  }
}