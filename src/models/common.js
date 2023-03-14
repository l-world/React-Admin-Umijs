import $http from 'api';
export default {
    namespace: 'common',
    state:{
        collapse:false, //监听侧边栏是否折叠
        isShowDetailDialog:false,
        isClearForm:false,
        ids:[],
    },
    // 路由守卫，
    subscriptions:{
        setup({dispatch,history}){
             // 初始化查询用户是否登录，app.start阶段进行执行
            dispatch({type:'queryUserLogin',payload:{history}})
        }
    },
    reducers:{
        // 改变菜单折叠状态
        changeCollapse:(state,{payload}) => ({ ...state, ...payload }),
        setShowDetailDialog: (state, { payload }) => ({ ...state, ...payload }),
        // 清空搜索表单
        clearForm: (state, { payload }) => ({ ...state, ...payload }),
        //保存需要删除的id集合
        saveSelectIds: (state, { payload }) => ({ ...state, ...payload }),
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
                    sessionStorage.setItem('routeList', JSON.stringify(routeList || []));
                }
            }else {
                // 不需要登录，清楚缓存
                sessionStorage.clear();
            }

             //- 判定用户当前的访问路径
        }
    }
}