/**
 * @description 通过某个字段属性获取数据信息
 * @param {Array} list 数据源
 * @param {*} value 字段值
 * @param {String} key 字段key，默认为 'id'
 * */
export function getInfoByField(
    list: any[],
    value: string | number | null | undefined,
    key = 'id',
) {
    return list.find((v: any) => v[key] === value)
}
