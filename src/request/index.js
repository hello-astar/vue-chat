/*
 * @author: cmx
 * @Date: 2020-09-09 17:47:49
 * @LastEditors: astar
 * @LastEditTime: 2020-09-20 20:47:33
 * @Description: 定义接口请求
 * @FilePath: \vue-chat\src\request\index.js
 */
import { postRequest } from '@/axios';

export const userRegisterReq = function (data = {}) {
  return postRequest('/user/register', data, { notToken: true });
}

export const userLoginReq = function (data = {}) {
  return postRequest('/user/login', data, { notToken: true });
}

export const userInfoReq = function (data = {}) {
  return postRequest('/user/getUserInfo', data);
}

export const qiniuTokenReq = function (data = {}) {
  return postRequest('/qiniu/getToken', data);
}

export const qiniuUploadReq = function (data = {}) {
  return postRequest('http://upload-z2.qiniu.com', data, { notToken: true });
}