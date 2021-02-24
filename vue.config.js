/*
 * @Author: astar
 * @Date: 2021-02-23 10:16:42
 * @LastEditors: astar
 * @LastEditTime: 2021-02-24 16:29:47
 * @Description: webpack配置
 * @FilePath: \vue-chat\vue.config.js
 */
module.exports = {
  publicPath: './',
  lintOnSave: true,
  devServer: {
    port: 2000,
    // proxy: {
    //   '/test-proxy': {
    //     target: 'http://192.168.22.173:3000',
    //     pathRewrite: {
    //       '^/test-proxy': ''
    //     }
    //   }
    // }
  },
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
  },
  chainWebpack (config) {
    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
      .end()
  }
}
