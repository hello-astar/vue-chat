/*
 * @Author: astar
 * @Date: 2020-09-09 17:08:05
 * @LastEditors: astar
 * @LastEditTime: 2021-02-24 14:44:05
 * @Description: 封装axios
 * @FilePath: \vue-chat\src\axios\index.js
 */
import instance from './interceptors';

export const postRequest = function (url, data, config = {}) {
  return instance.post(url, data, { ...config })
};

export const getRequest = function (url, data, config = {}) {
  return instance.get(url, { params: data, ...config })
};

export default instance;