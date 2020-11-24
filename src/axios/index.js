/*
 * @author: cmx
 * @Date: 2020-09-09 17:08:05
 * @LastEditors: cmx
 * @LastEditTime: 2020-11-24 17:59:01
 * @Description: 封装axios
 * @FilePath: \vue-chat\src\axios\index.js
 */
import instance from './interceptors';
import { getToken } from '@/utils/token';

export const postRequest = function (url, data, config = {}) {
  if (!config.notToken) {
    config.headers = {
      authorization: 'Bearer ' + getToken() // jwt校验token
    }
  }

  return instance.post(url, data, config).then(res => {
    return res.data;
  }, _ => {
    return Promise.reject(_);
  });
};

export const getRequest = function (url, data, config = {}) {
  if (!config.notToken) {
    config.headers = {
      authorization: 'Bearer ' + getToken()
    }
  }

  return instance.get(url, data, config).then(res => {
    return res.data;
  }, _ => {
    return Promise.reject(_);
  });
};

export default instance;