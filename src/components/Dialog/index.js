import React from 'react';
import { Modal } from 'antd';

const Dialog = ({ title, dialogStatus, render, setDialogStatus, width = 600 }) => {
    return (
        <Modal
            width={ width }
            destroyOnClose={ true}
            centered={ true }
            title={ title }
            visible={ dialogStatus }
            onCancel={ () => setDialogStatus }
            footer={ null }
        >
            { render() }
        </Modal>
    )
}

export default Dialog