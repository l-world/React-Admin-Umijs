export const formatDepartmentList = (list) => {
    list.forEach(item => {
        if(item.children && item.children.every( item => item === null)){
            item.children = [];
        }
        if (item) {
            item.label = item.departmentName;
            item.id = item._id;
            (item.children && item.children.length) && formatDepartmentList(item.children);
        }
    })
    return list;
}