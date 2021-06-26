/*
 * @Author: astar
 * @Date: 2020-09-09 17:47:49
 * @LastEditors: astar
 * @LastEditTime: 2021-06-26 18:19:09
 * @Description: 定义接口请求
 * @FilePath: \vue-chat\src\request\index.js
 */
import { postRequest, getRequest } from '@/axios';
import baseURL from '@/config';

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
  return getRequest('/tool/getQiniuToken', data);
}

export const qiniuUploadReq = (data = {}) => {
  return postRequest('http://upload-z2.qiniu.com', data);
}

export const captchaGetImg = `${baseURL}/tool/getCaptcha` // 获取图片验证码

export const getHistoryChatByCount = (data = {}) => {
  return postRequest('/chat/getHistoryChatByCount', data);
}

export const getGifs = (data = {}) => {
  return getRequest('/tool/searchGifs', data)
}

export const getMyGroups = (data = {}) => {
  return getRequest('/user/getMyGroups', data)
}

export const getMyFriends = (data = {}) => {
  return getRequest('/user/getMyFriends', data)
}

export const addGroup = (data = {}) => {
  return postRequest('/group/addGroup', data)
}

export const addFriend = (data = {}) => {
  return postRequest('/user/addFriend', data)
}

export const getRecentContacts = (data = {}) => {
  return postRequest('/user/getRecentContacts', data)
}

export const getGroupInfoByGroupId = (data = {}) => {
  return getRequest('/group/getGroupInfo', data)
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

export const checkIsMyFriend = (data = {}) => {
  return postRequest('/user/checkIsMyFriend', data)
}

export const uploadImg = (data = {}) => {
  return postRequest('/tool/uploadImg', data)
}