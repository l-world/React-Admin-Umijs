import React from 'react';
import { useSelector, useDispatch } from 'umi';
import { Drawer, Modal, message } from 'antd';
import $http from 'api';
import IconMap from 'components/IconMap';
import './index.less'

const DrawerComponent = ({ title, interfaceName, _id, render,reloadList}) => {
    const { isShowDetailDialog } = useSelector( state => state.common );
    const dispatch = useDispatch();

    // 打开删除对话框
    const openDelModelDialog = () => {
        Modal.confirm({
            title:'温馨提示',
            content: '确定要删除当前用户吗？',
            onOk: _deleteItem,
        })
    }

    // 删除指定的列表项
    const _deleteItem = async () => {
        const { code, msg } = await $http[interfaceName]({ ids: [_id] });
        if( code) return;
        message.success(msg);
        closeDialog();
        reloadList();
    }

    // 关闭弹窗
    const closeDialog = () => {
        dispatch( { type:'common/setShowDetailDialog', payload:{ isShowDetailDialog:false } } )
    }

    const titleNode = (
        <>
            <span>{IconMap.copy}</span>
            <span>{title}</span>
        </>
    )

    const extra = (
        <>
            <span className='icon' onClick={ openDelModelDialog } >{ IconMap.del }</span>
            <span className='line'></span>
            <span className='icon' onClick={ closeDialog } >{ IconMap.close }</span>
        </>
    )

    return (
        /* 
            placement: 从哪儿个方向出来
            destroyOnClose： 删除内部函数
        */
        <Drawer 
            title={ titleNode }
            placement='right'
            width={ 500 }
            closable={ false }
            destroyOnClose={ true }
            open={ isShowDetailDialog }
            extra={ extra }
        >
            { render() }
        </Drawer>
    )
}

export default DrawerComponent