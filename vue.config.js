// 再次插入以下代码
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // https://manga.bilibili.com/twirp/comic.v1.Comic/Banner?device=pc&platform=web
  devServer: {
    proxy: {
      '/twirp': {
        target: 'https://manga.bilibili.com',
        ws: false,
        changeOrigin: true,
        headers: {
          "content-type": 'application/json;charset=UTF-8',
          origin: 'https://manga.bilibili.com'
        },
        //重写代理路径
        pathRewrite: {
          "^/twirp": '/twirp'
        }

      },
      //https://api.bilibili.com/x/v2/reply
      '/x': {
        target: 'https://api.bilibili.com',
        ws: false,
        changeOrigin: true,
        headers: {
          // "content-type": 'application/json;charset=UTF-8',
          // origin: 'https://manga.bilibili.com',
          referer:'https://manga.bilibili.com/'
        },
        //重写代理路径
   
      }
    }
  },
  // 再次插入以下代码
  outputDir: './build',
  // 和webpapck属性完全一致，最后会进行合并
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components'
      }
    },
    //配置webpack自动按需引入element-plus，
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
})
