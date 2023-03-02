/**
 * @file API：/sys/resource
 */

import { ExAxiosRequestConfig } from '@/@types'
import http from "@/template-entry/vue-template-admin/scripts/http"

/**
 * Description 新增资源
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function save(data?: {
/** 是否有效  1 有效；0 无效； */ isValid: string, 
/** 名称 */ name: string, 
/** 类型 1 页面；2 区域；3 按钮；4 数据接口； */ type: string, 
/** 数据接口类型 1 新增；2 修改；3 删除；4 查询；5 综合并返回查询结果；6 综合并不返回查询结果； */ interfaceType: string, 
/** 分组 */ grouping?: string, 
/** 访问地址正则表达式 */ urlRegex?: string, 
/** 资源关联标识列表  页面可关联：页面、区域、按钮、接口  区域可关联：区域、按钮、接口  按钮可关联：接口  但不能循环关联！ */ mcr8Rids?: string, 
/** 说明 */ note?: string, 
/** 文件关联标识，引用图标 （为按钮预留） */ mcfRid?: string, 
/** 认证级别 1 匿名；2 登录；3 授权； */ authLevel?: string, 
/** 请求方法 1 post; 2 delete; 3 put; 4 get; */ requestMethod?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result>({
        url: "/sys/resource/save",
        type: "POST",
        data,
        ...options
    })
}

/**
 * Description 更新资源
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function update(data?: {
/**           资源访问标识 */ vid?: string, 
/** 资源对象 */ sysResourceVo?: any, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result>({
        url: "/sys/resource/update/{vid}",
        type: "PUT",
        data,
        ...options
    })
}

/**
 * Description  删除资源
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function delete_1(data?: {
/** 资源访问标识 */ vid?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result>({
        url: "/sys/resource/delete/{vid}",
        type: "DELETE",
        data,
        ...options
    })
}

/**
 * Description 查询单条资源数据
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function get(data?: {
/** 资源访问标识 */ vid?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result_1<SysResourceDto>>({
        url: "/sys/resource/get/{vid}",
        type: "GET",
        data,
        ...options
    })
}

/**
 * Description  分页资源查询  查询条件：name 资源名称模糊查询；type 类型 1 页面；2 区域；3 按钮；4 数据接口；isValid 是否有效 1 有效；0 无效；authLevel 认证级别 1 匿名；2 登录；3 授权；requestMethod 请求方法 1 post; 2 delete; 3 put; 4 get;
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
    return http.request<Result_1<PageResponse<SysResourceDto>>>({
        url: "/sys/resource/page",
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

export interface SysResourceDto {

    /**
     * 说明
     */
    note: string

    /**
     * 是否有效 （无效数据用户可见但不可用，不影响数据关联统计）：1 有效；0 无效；
     */
    isValid: string

    /**
     * 请求方法 1 post; 2 delete; 3 put; 4 get;
     */
    requestMethod: string

    /**
     * 修改时间 新增时与新增时间保持一致
     */
    updateTime: string

    /**
     * 类型 1 页面；2 区域；3 按钮；4 数据接口；
     */
    type: string

    /**
     * 资源关联标识列表 页面可关联：页面、区域、按钮、接口   区域可关联：区域、按钮、接口 按钮可关联：接口  但不能循环关联！
     */
    mcr8Rids: string

    /**
     * 访问标识 单表唯一，可以暴露给用户
     */
    vid: string

    /**
     * 数据接口类型 1 新增；2 修改；3 删除；4 查询；5 综合并返回查询结果；6 综合并不返回查询结果；
     */
    interfaceType: string

    /**
     * 创建时间
     */
    createTime: string

    /**
     * 子资源.
     */
    children: SysResourceDto[]

    /**
     * 访问地址正则表达式
     */
    urlRegex: string

    /**
     * 名称
     */
    name: string

    /**
     * 认证级别 1 匿名；2 登录；3 授权；
     */
    authLevel: string

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

