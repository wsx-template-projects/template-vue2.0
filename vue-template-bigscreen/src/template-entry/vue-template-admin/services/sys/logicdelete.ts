/**
 * @file API：/sys/logicdelete
 */

import { ExAxiosRequestConfig } from '@/@types'
import http from "@/template-entry/vue-template-admin/scripts/http"

/**
 * Description 恢复逻辑删除
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function restore(data?: {
/** 逻辑删除访问标识 */ vid?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result>({
        url: "/sys/logicdelete/restore/{vid}",
        type: "PUT",
        data,
        ...options
    })
}

/**
 * Description 查询单条数据
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function get(data?: {
/** 访问标识 */ vid?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result_1<SysLogicDeleteDto>>({
        url: "/sys/logicdelete/get/{vid}",
        type: "GET",
        data,
        ...options
    })
}

/**
 * Description  分页查询数据  查询条件： 开始时间 startTime ; 结束时间  endTime； 数据类型 tableType  1 字典定义  2 字典类型  3 机构 4 资讯 5 菜单 6 角色  7 资源 8 数据访问项 9用户 11 问组
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
    return http.request<Result_1<PageResponse<SysLogicDeleteDto>>>({
        url: "/sys/logicdelete/page",
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

export interface Result_1<T> {

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

export interface SysLogicDeleteDto {

    /**
     * 访问标识 单表唯一，可以暴露给用户
     */
    vid: string

    /**
     * 数据库表名枚举值
     */
    tableType: string

    /**
     * 创建时间
     */
    createTime: string

    /**
     * 删除记录的关键字
     */
    recordKey: string

    /**
     * 是否有效 （无效数据用户可见但不可用，不影响数据关联统计）：1 有效；0 无效；将删除的记录标为有效，恢复后标为无效
     */
    isValid: string

    /**
     * 子系统
     */
    subsystem: string

    subsystemName: string

    tableTypeName: string

    /**
     * 内容
     */
    content: string

    /**
     * 创建人关联标识
     */
    mcuRidCreate: string

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

