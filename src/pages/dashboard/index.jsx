import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'umi';
import './css/index.less'
import StaffAmount from './components/StaffAmount';
import OldStaffTable from './components/OldStaffTable';

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

            <OldStaffTable { ...staffData } />
        </div>
    )
}

export default Dashborad