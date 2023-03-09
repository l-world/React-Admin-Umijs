import { Tag, Image } from 'antd';
import { formatYear, formatDate, formatBirth } from 'utils/format';
import loadErrorImg from 'common/imgs/load_error.png';
import { mapData } from 'utils/mapData';
import { staffRule } from 'utils/rules'

const Columns = ({ userInfo, handleSave,openReviewRecord }) => {
    // 普通员工展示的表格字段
    const normalList = [
        {
            title: "姓名",
            dataIndex: 'userName',
            // width:'200px',
            editable: true,
            render: (userName) => userName ? userName : "---"
        },
        {
            title: "联系电话",
            dataIndex: 'mobile',
            // width:'200px',
            editable: true,
        },
        {
            title: "职级描述",
            dataIndex: 'level',
            render: (data) => data?.levelDescription || "暂无职级描述"
        },
        {
            title: "性别",
            dataIndex: 'gender',
            editable: true,
            render: (type) => <Tag>{mapData.gender[type]}</Tag>,
        },
        {
            title: "部门",
            dataIndex: 'department',
            render: (data) => data?.departmentName || "---"
        },
        {
            title: "部门负责人",
            dataIndex: 'department',
            render: (data) => data?.departmentLeader?.userName || "---"
        },
    ]
    // 管理员展示的表格字段
    const authList = [
        {
            title: "入职时间",
            dataIndex: 'onboardingTime',
            // width:'200px',
            editable: true,
            render: (date) => date ? formatDate(date, 'YYYY-MM-DD') : '---'
        },
        {
            title: "年龄",
            dataIndex: 'idNumber',
            width: '100px',
            editable: true,
            render: (idNumber) => idNumber ? formatYear(idNumber, 'age') : '---'
        },
        {
            title: "头像",
            dataIndex: 'avatar',
            // width:'200px',
            render: (img) => <Image src={img} fallback={loadErrorImg} />
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
        // 绩效考核
        {
            title: '绩效考核',
            dataIndex:'record',
            render: ( record, data) => {
                return (
                    <Tag 
                        className='c-p'
                        onClick={ () =>
                            openReviewRecord(
                                {
                                    title:"考核记录",
                                    interfaceName:'getAssessmentList',
                                    requestData:{
                                        queryData:{ staffName:data._id }
                                    },
                                    type: 'assessment'
                                }
                            )
                        }
                    >
                        查看
                    </Tag>
                )
            }
        },
        // 奖惩记录
        {
            title: '奖惩记录',
            dataIndex:'record',
            render: ( record, data) => {
                return (
                    <Tag 
                        className='c-p'
                        onClick={ () =>
                            openReviewRecord(
                                {
                                    title:"奖惩记录",
                                    interfaceName:'getRewardAndPunishment',
                                    requestData: { staffName: data._id},
                                    type: 'reward',
                                }
                            )
                        }
                    >
                        查看
                    </Tag>
                )
            }
        },
        // 调薪记录
        {
            title: '调薪记录',
            dataIndex:'record',
            render: ( record, data) => {
                return (
                    <Tag 
                        className='c-p'
                        onClick={ () =>
                            openReviewRecord(
                                {
                                    title:"调薪记录",
                                    interfaceName:'getSalaryAdjustment',
                                    requestData:{ staffName:data._id },
                                    type: 'salary'
                                }
                            )
                        }
                    >
                        查看
                    </Tag>
                )
            }
        }
    ]

    // identity: 0 表示普通员工， 1： 表示管理员
    let renderColumnsList = userInfo.identity === 0 ? normalList : [...normalList, ...authList];

    renderColumnsList = renderColumnsList.map(col => {
        // 当前不可编辑的单元格
        if (!col.editable) return col;
        // 当前可编辑的单元格
        return {
            ...col,
            onCell: record => {
                let type = '';
                switch (col.dataIndex) {
                    case 'onboardingTime':
                        type = 'dateNode';
                        break;
                    case 'gender':
                    case 'education':
                    case 'marriage':
                        type = 'selectNode';
                        break;
                    default:
                        type = 'inputNode';
                        break;
                }
                return {
                    // record 表示整行的信息
                    record,
                    type,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    rules:staffRule[col.dataIndex],
                    handleSave: handleSave,
                }
            }
        }
    }
    )

    return renderColumnsList;

}

export default Columns