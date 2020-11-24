/*
 * @author: cmx
 * @Date: 2020-09-09 17:47:49
 * @LastEditors: cmx
 * @LastEditTime: 2020-11-24 16:41:35
 * @Description: 定义接口请求
 * @FilePath: \vue-chat\src\request\index.js
 */
import { postRequest, getRequest } from '@/axios';

export const userRegisterReq = (data = {}) => {
  return postRequest('/user/register', data, { notToken: true });
}

export const userLoginReq = (data = {}) => {
  return postRequest('/user/login', data, { notToken: true });
}

export const userInfoReq = (data = {}) => {
  return postRequest('/user/getUserInfo', data);
}

export const qiniuTokenReq = (data = {}) => {
  return postRequest('/qiniu/getToken', data);
}

export const qiniuUploadReq = (data = {}) => {
  return postRequest('http://upload-z2.qiniu.com', data, { notToken: true });
}

export const getCaptchaImg = (data = {}) => {
  return getRequest('/captcha/get', data, { notToken: true })
}
