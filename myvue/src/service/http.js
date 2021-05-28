import axios from 'axios'
import router from '../router'

var that = this;
const http = axios.create({
    baseURL: 'http://localhost:51253/api/'
})

//请求拦截 添加Authorization头
http.interceptors.request.use(function (config) {
    //后台管理系统接口 不需要传Token
    var absPath = config.url;
    if (config.url.indexOf("System") >=0 || config.url.indexOf("Admin") >=0)
        return config;

    if(localStorage.getItem('Authorization')){
        config.headers.Authorization = localStorage.getItem('Authorization');
    }
    return config
}, function (error) {
    return Promise.reject(error)
});

//响应拦截
http.interceptors.response.use( function (resp) {
    console.log(111);
    console.log(resp);

    return resp;
}, function (error) {
    console.log(error.response);
    var that = this;
    if(error.response.status == 401){
        that.$message("token expire!");     
        setTimeout(function(){
         router.push('/Login');
        },2000)      
    }else if(error.response.status == 500) 
    {
        that.$message("程序内部错误");
    }
    return Promise.reject(error);
});


export default http
