import ajax from '../http.js';

// 获取图表数据
export const analyzeStaff = () => ajax.get('/analyzeStaff');

