const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, //关闭语法检查

  devServer:{
    proxy: {
      '/api': { // api 匹配项 匹配拦截
        target: 'http://43.139.206.140:10010', // 原地址
        changeOrigin: true, // 允许跨域

        pathRewrite: {
          '^/api' : ''
          // 此前一般是替换为vue项目名称
          // 重写配置 被代理的接口会多一个'/api'的前缀 而原本的接口是没有的
          // 所以需要通过此项来将接口的前缀‘api’转换为‘’
        }
      }
    },
    open: true
  },
})
