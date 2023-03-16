import React, { useState } from 'react';
import { Table, Button, Modal } from 'antd';
import IconMap from 'components/IconMap';
import AddChildModal from './AddChildModal';

const { Column } = Table;

const ChildDepartment = ({childList,pushOrUpdateList}) => {

    const [delIds, setDelIds] = useState([]);
    const [showDelModal, setShowDelModal] = useState(false);
    const [showChildModal, setShowChildModal] = useState(false);

    // 增加子部门事件处理
    const getDepartmentList =() => {
        setShowChildModal(true);
    }

    // 删除子部门
    const delDepartment = () => {
        console.log('del')
    }

    return (
        <>
            <Table
                dataSource={childList}
                rowSelecttion={ { onchange:(ids) => setDelIds(ids) } }
                pagination={false}
                expandIconColumnIndex={1}
                rowKey={ (record) => record._id }
            >
                <Column title="名称" dataIndex="departmentName" />
            </Table>

            {/* 操纵按钮 */}
            <div className="operation">
                <Button type="primary" style={{marginRight:'10px'}} icon={IconMap.api}  onClick={ getDepartmentList } >增加子部门</Button>
                <Button  disabled={!delIds.length} icon={IconMap.del}  onClick={() => setShowDelModal(true)} >接触子部门关联</Button>
            </div>

            {/* 新增子部门弹窗 */}
            <AddChildModal
                showChildModal={showChildModal}
                setShowChildModal={setShowChildModal}
                pushOrUpdateList={pushOrUpdateList}
            />

            {/* 删除子部门弹窗 */}
            <Modal
                title="提示"
                open={ showDelModal }
                onOk={ () => delDepartment  }
                onCancel={ () => setShowDelModal(false) }
            >
                确定要删除选择的部门吗？
            </Modal>
        </>
    )
}

export default ChildDepartment