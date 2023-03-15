import React, { useState } from 'react';
import { Form, Button, Input, Row, Descriptions } from 'antd';
import { useDispatch } from 'umi';
import {departmentRule} from 'utils/rules';
import DropPopover from 'components/DropPopover'; 
import ChildDepartment from '../ChildDepartment'; 
import './index.less'

const FormComponent = ({ modalType,setDialogStatus}) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [childList, setChildList] = useState([])

    // 新增表单提交
    const  _onFinish = (data) => {
        const children = form.getFieldValue('children');
        const departmentLeader = form.getFieldValue('departmentLeader');
        delete data.departmentLeaderName
        dispatch( { type:'department/_addDepartment', payload:{
            departmentLeader,
            children,
            ...data
        }})

        setDialogStatus(false);
    }

    // 新增子部门或者修改子部门
    const pushOrUpdateList = (data) => {
        const childrenIds = data.list.map( item => item._id);
        setChildList(data.list);
        form.setFieldsValue({children:childrenIds})
    }

    return (
        <Form form={form} onFinish={_onFinish} >

            <Descriptions column={1} labelStyle={{ width: '150px' }} bordered >

                <Descriptions.Item label="部门名称" >
                    <Form.Item name="departmentName" rules={departmentRule.departmentName} >
                        <Input onBlur={() => { }} />
                    </Form.Item>
                </Descriptions.Item>

                <Descriptions.Item label="备注">
                    <Form.Item name="remark">
                        <Input onBlur={() => { }} />
                    </Form.Item>
                </Descriptions.Item>

                <Descriptions.Item label="子部门">
                    <ChildDepartment
                        childList={childList}
                        pushOrUpdateList={pushOrUpdateList}
                    />
                </Descriptions.Item>

                <Descriptions.Item label="部门负责人">
                    <Form.Item name="departmentLeaderName" rules={departmentRule.departmentLeader}  >
                        <Input
                            placeholder="请输入部门负责人"
                            readOnly
                            className="border-1"
                            addonAfter={
                                <DropPopover
                                    placeholderVal="请输入查找的员工姓名"
                                    interfaceName="getStaffList"
                                    searchType="userName"
                                    getSelectItem={(item) => {
                                        form.setFieldsValue({
                                            departmentLeaderName: item.userName,
                                            departmentLeader: item._id,
                                        });
                                    }}
                                />
                            }
                        />
                    </Form.Item>
                </Descriptions.Item>
            
            </Descriptions>

            {
                    modalType === 'add' && (
                        <Form.Item>
                            <Row justify='end' >
                                <Button className='mt-20' type='primary' htmlType='submit' >创建</Button>
                            </Row>
                        </Form.Item>
                    )
            }

        </Form>
    )
}

export default FormComponent