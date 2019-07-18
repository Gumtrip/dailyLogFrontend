'use strict';
import Vue from 'vue'
import axios from 'axios';
import config from './config.js' ;// 导入默认配置
import qs from 'qs'; // 序列化请求数据，视服务端的要求
import store from '../store/index';
import {Message} from 'element-ui';

import router from '@/router';
import api from './interface'

function dataTransform(rawData) {
    let data;
    if ( rawData.data === undefined) {
        data = JSON.parse(rawData.request.response);
    } else {
        data = rawData.data;
    }
    return data;
}

function errorMessage(data) {
    let validationErrors = data.errors;
    let messages = '';
    if (validationErrors) {
        for (let item in validationErrors) {
            for (let i = 0; i < validationErrors[item].length; i++) {
                messages += validationErrors[item][i];
            }
        }
    } else {
        messages = data.message;
    }
    return messages;
}


export default function $axios(options) {
    return new Promise((resolve, reject) => {
        const instance = axios.create({
                baseURL: config.baseURL,
                headers: {},
                transformResponse: [function (data) {
                }]
            }
        );



        // request 拦截器
        let requestInterceptors = instance.interceptors.request.use(
            async config => {

                // Tip: 1
                // 请求开始的时候可以结合 vuex 开启全屏的 loading 动画
                // Tip: 2
                // 带上 token , 可以结合 vuex 或者重 localStorage
                let data = config.data;
                let token = {};
                //刷新接口不拦截，不然会死循环！！！
                if(typeof data!=='undefined'&&typeof data.intercept!=='undefined'&&data.intercept===false){
                    token = data;
                }else{
                    const refreshResponse = await api.getToken();
                    if (refreshResponse&&typeof refreshResponse.status!=='undefined'&&refreshResponse.status === 200) {
                        // 将 Token 及过期时间保存在 storage 中
                        store.dispatch('setToken', refreshResponse.data);
                        token =  refreshResponse.data;
                    }else{
                        token =  refreshResponse;
                    }
                }

                if (token) {
                    config.headers.Authorization = token.token;
                }

                // Tip: 3
                // 根据请求方法，序列化传来的参数，根据后端需求是否序列化
                if (config.method.toLocaleLowerCase() === 'post' || config.method.toLocaleLowerCase() === 'put' || config.method.toLocaleLowerCase() === 'delete') {
                    config.data = qs.stringify(config.data);
                }

                return config;
            },
            error => {
                // 请求错误时做些事(接口错误、超时等)
                // Tip: 4
                // 关闭loadding
                //  1.判断请求超时
                if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
                    console.log('根据你设置的timeout/真的请求超时 判断请求现在超时了，你可以在这里加入超时的处理方案');
                    // return service.request(originalRequest);//例如再重复请求一次
                }
                //  2.需要重定向到错误页面
                const errorInfo = error.response;
                if (errorInfo) {
                    // error =errorInfo.data//页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
                    const errorStatus = errorInfo.status; // 404 403 500 ... 等
                    router.push({
                        path: `/error/${errorStatus}`
                    });
                }
                return Promise.reject(error); // 在调用的那边可以拿到(catch)你想返回的错误信息
            }
        );

        // response 拦截器
        let responseInterceptors =instance.interceptors.response.use(
            response => {//成功返回时
                // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
                if (response.data === undefined) {
                    let data;
                    data = response.request.responseText ? response.request.responseText : '';
                    if (data) {
                        response.data = JSON.parse(data)
                    }
                }
      
                // 根据返回的code值来做不同的处理（和后端约定）
                // switch (response) {
                //     case '':
                //         break;
                //     default:
                // }
                // 若不是正确的返回code，且已经登录，就抛出错误
                // const err = new Error(data.description)

                // err.data = data
                // err.response = response
                // throw err
                return response;
            },
            err => {
                let data = dataTransform(err);
                if (err && err.response) {
                    switch (err.response.status) {
                        case 400:
                            err.message = '请求错误!';
                            break;
                        case 401:
                            err.message = data.message;
                            break;
                        case 403:
                            err.message = '拒绝访问!';
                            break;
                        case 404:
                            err.message = `请求地址出错: ${err.response.config.url}!`;
                            break;
                        case 405:
                            err.message = '所请求的 HTTP 方法不允许当前认证用户访问!';
                            break;
                        case 408:
                            err.message = '请求超时!';
                            break;
                        case 410:
                            err.message = '当前请求的资源不再可用!';
                            break;
                        case 415:
                            err.message = ' 请求中的内容类型是错误的!';
                            break;
                        case 422:
                            err.message = errorMessage(data);
                            break;
                        case 429:
                            err.message = '请求频次达到上限,拒绝访问!';
                            break;
                        case 500:
                            err.message = errorMessage(data);
                            break;
                        case 501:
                            err.message = '服务未实现!';
                            break;
                        case 502:
                            err.message = '网关错误!';
                            break;
                        case 503:
                            err.message = '服务不可用!';
                            break;
                        case 504:
                            err.message = '网关超时!';
                            break;
                        case 505:
                            err.message = 'HTTP版本不受支持!';
                            break;
                        default:
                    }
                }
                Message.error(`错误: ${err.message}`);
                return Promise.reject(err); // 返回接口返回的错误信息
            }
        );

        //请求处理
        instance(options)
            .then((res) => {
                resolve(res);
                return false;
            })
            .catch((error) => {
                reject(error);
            });
    });
}
