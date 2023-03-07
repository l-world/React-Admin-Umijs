import { Tag } from 'antd';
import { formatYear, formatDate } from 'utils/format';

const Columns = ({ handleSave, userInfo }) => {
    const normalList = [
        {
            title:"姓名",
            dataIndex:'userName',
            width:'200px',
            editable: true,
        },
        {
            title:"联系电话",
            dataIndex:'mobile',
            width:'200px',
            editable: true,
        },
        {
            title:"职级描述",
            dataIndex:'level',
            render: ( data ) => data?.levelDescription || "暂无职级描述"
        },
        {
            title:"性别",
            dataIndex:'gende',
            width:'200px',
            editable: true,
        },
        {
            title:"部门",
            dataIndex:'department',
            render: ( data ) => data?.departmentName || "---"
        },
        {
            title:"部门负责人",
            dataIndex:'department',
            render: ( data ) => data?.departmentLeader?.userName || "---"
        },        
        {
            title:"年龄",
            dataIndex:'idNumber',
            width:'200px',
            editable: true,
            render: ( idNumber ) => formatYear(idNumber, 'age')
        },
    ]

    const authList = [
        {
            title:"入职时间",
            dataIndex:'onboardTime',
            width:'200px',
            editable: true,
            render : ( date ) => formatDate(date, 'YYYY-MM-DD')
        },
    ]

    let renderColumnsList = userInfo.identity === 0 ? normalList : [...normalList, ...authList];

    renderColumnsList = renderColumnsList.map( col => 
        {
            if( !col.editable ) return col;
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: handleSave,
                })
            }
        }
    )

    return renderColumnsList;

}

export default Columns