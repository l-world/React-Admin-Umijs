import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'umi';
import OrgTree from 'react-org-tree';

const Tree = ({ getDepartmentDetail }) => {
    const dispatch = useDispatch();
    const departmentList = useSelector((state) =>
        JSON.parse(
            JSON.stringify(
                // 没有父级部门才在第一阶梯显示，有的话就显示在父级部门下面就可以了
                state.department.departmentList.filter((item) => item.parentLists[0] == null)
            ),
        ),
    );

    useEffect(() => {
        dispatch({
            type: 'department/_initDepartmentList',
            payload: {},
        });
    }, []);

    // 处理数据
    const addProps = (list) => {
        list.forEach(item => {
            if(item.children.every( item => item === null)){
                item.children = []
            }
            if (item) {
                item.label = item.departmentName;
                item.id = item._id;
                (item.children && item.children.length) && addProps(item.children);
            }
        })
    }

    addProps(departmentList);

    const selectData = (e, data) => {
        getDepartmentDetail(data.id, data.departmentName);
    };

    const renderData = {
        id: -1,
        label: "公司组织架构图",
        children: departmentList
    };

    return (
        <OrgTree
            data={renderData}
            horizontal={false}
            collapsable={false}
            expandAll={true}
            onClick={selectData}
        />
    )
}

export default Tree