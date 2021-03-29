/*
 * @Author: astar
 * @Date: 2021-02-25 18:08:42
 * @LastEditors: astar
 * @LastEditTime: 2021-03-29 15:49:47
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
const loadFunc = function (key, success, fail) {
  const target = config[key];

  if (!target) {
    fail(`模块${key}不存在`);
    return;
  }

  if (!target.depUrl) {
    fail(`${key}没有外部依赖`);
    return;
  }

  if (target.isReady) {
    success(key);
    return;
  }
  
  loadScript(target.depUrl, (res) => {
    target.isReady = true;
    res ? success(key) : fail(`模块${key}加载失败`);
    return;
  });
}

const asyncLoadJS = function (conf) {
  // 加载多个
  if (Array.isArray(conf)) {
    return Promise.all(
      conf.map(item => new Promise((resolve, reject) => loadFunc(item, resolve, reject)))
    );
  } else { // 加载一个
    return new Promise((resolve, reject) => {
      loadFunc(conf, resolve, reject);
    });
  }
}

export default asyncLoadJS;
