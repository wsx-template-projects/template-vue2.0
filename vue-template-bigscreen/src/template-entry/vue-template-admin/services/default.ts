/**
 * @file API：default
 */

import { ExAxiosRequestConfig } from '@/@types'
import http from "@/template-entry/vue-template-admin/scripts/http"

/**
 * Description  登录系统
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function login(data?: {
}, options?: ExAxiosRequestConfig) {
    return http.request<Result>({
        url: "/login",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        data,
        ...options
    })
}

export interface ErrorInfo {

    /**
     * 错误属性
     */
    field: string

    /**
     * 错误信息
     */
    info: string

}

export interface Result {

    /**
     * 返回编码.200=成功
     */
    code: number

    /**
     * 返回信息
     */
    message: string

    /**
     * 返回数据
     */
    data: any

    /**
     * 错误信息
     */
    errors: ErrorInfo[]

}

