/**
 * @file API：/sys/user
 */

import { ExAxiosRequestConfig } from '@/@types'
import http from "@/template-entry/vue-template-admin/scripts/http"

/**
 * Description 获取当前登录用户信息
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function getCurrentUserInfo(data?: {
/** token */ token?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result>({
        url: "/sys/user/getCurrentUserInfo",
        type: "POST",
        contentType: "application/json;charset=utf-8",
        data,
        ...options
    })
}

/**
 * Description 新增用户
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function save(data?: {
/** 子系统 1:政府端  2:银行端  3:企业端 */ subsystem: string, 
/** 登录名 */ username: string, 
/** 真实姓名. */ realName: string, 
/** 身份证号 */ id: string, 
/** 手机号 */ mobilePhone: string, 
/** 所属部门 部门访问标识，只能是一个部门. */ mcdRid: string, 
/** 用户角色  多个值是以逗号隔开的字符串. */ mcrVids?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result>({
        url: "/sys/user/save",
        type: "POST",
        data,
        ...options
    })
}

/**
 * Description 更新用户
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function update(data?: {
/**       用户访问标识 */ vid?: string, 
/** 用户对象 */ sysUserVo?: any, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result>({
        url: "/sys/user/update/{vid}",
        type: "PUT",
        data,
        ...options
    })
}

/**
 * Description 删除用户
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function delete_1(data?: {
/** 用户访问标识 */ vid?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result>({
        url: "/sys/user/delete/{vid}",
        type: "DELETE",
        data,
        ...options
    })
}

/**
 * Description 启用用户
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function enable(data?: {
/** 用户访问标识 */ vid?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result>({
        url: "/sys/user/enable/{vid}",
        type: "PUT",
        data,
        ...options
    })
}

/**
 * Description 禁用用户
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function disable(data?: {
/** 用户访问标识 */ vid?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result>({
        url: "/sys/user/disable/{vid}",
        type: "PUT",
        data,
        ...options
    })
}

/**
 * Description 重置密码
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function reset(data?: {
/** 用户访问标识 */ vid?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result>({
        url: "/sys/user/reset/{vid}",
        type: "PUT",
        data,
        ...options
    })
}

/**
 * Description 查询单条用户数据
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function get(data?: {
/** 用户访问标识 */ vid?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result_1<SysUserDto>>({
        url: "/sys/user/get/{vid}",
        type: "GET",
        data,
        ...options
    })
}

/**
 * Description  分页用户查询  查询条件： mcdRids 部门访问标识列表，支持1个或多个，逗号分隔；   isValid 状态,1 有效；0 无效； realName 姓名
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
    return http.request<Result_1<PageResponse<SysUserDto>>>({
        url: "/sys/user/page",
        type: "POST",
        data,
        ...options
    })
}

/**
 * Description 用户列表导出全部
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function querydown(data?: {
/** 请求次数计数器 */ draw?: number, 
/** 列参数集合 */ columns?: {[key: string]: any}, 
/** 排序参数集合 */ order?: {[key: string]: any}, 
/** 分页起始位置 */ start?: number, 
/** 分页页码 */ pageNum?: number, 
/** 每页显示的记录数 */ length?: number, 
/** 全局搜索条件 */ search?: {[key: string]: any}, 
/** 业务查询参数 */ params?: {[key: string]: any}, 
}, options?: ExAxiosRequestConfig) {
    return http.request<null>({
        url: "/sys/user/querydown",
        type: "POST",
        data,
        ...options
    })
}

/**
 * Description 发送验证码.
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function sendcode(data?: {
/** 手机号 */ phone?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result>({
        url: "/sys/user/sendcode/{phone}",
        type: "GET",
        data,
        ...options
    })
}

/**
 * Description 修改密码
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function updatepassword(data?: {
/** 手机号 . */ mobile: string, 
/** 验证码 . */ code: string, 
/** 新密码 . */ newPassword: string, 
/** 新密码 . */ repeatPassword: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result>({
        url: "/sys/user/updatepassword",
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

export interface SysUserDto {

    /**
     * 状态 示例：{@code 1} 1 有效；0 无效；.
     */
    isValid: string

    /**
     * 部门全称.
     */
    mcdFullName: string

    /**
     * 子系统 示例：{@code 1}.
     */
    subsystem: string

    /**
     * 最近修改时间 示例：{@code 2018-9-12 12:20:33} 新增时与新增时间保持一致.
     */
    updateTime: string

    /**
     * 关联标识 单表唯一，用于表字段引用和关联
     */
    rid: string

    /**
     * 访问标识 单表唯一，可以暴露给用户.
     */
    vid: string

    /**
     * 姓名 示例：{@code 张三} 真实姓名.
     */
    realName: string

    /**
     * 最近一次登录时间 示例：{@code 2018-9-12 12:20:33}.
     */
    lastLoginTime: string

    /**
     * 手机号 示例：{@code 13612345678}.
     */
    mobilePhone: string

    /**
     * 创建时间 示例：{@code 2018-9-12 12:20:33}.
     */
    createTime: string

    /**
     * 用户角色 示例：{@code xxxxxx,yyyyyy} 多个值是以逗号隔开的字符串.
     */
    mcrVids: string

    /**
     * 部门关联标识.
     */
    mcdRid: string

    /**
     * 登录名 示例：{@code zhangsan}.
     */
    username: string

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

