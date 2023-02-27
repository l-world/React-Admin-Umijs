import qs from 'qs'
import {message} from 'antd'
import {history} from 'umi'
const fetch = require('dva').fetch

class Http {
    static async staticFetch(url = "",options = {} ){
        url = '/api' + url;
        const defaultOptions = {
            mode:'cors', //支持跨域处理
            headers:{
                Authorization:sessionStorage.getItem('token') || null
            },
        }

        if(options.method === "POST" || options.method === "PUT"){
            defaultOptions.headers['Content-Type'] = 'application/json;charset=utf-8';
        }

        // const newOptios = Object.assign({}, defaultOptions, options);
        const newOptios = {...defaultOptions, ...options }
        return fetch(url, newOptios)
            .then( checkStatus )
            .then( judgeOKState )
            .then( res => {
                const token = res.headers.get('Authorization');
                token && sessionStorage.setItem('token', token); // 获取token，并且存储到session中
                return res.json();
            })
            .catch( handlerError)
    }

    post(url, params = {}, option = {}) {
        const options = Object.assign({ method: 'POST' }, option);
        options.body = JSON.stringify(params);
        return Http.staticFetch(url, options);
    }

    put(url,params = {},option = {} ){
        const options = Object.assign({methods:"PUT"}, option);
        options.body = JSON.stringify(params);
        return Http.staticFetch(url, options);
    }

    get(url, option = {}) {
        const options = Object.assign({ method: 'GET' }, option);
        Object.keys(options) && (url += '?' + qs.stringify(options));
        return Http.staticFetch(url, options);
    }

    del(url, option = {}){
        const options = Object.assign({methods:"DELETE"}, option);
        Object.keys(options) && ( url += '?' + qs.stringfy(options))
        return Http.staticFetch(url, options);
    }

}

//响应状态处理函数
const checkStatus = res => {
    if( 200 >= res.status <=300){
        return res;
    }
    message.error('网络请求错误' + res.status);
    throw new Error(res.statusText)
}

// 判定本次请求内容是否成功
const judgeOKState = async res => {
    const cloneRes = await res.clone().json();
    if(cloneRes.code !== 0){
        message.error(`${cloneRes.msg}${cloneRes.code}`);
        // 跳转到登录页面
        history.replace('/users/login')
        // 清空token值
        sessionStorage.clear();
    }

    return res;
}

const handlerError = error => {
    if(error instanceof TypeError){
        message.error('网络请求错误' + error)
    }
    return {
        code :-1,
        data: false
    }
}


const resFun = new Http();

export default resFun