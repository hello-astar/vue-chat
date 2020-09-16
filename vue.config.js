/*
 * @Description: 
 * @Author: astar
 * @Date: 2020-09-16 21:13:56
 * @LastEditTime: 2020-09-17 00:54:28
 * @LastEditors: astar
 */
module.exports = {
  lintOnSave: true,
  css: {
      loaderOptions: {
          postcss: {
              plugins: [
                  require('postcss-pxtorem')({
                      rootValue : 100, // 换算的基数
                      propList   : ['*'],
                  }),
              ]
          }
      }
  }
}
