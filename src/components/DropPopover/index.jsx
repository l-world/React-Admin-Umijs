import React, { useEffect, useState } from 'react';
import { Popover,Input,List, Pagination } from 'antd';
import './index.less';
import useCommon from 'hook/useCommon';
import $http from 'api';
const {Search } = Input

/* 
    getSelectItem 是函数
*/

// 下拉菜单
const DropPopover = ({placeholderVal,interfaceName,searchType,getSelectItem}) => {
    
    const [total, setTotal] = useState(0);
    const [page, setPage] = useCommon(0);
    const [list, setList] = useState([]);
    const [visible, setVisible] = useState(false);

    // 页数改变
    const changePage = (currentPage) => {
        setPage(currentPage);
        _initList();
    }

    useEffect(() => {
        _initList();
    }, [])
    
    const _initList = async (queryData = {}) => {
        const { data} = await $http[interfaceName]({
            page:page.current,
            size:5,
            queryData
        });
        setTotal(data.total);
        setList(data.list);
    }

    const onSearch = (val) => {
        const searchData = !val ? {} : { [searchType]:val };
        setPage(1);
        _initList(searchData);
    }

    const selectItem = (item) => {
        setVisible(false);
        getSelectItem(item);
    }

    return (
        <>
            <Popover
                placement='bottomRight'
                open={visible}
                onOpenChange={ (status) => setVisible(status) }
                title={ <Search placeholder={placeholderVal} onSearch={onSearch} /> }
                content={
                    <List
                        dataSource={list}
                        renderItem={ (item) => (
                            <List.Item
                                style={{ cursor: 'pointer' }}
                                onClick={ () => selectItem(item) }
                            >
                                {item[searchType]}
                            </List.Item>
                        )}
                        footer={
                            <Pagination 
                                onChange={changePage}
                                current={ page.current}
                                pageSize={5}
                                total={total}
                            />
                        }
                    />
                }
                trigger="click"
            >
                <span className='add-icon' >+</span>
            </Popover>
        </>
    )
}

export default DropPopover