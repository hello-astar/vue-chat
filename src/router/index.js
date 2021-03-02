/*
 * @Author: astar
 * @Date: 2021-02-24 11:33:14
 * @LastEditors: astar
 * @LastEditTime: 2021-03-02 16:54:48
 * @Description: 汇总路由
 * @FilePath: \vue-chat\src\router\index.js
 */
import Router from 'vue-router';
import routingGuard from '@/utils/routingGuard';
import { requireAll } from '@/utils';


export default Vue => {
  const requireContext = require.context('./', false,/^\.\/(?!index\.js).+\.js$/); // 排除index.js
  const allRoutes = requireAll(requireContext).reduce((all, item) => {
    all[item.default.name] = item.default.routes;
    return all;
  }, {});
  const sort = ['default', 'app', 'test', 'error'];
  Vue.use(Router);
  const router = new Router({
    routes: sort.reduce((all, key) => all.concat(allRoutes[key]), [])
  });
  router.beforeEach(routingGuard);
  return router;
}