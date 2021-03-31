/*
 * @Author: astar
 * @Date: 2021-01-28 18:26:05
 * @LastEditors: astar
 * @LastEditTime: 2021-03-31 18:27:21
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
      if (!Object.keys(binding.modifiers).length) {
        console.warn('[v-throttle] - please specify an event');
        return;
      }
      let event = Object.keys(binding.modifiers)[0];
      let [fn, delay] = binding.value;
      el.addEventListener(event, throttle(fn, delay));
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
      if (!Object.keys(binding.modifiers).length) {
        console.warn('[v-debounce] - please specify an event');
        return;
      }
      let event = Object.keys(binding.modifiers)[0];
      let [fn, delay] = binding.value;
      el.addEventListener(event, debounce(fn, delay));
    }
  })
}

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