/*
 * @Description: 
 * @Author: astar
 * @Date: 2021-06-26 18:16:11
 * @LastEditTime: 2021-07-06 17:13:01
 * @LastEditors: astar
 */
let baseURL = ''
if (process.env.NODE_ENV === 'development') {
  baseURL = 'https://192.168.0.102:3001/api'
} else {
  baseURL = '//hello-astar.asia/api'
}
export default baseURL