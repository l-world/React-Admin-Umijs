// webpack的requie.context 方法

const requireApi = require.context('.', true, /.js$/);
const module = [];
requireApi.keys().forEach( key => {
    if(key === './index.js' || key === 'http.js') return;
    Object.assign(module, requireApi(key));
} );
export default module;

// Failed to execute 'fetch' on 'Window': Request with GET/HEAD method cannot have body