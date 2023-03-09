import React, { useState } from 'react'
import { Table } from 'antd';
import Columns from './Columns';
import { EditableRow, EditableCell } from 'components/Editable';
import Dialog from 'components/Dialog';
import RecordTable from './RecordTable';

const TableList = ({ userInfo, staffList, loading }) => {

    const [currentRecord, setCurrentRecord] = useState(null);
    const [dialogStatus, setDialogStatus] = useState(false);

    const handleSave = (...args) => {
        console.log(args);
    }

    const openViewRecord = (record) => {
        setCurrentRecord(record);
        setDialogStatus(true)
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
                loading={loading.effects['staff/initStaffList']}
                columns={Columns({ userInfo, handleSave,openViewRecord })}
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