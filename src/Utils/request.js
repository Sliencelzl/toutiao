/**
 * 请求函数封装
 */
import axios  from "axios";
import store from "../store";
import JSONBig from 'json-bigint'

const request = axios.create({
    baseURL:'http://toutiao.itheima.net',
    transformResponse:[function(data){
      try {
        return JSONBig.parse(data)
      } catch (error) {
        return data
      }
    }]

    
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const { user } = store.state
    if(user && user.token){
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

export default request