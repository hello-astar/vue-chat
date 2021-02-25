/*
 * @Author: astar
 * @Date: 2021-02-23 10:16:42
 * @LastEditors: cmx
 * @LastEditTime: 2021-02-25 18:36:12
 * @Description: webpack配置
 * @FilePath: \vue-chat\vue.config.js
 */
const path = require('path');
// const CompressionPlugin = require('compression-webpack-plugin');
const resolve = (dir) => path.join(__dirname, dir);
const judgeEnv = env => process.env.NODE_ENV === env;
const IS_DEVELOPMENT = judgeEnv('development');
// const IS_PRODUCTION = judgeEnv('production');

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
  configureWebpack: {
    externals: {
      JSEncrypt: 'jsEncrypt'
    }
  },
  chainWebpack (config) {
    // 配置svgIcons，https://juejin.cn/post/6844903517564436493#heading-0
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    config
      .when(IS_DEVELOPMENT && process.env.VUE_APP_OPEN_ANALYZER === 'true', config => {
        config
          .plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
          .end()
      })
    // config
    //   .when(IS_PRODUCTION, config => {
    //     config
    //       .plugin('compressionPlugin')
    //       .use(new CompressionPlugin({
    //         // filename: '[path].gz[query]',
    //         algorithm: 'gzip',
    //         test: new RegExp(/\.(js)$/),
    //         threshold: 10240,
    //         minRatio: 0.8,
    //         // deleteOriginalAssets: true
    //       }))
    //       .end()
    //   })
  }
}
