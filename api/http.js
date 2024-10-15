// 安装axios
// $cnpm i axios -S
import axios from "axios";

// 创建axios 初始化
const service = axios.create({
    // baseURL:"http://192.168.44.1:3000",
    // baseURL:"/api",
    baseURL:"",
    timeout:30000,//超时时间
    headers:{
        "Content-Type":"application/json;charset=utf-8",//表单数据转化
    },
    withCredentials:true //自动获取cookie信息
})

// request 拦截器 发送数据到后台前拦截
service.interceptors.request.use(
    config=>{
        return config;
    },
    error=>{
        console.log("axios中request报错",error);
        Promise.reject(error);
    }
)

// response 拦截器 发送数据到后台前拦截
service.interceptors.response.use(
    response=>{
        return response.data;
    },
    error=>{
        console.log("axios中response报错",error);
        Promise.reject(error);
    }
)

export default service;



