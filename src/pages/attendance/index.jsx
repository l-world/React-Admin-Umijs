import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'umi';
import ViolationChart from './component/ViolationChart';
import ViolationTable from './component/ViolationTable';
import './index.less'

const attendance = () => {
    const { tableList, chartList } = useSelector(state => state.attendance);
    const { userInfo } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch( { type: 'attendance/initAttendanceTable'} );
    },[])

    return (
        <div className='attendance-container'>
            { 
                /* 管理员角色 才展示统计情况 */
                userInfo.identity === 1 && (
                    <div className="list-container">
                        {
                            chartList.map( (item,index) => (<ViolationChart {...item} key={index} />) )
                        }
                    </div>
                )
            }

            <div className="list-container" style={{ width:userInfo.identity === 1 ? '49.8%' : '100%'}} >
                {
                    tableList.map( (item,index) => (<ViolationTable {...item}  key={index} />) )
                }
            </div>
        </div>
    )
}

export default attendance