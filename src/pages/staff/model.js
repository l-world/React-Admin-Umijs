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
            yield put({ type: 'staffList', payload: { staffList } });
            yield put({ type: 'staffTotal', payload: { staffTotal } });
        }
    }
}