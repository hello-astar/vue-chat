/*
 * @Description: 
 * @Author: astar
 * @Date: 2021-02-10 14:50:36
 * @LastEditTime: 2021-04-09 15:40:07
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
  return { x: actualLeft + 'px', y: actualTop + 'px' }
}

// 获取authorization
export function getAuthorization () {
  return `Bearer ${getToken()}`;
}

// 通过require.context读取文件夹下的内容
export const requireAll = reqContextfunc => reqContextfunc.keys().map(reqContextfunc);

// 路由懒加载
export const pipe = path => () => import(`@/views/${path}`);

// 加载js链接
export const loadScript = (url, cb = function () {}) => {
  const elem = document.createElement('script');
  elem.type = 'text/javascript';
  elem.addEventListener('load', function () { cb(true) }, false);
  elem.addEventListener('error', function () { cb(false) }, false);
  elem.src = url;
  elem.crossorigin = 'anonymous';
  document.body.appendChild(elem);
}

/**
 * 防抖
 * @author astar
 * @date 2021-03-31 18:24
 * @param {Function} fn - 绑定的函数
 * @param {Number} delay - 时间间隔(ms)
 * @returns {*}
 */
export const debounce = (fn, delay = 1000) => {
  let timer = null;
  return function () {
    timer && clearTimeout(timer);
    let args = arguments;
    let context = this;
    timer = setTimeout(function () {
      fn.apply(context, args);
      timer = null;
    }, delay);
  }
}

/**
 * 节流
 * @author astar
 * @date 2021-03-31 18:18
 * @param {Function} fn - 绑定的函数
 * @param {Number} delay - 时间间隔(ms)
 * @param {Boolean} last - 是否在脱离事件后执行最后一次
 * @returns {*}
 */
export const throttle = (fn, delay = 1000, last = false) => {
  let timer = null;
  let start = null;
  return function () {
    last && timer && clearTimeout(timer);
    let now = new Date();
    let context = this;
    let args = arguments;
    if (!start || now - start >= delay) {
      fn.apply(context, args);
      start = now;
    } else {
      if (last) { // 脱离事件后执行最后一次 // 一般用于触底加载之类 // 防止重复提交不需要执行最后一次
        timer = setTimeout(() => {
          fn.apply(context, args);
          start = new Date();
        }, delay - (now - start));
      }
    }
  }
}
