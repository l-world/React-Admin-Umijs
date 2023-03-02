import $http from 'api';

export default {
    namespace: 'dashboard',
    state: {
        // 员工人数统计
        amountList:[],
        // 饼状图数据
        pieList:[],
        // 柱状图数据
        columnList:[],
        // 婚姻状况数据
        marriageData:{},
        // 星座分布数据
        constellationData:[],
        // 最老的员工
        staffData:{}
    },
    reducers:{
        formatData( state, { payload } ){
            const { data }  = payload;
            const filterData = {
                amountList:[
                    { title:"总人数", amount:data.total, styleData:{ width:"100%", height:"170px"}},
                    { title:"入职一年内员工", amount:data.onboardingTimeData.one, styleData:{ width:"33%", height:"170px"}},
                    { title:"入职俩年内员工", amount:data.onboardingTimeData.two, styleData:{ width:"33%", height:"170px"}},
                    { title:"入职3年以上员工", amount:data.onboardingTimeData.three, styleData:{ width:"33%", height:"170px"}},
                ],
                pieList:[
                    { title:"学历情况", renderList: data.educationList, styleData:{ width: "49.8%",height:"350px" }},
                    { title:"员工性别占比", renderList: data.genderList, styleData:{ width: "49.8%",height:"350px" }, showSider: true},
                ],
                columnList:[
                    { title:"员工年龄段", renderList: data.ageMap, styleData:{ width: "49.8%",height:"350px"}},
                    { title:"部门员工数量", renderList: data.departmentList, styleData:{ width: "49.8%",height:"350px"}},
                ],
                marriageData:{
                    title:"员工婚姻状况", 
                    renderList: data.marriageList, 
                    styleData:{ width: "49.8%",height:"350px"},
                    isEmpty:true,
                },
                constellationData: {
                    title: '员工星座分布',
                    renderList: data.constellationList,
                    styleData: { width: '49.8%', height: '350px' },
                    isArea:true,
                },
                staffData: {
                    title: '工龄最老的10个人',
                    renderList: data.wordingYearsMaps,
                    styleData: { width: '49.8%', height: '350px' },
                },
            }
            return { ...state, ...filterData}
        }
    },
    effects:{
        *initDashboardData({}, { put, call }) {
            const { data } = yield call($http.analyzeStaff);
            yield put( { type: 'formatData', payload: { data } } )
          },
    }
}