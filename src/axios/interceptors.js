/*
 * @Author: astar
 * @Date: 2020-09-09 17:27:10
 * @LastEditors: astar
 * @LastEditTime: 2021-02-23 18:29:37
 * @Description: 定义拦截器
 * @FilePath: \vue-chat\src\axios\interceptors.js
 */
import Vue from 'vue';
import axios from 'axios';
import { BASE_URL } from '@/config';
import { removeToken } from '@/utils/token';
import { getAuthorization } from '@/utils';

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
});

instance.interceptors.response.use(response => {
  return response.data;
}, _ => {
  if (_.response && _.response.status === 401) { // 登录过期, 跳转登录页面
    Vue.$toast.text((_.response.data && _.response.data.msg) || '登录过期');
    removeToken();
    setTimeout(() => {
      location.href = location.origin;
    }, 1000);
  }
  Vue.$toast.text((_.response.data && _.response.data.msg) || '请求失败');
  return Promise.reject(_);
});

export default instance;
