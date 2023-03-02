import ajax from '../http.js';

//- 出勤统计接口
export const getAttendanceTable = () => ajax.get('/getAttendanceTable');
