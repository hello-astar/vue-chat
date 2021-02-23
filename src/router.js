/*
 * @Author: astar
 * @Date: 2020-09-14 17:02:31
 * @LastEditors: astar
 * @LastEditTime: 2021-02-23 18:24:41
 * @Description: 文件描
 * @FilePath: \vue-chat\src\router.js
 */
import Router from 'vue-router';
import routingGuard from '@/utils/routingGuard';

export default Vue => {
  Vue.use(Router);
  const pipe = path => () => import(`@/views/${path}`);
  const router = new Router({
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
      { path: '/register', name: 'register', component: pipe('sign/register') },
      { path: '/login', name: 'login', component: pipe('sign/login') },
      { path: '/chat', name: 'chat', component: pipe('chat') }
    ]
  });
  router.beforeEach(routingGuard);
  return router;
}