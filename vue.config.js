/*
 * @Description: 
 * @Author: astar
 * @Date: 2020-09-16 21:13:56
 * @LastEditTime: 2021-01-27 13:54:48
 * @LastEditors: astar
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
