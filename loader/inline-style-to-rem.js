/*
 * @Author: astar
 * @Date: 2021-02-26 15:18:50
 * @LastEditors: astar
 * @LastEditTime: 2021-02-26 18:28:07
 * @Description: 自己写一个loader，将内联样式的px转换为rem
 * @FilePath: \vue-chat\loader\inline-style-to-rem.js
 */
// loader-utils是专门用于自定义loader时的一些工具函数
const { getOptions } = require('loader-utils');
const defaultProps = {
  rootValue: 200,
  test: 10
}

function createPxReplace (viewportSize, minPixelValue, unitPrecision, viewportUnit) {
  return function ($0, $1) {
    if (!$1) return
    var pixels = parseFloat($1)
    if (pixels <= minPixelValue) return
    return toFixed((pixels / viewportSize * 100), unitPrecision) + viewportUnit
  }
}
function toFixed (number, precision) {
  var multiplier = Math.pow(10, precision + 1),
    wholeNumber = Math.floor(number * multiplier)
  return Math.round(wholeNumber / 10) * 10 / multiplier
}

module.exports = function (source) {
  // const options = { ...defaultProps, ...getOptions(this) };
  // console.log(options);
  // const TEMPLATE_REG = new RegExp(/<template>([\s\S]+)(([\s\S]+)px)([\s\S]+)<\/template>/, 'gi');
  // const PX_REG = new RegExp(/([\s\S]+)px/, 'gi');
  // let _source = source.match(TEMPLATE_REG)[0];
  // console.log(_source.replace(TEMPLATE_REG, '$1555px$3'))
  // console.log(_source)
  // if (PX_REG.test(_source)) {
  //   console.log('ggg')
  //   let $_source = _source.replace(PX_REG, "$1$2rem$3")
  //   console.log($_source)
  //   // let $_source = _source.replace(PX_REG, createPxReplace(options.viewportWidth, options.minPixelValue, options.unitPrecision, options.viewportUnit));
  //   // return source.replace(TEMPLATE_REG, $_source);
  // }
  return '';
}