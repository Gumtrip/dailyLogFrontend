'use strict';
import axios from './api';
import ls from "../utils/localStorage"; // 倒入 api
import {Message} from 'element-ui';
import router from '@/router';
import store from '../store/index';

/* 将所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 *
 */
// 单独倒出
export const verificationCodes = data => {
    return axios({
        url: 'verificationCodes',
        method: 'POST',
        data:data

    });
};
export const getCaptcha = () => {
    return axios({
        url: 'getCaptcha',
        method: 'POST',
    });
};
export const register = data => {
    return axios({
        url: 'auth/register',
        method: 'POST',
        data:data
    });
};
export const login = data => {
    return axios({
        url: 'auth/login',
        method: 'POST',
        data:data
    });
};
export const loginViaCode = data => {
    return axios({
        url: 'auth/loginViaCode',
        method: 'POST',
        data:data
    });
};
export const logout = () => {
    return axios({
        url: 'auth/logout',
        method: 'delete',
    });
};
export const userMe = () => {
    return axios({
        url: 'user/me',
        method: 'post',
        data:{
            mustAuth:true
        }
    });
};
export const userUpdate = data => {
    return axios({
        url: 'user/update',
        method: 'put',
        data:data
    });
};
export const userPasswordReset = data => {
    return axios({
        url: 'user/passwordReset',
        method: 'put',
        data:data
    });
};
export const uploadImages = (data) => {
    return axios({
        url: 'uploadImages',
        method: 'post',
        data:data
    });
};
const refreshToken = async (data) => {
    // 请求刷新接口
    return await axios({
        url:'auth/refreshToken',
        method: 'PUT',
        data:data
    });
};
// 获取 Token
const getToken = async () => {
    // 从缓存中取出 Token
    let token = ls.getItem('token');


    let expiredAt = token?token.token_expired_at:0;

    // 如果 token 过期了，则调用刷新方法
    if (token && new Date().getTime() > expiredAt&&expiredAt!==0) {

        try {
            let refreshResponse = await refreshToken({
                intercept:false,
                token:token.token
            });
            // 刷新成功
            if (refreshResponse.status === 200) {
                token =  refreshResponse
            }
        }catch (e) {
            // 刷新失败了，强制清空登陆信息和token，提示并且跳转到登陆页面
            await store.dispatch('logout');
            Message.error('错误: 登陆过期，请重新登陆');
            router.replace('/auth/loginViaCode');
        }
    }

    return token
};


const createGoal = async(data)=>{
    return axios({
        url: 'goals',
        method: 'post',
        data:data
    });
};
const getGoals = async(params)=>{
    return axios({
        url: 'goals',
        method: 'get',
        params:params
    });
};
const getGoal = async(id,params)=>{
    return axios({
        url: 'goals/'+id,
        method: 'get',
        params:params

    });
};
const editGoal = async(id,data)=>{
    return axios({
        url: 'goals/'+id,
        method: 'patch',
        data: data,
    });
};
const getGoalLogs = async(params)=>{
    return axios({
        url: 'goalLogs',
        method: 'get',
        params:params
    });
};
const getGoalCategories = async(params)=>{
    return axios({
        url: 'goalCategories',
        method: 'get',
        params:params
    });
};
const getGoalCategory = async(id,params)=>{
    return axios({
        url: 'goalCategories/'+id,
        method: 'get',
        params:params

    });
};
const createGoalCategory = async(data)=>{
    return axios({
        url: 'goalCategories',
        method: 'post',
        data:data
    });
};

const editGoalCategory = async(id,data)=>{
    return axios({
        url: 'goalCategories/'+id,
        method: 'patch',
        data: data,
    });
};
// 默认全部导出
// 根据需要进行
export default {
    verificationCodes,
    getCaptcha,
    register,
    login,
    loginViaCode,
    logout,
    userMe,
    userUpdate,
    userPasswordReset,
    getToken,
    createGoal,
    getGoals,
    getGoal,
    editGoal,
    getGoalLogs,

    getGoalCategory,
    getGoalCategories,
    createGoalCategory,
    editGoalCategory,

};
