/*
 * @Author: astar
 * @Date: 2021-02-23 10:16:42
 * @LastEditors: astar
 * @LastEditTime: 2021-07-06 16:20:35
 * @Description: webpack配置
 * @FilePath: \vue-chat\vue.config.js
 */
const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);
const judgeEnv = env => process.env.NODE_ENV === env;
const IS_DEVELOPMENT = judgeEnv('development');
// const IS_PRODUCTION = judgeEnv('production');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

module.exports = {
  publicPath: '/',
  lintOnSave: IS_DEVELOPMENT,
  productionSourceMap: false,
  devServer: {
    port: 2000,
    open: false,
    https: true,
    proxy: {
      '/test-proxy': {
        target: 'http://192.168.22.173:3000',                                          
        pathRewrite: {
          '^/test-proxy': ''
        }
      }
    }
  },
  pwa: {
    workboxOptions: {
      // https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
      skipWaiting: true,
      clientsClaim: true,
      importWorkboxFrom: 'local',
      importsDirectory: 'js',
      navigateFallback: '/',
      navigateFallbackBlacklist: [/\/api\//]
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 100, // 换算的基数
            propList: ['*']
          }),
        ]
      }
    }
  },
  configureWebpack: {
    externals: {
      jsEncrypt: 'JSEncrypt'
    },
    plugins: [
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, 'dist'),
        routes: [ '/login' ],
        renderer: new Renderer({
          inject: {
            foo: 'bar'
          },
          renderAfterDocumentEvent: 'render-event',
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        })
      })
    ]
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
    
    config.module
      .rule('vue')
      .test(/\.vue$/)
      .use('vue-inline-px-to-rem')
      .loader('vue-inline-px-to-rem')
      .options({
        rootValue: 100
      })
      .end()
    config
      .when(IS_DEVELOPMENT && process.env.VUE_APP_OPEN_ANALYZER === 'true', config => {
        config
          .plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
          .end()
      })
  }
}
