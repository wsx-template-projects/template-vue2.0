/**
 * @description 通过接口keys获取对应的接口数据对象
 * @param {Object} res 接口返回的数据
 * @param {Array} keys 字段key的集合
 */
export const getDataByResKeys = (res: any, keys: any[]) => {
    return (keys ?? [])?.reduce((prev: any, curr: any) => {
        const acc = { ...prev }
        acc[curr] = res?.[curr] ?? '-'
        return acc
    }, {})
}

interface IParams {
    /** 数据源 */
    source: any[]
    /** 接口数据对象 */
    res: Record<string, any>
    /** 迭代器 */
    callback?: any
    /** 字段配置 */
    config?: Record<string, any>
}

const iterator = (v: Record<string, any>, res: Record<string, any>, config: Record<string, any>) => {
    console.log('config :>> ', config)
    let temp = { ...v }
    Object.entries(config).forEach((item: any) => {
        console.log('item :>> ', item)
        const [resKey, configKey] = item
        temp[configKey] = res?.[temp?.[resKey]] ?? 0
    })
    return temp
}

/**
 * @description 通过res数据组装后获取数组配置项
 * @param {Array} source 数据源
 * @param {Object} res 接口数据对象
 * @param {Function} callback 迭代器
 * @param {Object} config 字段配置项
 */
export const getArrayConfigByRes = ({ source, res, callback, config = { key: 'value' } }: IParams) => {
    console.log('source :>> ', source)
    console.log('res :>> ', res)
    console.log('config :>> ', config)
    return source?.map((v: any) => {
        return callback ? callback(v, res, config) : iterator(v, res, config)
    })
}

// 示例
const exampleList = getArrayConfigByRes({
    source: [{value: '',key: 'key1',ratio: '',ratioKey: 'key2'}],
    res: {key1: '123',key2: '456'},
    config: { key: 'value', ratioKey: 'ratio' },
})
console.log('exampleList :>> ', exampleList);
