/*
 * @Author: astar
 * @Date: 2020-09-09 17:27:10
 * @LastEditors: astar
 * @LastEditTime: 2021-02-25 15:28:59
 * @Description: 定义拦截器
 * @FilePath: \vue-chat\src\axios\interceptors.js
 */
import { vm } from '../main.js';
import axios from 'axios';
import { removeToken } from '@/utils/token';
import { getAuthorization } from '@/utils';

const CUSTOM_CODE_MAP = {
  SUCCESS: 1,
  ERROR: -1
}
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
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
  vm.$toast.text('服务器请求失败')
  return Promise.reject(_);
});

instance.interceptors.response.use(response => {
  const res = response.data;
  switch (res.code) {
    case CUSTOM_CODE_MAP.SUCCESS: // 可在此添加自定义的code，返回成功
      return res;
    case CUSTOM_CODE_MAP.ERROR:
      vm.$toast.text(res.msg || '请求失败');
      return Promise.reject(res);
    default:
      vm.$toast.text(res.msg || '未知错误');
      return Promise.reject(res);
  }
}, _ => {
  console.error('服务器响应失败', _);
  if (_ && _.response && _.response.data) {
    vm.$toast.text((_.response.data && _.response.data.msg) || '请求失败');
    if (_.response.data.code === 401) { // 登录过期
      removeToken();
      vm.$router.push('/401');
    }
    return Promise.reject(_.response);
  }
  vm.$toast.text('服务器响应失败');
  return Promise.reject(_);
});

export default instance;
