// webpack的requie.context 方法

const requireApi = require.context('.', true, /.js$/);
const module = [];
requireApi.keys().forEach( key => {
    if(key === './index.js' || key === 'http.js') return;
    Object.assign(module, requireApi(key));
} );
export default module;