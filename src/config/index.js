/*
 * @Description: 
 * @Author: astar
 * @Date: 2021-06-26 18:16:11
 * @LastEditTime: 2021-12-11 14:32:37
 * @LastEditors: astar
 */
let baseURL = ''
if (process.env.NODE_ENV === 'development') {
  baseURL = 'https://localhost:3001'
} else {
  baseURL = 'https://hello-astar.asia/api'
}
export default baseURL