import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'umi';
import TableHeader from 'components/TableHeader';
import SearchContainer from 'components/SearchContainer';
import FilterForm from './component/FilterForm';
import TableList from './component/TableList';
import DrawerComponent from 'components/Drawer';
import DetailForm from './component/DetailForm';
import useCommon from 'hook/useCommon';
import Dialog from 'components/Dialog';
import AddForm from './component/AddForm';

const staff = () => {
    // const [page, setPage] = useState(1)
    const [page, setPage] = useCommon();
    const dispatch = useDispatch();
    const { staffTotal, staffList, staffDetail } = useSelector(state => state.staff);
    const { userInfo } = useSelector(state => state.user);
    const { loading } = useSelector(state => state);
    const [dialogStatus, setDialogStatus] = useState(false);

    useEffect(() => {
        _initStaffList();
    }, [])

    const _initStaffList = () => dispatch({ type: 'staff/_initStaffList', payload: { size: 10, page: page.current } })

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
                openAddDialog={() => setDialogStatus(true)}
            />
            <SearchContainer render={() => <FilterForm />} />
            <TableList
                userInfo={userInfo}
                staffList={staffList}
                loading={loading}

                reloadPage={_initStaffList} />

            {/* 新增组件 */}
            <Dialog
                title="新增员工"
                dialogStatus={dialogStatus}
                setDialogStatus={setDialogStatus}
                width={800}
                forceRender={true}
                render={() => (
                    <AddForm
                        setDialogStatus={setDialogStatus}
                        reloadList={() => setPage(1) && _initStaffList()}
                    />
                )}
            />

            {/* 抽屉的形式展示详情组件 */}
            <DrawerComponent
                title={staffDetail?.userName}
                _id={staffDetail?._id}
                interfaceName={'deleteStaffs'}
                reloadList={() => setPage(1) && _initStaffList()}
                render={() => <DetailForm staffDetail={staffDetail} _initStaffList={_initStaffList} />}
            />
        </div>
    )
}

export default staff