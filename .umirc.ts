import { defineConfig } from 'umi';
const { resolve } = require('path');

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  alias:{
    utils:resolve(__dirname,'./src/utils'),
    components:resolve(__dirname,'./src/components'),
    common:resolve(__dirname,'./src/common'),
    api: resolve(__dirname,'./src/servicer'),
  },
//   routes: [
//     { path: '/', component: '@/pages/index' },
//   ],
  fastRefresh: {},
  proxy:{
    '/api': {
        target: 'http://127.0.0.1:7001',
        changeOrigin: true,
      },
  }
});
