/*
 * @Author: astar
 * @Date: 2021-01-28 18:26:05
 * @LastEditors: astar
 * @LastEditTime: 2021-01-30 14:20:13
 * @Description: 文件描述
 * @FilePath: \vue-chat\src\directives\index.js
 */
/**
 * 节流
 * @author astar
 * @date 2021-01-30 14:13
 */
export const throttle = (Vue) => {
  Vue.directive('throttle', {
    bind: function (el, binding) {
      let [fn, event, delay] = binding.value;
      let timer = null;
      el.addEventListener(event, () => {
        if (timer) return;
        fn();
        timer = setTimeout(() => {
          timer = null;
        }, delay);
      })
    }
  })
}

/**
 * 防抖
 * @author astar
 * @date 2021-01-30 14:14
 */
export const debounce = (Vue) => {
  Vue.directive('debounce', {
    bind: function (el, binding) {
      let [fn, event, delay] = binding.value;
      let timer = null;
      el.addEventListener(event, () => {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
          fn();
        }, delay);
      })
    }
  })
}