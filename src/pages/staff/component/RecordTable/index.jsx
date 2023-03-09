import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import $http from 'api';
import { columnData } from './renderType';

const RecordTable = ( { type, interfaceName, requestData } ) => {
    const [source, setSource] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        _initData();
    }, [])
    
    const _initData = async ( page = 1 ) => {
        const res = await $http[interfaceName]({ ...requestData, page });
        const {list, total} = res.data
        setSource(list);
        setTotal( total);
    }

    const changePage = ( page ) => {
        _initData(page);
    }

    return (
        <Table 
            pagination={ { defaultCurrent:5,onChange:changePage, total } }
            columns={ columnData[type] }
            rowKey={ ( column => column._id ) }
            dataSource={ source }
        /> 
    )
}

export default RecordTable