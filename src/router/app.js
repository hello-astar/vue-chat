/*
 * @Author: astar
 * @Date: 2021-02-24 11:41:58
 * @LastEditors: astar
 * @LastEditTime: 2021-02-24 15:01:38
 * @Description: 主要页面-本地开发和线上通用
 * @FilePath: \vue-chat\src\router\app.js
 */
import { pipe } from '@/utils';

export default {
  name: 'app',
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/home',
      component: pipe('layout'),
      children: [
        { path: 'home', name: 'home', component: pipe('home') },
        { path: 'about', name: 'about', component: pipe('about') },
      ]
    },
    { path: '/register', name: 'register', component: pipe('sign/register'), meta: { noNeedToken: true } },
    { path: '/login', name: 'login', component: pipe('sign/login'), meta: { noNeedToken: true } },
    { path: '/chat', name: 'chat', component: pipe('chat') }
  ]
}
