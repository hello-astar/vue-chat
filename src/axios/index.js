/*
 * @author: cmx
 * @Date: 2020-09-09 17:08:05
 * @LastEditors: cmx
 * @LastEditTime: 2020-09-10 16:37:02
 * @Description: 封装axios
 * @FilePath: \vue-chat\src\axios\index.js
 */
import instance from './interceptors';
import { getUUID } from '@/utils/uuid';
 
export const postRequest = function (url, data) {
  return instance.post(url, { ...data, uuid: getUUID() }).then(res => {
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