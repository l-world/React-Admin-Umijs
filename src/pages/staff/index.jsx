import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'umi';
import TableHeader from 'components/TableHeader';
import SearchContainer from 'components/SearchContainer';
import FilterForm from './component/FilterForm';
import TableList from './component/TableList';
import DrawerComponent from 'components/Drawer';
import DetailForm from './component/DetailForm';
import useCommon from 'hook/useCommon';

const staff = () => {
    // const [page, setPage] = useState(1)
    const [page, setPage] = useCommon();
    const dispatch = useDispatch();
    const { staffTotal, staffList, staffDetail } = useSelector(state => state.staff);
    const { userInfo } = useSelector(state => state.user);
    const { loading } = useSelector(state => state);

    useEffect(() => {
        _initStaffList();
    }, [])

    const _initStaffList = () => dispatch({ type: 'staff/_initStaffList', payload: { size: 10,page: page.current } })

    const changePage = (currentPage) => {
        setPage(currentPage);
        _initStaffList(page);
    }

    return (
        <div className='main-content'>
            <TableHeader
                page={page.current}
                total={staffTotal}
                size={10}
                changePage={changePage}
                interfaceDelMethod={'deleteStaffs'}
            />
            <SearchContainer render={() => <FilterForm />} />
            <TableList 
                userInfo={userInfo} 
                staffList={staffList} 
                loading={loading} 
                reloadPage={_initStaffList} />
            <DrawerComponent 
                title={ staffDetail?.userName}
                _id={ staffDetail?._id}
                interfaceName={'deleteStaffs'}
                reloadList={ () => setPage(1) && _initStaffList()  }
                render={  () => <DetailForm /> }
            />
        </div>
    )
}

export default staff