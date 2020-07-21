import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
  baseURL: 'http://localhost:3000'
})

// 后端在处理查看某个路由必须登陆之后才能查看，则需要验证用户的身份
// 则前端发送请求时在请求头中传入token（含_id）
// 请求时在请求头中加Authorization 授权信息 token
http.interceptors.request.use(function(config) {
  // Do something before request is sent
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + (localStorage.token || '')
  }
  return config
}, function(error) {
  // Do something with request error
  return Promise.reject(error)
})

// 给http请求加一拦截器
// 当返回数据有错误 则在这里拦截提示
http.interceptors.response.use(res => {
  return res
}, err => {
  if (err.response.data.message) {
    // console.log(err.response.data.message)
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
    if (err.response.status === 401) {
      // 401约定是没有传Authorization 中token为undefined
      // 则没有权限查看 直接跳到登录页 提示登陆
      router.push('/cslogin')
    }
  }
  return Promise.reject(err)
})

export default http
