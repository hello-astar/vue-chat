/*
 * @Author: astar
 * @Date: 2020-09-09 17:47:49
 * @LastEditors: astar
 * @LastEditTime: 2021-04-22 23:05:35
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

export const getGifs = (data = {}) => {
  return getRequest('/chat/searchGifs', data)
}

export const getGroups = (data = {}) => {
  return getRequest('/group/getGroups', data)
}

export const addGroup = (data = {}) => {
  return postRequest('/group/addGroup', data)
}

export const getHistoryChatSortByGroup = (data = {}) => {
  return getRequest('/chat/getHistoryChatSortByGroup', data)
}

export const getGroupInfoByGroupId = (data = {}) => {
  return getRequest('/group/getGroupInfoByGroupId', data)
}

export const updateGroupNameByGroupId = (data = {}) => {
  return postRequest('/group/updateGroupNameByGroupId', data)
}

export const joinMembertoGroup = (data = {}) => {
  return postRequest('/group/joinMember', data)
}
