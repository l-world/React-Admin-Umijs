import React from 'react';
import { useSelector } from 'umi';
import './css/index.less'
import StaffAmount from './components/StaffAmount';

const Dashborad = () => {
    const {amountList} = useSelector(state => state.dashboard);
    console.log(amountList)
    return (
        <div className='dashboard-container'>
            {
                amountList.map( (props,index) => <StaffAmount key={index} {...props} />)
            }
        </div>
    )
}

export default Dashborad