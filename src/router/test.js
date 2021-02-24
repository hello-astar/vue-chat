/*
 * @Author: astar
 * @Date: 2020-09-14 17:02:31
 * @LastEditors: astar
 * @LastEditTime: 2021-02-24 15:07:16
 * @Description: 测试页面-供开发环境下自测用
 * @FilePath: \vue-chat\src\router\test.js
 */
import { pipe } from '@/utils';

export default {
  name: 'test',
  routes: [
    {
      path: '/test',
      name: 'test',
      redirect: '/test/aaa',
      component: pipe('layout'),
      children: [
        { path: 'aaa', name: 'aaa', component: pipe('test/aaa'), meta: { noNeedToken: true } },
      ]
    }
  ]
}