/*
 * @Author: astar
 * @Date: 2020-09-09 17:27:10
 * @LastEditors: astar
 * @LastEditTime: 2021-02-24 14:58:13
 * @Description: 定义拦截器
 * @FilePath: \vue-chat\src\axios\interceptors.js
 */
import Vue from 'vue';
import axios from 'axios';
import { BASE_URL } from '@/config';
import { removeToken } from '@/utils/token';
import { getAuthorization } from '@/utils';

const CUSTOM_CODE_MAP = {
  SUCCESS: 1,
  ERROR: -1
}
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
  headers: {
    'content-type': 'application/json'
  },
  withCredentials: true
});

instance.interceptors.request.use(config => {
  if (!config.notToken) {
    config.headers = {
      authorization: getAuthorization() // jwt校验token
    }
  }
  return config;
}, _ => { // 请求失败操作
  console.error('服务器请求失败', _)
  Vue.$toast.text('服务器请求失败')
  return Promise.reject(_);
});

instance.interceptors.response.use(response => {
  const res = response.data;
  switch (res.code) {
    case CUSTOM_CODE_MAP.SUCCESS: // 可在此添加自定义的code，返回成功
      return res;
    case CUSTOM_CODE_MAP.ERROR:
      Vue.$toast.text(res.msg || '请求失败');
      return Promise.reject(res);
    default:
      Vue.$toast.text(res.msg || '未知错误');
      return Promise.reject(res);
  }
}, _ => {
  console.error('服务器响应失败', _);
  if (_ && _.response) {
    Vue.$toast.text((_.response.data && _.response.data.msg) || '请求失败');
    if (_.response.status === 401) { // 登录过期, 跳转登录页面
      removeToken();
      setTimeout(() => {
        location.href = location.origin;
      }, 1000);
    }
    return Promise.reject(_);
  }
  Vue.$toast.text('服务器响应失败');
  return Promise.reject(_);
});

export default instance;
