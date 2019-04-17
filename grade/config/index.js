'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/collection_course': {
        target: 'http://118.89.25.174:3000/collection_course',
        changeOrigin: true,
        pathRewrite: {
          '^/collection_course': '/'
        }
      },
      '/user_img_update': {
        target: 'http://118.89.25.174:3000/user_img_update',
        changeOrigin: true,
        pathRewrite: {
          '^/user_img_update': '/'
        }
      },
      '/personUpdate': {
        target: 'http://118.89.25.174:3000/personUpdate',
        changeOrigin: true,
        pathRewrite: {
          '^/personUpdate': '/'
        }
      },
      '/info': {
        target: 'http://118.89.25.174:3000/info',
        changeOrigin: true,
        pathRewrite: {
          '^/info': '/'
        }
      },
      '/course': {
        target: 'http://118.89.25.174:3000/course',
        changeOrigin: true,
        pathRewrite: {
          '^/course': '/'
        }
      },
      '/classify': {
        target: 'http://118.89.25.174:3000/classify',
        changeOrigin: true,
        pathRewrite: {
          '^/classify': '/'
        }
      },
      // '/classify/HTML': {
      //   target: 'http://118.89.25.174:3000/classify/HTML',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/classify/HTML': '/'
      //   }
      // },
      '/img': {
        target: 'http://118.89.25.174:3000/img',
        changeOrigin: true,
        pathRewrite: {
          '^/img': '/'
        }
      },
      '/detail': {
        target: 'http://118.89.25.174:3000/detail',
        changeOrigin: true,
        pathRewrite: {
          '^/detail': '/'
        }
      },
      '/upload': {
        target: 'http://118.89.25.174:3000/upload',
        changeOrigin: true,
        pathRewrite: {
          '^/upload': '/'
        }
      },
      '/login': {
        target: 'http://118.89.25.174:3000/login',
        changeOrigin: true,
        pathRewrite: {
          '^/login': '/'
        }
      },
      '/issue': {
        target: 'http://118.89.25.174:3000/issue',
        changeOrigin: true,
        pathRewrite: {
          '^/issue': '/'
        }
      },
      '/user_img': {
        target: 'http://118.89.25.174:3000/user_img',
        changeOrigin: true,
        pathRewrite: {
          '^/user_img': '/'
        }
      },
      '/inte': {
        target: 'http://118.89.25.174:3000/inte',
        changeOrigin: true,
        pathRewrite: {
          '^/inte': '/'
        }
      },
      '/comment': {
        target: 'http://118.89.25.174:3000/comment',
        changeOrigin: true,
        pathRewrite: {
          '^/comment': '/'
        }
      },
      '/person': {
        target: 'http://118.89.25.174:3000/person',
        changeOrigin: true,
        pathRewrite: {
          '^/person': '/'
        }
      },
      '/question': {
        target: 'http://118.89.25.174:3000/question',
        changeOrigin: true,
        pathRewrite: {
          '^/question': '/'
        }
      },
      '/delete_question': {
        target: 'http://118.89.25.174:3000/delete_question',
        changeOrigin: true,
        pathRewrite: {
          '^/delete_question': '/'
        }
      },
      '/password': {
        target: 'http://118.89.25.174:3000/password',
        changeOrigin: true,
        pathRewrite: {
          '^/password': '/'
        }
      },
      '/new_password': {
        target: 'http://118.89.25.174:3000/new_password',
        changeOrigin: true,
        pathRewrite: {
          '^/new_password': '/'
        }
      },
      '/repeat_user': {
        target: 'http://118.89.25.174:3000/repeat_user',
        changeOrigin: true,
        pathRewrite: {
          '^/repeat_user': '/'
        }
      },
      '/repeat_phone_email': {
        target: 'http://118.89.25.174:3000/repeat_phone_email',
        changeOrigin: true,
        pathRewrite: {
          '^/repeat_phone_email': '/'
        }
      },
      '/add_user': {
        target: 'http://118.89.25.174:3000/add_user',
        changeOrigin: true,
        pathRewrite: {
          '^/add_user': '/'
        }
      },
      '/add_collection': {
        target: 'http://118.89.25.174:3000/add_collection',
        changeOrigin: true,
        pathRewrite: {
          '^/add_collection': '/'
        }
      },
      '/delete_collection': {
        target: 'http://118.89.25.174:3000/delete_collection',
        changeOrigin: true,
        pathRewrite: {
          '^/delete_collection': '/'
        }
      },
      '/select_collection': {
        target: 'http://118.89.25.174:3000/select_collection',
        changeOrigin: true,
        pathRewrite: {
          '^/select_collection': '/'
        }
      },
      '/collection': {
        target: 'http://118.89.25.174:3000/collection',
        changeOrigin: true,
        pathRewrite: {
          '^/collection': '/'
        }
      },
      '/images': {
        target: 'http://118.89.25.174:3000/images',
        changeOrigin: true,
        pathRewrite: {
          '^/images': '/'
        }
      },
      '/admin_updateInte': {
        target: 'http://118.89.25.174:3000/admin_updateInte',
        changeOrigin: true,
        pathRewrite: {
          '^/admin_updateInte': '/'
        }
      }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST 128.23.79.163
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
