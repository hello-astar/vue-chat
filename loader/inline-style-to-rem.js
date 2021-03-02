/*
 * @Author: astar
 * @Date: 2021-02-26 15:18:50
 * @LastEditors: astar
 * @LastEditTime: 2021-03-02 16:55:29
 * @Description: 自己写一个loader，将内联样式的px转换为rem
 * @FilePath: \vue-chat\loader\inline-style-to-rem.js
 */
// loader-utils是专门用于自定义loader时的一些工具函数
const { getOptions } = require('loader-utils');
const regRules = require('./reg');
const defaultOptions = {
  rootValue: 100
}

module.exports = function (source) {
  let options = { ...defaultOptions, ...getOptions(this) };
  let backUp = source;

  if (regRules.contentReg.test(backUp)) {
    backUp = backUp.replace(regRules.contentReg, content => {
      // 1. 修改数字+px场景 100px => 1rem
      if (regRules.pxReg.test(content)) {
        content = content.replace(regRules.pxReg, (px, $1) => {
          return $1 / options.rootValue + 'rem'
        });
      }
      // 2. 修改${xxx}px场景 => ${(xxx) / 100}rem
      if (regRules.jsxReg.test(content)) {
        content = content.replace(regRules.jsxReg, (jsx, $1) => {
          return '${(' + $1 + ') / ' + options.rootValue + '}rem'
        });
      }

      // 3. xxx + 'px' 或 xxx + "px"
      if(regRules.expressionReg.test(content)) {
        content = content.replace(regRules.expressionReg, "$1 ($2) / " + options.rootValue + " + 'rem'")
      }
      return content;
    });
  }
  return backUp;
}