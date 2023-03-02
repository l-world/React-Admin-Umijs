import React from 'react'
import classnames from 'classnames';
import './index.less'

const Loading = ({ isShow,part = false }) => {
    const partStyle = part ? {
        position:"absolute",
        left:"50%",
        top:"50%",
        width:'100%',
        height:'100%',
        transform:'translate(-50%, -50%)'
    } : {}
    return (
        <div style={{...partStyle}}  className={classnames('loader', 'fullScreen', { hidden: !isShow })}>
            <div className="wrapper">
                <div className="inner"></div>
                <div className="text">LOADING</div>
            </div>
        </div>
    )
}

export default Loading