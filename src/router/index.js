/*
 * @Author: astar
 * @Date: 2021-02-24 11:33:14
 * @LastEditors: astar
 * @LastEditTime: 2021-02-24 13:48:53
 * @Description: 汇总路由
 * @FilePath: \vue-chat\src\router\index.js
 */
import Router from 'vue-router';
import routingGuard from '@/utils/routingGuard';
import { requireAll } from '@/utils';


export default Vue => {
  const allRoutes = requireAll(require.context('./', false, /[^index]\.js$/)).reduce((all, item) => all.concat(item.default.routes), []); // 匹配除了index.js之外的所有js文件
  console.log(allRoutes)
  Vue.use(Router);
  const router = new Router({
    routes: allRoutes
  });
  router.beforeEach(routingGuard);
  return router;
}