import React, { useState } from 'react';
import { Modal, Table } from 'antd';
import { useSelector } from 'umi';
const { Column } = Table;

const AddChildModal = ({ showChildModal, setShowChildModal, pushOrUpdateList}) => {

    const [childList, setChildList] = useState([]);
    const { departmentDetail } = useSelector((state) => state.department);
    const departmentList = useSelector((state) => {
        return state.department.departmentList.filter((item) => item.parentLists[0] !== null);
    });

    // 清空 + 关闭弹窗
    const clearSelect = () => {
        setShowChildModal(false)
    }

    const addChildList = () => {
        const sendData = { list: childList, type: departmentDetail ? "update" : "add" };
        pushOrUpdateList(sendData);
        setShowChildModal(false);
        // if (departmentDetail) {
        //     pushOrUpdateList({ list: childList, type: 'update' });
        //   } else {
        //     pushOrUpdateList({ list: childList.concat(existsList), type: 'add' });
        //   }
        //   setShowChildModal(false);
    }

    return (
        <Modal
            title="增加子部门"
            open={showChildModal}
            onCancel={clearSelect}
            onOk={addChildList}
            destroyClose
        >
            <Table
                dataSource={ departmentList }
                rowSelection={{ onChange: (ids, record) => setChildList(record) }}
                pagination={false}
                expandIconColumnIndex={-1}
                rowKey={(record) =>  record?._id }
            >
                <Column title="部门名称" dataIndex="departmentName" />
            </Table>
        </Modal>
    )
}

export default AddChildModal