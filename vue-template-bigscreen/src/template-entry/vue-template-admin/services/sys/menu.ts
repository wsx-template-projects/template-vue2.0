/**
 * @file API：/sys/menu
 */

import { ExAxiosRequestConfig } from '@/@types'
import http from "@/template-entry/vue-template-admin/scripts/http"

/**
 * Description  新增菜单
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function save(data?: {
/** 子系统 1:政府端  2:银行端  3:企业端 */ subsystem: string, 
/** 排序 必须大于等于0，0为默认值，表示未设置；业务有效值从1开始。 */ sort?: number, 
/** 名称 */ name?: string, 
/** 资源关联标识 关联页面资源 */ mcr8Rid?: string, 
/** 文件关联标识，引用图标 */ mcfRid?: string, 
/** 父分类关联标识 */ mcmRidParent?: string, 
/** 分类 1 模块（只是分组，无访问链接）；2 菜单； */ type?: string, 
/** 描述 */ note?: string, 
/** 备注. */ additionalJson?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result>({
        url: "/sys/menu/save",
        type: "POST",
        data,
        ...options
    })
}

/**
 * Description  更新菜单
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function update(data?: {
/**       菜单访问标识 */ vid?: string, 
/** 菜单对象 */ sysMenuVo?: any, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result>({
        url: "/sys/menu/update/{vid}",
        type: "PUT",
        data,
        ...options
    })
}

/**
 * Description 删除菜单
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function delete_1(data?: {
/** 菜单访问标识 */ vid?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result>({
        url: "/sys/menu/delete/{vid}",
        type: "DELETE",
        data,
        ...options
    })
}

/**
 * Description 查询单条菜单数据
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function get(data?: {
/** 菜单访问标识 */ vid?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result_1<SysMenuDto>>({
        url: "/sys/menu/get/{vid}",
        type: "GET",
        data,
        ...options
    })
}

/**
 * Description 菜单树
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function tree(data?: {
}, options?: ExAxiosRequestConfig) {
    return http.request<Result_1<TreeNodeDto[]>>({
        url: "/sys/menu/tree",
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

export interface SysMenuDto {

    /**
     * 描述
     */
    note: string

    /**
     * 备注
     */
    additionalJson: string

    /**
     * 子系统
     */
    subsystem: string

    /**
     * 资源关联标识 关联页面资源
     */
    mcr8Rid: string

    /**
     * 排序 必须大于等于0，0为默认值，表示未设置；业务有效值从1开始。
     */
    sort: number

    /**
     * 分类 1 模块（只是分组，无访问链接）；2 菜单；
     */
    type: string

    /**
     * 关联页面资源
     */
    mcr8Name: string

    /**
     * 分组 即顶级横向分类，关联字典类型：menu_grouping
     */
    grouping: string

    /**
     * 菜单路径
     */
    url: string

    /**
     * 访问标识 单表唯一，可以暴露给用户
     */
    vid: string

    /**
     * 创建时间
     */
    createTime: string

    /**
     * 名称
     */
    name: string

    /**
     * 辅助类型.
     */
    menuResourceType: string

    /**
     * 父分类名称
     */
    mcmVidParentName: string

    /**
     * 父分类关联标识
     */
    mcmRidParent: string

    /**
     * 文件关联标识，引用图标
     */
    mcfRid: string

}

export interface TreeNodeDto {

    /**
     * 前端输出VID
     */
    vid: string

    /**
     * children节点
     */
    children: TreeNodeDto[]

    /**
     * 子系统.
     */
    subsystem: string

    /**
     * 父节点.
     */
    pId: string

    /**
     * 节点编号.
     */
    id: string

    /**
     * 节点名称
     */
    label: string

    /**
     * 类型.
     */
    type: string

    /**
     * 请求地址.
     */
    uri: string

}

