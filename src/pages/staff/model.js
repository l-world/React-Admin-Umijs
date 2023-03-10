import $http from 'api';

export default {
    namespace: 'staff',
    state: {
        staffList: [],
        staffTotal: 0,
        staffDetail: null,
    },
    reducers: {
        saveStaffList: (state, { payload }) => ({ ...state, ...payload }),
        saveStaffTotal: (state, { payload }) => ({ ...state, ...payload }),
        saveStaffDetail: (state, { payload }) => ({ ...state, ...payload }),
    },
    effects: {
        *initStaffList({ payload }, { put, call }) {
            const { data: { staffList, staffTotal } } = yield call($http.getStaffList, payload);
            yield put({ type: 'saveStaffList', payload: { staffList } });
            yield put({ type: 'saveStaffTotal', payload: { staffTotal } });
        },
        *_getStaffDetail( { payload }, {put, call}){
            const { data, msg} = yield call($http.getStaffDetail, payload);
            yield put( { type: 'saveStaffDetail', payload: { staffDetail:data } });
            yield put( { type: 'common/setShowDetailDialog', payload: { isShowDetailDialog:true}});
        }
    }
}