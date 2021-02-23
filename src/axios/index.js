/*
 * @Author: astar
 * @Date: 2020-09-09 17:08:05
 * @LastEditors: astar
 * @LastEditTime: 2021-02-23 15:13:20
 * @Description: 封装axios
 * @FilePath: \vue-chat\src\axios\index.js
 */
import instance from './interceptors';

export const postRequest = function (url, data, config = {}) {
  return instance.post(url, data, { ...config }).then(res => {
    return res;
  }, _ => {
    return Promise.reject(_);
  });
};

export const getRequest = function (url, data, config = {}) {
  return instance.get(url, { params: data, ...config }).then(res => {
    return res;
  }, _ => {
    return Promise.reject(_);
  });
};

export default instance;