import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: '/my-manager-api', // url = base url + request url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
      console.log(store.state.token)
    // do something before request is sent
    if (store.state.token) {
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (response.status !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log(error); // for debug
    if (error.response.status==401) {
        MessageBox.alert('登录超时', '提示', {
            confirmButtonText: '确定'
        }).then(() => {
            store.dispatch('logout')
            router.push(`/login`)
        });

    } else {
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        });
    }
    return Promise.reject(error)
  }
)

export default service
