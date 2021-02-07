/*
 * @Author: astar
 * @Date: 2021-02-04 14:09:13
 * @LastEditors: astar
 * @LastEditTime: 2021-02-06 17:47:20
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\components\index.js
 */
import inputCell from '@/components/inputCell';
import dialog from '@/components/dialog';
import avatar from '@/components/avatar';
import pullRefresh from '@/components/pullRefresh';

export default Vue => {
  Vue.component(inputCell.name, inputCell);
  Vue.component(dialog.name, dialog);
  Vue.component(avatar.name, avatar);
  Vue.component(pullRefresh.name, pullRefresh);
}