import _ from 'lodash'
import axios from 'axios'
import stringify from 'qs/lib/stringify'
import dateFns_format from 'date-fns/format'
import { LocalMenu, RouteMenu } from '@/@types'
import { Message } from 'element-ui'

import concurrency from './concurrency'
import { formatDate } from 'sharegood-cloud-utils'

export { concurrency }

/**
 * 将列表转成对象
 * @param {Object[]} list
 * @param {String} [valueKey]
 * @param {String} [labelKey]
 * @return {Object}
 */
export const listToMap = function(
    list: any,
    valueKey: string,
    labelKey: string,
) {
    valueKey = valueKey || 'value'
    labelKey = labelKey || 'label'
    const map: any = {}
    _.each(list, item => {
        map[item[valueKey]] = item[labelKey]
    })
    return map
}
/**
 * 时间格式化
 * @param {String | Number | Date} date
 * @param {String} [format] 官方文档：https://date-fns.org/v1.30.1/docs/format#description
 * @example dateFormat('YYYY年MM月DD日 HH时mm分ss秒SSS毫秒 Z时区 Q季度 X秒时间戳 x毫秒时间戳')
 */
export const dateFormat = function(date: any, format = 'YYYY-MM-DD') {
    if (!date) return ''
    if (format === '@iso') format = 'YYYY-MM-DDTHH:mm:ss.SSSZ'
    return dateFns_format(date, format)
}

/**
 * 将对象序列化成参数
 * @param {object} data
 * @param {Parameters<qs.stringify>[1]} [options]
 */
export const qsStringify = function(data: any, options: any) {
    options = { arrayFormat: 'repeat', ...options }
    return stringify(data, options)
}

/**
 * 将对象转成 formData
 * @typedef {string | number | boolean | File | Blob} Val
 * @param {{[key: string]: Val | Val[]}} data
 * @param {'repeat' | 'brackets' | 'indices'} [arrayFormat]
 */
export const toFormData = function(data: any, arrayFormat = 'repeat') {
    if (data instanceof FormData) return data
    const formData = new FormData()
    _.each(data, (val, key) => {
        if (val === undefined) return
        if (Array.isArray(val)) {
            val = val.filter(v => v !== undefined)
            val.forEach((v: any, i: any) => {
                let k = key
                if (arrayFormat === 'brackets') k += '[]'
                else if (arrayFormat === 'indices') k += `[${i}]`
                formData.append(k, v === null ? '' : v)
            })
        } else {
            formData.append(key, val === null ? '' : val)
        }
    })
    return formData
}

export const isNumber = function(value: any) {
    return typeof value === 'number' && !isNaN(value)
}
/**
 * 返回所有父级节点
 * @param {Array} tree
 * @param {Function} func 匹配
 * @param {Array} [path] 存储结果
 * @return {Array}
 */
export const findChildrenByPath = function(
    tree: any,
    func: any,
    path: any = [],
) {
    if (!tree) return []
    let data: any
    for (data of tree) {
        //这里按照你的需求来存放最后返回的内容吧
        path.push(data)
        if (func(data)) return path
        if (data.children) {
            const findChildren: any = findChildrenByPath(
                data.children,
                func,
                path,
            )
            if (findChildren.length) return findChildren
        }
        path.pop()
    }
    return []
}
/**
 * @description 格式化人民币 eg:10000 => 10,000.00
 * @param {*} money
 */
