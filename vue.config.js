/*
 * @Description: 
 * @Author: astar
 * @Date: 2020-09-16 21:13:56
 * @LastEditTime: 2021-02-23 18:27:54
 * @LastEditors: astar
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
