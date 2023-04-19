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
  routes: [
    {
      name: '页面设计',
      path: '/setting/page/:id',
      component: './Setting/Page',
      layout:false
    },
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
    {
      name: '页面渲染 ',
      path: '/page/:id',
      component: './Page',
    },
  ],
  npmClient: 'pnpm',
  esbuildMinifyIIFE: true
});

