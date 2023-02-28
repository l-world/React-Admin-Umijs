import ajax from '../http.js'

// 用户登录接口
export const userLogin = params =>  ajax.post('/login', params);

// 获取手机验证码
export  const getSmCode = params => ajax.get('/getCode', params);

// 检测验证码输入的是否正确-重置密码使用的接口
export const checkedCode = params => ajax.get('/checkSmCode', params);

// 重置密码
export const resetPassword = params => ajax.post('/resetPassword', params);

// 检测用户是否登录
export const queryUserLogin = () => ajax.get('/queryLoginStatus');
// 获取路由表
export const getRouteList = () => ajax.get('//getRouteList');


