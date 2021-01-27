/*
 * @Author: astar
 * @Date: 2020-09-09 17:08:05
 * @LastEditors: astar
 * @LastEditTime: 2021-01-27 13:56:40
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

  return instance.post(
    url,
    data,
    {
      validateStatus: function (status) { return status < 500 } ,
      ...config
    }
  ).then(res => {
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

  return instance.get(url, data, {
    validateStatus: function (status) { return status < 500 } ,
    ...config
  }).then(res => {
    return res.data;
  }, _ => {
    return Promise.reject(_);
  });
};

export default instance;