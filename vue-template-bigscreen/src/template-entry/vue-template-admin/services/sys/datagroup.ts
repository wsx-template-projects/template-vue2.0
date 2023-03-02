/**
 * @file API：/sys/datagroup
 */

import { ExAxiosRequestConfig } from '@/@types'
import http from "@/template-entry/vue-template-admin/scripts/http"

/**
 * Description 新增数据访问组
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function save(data?: {
/** 子系统 1:政府端  2:银行端  3:企业端 */ subsystem: string, 
/** 名称 */ name: string, 
/** 说明 */ note?: string, 
/** 组类型编码 */ type?: string, 
/** 组成员可选类型 1 单选；2 复选； */ childrenType?: string, 
/** 资源关联标识列表 关联数据接口资源 */ mcr8Rids?: string, 
/** 非超级管理员是否可见 1 是； 0 否； */ notSuperShow?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result>({
        url: "/sys/datagroup/save",
        type: "POST",
        data,
        ...options
    })
}

/**
 * Description 更新数据访问组
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function update(data?: {
/**                 数据访问组访问标识 */ vid?: string, 
/** 数据访问组对象 */ sysDataVisitGroupVo?: any, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result>({
        url: "/sys/datagroup/update/{vid}",
        type: "PUT",
        data,
        ...options
    })
}

/**
 * Description 删除数据访问组
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function delete_1(data?: {
/** 数据访问组访问标识 */ vid?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result>({
        url: "/sys/datagroup/delete/{vid}",
        type: "DELETE",
        data,
        ...options
    })
}

/**
 * Description 启用数据访问组
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function enable(data?: {
/** 数据访问组访问标识 */ vid?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result>({
        url: "/sys/datagroup/enable/{vid}",
        type: "PUT",
        data,
        ...options
    })
}

/**
 * Description 禁用数据访问组
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function disable(data?: {
/** 数据访问组访问标识 */ vid?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result>({
        url: "/sys/datagroup/disable/{vid}",
        type: "PUT",
        data,
        ...options
    })
}

/**
 * Description 查询单条数据访问组数据
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function get(data?: {
/** 数据访问组访问标识 */ vid?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result_1<SysDataVisitGroupDto>>({
        url: "/sys/datagroup/get/{vid}",
        type: "GET",
        data,
        ...options
    })
}

/**
 * Description  分页查询数据访问组数据  查询条件： name 名称；   isValid 状态,1 有效；0 无效； type 类型编码
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
    return http.request<Result_1<PageResponse<SysDataVisitGroupDto>>>({
        url: "/sys/datagroup/page",
        type: "POST",
        data,
        ...options
    })
}

/**
 * Description  查询数据访问组数据
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function list(data?: {
}, options?: ExAxiosRequestConfig) {
    return http.request<Result_1<SysDataVisitGroupDto[]>>({
        url: "/sys/datagroup/list",
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

export interface SysDataVisitGroupDto {

    /**
     * 说明
     */
    note: string

    /**
     * 非超级管理员是否可见 1 是； 0 否；
     */
    notSuperShow: string

    /**
     * 是否有效 （无效数据用户可见但不可用，不影响数据关联统计），1 有效；0 无效；
     */
    isValid: string

    typeName: string

    /**
     * 子系统
     */
    subsystem: string

    /**
     * 修改时间 新增时与新增时间保持一致
     */
    updateTime: string

    /**
     * 组类型
     */
    type: string

    mcr8Name: string

    /**
     * 资源关联标识列表 关联数据接口资源
     */
    mcr8Rids: string

    /**
     * 访问标识 单表唯一，可以暴露给用户
     */
    vid: string

    /**
     * 名称
     */
    name: string

    /**
     * 组成员可选类型 1 单选；2 复选；
     */
    childrenType: string

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

