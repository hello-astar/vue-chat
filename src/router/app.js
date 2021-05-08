/*
 * @Author: astar
 * @Date: 2021-02-24 11:41:58
 * @LastEditors: astar
 * @LastEditTime: 2021-05-08 11:37:42
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
        { path: 'index', name: 'home-index', component: pipe('home') }, // 首页
        { path: 'about', name: 'home-about', component: pipe('about') } // 关于
      ]
    },
    {
      path: '/chat',
      name: 'chat',
      redirect: '/chat/index',
      component: pipe('layout/chat'),
      children: [
        { path: 'index', name: 'chat-index', component: pipe('chat') }, // 聊天页面
        { path: 'detail', name: 'chat-user-detail', component: pipe('chat/userDetail') } // 用户详情
      ]
    }
  ]
}
