import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'umi';
import './css/index.less'
import { StaffAmount, OldStaffTable,Pie } from './components'

const Dashborad = () => {
    const { amountList,pieList,columnList,marriageData,constellationData,staffData } = useSelector(state => state.dashboard);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'dashboard/initDashboardData' });
    }, []);

    return (
        <div className='dashboard-container'>
            {
                amountList.map( (item,index) => <StaffAmount key={index} {...item} />)
            }

            {/* 饼状图 */}
            {
                pieList.map( (item,index) => <Pie key={index} {...item} />)
            }

            {/* 最老员工情况 */}
            <OldStaffTable { ...staffData } />
        </div>
    )
}

export default Dashborad