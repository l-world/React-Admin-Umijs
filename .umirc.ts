import { defineConfig } from 'umi';
const { resolve } = require('path');

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // 解决dva重复加载数据的问题
  dynamicImport: {
    loading: '@/components/Loading',
  },
  alias: {
    utils: resolve(__dirname, './src/utils'),
    components: resolve(__dirname, './src/components'),
    common: resolve(__dirname, './src/common'),
    api: resolve(__dirname, './src/servicer'),
    hook: resolve(__dirname, './src/hook'),
    staticList: resolve(__dirname, './src/staticList'),
  },
  //   routes: [
  //     { path: '/', component: '@/pages/index' },
  //   ],
  fastRefresh: {},
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
    },
  },
  chainWebpack: function (config, { webpack }) {
    config.merge({
      optimization: {
        minimize: true,
        splitChunks: {
          chunks: 'async',
          minSize: 30000, //文件最小打包体积，单位byte，默认30000，若单个文件不满足会合并其他文件组成一个
          minChunks: 2, //最小使用到次数，超过2次执行
          automaticNameDelimiter: '.', //连接符
          cacheGroups: {
            vendors: {
              // 基本框架
              name: 'vendors',
              test: /^.*node_modules[\\/](?!react|react-dom|antd).*$/,
              chunks: 'all',
              priority: 10,
            },
            // echartsVenodr: {
            //     // 异步加载echarts包
            //     name: 'echartsVenodr',
            //     test: /(echarts|zrender)/,
            //     chunks: 'async',
            //     priority: 10, // 高于async-commons优先级
            // },
            'async-commons': {
              // 其余异步加载包
              chunks: 'async',
              minChunks: 2,
              name: 'async-commons',
              priority: 9,
            },
            commons: {
              // 其余同步加载包
              chunks: 'all',
              minChunks: 2,
              name: 'commons',
              priority: 8,
            },
          },
        },
      },
    });
    config
      .plugin('replace')
      .use(require('webpack').ContextReplacementPlugin)
      .tap(() => {
        return [/moment[/\\]locale$/, /zh-cn/];
      });
  },
});
