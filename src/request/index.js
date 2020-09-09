/*
 * @author: cmx
 * @Date: 2020-09-09 17:47:49
 * @LastEditors: cmx
 * @LastEditTime: 2020-09-09 17:53:25
 * @Description: 定义接口请求
 * @FilePath: \vue-chat\src\request\index.js
 */
import { postRequest } from '@/axios';

export const userLoginReq = function (data = {}) {
  return postRequest('/user/login', data);
}