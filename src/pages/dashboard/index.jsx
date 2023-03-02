import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'umi';
import './css/index.less'
import AllComp from './components'
const { StaffAmount, OldStaffTable, Pie, AgeColumn, Histogram } = AllComp
const Dashborad = () => {
    const { amountList,pieList,columnList,marriageData,constellationData,staffData } = useSelector(state => state.dashboard);
    const dispatch = useDispatch();

    // console.log(pieList)

    useEffect(() => {
        dispatch({ type: 'dashboard/initDashboardData' });
    }, []);

    return (
        <div className='dashboard-container'>
            { amountList.map( (item,index) => <StaffAmount key={index} {...item} />) }

            {/* 饼状图 */}
            { pieList.map( (item,index) => <Pie key={index} {...item} />) }

            { pieList[1] && <AgeColumn {...pieList[1]} /> }

            {/* 最老员工情况 */}
            <OldStaffTable { ...staffData } />

            {/* 空心圆 员工婚姻状况分析 */}
            <Pie {...marriageData} /> 

            {/* 星座分析 */}
            <Pie {...constellationData} /> 

            { 
                columnList.map( ( item, index) => <Histogram {...item} key={index} />)
            }

        </div>
    )
}

export default Dashborad