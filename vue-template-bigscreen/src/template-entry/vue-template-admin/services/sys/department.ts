/**
 * @file API：/sys/department
 */

import { ExAxiosRequestConfig } from '@/@types'
import http from "@/template-entry/vue-template-admin/scripts/http"

/**
 * Description 新增机构
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function save(data?: {
/** 来源系统 */ sourceSystem?: string, 
/** 来源系统标识 在来源系统必须是唯一的 */ sourceId?: string, 
/** 子系统 1 政府端 ; 2 银行端 ; 3 企业端 */ subsystem?: string, 
/** 上级部门关联标识  若是根节点，则父节点为0 */ mcdRidParent?: string, 
/** 全称 */ fullName?: string, 
/** 简称 */ simpleName?: string, 
/** 别名 */ alias?: string, 
/** 区域关联标识 用于关联机构管辖区域 */ mcaCodeDomination?: string, 
/** 区域关联标识 用于关联机构所在区域 */ mcaCodeLocation?: string, 
/** 详细地址 只保留除行政区域可以解析外的文本部分 */ detailAddress?: string, 
/** 类型 1 政府机构; 2 银行; 3 企业 ; 4 其它 */ type?: string, 
/** 子类型 */ subType?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result>({
        url: "/sys/department/save",
        type: "POST",
        data,
        ...options
    })
}

/**
 * Description 更新机构
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function update(data?: {
/**             机构访问标识 */ vid?: string, 
/** 机构对象 */ sysDepartmentVo?: any, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result>({
        url: "/sys/department/update/{vid}",
        type: "PUT",
        data,
        ...options
    })
}

/**
 * Description 查询单条机构数据
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function get(data?: {
/** 机构访问标识 */ vid?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result_1<SysDepartmentDto>>({
        url: "/sys/department/get/{vid}",
        type: "GET",
        data,
        ...options
    })
}

/**
 * Description 删除机构
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function delete_1(data?: {
/** 机构访问标识 */ vid?: string, 
}, options?: ExAxiosRequestConfig) {
    return http.request<Result>({
        url: "/sys/department/delete/{vid}",
        type: "DELETE",
        data,
        ...options
    })
}

/**
 * Description 机构树
 * @param data 要提交给服务器的数据
 * @param options 附加选项
 */
export function tree(data?: {
}, options?: ExAxiosRequestConfig) {
    return http.request<Result_1<TreeNodeDto[]>>({
        url: "/sys/department/tree",
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

export interface SysDepartmentDto {

    /**
     * 来源系统标识 在来源系统必须是唯一的
     */
    sourceId: string

    /**
     * 编号 由系统生成或指定，单表唯一，只用于显示，因为对用户可见，可能会被要求调整，【不允许作为关联值存储】
     */
    no: string

    /**
     * 上级部门关联标识
     */
    mcdRidParent: string

    /**
     * 层级 必须大于等于0，0为默认值，表示未设置；业务有效值从1开始。
     */
    level: number

    /**
     * 来源系统
     */
    sourceSystem: string

    /**
     * 机构所在区域
     */
    mcaNameLocation: string

    /**
     * 是否有效 （无效数据用户可见但不可用，不影响数据关联统计）：1 有效；0 无效；
     */
    isValid: string

    /**
     * 子系统
     */
    subsystem: string

    /**
     * 全称
     */
    fullName: string

    /**
     * 排序 必须大于等于0，0为默认值，表示未设置；业务有效值从1开始。
     */
    sort: number

    /**
     * 类型
     */
    type: string

    /**
     * 分组
     */
    grouping: string

    /**
     * 访问标识 单表唯一，可以暴露给用户
     */
    vid: string

    /**
     * 机构管辖区域
     */
    mcaNameDomination: string

    /**
     * 简称
     */
    simpleName: string

    /**
     * 区域关联标识 用于关联机构所在区域
     */
    mcaCodeLocation: string

    /**
     * 全地址 包含所有信息的文本
     */
    fullAddress: string

    /**
     * 别名
     */
    alias: string

    /**
     * 详细地址 只保留除行政区域可以解析外的文本部分
     */
    detailAddress: string

    /**
     * 子类型
     */
    subType: string

    /**
     * 区域关联标识 用于关联机构管辖区域
     */
    mcaCodeDomination: string

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

