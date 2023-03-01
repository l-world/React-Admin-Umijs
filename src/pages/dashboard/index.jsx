import React from 'react';
import { useSelector } from 'umi';
import './css/index.less'
import StaffAmount from './components/StaffAmount';
import OldStaffTable from './components/OldStaffTable';

const Dashborad = () => {
    const {amountList,oldStaffData } = useSelector(state => state.dashboard);
    console.log(amountList)
    return (
        <div className='dashboard-container'>
            {
                amountList.map( (props,index) => <StaffAmount key={index} {...props} />)
            }

            <OldStaffTable {...oldStaffData} />
        </div>
    )
}

export default Dashborad