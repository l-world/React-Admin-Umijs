import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import $http from 'api';
import { columnData } from './renderType';

const RecordTable = ( { type, interfaceName, requesData } ) => {
    const [source, setSource] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        _initData();
    }, [])
    
    const _initData = async ( page = 1 ) => {
        const res = await $http[interfaceName]({...requesData,page});
        setSource( res.data.list);
        setTotal( res.data.total);
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