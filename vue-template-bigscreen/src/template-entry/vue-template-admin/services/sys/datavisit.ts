/**
 * @file API：/sys/datavisit
 */

import { ExAxiosRequestConfig } from '@/@types'
import http from "@/template-entry/vue-template-admin/scripts/http"

/**
 * Description 新增数据项访问
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function save(data?: {
/** 是否有效  1 有效；0 无效； */ isValid: string, 
/** 名称 */ name: string, 
/** 说明 */ note?: string, 
/** 数据访问组关联标识 关联一个数据访问组 */ mcdvgRid?: string, 
/** 是否默认值 1 是； 0 否； */ isDefault?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result>({
        url: "/sys/datavisit/save",
        type: "POST",
        data,
        ...options
    })
}

/**
 * Description 更新数据访问项
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function update(data?: {
/**            数据访问项访问标识 */ vid?: string, 
/** 数据访问项对象 */ sysDataVisitVo?: any, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result>({
        url: "/sys/datavisit/update/{vid}",
        type: "PUT",
        data,
        ...options
    })
}

/**
 * Description 删除数据访问项
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function delete_1(data?: {
/** 数据访问项访问标识 */ vid?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result>({
        url: "/sys/datavisit/delete/{vid}",
        type: "DELETE",
        data,
        ...options
    })
}

/**
 * Description 查询单条数据访问数据
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function get(data?: {
/** 数据访问访问标识 */ vid?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result_1<SysDataVisitDto>>({
        url: "/sys/datavisit/get/{vid}",
        type: "GET",
        data,
        ...options
    })
}

/**
 * Description  分页查询数据访问项数据  查询条件： name 名称；   isValid 状态,1 有效；0 无效； mcdvgRid 数据访问组关联标识
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
    return http.request<Result_1<PageResponse<SysDataVisitDto>>>({
        url: "/sys/datavisit/page",
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

export interface SysDataVisitDto {

    /**
     * 访问标识 单表唯一，可以暴露给用户
     */
    vid: string

    /**
     * 说明
     */
    note: string

    /**
     * 数据访问组关联标识 关联一个数据访问组
     */
    mcdvgRid: string

    /**
     * 是否默认值 1 是； 0 否；
     */
    isDefault: string

    /**
     * 是否有效 （无效数据用户可见但不可用，不影响数据关联统计）：1 有效；0 无效；
     */
    isValid: string

    /**
     * 名称
     */
    name: string

    /**
     * 数据访问组名称
     */
    mcdvgName: string

    /**
     * 子系统
     */
    subsystem: string

    /**
     * 修改时间 新增时与新增时间保持一致
     */
    updateTime: string

    subsystemName: string

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

