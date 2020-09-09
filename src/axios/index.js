/*
 * @author: cmx
 * @Date: 2020-09-09 17:08:05
 * @LastEditors: cmx
 * @LastEditTime: 2020-09-09 18:08:42
 * @Description: 封装axios
 * @FilePath: \vue-chat\src\axios\index.js
 */
import instance from './interceptors';

export const postRequest = function (url, data) {
  return instance.post(url, data).then(res => {
    return res.data;
  }, _ => {
    console.log(res);
    return res;
  });
};

export const getRequest = function (url, data) {
  console.log(url, data)
  // instance.get(url, data)
};

export default instance;