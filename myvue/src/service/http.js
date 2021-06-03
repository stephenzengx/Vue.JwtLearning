import axios from 'axios'
import router from '../router'

var that = this;
const http = axios.create({
    baseURL: 'http://localhost:51253/api/'
})

//请求拦截 添加Authorization头
http.interceptors.request.use(function (config) {
    //后台管理系统接口 不需要传Token
    if (config.url.indexOf("Admin") >=0)
        return config;

    if(localStorage.getItem('Authorization') != null){
        config.headers.Authorization = localStorage.getItem('Authorization');
    }
    return config
}, function (error) {
    return Promise.reject(error)
});

//响应拦截
http.interceptors.response.use( function (resp) {
    return resp;
}, function (error) {
    if(error.response.status == 401){
        setTimeout(function(){
         router.push('/Login');
        },2000)      
    }else if(error.response.status == 500) 
    {
        Promise.reject("程序内部错误");
    }
    return Promise.reject(error);
});


export default http
