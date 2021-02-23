/*
 * @Author: astar
 * @Date: 2021-02-23 17:47:13
 * @LastEditors: astar
 * @LastEditTime: 2021-02-23 18:14:24
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\utils\routingGuard.js
 */
import { getToken } from '@/utils/token';
import store from '@/store';

export default (to, from, next) => {
  if (['login', 'register'].includes(to.name)) {
    next();
  } else if (!getToken()) {
    next('/login');
  } else if (store.getters.userInfo._id) {
    next();
  } else {
    store.dispatch('user/getUserInfo').then(() => {
      next();
    });
    next();
  }
}