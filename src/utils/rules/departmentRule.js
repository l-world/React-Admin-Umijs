export const departmentRule = {
    departmentName:[
        {required:true,message:"部门名称不能为空"},
        {max:20,message:"部门名称不能大于20个字"},
        {min:3,message:"部门名称不能小于3个字"},
    ],
    departmentLeader:[
        {required:true,message:"部门负责人不能为空"}
    ]
}