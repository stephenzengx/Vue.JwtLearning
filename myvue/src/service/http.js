import axios from 'axios'
import router from '../router'

var that = this;
const http = axios.create({
    baseURL: 'http://localhost:51253/api/'
})

//请求拦截 添加Authorization头
http.interceptors.request.use(function (config) {
    if(localStorage.getItem('Authorization')){
        config.headers.Authorization = localStorage.getItem('Authorization');
    }
    return config
}, function (error) {
    return Promise.reject(error)
});

//响应拦截
http.interceptors.response.use( function (resp) {
    console.log(resp);
    // if(resp.data.isRefresh == 1){
    //     localStorage.setItem('Authorization',  resp.data.token);      
    // }

    return resp;
}, function (error) {
    if(error.response.httpCode == 401){
        that.$message("token expire!");     
        setTimeout(function(){
         router.push('/Login');
        },2000)      
    }else if(error.response.httpCode == 500) 
    {
        that.$message("程序内部错误");
    }
    return Promise.reject(error);
});


export default http
