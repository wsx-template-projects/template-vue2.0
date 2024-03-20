/**
 * @file API：/sys/log
 */

import { ExAxiosRequestConfig } from '@/@types'
import http from "@/template-entry/vue-template-admin/scripts/http"

/**
 * Description  分页日志  查询条件：logUser 用户登录名称,logUserRealName 用户名，logDeptmentId 机构机构vid，logOpName 操作名称，startTime 开始时间，endTime 结束时间
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function page(data?: {
/** 请求次数计数器 */ draw?: number, 
/** 列参数集合 */ columns?: {[key: string]: any}, 
/** 排序参数集合 */ order?: {[key: string]: any}, 
/** 分页起始位置 */ start?: number, 
/** 分页页码 */ pageNum?: number, 
/** 每页显示的记录数 */ length?: number, 
/** 全局搜索条件 */ search?: {[key: string]: any}, 
/** 业务查询参数 */ params?: {[key: string]: any}, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<PageResponse<SysLogDto>>>({
        url: "/sys/log/page",
        type: "POST",
        data,
        ...options
    })
}

/**
 * Description 查询日志操作名称列表
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function list(data?: {
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<string[]>>({
        url: "/sys/log/list",
        type: "GET",
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

export interface PageResponse<T> {

    /**
     * 过滤后的记录数
     */
    recordsFiltered: string

    /**
     * 请求次数计数器
     */
    draw: number

    /**
     * 返回的分页数据对象
     */
    data: T[]

    /**
     * 错误提示信息
     */
    error: string

    /**
     * 总记录数
     */
    recordsTotal: string

}

export interface SysLogDto {

    /**
     * 用户登录名称
     */
    logUser: string

    /**
     * 机构
     */
    logDeptmentName: string

    /**
     * 操作名称
     */
    logOpName: string

    /**
     * 用户名称
     */
    logUserRealName: string

    /**
     * 操作开始时间
     */
    logOperateStartTime: string

    /**
     * 子系统
     */
    logSubsystemName: string

    /**
     * 自增标识
     */
    id: string

    /**
     * 子系统
     */
    logSubsystem: string

    /**
     * 机构
     */
    logDeptmentId: string

}

