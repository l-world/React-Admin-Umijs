import React, { useEffect , useState } from 'react';
import { useDispatch } from 'umi';
import './index.less';

const staff = ({ }) => {
    const [page, setPage] = useState(1)
    const dispatch = useDispatch();

    useEffect(() => {
        _initStaffList();
    }, [])

    const _initStaffList = () => dispatch({ type: 'staff/initStaffList', payload: { size: 10, page } })

    return (
        <div className='staff-container'>

        </div>
    )
}

export default staff