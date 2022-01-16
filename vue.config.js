/*
 * @Author: astar
 * @Date: 2021-02-23 10:16:42
 * @LastEditors: astar
 * @LastEditTime: 2022-01-16 22:32:11
 * @Description: webpack配置
 * @FilePath: \vue-chat\vue.config.js
 */
const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);
const judgeEnv = env => process.env.NODE_ENV === env;
const IS_DEVELOPMENT = judgeEnv('development');
const IS_PRODUCTION = judgeEnv('production');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const publicPath = IS_PRODUCTION ? '/chat' : '/';
module.exports = {
  publicPath,
  outputDir: path.join(__dirname, 'dist', publicPath),
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
      skipWaiting: true, // 是否跳过waiting状态,激活sw
      clientsClaim: true, // 通知让新的sw立即在页面上取得控制权
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
    plugins: IS_PRODUCTION ? [new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, 'dist'),
        outputDir: path.join(__dirname, 'dist', publicPath),
        indexPath: path.join(__dirname, 'dist', publicPath, '/index.html'),
        routes: ['/login', '/register'],
        renderer: new Renderer({
          inject: {
            foo: 'bar'
          },
          renderAfterDocumentEvent: 'render-event',
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        })
      })
    ] : []
  },
  chainWebpack (config) {
    IS_PRODUCTION && config.module
      .rule('images')
      .test(/\.(gif|png|jpe?g|svg)$/i)
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        mozjpeg: {
          progressive: true,
        },
        optipng: {
          enabled: false,
        },    
        pngquant: {
          quality: [0.65, 0.90],
          speed: 4
        },
        gifsicle: {
          interlaced: false,
        },
        webp: {
          quality: 75
        }
      })
      .end()
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
      .when(process.env.VUE_APP_OPEN_ANALYZER, config => {
        config
          .plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
          .end()
      })
  }
}
