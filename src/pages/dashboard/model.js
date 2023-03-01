import $http from 'api';

export default {
    namespace: 'dashboard',
    state: {
        amountList:[],
        oldStaffData:{},
    },
    effects:{
        *initDashboardData({}, { put, call }) {
            const { data } = yield call($http.analyzeStaff);
            // console.log(data);
          },
    }
}