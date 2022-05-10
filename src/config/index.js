/*
 * @Description: 
 * @Author: astar
 * @Date: 2021-06-26 18:16:11
 * @LastEditTime: 2021-12-11 14:32:37
 * @LastEditors: astar
 */
let baseURL = ''
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://192.168.0.100:2000/test-proxy'
} else {
  baseURL = 'https://hello-astar.asia/api'
}
export default baseURL