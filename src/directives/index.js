/*
 * @Author: astar
 * @Date: 2021-01-28 18:26:05
 * @LastEditors: astar
 * @LastEditTime: 2021-05-05 19:50:45
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\directives\index.js
 */
import { throttle, debounce } from '@/utils'
/**
 * 节流
 * @author astar
 * @date 2021-01-30 14:13
 */
export const throttleDirective = (Vue) => {
  Vue.directive('throttle', {
    bind: function (el, binding) {
      if (!Array.isArray(binding.value)) return;
      let event = binding.arg;
      let { last = false } = binding.modifiers; // 是否在脱离事件后最后执行一次
      let [fn = () => {}, delay = 500] = binding.value;
      el.addEventListener(event, throttle(fn, delay, last));
    }
  })
}

/**
 * 防抖
 * @author astar
 * @date 2021-01-30 14:14
 */
export const debounceDirective = (Vue) => {
  Vue.directive('debounce', {
    bind: function (el, binding) {
      if (!Array.isArray(binding.value)) return;
      let event = binding.arg;
      let [fn = () => {}, delay = 500] = binding.value;
      el.addEventListener(event, debounce(fn, delay));
    }
  })
}

/**
 * 监听长按事件
 * @author astar
 * @date 2021-03-31 14:11
 */
export const press = (Vue) => {
  Vue.directive('press', {
    bind: function (el, binding) {
      let delay = 650;
      let callback = binding.value;
      let startTime = null;
      let timer = null;
      let startP = null;
      function start () {
        startTime = new Date().getTime();
        timer = setTimeout(callback, delay);
      }
      function cancel (event) {
        let now = new Date().getTime();
        if (now - startTime < delay) {
          timer && clearTimeout(timer);
        } else {
          event.preventDefault(); // 在移动端，手指点击一个元素，会经过：touchstart --> touchmove -> touchend -->click , 使用preventDefault会阻止click事件的触发，因此判断为press事件后阻止click触发
        }
      }
      if ('ontouchstart' in window) {
        el.addEventListener('touchstart', (event) => {
          start(event);
          startP = event.touches[0];
        });
        el.addEventListener('touchmove', (event) => {
          let endP = event.touches[0];
          if (Math.sqrt((endP.clientX - startP.clientX) ^ 2 + (endP.clientY - startP.clientY) ^ 2) < 2) {
            timer && clearTimeout(timer);
            start(event);
          }
        });
        el.addEventListener('touchend', cancel);
      } else if ('onmousedown' in window) {
        el.addEventListener('mousedown', start);
        el.addEventListener('mouseup', cancel);
      }
    }
  })
}