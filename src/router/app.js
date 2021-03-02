/*
 * @Author: astar
 * @Date: 2021-02-24 11:41:58
 * @LastEditors: astar
 * @LastEditTime: 2021-03-02 17:11:24
 * @Description: 主要页面-本地开发和线上通用
 * @FilePath: \vue-chat\src\router\app.js
 */
import { pipe } from '@/utils';

export default {
  name: 'app',
  routes: [
    {
      path: '/home',
      name: 'home',
      redirect: '/home/index',
      component: pipe('layout'),
      children: [
        { path: 'index', name: 'home', component: pipe('home') }, // 首页
        { path: 'about', name: 'about', component: pipe('about') } // 关于
      ]
    },
    { path: '/chat', name: 'chat', component: pipe('chat') } // 聊天页面
  ]
}
