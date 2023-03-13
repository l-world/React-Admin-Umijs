import React, { useState } from 'react';
import { useDispatch } from 'umi';
import { Table, message } from 'antd';
import Columns from './Columns';
import { EditableRow, EditableCell } from 'components/Editable';
import Dialog from 'components/Dialog';
import RecordTable from './RecordTable';
import $http from 'api';

const TableList = ({ userInfo, staffList, loading, reloadPage }) => {

    const [currentRecord, setCurrentRecord] = useState(null);
    const [dialogStatus, setDialogStatus] = useState(false);
    const dispatch = useDispatch();

    const handleSave = async (args) => {
        // 在保存手机号之前 检测手机号是否存在
        if(args.type === 'mobile'){
            const checkData = { mobile: args.updateVal };
            const { data, msg } = await $http.checkIsExists({ checkData });
            if (data) return message.error(msg);
        }

        // 更新表单
        const { code, msg } = await $http.updateStaff(args);
        if( code ) return message.error(msg);
        message.success(msg);
        reloadPage();
        // 网络请求错误TypeError: Failed to execute 'fetch' on 'Window': Request with GET/HEAD method cannot have body.
    }

    // 打开员工指定表格
    const openReviewRecord = ( record ) => {
        // record 是 Columns组件传递过来的值
        setCurrentRecord(record);
        setDialogStatus(true)
    }

    // 打开员工详情界面
    const openDetailDialog = ( _id ) => {
        dispatch( { type:'staff/_getStaffDetail',  payload: { _id } } )
    }

    return (
        <>
            <Table
                components={{
                    body: {
                        row: EditableRow,
                        cell: EditableCell
                    }
                }}
                bordered
                scroll={{ x: true }}
                dataSource={staffList}
                pagination={false}
                rowKey={(record) => record._id}
                loading={loading.effects['staff/_initStaffList']}
                columns={ Columns({ userInfo, handleSave, openReviewRecord,openDetailDialog }) }
            />

            <Dialog
                title={currentRecord?.title}
                dialogStatus={dialogStatus}
                setDialogStatus={setDialogStatus}
                render={ () => <RecordTable {...currentRecord} />  }
            />
        </>
    )
}

export default TableList