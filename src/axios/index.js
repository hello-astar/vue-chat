/*
 * @author: cmx
 * @Date: 2020-09-09 17:08:05
 * @LastEditors: astar
 * @LastEditTime: 2020-09-21 01:32:46
 * @Description: 封装axios
 * @FilePath: \vue-chat\src\axios\index.js
 */
import instance from './interceptors';
import { getToken } from '@/utils/token';

export const postRequest = function (url, data, config = {}) {
  if (!config.notToken) {
    config.headers = {
      authorization: 'Bearer ' + getToken()
    }
  }

  return instance.post(url, data, config).then(res => {
    return res.data;
  }, _ => {
    return Promise.reject(_);
  });
};

export const getRequest = function (url, data) {
  console.log(url, data)
  // instance.get(url, data)
};

export default instance;