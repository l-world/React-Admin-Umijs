import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'umi';
import './css/index.less'
import StaffAmount from './components/StaffAmount';
import OldStaffTable from './components/OldStaffTable';

const Dashborad = () => {
    const {amountList,oldStaffData } = useSelector(state => state.dashboard);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'dashboard/initDashboardData' });
    }, []);

    return (
        <div className='dashboard-container'>
            {
                amountList.map( (props,index) => <StaffAmount key={index} {...props} />)
            }

            {/* <OldStaffTable {...oldStaffData} /> */}
        </div>
    )
}

export default Dashborad