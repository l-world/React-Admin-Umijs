import React from 'react'
import classnames from 'classnames';
import './index.less'

const Loading = ({ isShow }) => {
    return (
        <div className={classnames('loader', 'fullScreen', { hidden: !isShow })}>
            <div className="wrapper">
                <div className="inner"></div>
                <div className="text">LOADING</div>
            </div>
        </div>
    )
}

export default Loading