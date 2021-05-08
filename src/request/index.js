/*
 * @Author: astar
 * @Date: 2020-09-09 17:47:49
 * @LastEditors: cmx
 * @LastEditTime: 2021-05-08 18:01:47
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
  return getRequest('/query/getUserInfo', data);
}

export const qiniuTokenReq = (data = {}) => {
  return getRequest('/tool/getQiniuToken', data);
}

export const qiniuUploadReq = (data = {}) => {
  return postRequest('http://upload-z2.qiniu.com', data);
}

export const captchaGetImg = `${process.env.VUE_APP_BASE_API}/tool/getCaptcha` // 获取图片验证码

export const getHistoryChatByCount = (data = {}) => {
  return getRequest('/query/getHistoryChatByCount', data);
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

export const getRecentContacts = (data = {}) => {
  return postRequest('/query/getRecentContacts', data)
}

export const getGroupInfoByGroupId = (data = {}) => {
  return getRequest('/query/getGroupInfo', data)
}

export const updateGroupNameByGroupId = (data = {}) => {
  return postRequest('/group/updateGroupNameByGroupId', data)
}

export const joinMembertoGroup = (data = {}) => {
  return postRequest('/group/joinMemberToGroup', data)
}

export const exitGroup = (data = {}) => {
  return postRequest('/group/exitGroup', data)
}