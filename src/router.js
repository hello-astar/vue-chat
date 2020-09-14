import Vue from 'vue';
import Router from 'vue-router';

const pipe = path => () => import(`@/views/${path}`);

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', name: 'index', redirect: '/chat' },
    { path: '/chat', name: 'chat', component: pipe('chat') }
  ]
})