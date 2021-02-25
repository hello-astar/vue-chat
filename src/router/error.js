/*
 * @Author: astar
 * @Date: 2021-02-25 11:33:25
 * @LastEditors: astar
 * @LastEditTime: 2021-02-25 15:19:48
 * @Description: 各种错误页面---404、401
 * @FilePath: \vue-chat\src\router\error.js
 */
import { pipe } from '@/utils';

export default {
  name: 'error',
  routes: [
    {
      path: '/401',
      name: '401',
      meta: {
        title: '401-未授权',
        noNeedToken: true
      },
      component: pipe('error/401')
    },
    {
      path: '/*',
      name: '404',
      meta: {
        title: '404-页面找不到了',
        noNeedToken: true
      },
      component: pipe('error/404')
    }
  ]
}
