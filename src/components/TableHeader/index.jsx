import React from 'react';
import './index.less'
import { Button, Pagination,message,Modal } from 'antd';
import IconMap from '../IconMap';
import classNames from 'classNames';
import { useSelector,useDispatch } from 'umi';
import $http from 'api';

const TableHeader = ({ page, size, total, changePage, openAddDialog, interfaceDelMethod }) => {

    const { collapse, ids } = useSelector(state => state.common);
    const { userInfo } = useSelector(state => state.user);
    const dispatch = useDispatch();

    // 删除选定的列表项
    const delHandle = () => {
        if(!ids.length) return message.error("请先指定删除的列表项");
        Modal.confirm({
            title:"温馨提示",
            content:"确定要删除选中的数据吗？",
            onOk:_delItem,
        })
    }

    //删除调用接口
    const _delItem = async () => {
        const { code,msg} = await $http[interfaceDelMethod]({ids});
        if(code) return ;
        message.success(msg);
        dispatch({ type:'common/savaSelectIds' , payload:{ id: []}});
        changePage(1);
    }

    return (
        <div className={classNames('table-header-container', { 'big-style': collapse })} >
            {
                userInfo.identity === 1 &&
                    <div>
                        <Button className='mr-10' size='small' shape='round' icon={IconMap.add} onClick={openAddDialog} >创建</Button>
                        <Button danger size='small' shape='round' icon={IconMap.del} onClick={delHandle} >批量删除</Button>
                    </div>
            }
            <div className="pagination-container">
                <Pagination
                    simple
                    defaultCurrent={page}
                    current={page}
                    pageSize={size}
                    total={total}
                    onChange={(page) => changePage(page)}
                />
                <span >共计{total}条记录</span>
            </div>
        </div>
    )
}

export default TableHeader;
