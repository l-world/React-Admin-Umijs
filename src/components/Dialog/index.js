import React from 'react';
import { Modal } from 'antd';

const Dialog = ({ title, dialogStatus, render, setDialogStatus, width = 600, forceRender=false }) => {
    return (
        <Modal
            forceRender={forceRender}
            width={ width }
            destroyOnClose={ true}
            centered={ true }
            title={ title }
            open={ dialogStatus }
            onCancel={ () => setDialogStatus(false) }
            footer={ null }
        >
            { render() }
        </Modal>
    )
}

export default Dialog