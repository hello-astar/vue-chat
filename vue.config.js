/*
 * @Description: 
 * @Author: astar
 * @Date: 2020-09-16 21:13:56
 * @LastEditTime: 2021-01-13 15:22:34
 * @LastEditors: cmx
 */
module.exports = {
    publicPath: './',
    lintOnSave: true,
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({
                        rootValue: 100, // 换算的基数
                        propList: ['*'],
                    }),
                ]
            }
        }
    }
}
