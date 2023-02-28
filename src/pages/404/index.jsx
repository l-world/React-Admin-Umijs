import React from 'react';
import NotFoundImg from 'common/imgs/not_found.png'

const notFount = () => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                justifyContent: 'center'
            }}
        >
            <img src={NotFoundImg} alt="not-fount-img" />
        </div>
    )
}

export default notFount