/*
 * @author: cmx
 * @Date: 2020-09-09 17:08:05
 * @LastEditors: astar
 * @LastEditTime: 2020-09-09 21:35:01
 * @Description: 封装axios
 * @FilePath: \vue-chat\src\axios\index.js
 */
import instance from './interceptors';
import { getUUID } from '@/utils/uuid';
 
export const postRequest = function (url, data) {
  return instance.post(url, { ...data, uuid: getUUID() }).then(res => {
    return res.data;
  }, _ => {
    console.log(_);
    return _;
  });
};

export const getRequest = function (url, data) {
  console.log(url, data)
  // instance.get(url, data)
};

export default instance;