import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'umi';
import OrgTree from 'react-org-tree';

const Tree = ({ getDerparmentDetail }) => {
    const dispatch = useDispatch();
    const departmentList = useSelector( state => 
        JSON.parse(
            JSON.stringify(
                state.department.departmentList.
                filter( item => !item.parentLists.length)
            )
        )
    );
    useEffect(() => {
        dispatch({
          type: 'department/_initDepartmentList',
          payload: {},
        });
      }, []);

    const addProps = (list) => {
        list.forEach( item => {
            item.label = item.departmentName;
            item.id = item._id;
            item.children && item.children.length && addProps(item.children);
        });
    }

    addProps(departmentList);

    const selectData = (e, data) => {
        getDerparmentDetail(data.id, data.departmentName);
    };
    
    const renderData  = {
        id:-1,
        lable:"公司组织架构图",
        children:departmentList
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