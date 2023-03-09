import React, { useState, useRef, useContext, useEffect } from 'react';
import { Form, Input, Select, DatePicker } from 'antd';
const { Option } = Select;
import moment from 'moment';
import { mapData } from 'utils/mapData'

const EditableContext = React.createContext(null);

//- 可编辑的行
export const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

//- 可编辑的单元格
export const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    rules,
    type,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);

    useEffect(() => {
        if (editing) {
           inputRef.current && inputRef.current.focus();
        }
    }, [editing]);

    // 单元格点击的时候进行内容渲染
    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
            onboardingTime: moment(record.onboardingTime)
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    // 修改之前的检测
    const _sendBeforCheck = async () => {
        try {
            const editData = await form.validateFields([dataIndex]);
            setEditing(!editing);
            if( record[dataIndex] === editData[dataIndex] ) return ;
            handleSave( {
                _id:record._id,
                updateVal:editData[dataIndex],
                type:dataIndex
            } )
        } catch (error) {
            setEditing(!editing);
        }
    }

    const editNodeData = {
        inputNode: ( <Input ref={inputRef} onPressEnter={ _sendBeforCheck} onBlur={_sendBeforCheck} /> ),
        selectNode:(
            <Select ref={inputRef} onBlur={_sendBeforCheck} >
                {
                    mapData[dataIndex] && mapData[dataIndex].map( (item,index) => {
                        return (
                            <Option key={index} value={index} >{item}</Option>
                        )
                    } )
                }
            </Select>
        ),
        dateNode:(
            <DatePicker
                ref={inputRef}
                onBlur={ _sendBeforCheck}
                onChange={ _sendBeforCheck}
            />
        )
    }

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item name={dataIndex} rules={rules} >
                { editNodeData[type] }
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};
