import ajax from '../http.js';

// 绩效考核列表接口
export const getAssessmentList = (params) =>ajax.post('/getAssessmentList', params);