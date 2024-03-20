/**
 * @file API：/sys/area
 */

import { ExAxiosRequestConfig } from '@/@types'
import http from "@/template-entry/vue-template-admin/scripts/http"

/**
 * Description 根据名称查询地区
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function list(data?: {
/** 名称全称 必填 */ name?: string, 
/** 1：该区域及下级所有区域  2：名称为省级显示下一级市  名称为市显示下一级区   type不输默认为1 */ type?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<SysAreaDto[]>>({
        url: "/sys/area/list",
        type: "GET",
        data,
        ...options
    })
}

/**
 * Description  新增地区
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function save(data?: {
/** 名称 */ name: string, 
/** 编码值 12位 */ code: string, 
/** 上级区域关联标识 12位 */ parentCode?: string, 
/** 显示文本 */ text?: string, 
/** 说明 */ note?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result_1>({
        url: "/sys/area/save",
        type: "POST",
        data,
        ...options
    })
}

/**
 * Description 地区树
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function tree(data?: {
}, options?: ExAxiosRequestConfig) {
    return http.request<Result<TreeNodeDto[]>>({
        url: "/sys/area/tree",
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

export interface SysAreaDto {

    /**
     * 访问标识 单表唯一，可以暴露给用户
     */
    vid: string

    /**
     * 说明
     */
    note: string

    /**
     * 编码值
     */
    code: string

    /**
     * 上级区域关联标识
     */
    parentCode: string

    /**
     * 名称
     */
    name: string

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

