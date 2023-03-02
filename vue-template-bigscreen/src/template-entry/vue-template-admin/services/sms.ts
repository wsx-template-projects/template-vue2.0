/**
 * @file API：/sms
 */

import { ExAxiosRequestConfig } from '@/@types'
import http from "@/template-entry/vue-template-admin/scripts/http"

/**
 * Description 发送短信
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function sendSms(data?: {
/**   多个号码，以逗号隔开 */ phone?: string, 
content?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<{[key: string]: any}>({
        url: "/sms/sendSms",
        type: "post",
        data,
        ...options
    })
}

