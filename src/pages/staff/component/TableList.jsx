import React from 'react'
import { Table } from 'antd';
import { EditableRow, EditableCell } from 'components/Editable';
import Columns from './Columns';

const TableList = ({ userInfo, staffList, loading }) => {

    const handleSave = (...args) => {
        console.log(args);
    }

    return (
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
            columns={Columns(userInfo, handleSave)}
        />
    )
}

export default TableList