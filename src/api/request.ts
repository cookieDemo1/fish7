import axios, { AxiosRequestConfig } from 'axios'
import { notification, message } from 'ant-design-vue'

type CustomAxiosRequestConfig = AxiosRequestConfig

export interface BaseResponse {
  code: number
  msg: string
  data: any
}

export interface Error {
  response?: any
  message: any
}

const base = window.location.protocol + '//' + window.location.host.split(':')[0]
console.log('base', base)
const instance = axios.create({
  timeout: 100000, // 请求超时时间

  // baseURL: window.location.origin.replace(':3000', '')
  baseURL: import.meta.env.DEV ? window.location.origin : base
})

// 异常拦截器
const errorHandler = (error: Error) => {
  if (error.response) {
    if (error.response.status === 401) {
      // store
      //   .useUserStore()
      //   .logout()
      //   .then(() => {
      //     setTimeout(() => {
      //       window.location.reload()
      //     }, 1500)
      //   })
    } else {
      message.error(error.message)
    }
  } else {
    message.error(error.message)
  }

  return Promise.reject(error)
}

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  if (config.url !== '/api/web/login') {
    const token = utils.getStorage('token')
    if (token) {
      config.headers['Authorization'] = token
    }
  }

  return config
}, errorHandler)

instance.interceptors.response.use(function (response) {
  // const { config } = response
  const { code } = response.data
  if (code !== 200) {
    message.error(response.data.msg)
  }
  return response
}, errorHandler)

const request = (config: CustomAxiosRequestConfig): Promise<BaseResponse> => {
  return new Promise((resolve, reject) => {
    instance
      .request<BaseResponse>(config)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  })
}
export default request
