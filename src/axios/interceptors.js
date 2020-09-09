/*
 * @author: cmx
 * @Date: 2020-09-09 17:27:10
 * @LastEditors: cmx
 * @LastEditTime: 2020-09-09 18:08:54
 * @Description: 定义拦截器
 * @FilePath: \vue-chat\src\axios\interceptors.js
 */

import axios from 'axios';
import { BASE_URL } from '@/config';

const instance = axios.create({
  baseURL: `http://${BASE_URL}`,
  timeout: 3000,
  headers: {
    'content-type': 'application/json'
  }
});

export default instance;
