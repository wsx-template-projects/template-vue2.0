import _ from 'lodash'
import axios from 'axios'
import stringify from 'qs/lib/stringify'
// import dateFns_format from 'date-fns/format'

import concurrency from './concurrency'

export { concurrency }

/**
 * 将列表转成对象
 * @param {object[]} list
 * @param {string} [valueKey]
 * @param {string} [labelKey]
 * @returns {object}
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
// /**
//  * 时间格式化
//  * @param {string | number | Date} date
//  * @param {string} [format] 官方文档：https://date-fns.org/v1.30.1/docs/format#description
//  * @example dateFormat('YYYY年MM月DD日 HH时mm分ss秒SSS毫秒 Z时区 Q季度 X秒时间戳 x毫秒时间戳')
//  */
// export const dateFormat = function(date: any, format = 'YYYY-MM-DD') {
//     if (!date) return ''
//     if (format === '@iso') format = 'YYYY-MM-DDTHH:mm:ss.SSSZ'
//     return dateFns_format(date, format)
// }

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
// 返回所有父级节点
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
                } else {
                    return false
                }
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

    let result: any = []
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
const findMenu = function(tree: any, path: any) {
    const stack = [...tree]
    let result = null
    while (stack.length) {
        const pop = stack.shift()
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
// 如果在本地菜单中
export const isNoPermission = function(LocalMenus: any, menus: any, path: any) {
    if (path === '/') {
        return false
    } else {
        const isInLocalMenu = findMenu(LocalMenus, path)
        const isPermissionMenu = findMenu(menus, path)
        // console.log(
        //     1212,
        //     path,
        //     isInLocalMenu,
        //     isPermissionMenu,
        //     isInLocalMenu !== null,
        //     isPermissionMenu === null,
        // )
        return isInLocalMenu !== null && isPermissionMenu === null
    }
}
// 是否是子应用路径
export const isSubAppPath = function(to: string): boolean {
    if (
        to.indexOf('sub-app') > -1 ||
        (to.indexOf('http') === 0 && to.indexOf('external=') === -1)
    ) {
        return true
    } else {
        return false
    }
}
// 是否是第三方路径  https://www.baidu.com?external=1
export const isExternalPath = function(to: string): boolean {
    if (to.indexOf('http') === 0 && to.indexOf('external=') !== -1) {
        return true
    } else {
        return false
    }
}
/**
 * 将字符串转为代写
 * @param {string} [content]
 * @returns {object}
 */
export function pathToName(content: string) {
    return content.replace(/\//g, '_')
}
/**
 * 将用户的菜单和本地菜单配合后返回新的菜单
 */

export const generateMenus = function(menu: any, LocalMenus: any) {
    try {
        const stack = [...menu]
        const result = []
        while (stack.length) {
            const pop = stack.shift()
            const { id, label } = pop
            let path = pop.url || pop.uri || pop.path || '/' + (label + id)
            path = encodeURI(path)
            //console.log('pop-----------', path, pop)
            if (path) {
                if (path === '/notFind') {
                    path = `/notFind/${id}`
                }
                const menu = findMenu(LocalMenus, path)

                if (menu) {
                    const meta = menu.meta || {}
                    const hidden = menu.hidden

                    const { icon, title, isExternal } = meta
                    const newMenu: any = {
                        path: path,
                        meta: {
                            title: pop.name || pop.label || title,
                            vid: pop.id || '',
                            icon,
                            isExternal,
                        },
                        hidden: hidden,
                    }

                    if (pop.children && pop.children.length) {
                        newMenu.alwaysShow = false

                        newMenu.children = generateMenus(
                            pop.children,
                            LocalMenus,
                        )

                        newMenu.children.forEach((element: any) => {
                            if (!element.hidden) {
                                newMenu.alwaysShow = true
                            }
                        })
                    }

                    result.push(newMenu)
                } else {
                    const { icon } = pop
                    const title = pop.name || pop.label || '未定义'
                    let uri = path
                    let isExternal = false
                    if (isSubAppPath(path)) {
                        let origin = encodeURIComponent(path)
                        uri = '/sub-app/' + origin
                    } else if (isExternalPath(path)) {
                        uri = path
                        isExternal = true
                    }

                    const newMenu: any = {
                        path: uri,
                        meta: {
                            title: title,
                            vid: pop.id || '',
                            icon,
                            isExternal,
                        },
                    }

                    if (pop.children && pop.children.length) {
                        newMenu.alwaysShow = false

                        newMenu.children = generateMenus(
                            pop.children,
                            LocalMenus,
                        )

                        newMenu.children.forEach((element: any) => {
                            if (!element.hidden) {
                                newMenu.alwaysShow = true
                            }
                        })
                    }

                    result.push(newMenu)
                }
            }
        }

        return result
    } catch (err) {
        console.error(err)
        return []
    }
}
// 路由根据获取菜单添加vid
export const generateRoutesVid = function(accessedMenus: any, routers: any) {
    const stack = [...routers]
    stack.forEach(element => {
        const path = element.path
        if (!element.meta) element.meta = {}

        const menu = findMenu(accessedMenus, path) || ''
        if (menu) {
            element.meta.vid = menu.meta.vid
        } else {
            element.meta.vid = ''
        }
    })
    return stack
}
// 遍历所有异步路由并在meta上挂载相应菜单的数据
export const generateRoutesMeta = function(routers: any, accessedMenus: any) {
    const stack = [...routers]
    stack.forEach(element => {
        const path = element.path
        if (!element.meta) element.meta = {}

        const menu = findMenu(accessedMenus, path) || ''
        if (menu) {
            element.meta.vid = menu.meta.vid
        } else {
            element.meta.vid = ''
        }
    })
    return stack
}

/** 遍历所有异步路由获取按钮权限数据对象 */
export const generateRoutesAuthBtns = function(routers: any, attr: any) {
    let result: any = {}
    const stack = [...routers]
    stack.forEach(element => {
        // console.log('element:', element)
        if (element.children && element.children.length) {
            // console.log('children:', element.children)
            // console.log('result777:', result)
            result = {
                ...result,
                ...generateRoutesAuthBtns(element.children, attr),
            }
        } else {
            if (element[attr] && element[attr].length) {
                // console.log('buttons:', element[attr])
                result[element.label] = element[attr]
            }
        }
    })
    return result
}

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

/**
 * 一维数组转化成二维数组
 * @param {array} list 目标数组
 * @param {number} num 数组元素个数
 * @return {array} [[1,2],[10,99]]
 */
export function arrayTransform(list: any, num: number): any {
    let result = []
    let len = Math.ceil(list.length / num)
    for (let i = 0; i < len; i++) {
        let curr = list.slice(i * num, (i + 1) * num)
        result.push(curr)
    }
    return result
}

/**
 * 字符串分割
 * @param {string} str 数据源 '123,456,789'
 * @param {string} format 分割标识，默认为逗号
 * @return {array} ['123','456','789']
 */
export function strSplit(str: string, format: string = ','): string[] {
    const result = str ? str.split(format) : []
    return result
}

/**
 * 创建唯一的字符串
 * @return {string} ojgdvbvaua40
 */
export function createUniqueString() {
    const timestamp = +new Date() + ''
    const randomNum = parseInt((1 + Math.random()) * 65536 + '') + ''
    return (+(randomNum + timestamp)).toString(32)
}

/**
 * 递归寻找匹配节点
 * @param {array} tree 树结构数据
 * @param {*} key 对比属性名
 * @param {*} value 对比属性值
 * */
export function findNode(tree: any[], key: any, value: any) {
    const stack: any = [...tree]
    let result: any = {}
    while (stack.length) {
        const pop: any = stack.shift()

        if (pop.children) {
            stack.unshift(...pop.children)
        }

        if (pop[key] === value) {
            result = { ...pop }
            break
        }
    }
    return result
}

/**
 * 判断数组中是否包含某条数据 (注意：只支持单个属性做比较)
 * @param {array} list 数据源
 * @param {string} key 相比较的属性 - 属性名
 * @param {*} value 相比较的属性 - 属性值
 */
export function hasEqual(list: any[], key: string, value: any): boolean {
    return list.some((v: any) => v[key] === value)
}
