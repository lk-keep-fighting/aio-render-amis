import { defineConfig } from '@umijs/max';
const monaco = require('monaco-editor-webpack-plugin')

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  icons: { autoInstall: {} },
  chainWebpack(memo, args) {
    memo.plugin('monaco').use(monaco)
    return memo;
  },
  proxy: {
    '/api/form': {
      'target': 'http://192.168.44.70:5001',
      'changeOrigin': true,
      // 'pathRewrite': { '^/api': '' },
    },
    '/openai': {
      'target': 'http://18.191.186.114',
      'changeOrigin': true,
      'pathRewrite': { '^/openai': '' },
    }
  },
  routes: [
    {
      path: '/',
      redirect: '/page'
    },
    {
      name: '首页',
      path: '/page',
      routes:[
        {
          name: '页面渲染 ',
          path: '/page/:id',
          component: './Page',
        },
      ]
    },
  
    // {
    //   name: '权限演示',
    //   path: '/access',
    //   component: './Access',
    // },
    // {
    //   name: ' CRUD 示例',
    //   path: '/table',
    //   component: './Table',
    // },
    {
      name: '页面设计-',
      path: '/setting',
      layout: false,
      routes: [
        {
          name: '页面设计',
          path: '/setting/page/:id',
          component: './Setting/Page',
          layout: false
        },
      ]
    },

  ],
  npmClient: 'pnpm',
  esbuildMinifyIIFE: true
});

