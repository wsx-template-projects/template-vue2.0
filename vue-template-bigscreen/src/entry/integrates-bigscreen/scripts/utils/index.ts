/**
 * 数组转对象
 * @param {array} target
 * @param {string} key key名
 * @param {string} valueType value类型（object、array），默认为 object
 * */
export function arrayTransObj(
    target: any[],
    key: string,
    valueType: string = 'object',
) {
    if (!target) return {}
    return target.reduce((prev: any, curr: any) => {
        const temp: any = {}
        if (valueType === 'object') {
            temp[curr[key]] = curr
            return { ...prev, ...temp }
        } else {
            const isHas: boolean = prev?.[curr[key]]?.length > 0
            temp[curr[key]] = [curr]
            if (!isHas) {
                return { ...prev, ...temp }
            } else {
                prev[curr[key]].push(curr)
                return { ...prev }
            }
        }
    }, {})
}
