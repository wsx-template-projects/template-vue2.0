// 业务处理方法
import { isObject, isArray } from './is-utils'

/**
 * @description 根据某个属性的属性值获取数组中的某个对象
 * @param {string | number} attr
 * @param {string | number | boolean} value
 */
export function getListObjByValue(
    list: any[],
    attr: string | number,
    value: string | number | boolean,
) {
    if (!Array.isArray(list)) {
        Promise.reject('list必须为数组')
        return {}
    }

    const result = list.filter((v: any) => v[attr] === value)
    // console.log('result :>> ', result)

    if (!result.length) {
        Promise.reject('没有匹配到list中对应的数据对象')
        return {}
    }

    if (result.length > 1) {
        Promise.reject('匹配上了list中的多个数据对象，请自行查看一下')
        return {}
    }

    return result[0]
}

interface BigData {
    source: any[]
    target: Record<string, any>
    keyValue: Record<string, any>
}

/**
 * @description 数据字段值转化
 * @param {BigData.source} source 数据源数组
 * @param {BigData.target} target 目标数据 - 接口获取的数据对象
 * @param {BigData.keyValue} keyValue 数据源和目标数据对应的key组合成的key-value对象
 * 示例：source = [{number: 0,numberKey: 'price'}] target = {price: 169} keyValue = {number: 'numberKey}
 */
export function fieldTransform({
    source,
    target,
    keyValue = { key: 'value' },
}: BigData) {
    console.log('source :>> ', source)
    console.log('target :>> ', target)
    console.log('key-value :>> ', keyValue)

    if (!isArray(source)) {
        Promise.reject('source必须为数组')
        return source
    }

    if (!isObject(target)) {
        Promise.reject('target必须为对象')
        return source
    }

    if (!isObject(keyValue)) {
        Promise.reject('keyValue必须为对象')
        return source
    }

    const result = source.map((v: Record<string, any>) => {
        const temp = { ...v }
        Object.entries(keyValue).forEach((item: any) => {
            const [key, value] = item
            // console.log('item :>> ', item)
            // console.log('source-key :>> ', temp[key])
            // console.log('target-key :>> ', temp[value])
            // console.log('target-value :>> ', target[temp[value]])
            if (temp[key] !== undefined && temp[value] !== undefined) {
                if (target[temp[value]] || target[temp[value]] == 0) {
                    temp[key] = target[temp[value]]
                } else {
                    temp[key] = ''
                }
            }
        })
        // console.log('temp :>> ', temp)
        return temp
    })
    return result
}
