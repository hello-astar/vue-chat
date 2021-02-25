/*
 * @Author: astar
 * @Date: 2021-02-25 11:43:43
 * @LastEditors: astar
 * @LastEditTime: 2021-02-25 15:09:27
 * @Description: 引入所有svg图片
 * @FilePath: \vue-chat\src\icons\index.js
 */
import { requireAll } from '@/utils';

const requireContext = require.context('./svg', false, /\.svg$/);
requireAll(requireContext);
