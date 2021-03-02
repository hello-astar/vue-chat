/*
 * @Author: astar
 * @Date: 2021-03-02 16:37:42
 * @LastEditors: astar
 * @LastEditTime: 2021-03-02 17:09:32
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\router\default.js
 */
import { pipe } from '@/utils';

export default {
  name: 'default',
  routes: [
    {
      path: '/',
      redirect: '/home/index',
      component: pipe('layout')
    },
    { path: '/register', name: 'register', component: pipe('sign/register'), meta: { noNeedToken: true } },
    { path: '/login', name: 'login', component: pipe('sign/login'), meta: { noNeedToken: true } },
  ]
}