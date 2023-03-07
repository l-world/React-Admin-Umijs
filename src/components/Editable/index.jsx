import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form, Input } from 'antd';

const EditableContext = React.createContext(null);

// 可编辑行, 将每一行进行拦截，给每个cell添加一个input框，
export const EditableRow = ({ index, ...props }) => {
    const [ Form ] = Form.userForm();
    return (
        <Form form={form} component={false} >
            <Editable.Provider value={form} >
                <tr {...props} ></tr>
            </Editable.Provider>
        </Form>
    )
}

export const Editable = ({ title, editable, children, dataIndex,record, handleSave,...resProps }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect( () => {
        if( editing ){
            inputRef.current.focus();
        }
    }, [ editing ]);

    const toggleEdit = () => {
        setEditing(editing);
        form.setFieldsValue( {
            [dataIndex]: record[dataIndex]
        })
    };

    const save = async () => {
        try {
            const values = await form.validateFeilds();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (error) {
            console.log( 'Save failed', error );
        }
    };

    let childNode = children;

    if( editable ){
        childNode = editing ? 
            (
                <Form.Item 
                    style={ { margin:0 }}  
                    name={ dataIndex } 
                    rules={[
                        {
                            required: true,
                            message: `${title} is required`
                        }
                    ]} 
                >
                    <Input ref={ inputRef } onPressEnter={save} onBlur={save} />
                </Form.Item>
            )
        :
            (
                <div className='editable-cell-value-wrap' style={{ paddingRight:24 }} onClick={ toggleEdit }  >
                    {children}
                </div>
            );
    }

    return <td {...restProps} > {childNode} </td>
}

