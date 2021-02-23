/*
 * @Description: 
 * @Author: astar
 * @Date: 2021-02-10 14:50:36
 * @LastEditTime: 2021-02-23 16:52:31
 * @LastEditors: astar
 */
import { getToken } from '@/utils/token'

// 获取元素左上角位置
export const getElementPagePosition = function (element) {
  if (!element) return { x: 0, y: 0 }
  //计算x坐标
  var actualLeft = element.offsetLeft;
  var current = element.offsetParent;
  while (current !== null){
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }
  //计算y坐标
  var actualTop = element.offsetTop;
  current = element.offsetParent;
  while (current !== null){
    actualTop += (current.offsetTop+current.clientTop);
    current = current.offsetParent;
  }
  //返回结果
  return { x: actualLeft, y: actualTop }
}

// 获取authorization
export function getAuthorization () {
  return `Bearer ${getToken()}`;
}

// 通过require.context读取文件夹下的内容
export const requireAll = reqContextfunc => reqContextfunc.keys().map(reqContextfunc)