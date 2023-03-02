/**
 * 一个数组是否包含另一个数组的所有元素
 */
 export const isContain = (a: any[], b: any[]) => {
    if (!Array.isArray(a) || !Array.isArray(b)) return false
    if (a.length < b.length) return false
    const isBool: boolean = b.every(v => a.includes(v))
    return isBool
}

/**
 * 字段值转化
 * @description 文本转数字 或者 数字转文本
 * @param {array} source 数据源
 * @param {array | number | string} target 目标数据
 * @param {array } keys ['输入key名','输出key名'] 默认值：['label','value']
 * @return {array}
 */
export const fieldTransform = (
    source: any[],
    target: [] | number | string,
    keys: string[] = ['label', 'value'],
) => {
    const isBool = source.every(v => isContain(Object.keys(v), keys))
    if (!isBool) {
        return Promise.reject(
            'source数据源的key和需要转化的字段key不匹配,请自行查看一下！',
        )
    }
    let arr: any = []
    if (Array.isArray(target)) arr = target
    if (typeof target === 'number') arr = [target]
    if (typeof target === 'string' && target.indexOf(',') > -1)
        arr = target.split(',').map((v: any) => {
            // v = '-23.131'
            // console.log('isNaN :>> ', isNaN(v))
            return isNaN(v) ? v : +v
        })
    console.log('arr :>> ', arr)
    const findArr = source
        .filter(v => {
            console.log('v[keys[0]] :>> ', v[keys[0]])
            return arr.includes(v[keys[0]])
        })
        .map(v => v[keys[1]])
    return findArr
}
