import ApiHooks from '@/api/modules'

const transformData = function(data: any = {}) {
    // 数组字段转字符串
    Object.keys(data).forEach(key => {
        if (key.indexOf('$$') > -1 && data[key] && data[key].length) {
            const value = data[key].join(',')
            const real_key = key.substr(2)
            data[real_key] = value
            delete data[key]
        }
    })
    Object.keys(data).forEach(key => {
        // 过滤私有字段
        if (key.substr(0, 1) === '$') {
            delete data[key]
        }
        // 过滤空字符以及undefined
        if (data[key] === '' || data[key] === undefined || data[key] === null) {
            delete data[key]
        }
        if (typeof data[key] === 'object' && !data[key]['length']) {
            transformData(data[key])
        }
    })
}

// 遍历递归处理数据 obj 元数据   map 映射 {status:{newKey:'$status'}}
function deepMapHandler(obj: any = {}, map: any = {}) {
    // 判断原目标是数组还是对象，进行初始化赋值
    const newObj: any = obj.constructor === Array ? [] : {}
    responseMapHandler(obj, map)
    // 循环原目标
    for (let key in obj) {
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
function responseMapHandler(data: any = {}, map: any = {}) {
    Object.keys(map).forEach(key => {
        let target = map[key]
        let value = data[key]
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            if (typeof target === 'string') {
                data[target] = value
            } else if (typeof target === 'object') {
                let { newKey = `$${key}`, handler, replace, dict } = target

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
export const exData = Object.freeze({
    onBefore(config: any) {
        // 支持restful格式的api /news/detail/{id}
        const body = config.params || config.data || config.body || {}
        const uri = config.url
        config.url = config.url.replace(/\{(.+?)\}/g, ($1: any, key: any) => {
            const result = body[key] || ''
            return result
        })
        // body字段转化
        const method = config.method.toLowerCase()
        if (config.body) {
            if (['delete', 'get', 'head', 'options'].indexOf(method) > -1) {
                config.params = {
                    ...config.body,
                }
            } else {
                config.data = {
                    ...config.body,
                }
            }
        }
        // 兼容api-server生成的API函数

        if (config.type) {
            let type = config.type.toLowerCase()
            config.method = type
            if (['delete', 'get', 'head', 'options'].includes(type)) {
                config.params = {
                    ...(config.data || {}),
                }
            } else {
                config.data = {
                    ...(config.data || {}),
                }
            }
        }
        if (config.params) {
            transformData(config.params)
        }
        if (config.data) {
            transformData(config.data)
        }
        const exApiHooks = config.exApiHooks || []

        if (exApiHooks.length) {
            const ApiHook = ApiHooks.filter((item: any) =>
                exApiHooks.includes(item.name),
            )

            ApiHook.forEach((hook: any) => {
                console.log(
                    `[匹配拦截器: ${hook.description} ${uri} => ${hook.name}]`,
                )
                let params = config.params || config.data || config.body || {}
                const requestMap = hook.requestMap
                if (requestMap) {
                    deepMapHandler(params, requestMap)
                }
                hook.onBefore && hook.onBefore(params)
            })
        }
    },
    onComplete(config: any, isResolve: any, resOrErr: any) {
        const exApiHooks = config.exApiHooks || []
        if (isResolve && exApiHooks.length) {
            const ApiHook = ApiHooks.filter((item: any) =>
                exApiHooks.includes(item.name),
            )

            ApiHook.forEach((hook: any) => {
                const responseMap = hook.responseMap
                if (responseMap) {
                    deepMapHandler(resOrErr, responseMap)
                }
                hook.onSuccess && hook.onSuccess(resOrErr)
            })
        }
    },
})

export default exData
