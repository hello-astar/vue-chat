/*
 * @author: cmx
 * @Date: 2020-09-09 17:47:49
 * @LastEditors: cmx
 * @LastEditTime: 2021-01-11 18:00:26
 * @Description: 定义接口请求
 * @FilePath: \vue-chat\src\request\index.js
 */
import { postRequest } from '@/axios';
import { BASE_URL } from '@/config';

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

export const captchaGetImg = `http://${BASE_URL}/user/getCaptcha` // 获取图片验证码
