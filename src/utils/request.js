/*
 * @version: 1.0
 * @Date: 2019-10-18 10:23:47
 * @LastEditors: yijihui
 * @LastEditTime: 2019-10-31 10:18:30
 */
import axios from 'axios'

import {
    Message
} from 'iview'

console.log(Message)

import {
    getToken,
    setToken,
    removeToken
} from '@/utils/auth'

// 创建axios实例
axios.defaults.withCredentials = true
// 请求列表
// const requestList = []
// 取消列表
// const CancelToken = axios.CancelToken

const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_urlsources
    // timeout: 30000, // 请求超时时间
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    transformRequest: [function (data) {
        let ret = ''
        for (const it in data) {
            if (data[it] || data[it] === 0) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            } else {
                ret += encodeURIComponent(it) + '=' + '&'
            }
        }
        return ret
    }]
})
// 添加请求拦截器
service.interceptors.request.use(
    config => {
        // const request = JSON.stringify(config.url) + JSON.stringify(config.data)
        // config.cancelToken = new CancelToken((cancel) => {
        //     sources[request] = cancel
        // })
        // if (requestList.includes(request)) {
        //     // sources[request]()
        // } else {
        //     requestList.push(request)
        // }
        if (config.head === 'json') {
            config.headers['Content-Type'] = 'application/json;charset=UTF-8'
            config.transformRequest = [(data) => {
                return JSON.stringify(data)
            }]
        } else if (config.type === 'download') {
            config.headers['Content-Type'] = 'application/json;charset=UTF-8'
            config.responseType = 'arraybuffer'
            config.transformRequest = [(data) => {
                return JSON.stringify(data)
            }]
        } else if (config.head === 'multipart') {
            config.headers['Content-Type'] = `multipart/form-data;charset=UTF-8`
            config.transformRequest = [(data) => {
                return (data)
            }]
        } else {
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
            config.transformRequest = [(data) => {
                let ret = ''
                for (const it in data) {
                    if (data[it] || data[it] === 0) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    } else {
                        ret += encodeURIComponent(it) + '=' + '&'
                    }
                }
                return ret
            }]
        }
        config.headers['X-Token'] = getToken()

        return config
    },
    error => {
        // 对请求错误做些什么
        Promise.reject(error)
    }
)

// 添加响应拦截器
service.interceptors.response.use(
    // 对响应数据做点什么
    response => {
        // console.log('--->>>',response)
        // console.log('--->>>',response.headers)
        if (response.data.code === 999) {
            removeToken('X-Token')
            window.location.reload()
        }
        if (response.data.code === 500) {
            Message.error(response.data.msg || '服务异常，请稍后重试！')
        }

        let headersList = response.headers;
        for (let key in headersList) {
            let name = key.toLowerCase();
            if (name == "x-token") {
                setToken(headersList[name])
            }
        }

        if (response.data.code === 403) {
            Message.warning(response.data.msg || '无权限访问资源！')
        }
        let fileName
        // const request = JSON.stringify(response.config.url) + JSON.stringify(response.config.data)
        // requestList.splice(requestList.findIndex(item => item === request), 1)
        // 有附件返回加上名称
        if (response.headers['content-disposition'] && response.headers['content-disposition'].indexOf('attachment') !== -1) {
            fileName = response.headers['content-disposition'].split(';')[1].split('=')[1].replace(/\"/g, '')
            return { file: response.data, fileName }
        }
        return JSON.parse(JSON.stringify(response.data))
    },
    error => {
        // console.log('---===》》》',error)

        Message.error(error.message || '服务异常，请稍后重试！')
        return Promise.reject(error)
    }
)

export default service



