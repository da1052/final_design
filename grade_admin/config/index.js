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
      '/admin_classifyAll': {
        target: 'http://118.89.25.174:3000/admin_classifyAll',
        changeOrigin: true,
        pathRewrite: {
          '^/admin_classifyAll': '/'
        }
      },
      '/admin_classifyS': {
        target: 'http://118.89.25.174:3000/admin_classifyS',
        changeOrigin: true,
        pathRewrite: {
          '^/admin_classifyS': '/'
        }
      },
      '/admin_login': {
        target: 'http://118.89.25.174:3000/admin_login',
        changeOrigin: true,
        pathRewrite: {
          '^/admin_login': '/'
        }
      },
      '/admin_info': {
        target: 'http://118.89.25.174:3000/admin_info',
        changeOrigin: true,
        pathRewrite: {
          '^/admin_info': '/'
        }
      },
      '/admin_classify': {
        target: 'http://118.89.25.174:3000/admin_classify',
        changeOrigin: true,
        pathRewrite: {
          '^/admin_classify': '/'
        }
      },
      '/admin_course': {
        target: 'http://118.89.25.174:3000/admin_course',
        changeOrigin: true,
        pathRewrite: {
          '^/admin_course': '/'
        }
      },
      '/admin_inte': {
        target: 'http://118.89.25.174:3000/admin_inte',
        changeOrigin: true,
        pathRewrite: {
          '^/admin_inte': '/'
        }
      },
      '/info': {
        target: 'http://118.89.25.174:3000/info',
        changeOrigin: true,
        pathRewrite: {
          '^/info': '/'
        }
      },
      '/img': {
        target: 'http://118.89.25.174:3000/img',
        changeOrigin: true,
        pathRewrite: {
          '^/img': '/'
        }
      },
      '/admin_addClassifyAll': {
        target: 'http://118.89.25.174:3000/admin_addClassifyAll',
        changeOrigin: true,
        pathRewrite: {
          '^/admin_addClassifyAll': '/'
        }
      },
      '/admin_deleteClassifyAll': {
        target: 'http://118.89.25.174:3000/admin_deleteClassifyAll',
        changeOrigin: true,
        pathRewrite: {
          '^/admin_deleteClassifyAll': '/'
        }
      },
      '/admin_deleteClassifyS': {
        target: 'http://118.89.25.174:3000/admin_deleteClassifyS',
        changeOrigin: true,
        pathRewrite: {
          '^/admin_deleteClassifyS': '/'
        }
      },
      '/admin_img': {
        target: 'http://118.89.25.174:3000/admin_img',
        changeOrigin: true,
        pathRewrite: {
          '^/admin_img': '/'
        }
      },
      '/admin_addClassifyS': {
        target: 'http://118.89.25.174:3000/admin_addClassifyS',
        changeOrigin: true,
        pathRewrite: {
          '^/admin_addClassifyS': '/'
        }
      },
      '/admin_updateClassifyAll': {
        target: 'http://118.89.25.174:3000/admin_updateClassifyAll',
        changeOrigin: true,
        pathRewrite: {
          '^/admin_updateClassifyAll': '/'
        }
      },
      '/admin_updateClassifyS': {
        target: 'http://118.89.25.174:3000/admin_updateClassifyS',
        changeOrigin: true,
        pathRewrite: {
          '^/admin_updateClassifyS': '/'
        }
      },
      '/admin_addInfo': {
        target: 'http://118.89.25.174:3000/admin_addInfo',
        changeOrigin: true,
        pathRewrite: {
          '^/admin_addInfo': '/'
        }
      },
      '/admin_updateInfo': {
        target: 'http://118.89.25.174:3000/admin_updateInfo',
        changeOrigin: true,
        pathRewrite: {
          '^/admin_updateInfo': '/'
        }
      },
      '/admin_deleteInfo': {
        target: 'http://118.89.25.174:3000/admin_deleteInfo',
        changeOrigin: true,
        pathRewrite: {
          '^/admin_deleteInfo': '/'
        }
      },
      '/admin_addCourse': {
        target: 'http://118.89.25.174:3000/admin_addCourse',
        changeOrigin: true,
        pathRewrite: {
          '^/admin_addCourse': '/'
        }
      },
      '/admin_updateCourse': {
        target: 'http://118.89.25.174:3000/admin_updateCourse',
        changeOrigin: true,
        pathRewrite: {
          '^/admin_updateCourse': '/'
        }
      },
      '/admin_deleteCourse': {
        target: 'http://118.89.25.174:3000/admin_deleteCourse',
        changeOrigin: true,
        pathRewrite: {
          '^/admin_deleteCourse': '/'
        }
      },
      '/admin_addInte': {
        target: 'http://118.89.25.174:3000/admin_addInte',
        changeOrigin: true,
        pathRewrite: {
          '^/admin_addInte': '/'
        }
      },
      '/admin_updateInte': {
        target: 'http://118.89.25.174:3000/admin_updateInte',
        changeOrigin: true,
        pathRewrite: {
          '^/admin_updateInte': '/'
        }
      },
      '/admin_deleteInte': {
        target: 'http://118.89.25.174:3000/admin_deleteInte',
        changeOrigin: true,
        pathRewrite: {
          '^/admin_deleteInte': '/'
        }
      },
      '/admin_catalog': {
        target: 'http://118.89.25.174:3000/admin_catalog',
        changeOrigin: true,
        pathRewrite: {
          '^/admin_catalog': '/'
        }
      },
      '/admin_category': {
        target: 'http://118.89.25.174:3000/admin_category',
        changeOrigin: true,
        pathRewrite: {
          '^/admin_category': '/'
        }
      },
      '/admin_selectUser': {
        target: 'http://118.89.25.174:3000/admin_selectUser',
        changeOrigin: true,
        pathRewrite: {
          '^/admin_selectUser': '/'
        }
      },
      '/upload': {
        target: 'http://118.89.25.174:3000/upload',
        changeOrigin: true,
        pathRewrite: {
          '^/upload': '/'
        }
      }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
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
    assetsPublicPath: '/',

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