export function formatMoney(money: any, decimal = 2) {
    if (Number(money) === 0 || Number.isNaN(Number(money))) return '0.00'
    return Number(money)
        .toFixed(decimal)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 判断是否为 axios 取消的请求
 */
export const isCancel = axios.isCancel

// 递归每个路由，如果有子节点则跳转到第一个子节点
export const generateRedirectRoutes = function(tree: any) {
    const stack = [...tree]
    const routes = []
    while (stack.length) {
        const pop = stack.shift()
        if (pop.children && pop.children.length) {
            let targetIndex = -1
            pop.children.some((item: any, index: any) => {
                if (item.hidden === false || !item.hidden) {
                    targetIndex = index
                    return true
                }
                return false
            })
            if (targetIndex > -1) {
                routes.push({
                    path: pop.path,
                    redirect: pop.children[targetIndex].path,
                })
            }

            stack.unshift(...pop.children)
        }
    }
    return routes
}
/**
 * 将一级路由根据关系重组并设定 / 的默认路由
 */
export const generateRoutes = function(list: any, defaultPath?: any) {
    const map: any = {}
    list.sort((a: any, b: any) => {
        return a.meta.rank - b.meta.rank
    })

    list.forEach((item: any) => {
        if (!map[item.name]) {
            map[item.name] = item
        }
    })

    const result: any = []
    list.forEach((item: any, index: any) => {
        const { meta } = item
        item.meta = item.meta || {}
        const parentName = meta.parent || ''
        if (parentName) {
            if (map[parentName]) {
                map[parentName].children
                    ? map[parentName].children.push(item)
                    : (map[parentName].children = [item])
            }
        }
    })

    Object.keys(map).forEach(name => {
        if (!map[name]['meta']['parent']) {
            result.push(map[name])
        }
    })
    //result = generateRedirectRoutes(result)
    result.forEach((item: any) => {
        if (item.children && item.children.length) {
            item.redirect = defaultPath || item.children[0]['path']
        }
    })
    return result
}
// 递归寻找path属性匹配的节点
const findMenu = function(
    LocalMenus: Array<LocalMenu>,
    path: string,
): LocalMenu | null {
    const stack = [...LocalMenus]
    let result = null
    while (stack.length) {
        const pop = stack.shift()!
        if (pop.children) {
            stack.unshift(...pop.children)
        }
        if (pop.path === path) {
            result = {
                ...pop,
            }
            break
        }
    }
    return result
}
// 菜单地址是否有权限
export const hasPermission = function(
    AuthMenus: any,
    UserMenus: any,
    path: string,
) {
    if (['', '/', '/404', '/500', '403', '401'].includes(path)) {
        return true
    }
    const userMenu = findMenu(formatMenus(UserMenus), path)
    const authMenu = findMenu(formatMenus(AuthMenus), path)
    return !(!userMenu && authMenu)
}
// 获取path
export const getPath = function(menu: any): string {
    return menu.children?.length
        ? getPath(menu.children[0])
        : menu.path || menu.url || menu.uri || ''
}
// 是否是子应用路径 http开头并且没有external参数
export const isSubAppPath = function(to: string): boolean {
    if (
        to.indexOf('sub-app') > -1 ||
        (to.indexOf('http') === 0 && to.indexOf('external=') === -1)
    ) {
        return true
    }
    return false
}
// 是否是第三方路径  https://www.baidu.com?external=1
export const isExternalPath = function(to: string): boolean {
    if (to.indexOf('http') === 0 && to.indexOf('external=') !== -1) {
        return true
    }
    return false
}
/**
 * 将字符串转为代写
 * @param {String} [content]
 * @return {Object}
 */
export function pathToName(content: string) {
    return content.replace(/\//g, '_')
}

/**
 * 路由过滤（过滤出有权限的路由）
 * @param {(meta: object, route: routes[0]) => boolean} filterCallback
 * @returns {routes}
 */
export const formatMenus = function(menus: Array<LocalMenu>): Array<LocalMenu> {
    if (
        menus.filter((item: any) => {
            item.path
        }).length
    ) {
        return menus
    }
    const loop = (curRoutes: any) =>
        curRoutes.map((menu: any) => {
            const { uri, label, icon, children, ...newMenu } = menu
            let isExternal = false
            let path = uri || `/${guid()}`
            const title = label || '未定义'
            if (isSubAppPath(path)) {
                const origin = encodeURIComponent(path)
                path = '/sub-app/' + origin
            } else if (isExternalPath(path)) {
                isExternal = true
            }
            newMenu.path = path
            newMenu.meta = {
                title,
                icon,
                isExternal,
            }
            if (children) newMenu.children = loop(children)
            return newMenu
        })
    const result = loop(menus)
    return result
}
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}
/**
 * 将用户的菜单和本地菜单配合后返回新的菜单
 * @typedef {[{label:'',uri:'',icon:'',children:menu1}]} menu1
 * @typedef {[{path:'',meta:{icon:'',title:''},alwaysShow:true,children:menu2}]} menu2
 * @param {menu1} menu 后台传送的菜单
 * @param {menu1 | menu2} LocalMenus 本地菜单
 * @returns {menu2}
 */

export const generateMenus = (function() {
    let UUID = 0
    const Cache: any = {}
    return function(UserMenus: Array<LocalMenu>, LocalMenus: Array<LocalMenu>) {
        // 拼接url?参数
        const URLJoin = function(path: string, suffix: string): string {
            if (path.indexOf('?') > -1) {
                return path + '&' + suffix
            }
            return path + '?' + suffix
        }
        try {
            const stack = [...UserMenus]
            const result = []
            while (stack.length) {
                UUID++
                const pop = stack.shift()!
                const userMenu = {
                    ...pop,
                }
                const localMenu = findMenu(LocalMenus, userMenu.path!) || {
                    meta: {},
                }
                let { path = '' } = userMenu
                const newMenu: LocalMenu = {
                    path,
                    meta: {
                        ...localMenu.meta,
                        ...userMenu.meta,
                    },
                }
                if (Cache[path]) {
                    console.warn(`菜单中存在相同地址：${path}`)
                    path = URLJoin(path, `___=${UUID}`)
                    newMenu.path = path
                }

                Cache[path] = 1

                // 根据path找到本地菜单项
                if (pop.children && pop.children.length) {
                    newMenu.alwaysShow = false

                    newMenu.children = generateMenus(pop.children, LocalMenus)

                    newMenu.children.forEach((element: LocalMenu) => {
                        if (!element.hidden) {
                            newMenu.alwaysShow = true
                        }
                    })
                }

                result.push(newMenu)
            }

            return result
        } catch (err) {
            console.error(err)
            return []
        }
    }
})()

/** 复制文本  */
export function copyText(test: string) {
    if (document !== null) {
        const tag = document.createElement('input')
        tag.setAttribute('id', 'cp_input')
        tag.value = test
        document.getElementsByTagName('body')[0].appendChild(tag)
        const target: any = document.getElementById('cp_input')
        if (target) {
            target.select()
            target.execCommand('copy')
            target.remove()
        }
    }
}

// 去除空数据
export const filterDirtyData = function(
    data: any = {},
    filterEmptyData = true,
) {
    let isForm = false
    let keys = Object.keys(data)
    if (data instanceof FormData) {
        isForm = true
        keys = Array.from(data.keys())
    }
    // 数组字段转字符串
    keys.forEach(key => {
        const val = isForm ? data.get(key) : data[key]
        if (key.indexOf('$$') > -1 && val && val.length) {
            const value = val.join(',')
            const real_key = key.substr(2)
            if (isForm) {
                data.set(real_key, value)
                data.delete(key)
            } else {
                data[real_key] = value
                delete data[key]
            }
        }
    })
    keys.forEach(key => {
        // 过滤私有字段
        if (key.substr(0, 1) === '$') {
            if (isForm) {
                data.delete(key)
            } else {
                delete data[key]
            }
            return
        }
        if (filterEmptyData) {
            const val = isForm ? data.get(key) : data[key]
            // 过滤空字符以及undefined
            if (val === '' || val === undefined || val === null) {
                if (isForm) {
                    data.delete(key)
                } else {
                    delete data[key]
                }
                return
            }
            if (typeof val === 'object' && !val?.length) {
                filterDirtyData(val, filterEmptyData)
            }
        }
    })
}

// 遍历递归处理数据 obj 元数据   map 映射 {status:{newKey:'$status'}}
export const deepMapHandler = function(obj: any = {}, map: any = {}) {
    // 判断原目标是数组还是对象，进行初始化赋值
    const newObj: any = obj.constructor === Array ? [] : {}
    responseMapHandler(obj, map)
    // 循环原目标
    for (const key in obj) {
        // 判断当前值是否存在
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            // 判断是否当前要拷贝的是否是对象
            if (obj[key] && typeof obj[key] === 'object') {
                // 是对象，再次调用deepClone递归
                newObj[key] = deepMapHandler(obj[key], map)
            } else {
                // 数组，直接赋值就好
                newObj[key] = obj[key]
            }
        }
    }
    return newObj
}
export const responseMapHandler = function(data: any = {}, map: any = {}) {
    Object.keys(map).forEach(key => {
        const target = map[key]
        const value = data[key]
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            if (typeof target === 'string') {
                data[target] = value
            } else if (typeof target === 'object') {
                const { newKey = `$${key}`, handler, replace, dict } = target

                try {
                    let newValue = value
                    // 字典枚举查询
                    if (dict) {
                        let _dict: any = {}
                        if (typeof dict === 'function') {
                            _dict = dict()
                        }
                        const options = _dict.options || []

                        options.forEach((item: any) => {
                            if (item.value == value) {
                                newValue = item.label
                            }
                        })
                    }
                    if (handler) {
                        newValue = handler(value, data)
                    }

                    data[newKey] = newValue

                    if (replace) {
                        delete data[key]
                    }
                } catch (err) {
                    console.error(err)
                }
            } else if (typeof target === 'function') {
                const result = target(value, data)
                if (result !== undefined) {
                    data[key] = result
                }
            }
        }
    })
}

