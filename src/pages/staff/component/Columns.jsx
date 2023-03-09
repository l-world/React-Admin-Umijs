import { Tag,Image } from 'antd';
import { formatYear, formatDate,formatBirth  } from 'utils/format';
import loadErrorImg from 'common/imgs/load_error.png';
import { mapData } from 'utils/mapData';

const Columns = ({userInfo, handleSave }) => {

    const normalList = [
        {
            title:"姓名",
            dataIndex:'userName',
            // width:'200px',
            editable: true,
            render: ( userName ) => userName ? userName : "---"
        },
        {
            title:"联系电话",
            dataIndex:'mobile',
            // width:'200px',
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
            // width:'200px',
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
    ]
    // 权限 
    const authList = [
        {
            title:"入职时间",
            dataIndex:'onboardingTime',
            // width:'200px',
            editable: true,
            render : ( date ) => date ?  formatDate(date, 'YYYY-MM-DD') : '---'
        },
        {
            title:"年龄",
            dataIndex:'idNumber',
            width:'100px',
            editable: true,
            render: ( idNumber ) => idNumber ?  formatYear( idNumber, 'age') : '---'
        },
        {
            title:"头像",
            dataIndex:'avatar',
            // width:'200px',
            render : (img) => <Image src={img} fallback={ loadErrorImg } /> 
        },
        {
            title: '籍贯',
            editable: true,
            dataIndex: 'hometown',
            render: (hometown) => hometown || '---',
          },
          {
            title: '学历',
            editable: true,
            dataIndex: 'education',
            render: (type) => <Tag> {mapData['education'][type]}</Tag>,
          },
          {
            title: '婚姻状况',
            editable: true,
            dataIndex: 'marriage',
            render: (type) => <Tag> {mapData['marriage'][type]}</Tag>,
          },
          {
            title: '生日',
            dataIndex: 'idNumber',
            render: (id) => formatBirth(id),
          },
          {
            title: '银行卡',
            dataIndex: 'bankNumber',
            editable: true,
          },
          {
            title: '身份证号',
            editable: true,
            dataIndex: 'idNumber',
          },
          {
            title: '毕业院校',
            editable: true,
            dataIndex: 'graduatedSchool',
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