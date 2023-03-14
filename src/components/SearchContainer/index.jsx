import React, { useState } from 'react'
import classNames from 'classNames';
import IconMap from '../IconMap';
import './index.less';
import { useDispatch } from 'umi';

const SearchContainer = ( { render } ) => {
    const [closeStatus, setcloseStatus] = useState(false);
    const dispatch = useDispatch();

    const clearForm = () => {
        dispatch( { type:'common/clearForm',payload:{ isClearForm:true } } )
    }

    return (
        <div className={ classNames('filter-wrapper', {close: closeStatus}) }>
            <div className="filter-title-wrapper">
                <span>字段过滤</span>
                <span className='c-r' onClick={ clearForm } >{IconMap.reload}</span>
            </div>
            <div className={ classNames('filter-form-wrapper', { opacity: closeStatus }) }>
                { render() }
            </div>
            <div className="close-tip" onClick={ () => setcloseStatus(!closeStatus) } >
                { closeStatus ? IconMap.right : IconMap.left }
            </div>  
        </div>
    )
}  

export default SearchContainer