/**
 * @description: 平铺树转树
 * @param {*} data
 * @param {*} options
 * @return {*}
 */
export const toTree = (data: any[], options: Record<string, any> = {}) => {
    const myOptions = { id: 'id', pid: 'pid', children: 'children', ...options }
    const result: any[] = []
    if (!Array.isArray(data)) {
        return result
    }
    // 建立id索引表
    const map: Record<string, any> = {}
    data.forEach(item => {
        map[item[myOptions.id]] = item
    })
    data.forEach(item => {
        const parent = map[item[myOptions.pid]]
        if (parent) {
            ;(
                parent[myOptions.children] || (parent[myOptions.children] = [])
            ).push(item)
        } else {
            result.push(item)
        }
    })
    return result
}

/**
 * 深度遍历树
 * @param {*} tree 树
 * @param {*} callback 回调
 */
export const dfsTree = (tree: any[], callback: (node: any) => void) => {
    if (!Array.isArray(tree)) return
    tree.some(node => {
        dfsTree(node.children, callback)
        return callback(node)
    })
}

/**
 * 执行过滤器
 * @param {*} funcStr 过滤器函数字符串
 * @param {*} params 参数
 * @param {*} external 额外参数
 * @return {*}
 */
export const callFilter = (
    funcStr = '',
    params: any,
    external: Record<string, any> = {},
) => {
    const str = `
        "use strict";
        var document;
        ${funcStr}
    `
    /* eslint-disable */
    const filter = new Function('data', 'utils', 'external', str)
    try {
        const utils = { formatDate: formatDate, formatMoney: formatMoney }
        return filter.call({}, params, utils, external)
    } catch (error) {
        // setTimeout(() => {
        // Message.error((error as any).toString())
        console.warn('过滤器执行错误: ', error)
        // })
    }
}
