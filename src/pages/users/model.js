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
            sessionStorage.setItem( 'userProfile',  JSON.stringify(data));
            // 不太懂
            yield put({
                type:'updateUserProfile',
                payload:{userInfo: data}
            })
        }
    },
}
