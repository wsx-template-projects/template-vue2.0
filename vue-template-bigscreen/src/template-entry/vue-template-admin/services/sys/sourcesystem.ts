/**
 * @file API：/sys/sourcesystem
 */

import { ExAxiosRequestConfig } from '@/@types'
import http from "@/template-entry/vue-template-admin/scripts/http"

/**
 * Description 查询外部系统
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function list(data?: {
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<SysSourceSystemDto[]>>({
        url: "/sys/sourcesystem/list",
        type: "GET",
        data,
        ...options
    })
}

/**
 * Description  新增外部系统
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function save(data?: {
/** 名称 */ name: string, 
/** 编码值 */ code: string, 
/** 显示文本 */ text?: string, 
/** 说明 */ note?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result_1>({
        url: "/sys/sourcesystem/save",
        type: "POST",
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

export interface Result<T> {

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
    data: T

    /**
     * 错误信息
     */
    errors: ErrorInfo[]

}

export interface SysSourceSystemDto {

    /**
     * 访问标识 单表唯一，可以暴露给用户
     */
    vid: string

    /**
     * 名称
     */
    name: string

    /**
     * 说明
     */
    note: string

    /**
     * 编码值
     */
    code: string

    /**
     * 显示文本
     */
    text: string

}

export interface Result_1 {

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

