import ajax from '../http.js';

// 获取员工列表
export const getStaffList = (params) => ajax.post('/getStaff',params);

// 获取员工详情
export const getStaffDetail= ({_id}) => ajax.get(`staffDetail/${_id}`);

// 新增员工
export const createStaff = (params) => ajax.post('/createStaff',params);

// 编辑员工
export const updateStaff = (params) => ajax.put('/updateStaff',params);

// 删除员工
export const destroyStaff = (params) => ajax.post('/deleteStaff',params);


