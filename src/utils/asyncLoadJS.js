/*
 * @Author: astar
 * @Date: 2021-02-25 18:08:42
 * @LastEditors: astar
 * @LastEditTime: 2021-02-25 18:25:52
 * @Description: 加载js文件，返回promise
 * @FilePath: \vue-chat\src\utils\asyncLoadJS.js
 */
import { loadScript } from '@/utils';

const config = {
  'jsEncrypt': {
    depUrl: '//cdn.bootcdn.net/ajax/libs/jsencrypt/3.0.0-rc.1/jsencrypt.min.js',
    isReady: false
  }
}
const loadFunc = function (url, callback) {
  const target = config[url];

  if (!target) {
    return console.error('模块不存在');
  }

  if (!target.depUrl) {
    return console.error('没有外部依赖');
  }

  if (target.isReady) {
    return callback();
  }

  loadScript(target.depUrl, () => {
    target.isReady = true
    callback()
  })
}

const asyncLoadJS = function (conf) {
  return new Promise((resolve) => {
    loadFunc(conf, resolve);
  })
}
export default asyncLoadJS;
