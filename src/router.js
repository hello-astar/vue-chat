import Vue from 'vue';
import Router from 'vue-router';

const pipe = path => () => import(`@/views/${path}`);

Vue.use(Router);

export default new Router({
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
})