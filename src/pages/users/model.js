import $http from 'api';
import {message} from 'antd'
export default  {
    namespace: "user",
    state:{
        userInfo:sessionStorage.getItem('userProfile') ?  JSON.parse(sessionStorage.getItem('userProfile')) : null
    },
    reducers:{
        updateUserProfile:( state, {payload} ) => ({...state, payload})
    },
    effects:{
        *login({ payload }, { put, call, select }){
            const { data, msg } = yield call( $http.userLogin, payload );
            console.log(data,msg);
            if(!data){
                message.error(msg);
                return;
            }   
            // 登录成功之后，请求路由表并缓存路由表
            const routeData = yield call( $http.getRouteList);
            sessionStorage.setItem( 'userProfile',  JSON.stringify(data));
            sessionStorage.setItem( 'routeList', JSON.stringify(routeData.data));
            // 不太懂
            yield put({
                type:'updateUserProfile',
                payload:{userInfo: data}
            })
        }
    },
}
