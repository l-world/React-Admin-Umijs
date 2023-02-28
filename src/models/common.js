import $http from 'api';
export default {
    namespace: 'common',
    state:{},
    // 路由守卫，
    subscriptions:{
        setup({dispatch,history}){
             // 初始化查询用户是否登录，app.start阶段进行执行
            dispatch({type:queryUserLogin,payload:{history}})
        }
    },
    effects:{
        *queryUserLogin({payload},{put,call}){
            const { history , history:{location:{pathname}} } = payload;
            if( pathname !== '/users/login' && pathname !== '/users/forgetPassword' ){
                if( !sessionStorage.getItem('userProfile')  || 
                    !sessionStorage.getItem('token') || 
                    !sessionStorage.getItem('routeList') 
                ){
                    // 用户未登录，跳转至登录页面
                    history.replace('/users/login')
                }else{
                    // 用户满足条件，进行登录信息检测
                    const res = yield call($http.queryUserLogin);
                    if(res.code !== 0) return;
                    const {data : routeList} = yield call($http.getRouteList);
                    sessionStorage.setItem('routeList', JSON.stringify(routeList));
                }
            }else {
                // 不需要登录，清楚缓存
                sessionStorage.clear();
            }
        }
    }
}