/*
 * @Author: astar
 * @Date: 2021-03-02 16:37:42
 * @LastEditors: astar
 * @LastEditTime: 2021-12-11 15:07:22
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\router\default.js
 */
import { pipe } from '@/utils';

export default {
  name: 'default',
  routes: [
    {
      path: '/',
      component: pipe('layout/chat'),
      redirect: '/main',
      children: [
        { path: 'main', name: 'chat-main', component: pipe('chat') }, // 首页
        { path: 'contactList', name: 'chat-contact-list', component: pipe('chat/contactList') }, //好友/群组列表
        { path: 'me', name: 'me', component: pipe('me') } // 个人信息
      ]
    },
    { path: '/register', name: 'register', component: pipe('sign/register'), meta: { noNeedToken: true } },
    { path: '/login', name: 'login', component: pipe('sign/login'), meta: { noNeedToken: true } },
  ]
}