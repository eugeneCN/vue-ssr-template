/**
 * @desc    创建服务端axios请求
 * @file    create-api-server.js
 * @author  zhangWuQiang
 */
import qs from 'qs'
import axios from 'axios'

axios.interceptors.response.use((res) => {
  if (res.status >= 200 && res.status < 300) {
    return res
  }
  return Promise.reject(res)
}, (error) => {
  // 网络异常
  return Promise.reject({ message: '网络异常，请刷新重试', error })
})

axios.interceptors.request.use(config => {
  const cookies = process.Cookies || {}
  config.headers.Cookie = `JSESSIONID=${cookies.JSESSIONID}`
  return config
})

export function createAPI({ server }) {
  let api

  axios.defaults.timeout = server.timeout
  axios.defaults.baseURL = server.baseurl
  axios.defaults.withCredentials = true

  if (process.__API__) {
    api = process.__API__
  } else {
    api = {
      get(url, params = {}) {
        return new Promise((resolve, reject) => {
          axios({
            url,
            params,
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            },
            method: 'get'
          }).then(res => {
            resolve(res.data)
          }).catch(error => {
            reject(error)
          })
        })
      },
      post(url, params = {}) {
        return new Promise((resolve, reject) => {
          axios({
            url,
            data: qs.stringify(params),
            method: 'post',
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(res => {
            resolve(res.data)
          }).catch(error => {
            reject(error)
          })
        })
      }
    }
  }
  return api
}
