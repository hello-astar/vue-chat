/*
 * @Author: astar
 * @Date: 2020-09-09 17:47:49
 * @LastEditors: astar
 * @LastEditTime: 2021-03-30 17:41:32
 * @Description: 定义接口请求
 * @FilePath: \vue-chat\src\request\index.js
 */
import { postRequest, getRequest } from '@/axios';

export const userRegisterReq = (data = {}) => {
  return postRequest('/user/register', data);
}

export const userLoginReq = (data = {}) => {
  return postRequest('/user/login', data);
}

export const userInfoReq = (data = {}) => {
  return getRequest('/user/getUserInfo', data);
}

export const qiniuTokenReq = (data = {}) => {
  return getRequest('/qiniu/getToken', data);
}

export const qiniuUploadReq = (data = {}) => {
  return postRequest('http://upload-z2.qiniu.com', data);
}

export const captchaGetImg = `${process.env.VUE_APP_BASE_API}/user/getCaptcha` // 获取图片验证码

export const getHistoryChatByCount = (data = {}) => {
  return getRequest('/chat/getHistoryChatByCount', data);
}