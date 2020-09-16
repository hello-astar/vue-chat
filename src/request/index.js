/*
 * @author: cmx
 * @Date: 2020-09-09 17:47:49
 * @LastEditors: astar
 * @LastEditTime: 2020-09-16 00:54:23
 * @Description: 定义接口请求
 * @FilePath: \vue-chat\src\request\index.js
 */
import { postRequest } from '@/axios';

export const userRegisterReq = function (data = {}) {
  return postRequest('/user/register', data)
}

export const userLoginReq = function (data = {}) {
  return postRequest('/user/login', data);
}