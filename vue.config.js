/*
 * @Author: astar
 * @Date: 2021-02-23 10:16:42
 * @LastEditors: astar
 * @LastEditTime: 2021-02-24 18:10:09
 * @Description: webpack配置
 * @FilePath: \vue-chat\vue.config.js
 */
const judgeEnv = env => process.env.NODE_ENV === env;
const IS_DEVELOPMENT = judgeEnv('development');
// const IS_PRODUCTION = judgeEnv('production'); // 暂时没用

module.exports = {
  publicPath: './',
  lintOnSave: IS_DEVELOPMENT,
  productionSourceMap: false,
  devServer: {
    port: 2000,
    open: false,
    proxy: {
      '/test-proxy': {
        target: 'http://192.168.22.173:3000',
        pathRewrite: {
          '^/test-proxy': ''
        }
      }
    }
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
      .when(IS_DEVELOPMENT && Boolean(process.env.VUE_APP_OPEN_ANALYZER), config => {
        config
          .plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
          .end()
      })
  }
}
