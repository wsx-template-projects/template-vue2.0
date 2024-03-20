import { createAxios, ExApiResponse, ExAxiosInstance } from 'icinfo-request'
import exShowLoading from '@/scripts/http/exShowLoading'
import exShowErrMessage from '@/scripts/http/exShowErrMessage'
import exConsole from '@/scripts/http/exConsole'
import exApiHooks from './exApiHooks'
import exAuth from './exAuth'
import exData from './exData'

const http = createAxios(
    {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            //'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        timeout: 30 * 1000, // 默认超时30s
        baseURL: process.env.VUE_APP_BASEURL_API,
        // withCredentials: true,
        // baseURL: 'http://192.168.3.90:8099',
        // 业务请求是否成功
        isResponseSuccess(res: ExApiResponse) {
            if (res.code == undefined || res.code === 0 || res.code === 200) {
                return true
            }
            return false
        },
        getResponseSuccess(res: ExApiResponse) {
            return res
        },
        getResponseError(res: any) {
            const { message = '网络走神了', code = '-1' } = res
            return {
                message,
                code,
            }
        },
    },
    (instance: ExAxiosInstance) => {
        instance.exHooks.add(exData)
        instance.exHooks.add(exAuth)
        instance.exHooks.add(exApiHooks)
        instance.exHooks.add(exConsole)
        instance.exHooks.add(exShowLoading)
        instance.exHooks.add(exShowErrMessage)
    },
)
export { http }
export default http
