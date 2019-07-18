const baseURL = process.env.NODE_ENV == 'production'?'http://top-booking.natapp1.cc/api/':'http://top-top.com/api/';
export default {
    method: 'post',
    // 基础url前缀
    baseURL: baseURL,
    // 请求头信息
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type':'application/json;charset=UTF-8'
    },
    // 参数
    data: {},
    // 设置超时时间
    timeout: 10000,
    // 携带凭证
    withCredentials: false,
    // 返回数据类型
    responseType: 'json',

};
