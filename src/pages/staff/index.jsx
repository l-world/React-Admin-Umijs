import React, { useEffect , useState } from 'react';
import { useDispatch, useSelector } from 'umi';
import TableHeader from 'components/TableHeader';
import './index.less';

const staff = ({ }) => {
    const [page, setPage] = useState(1)
    const dispatch = useDispatch();
    const { staffTotal } = useSelector( state => state.staff);
    console.log(staffTotal);
    useEffect(() => {
        _initStaffList();
    }, [])

    const _initStaffList = (page) => dispatch({ type: 'staff/initStaffList', payload: { size: 10, page } })

    const changePage = (page) => {
        setPage(page);
        _initStaffList(page);
    }

    return (
        <div className='main-container'>
            <TableHeader 
                page={page}
                total={staffTotal}
                size={10}
                changePage={changePage}
                interfaceDelMethod={'deleteStaffs'}
            />
        </div>
    )
}

export default staff