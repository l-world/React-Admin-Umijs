import $http from 'api';

export default {
    namespace:"department",
    state:{
        departmentList:[],
        departmentDetail:null
    },
    reducers:{
        // 保存部门列表
        saveDepartmentList:(state,{payload}) => ( {...state, ...payload} ),
        // 保存部门详情
        saveDepartmentDetail:(state,{payload}) => ({...state, ...payload})
    },
    effects:{
        // 获取部门列表
        *_initDepartmentList({payload},{put,call}){
            const {data} = yield call($http.getDepartmentList,payload);
            yield put(
                {
                    type:'saveDepartmentList',
                    payload:{ departmentList: data.list }
                }
            )
        },

        // 获取部门详情
        *_getDepartmentDetail( {payload}, {put,call} ){
            const {data} = yield call($http.getDepartmentDetail, payload);
            yield put ({
                type:'saveDepartmentDetail',
                payload:{ departmentDetail:data }
            })
        }
    }
}