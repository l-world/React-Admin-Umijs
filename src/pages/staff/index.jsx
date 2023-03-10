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
const size = 5
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

    const _initStaffList = (data) =>
        dispatch({
            type: 'staff/_initStaffList',
            payload: { size: size, page: page.current, ...data }, //-{department:'',userName:''}
        });
    
    // 改变当前展示列表的页数
    const changePage = (currentPage) => {
        setPage(currentPage);
        _initStaffList();
    }

    //- 根据搜索条件进行列表展示
    const getQueryData = (queryData) => {
        _initStaffList(queryData);
    };

    return (
        <div className='main-content'>
            <TableHeader
                page={page.current}
                total={staffTotal}
                size={size}
                changePage={changePage}
                interfaceDelMethod={'deleteStaffs'}
                openAddDialog={() => setDialogStatus(true)}
            />
            {/* 搜索 */}
            <SearchContainer
                render={() => (
                    <FilterForm reload={(data) => setPage(1) && getQueryData(data)} />
                )}
            />
            {/* 列表 */}
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