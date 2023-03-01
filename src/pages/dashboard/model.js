export default {
    namespace: 'dashboard',
    state: {
        amountList: [
            { title: "总人数", amount: 17, styleData: { width: '100%', height: '170px' } },
            { title: "入职一年内的员工", amount: 17, styleData: { width: '33%', height: '170px' } },
            { title: "入职1-2年内的员工", amount: 5, styleData: { width: '33%', height: '170px' } },
            { title: "入职3年以上的员工", amount: 4, styleData: { width: '33%', height: '170px' } }
        ],
        oldStaffData: {
            title: "工龄最老的十个人",
            renderList: [
                {
                    "userName": "小坏蛋",
                    "department": "研发部"
                },
                {
                    "userName": "管理员",
                    "department": "大客户部"
                },
                {
                    "userName": "路嘉良",
                    "department": "运营部"
                },
                {
                    "userName": "马云",
                    "department": "研发部"
                },
                {
                    "userName": "韩刚",
                    "department": "研发部"
                },
                {
                    "userName": "韩非子",
                    "department": "商务部"
                },
                {
                    "userName": "韩非子1",
                    "department": "技术部"
                },
                {
                    "userName": "安安",
                    "department": "技术部"
                },
                {
                    "userName": "章三",
                    "department": "客服部"
                },
                {
                    "userName": "王麻子",
                    "department": "测试部"
                }
            ],
            styleData: {
                width: '49.8%',
                height: '350px'
            }
        }
    },

}