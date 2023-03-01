import React from 'react';
import NotFoundImg from 'common/imgs/not_found.png'

const notFount = () => {
    return (
        <div
            style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <img src={NotFoundImg} alt="not-fount-img" />
        </div>
    )
}

export default notFount