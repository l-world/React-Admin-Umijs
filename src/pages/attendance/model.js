import $http from 'api';

export default {
    namespace: 'attendance',
    state:{
        tableList:[],
        chartList:[],
    },
    reducers:{
        formatData(state, { payload}){
            const formatData = {
                tableList: [
                    { title:"迟到情况", renderList: payload.lateTable },
                    { title:"早退情况", renderList: payload.earlyTable },
                ],
                chartList: [
                    { title:"迟到员工数量", renderList: payload.lateBI },
                    { title:"早退员工数量", renderList: payload.earlyBI }
                ]
            }
            return { ...state, ...formatData}
        }
    },
    effects:{
        *initAttendanceTable(  {}, { put, call}){
            const { data, code} = yield call( $http.getAttendanceTable);
            
            if(code) return;
            yield put( { type: 'format', payload : data } );
        }
    }
}