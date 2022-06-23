/**
 * 判断源数据中是否包含某个值
 * 命名规则： has + 描述名词
 * 例如: 是否包含英文  hasEnglish
*/

/**
 * 判断数组中是否包含某条数据 (注意：只支持单个属性昨比较)
 * @param {array} list 数据源
 * @param {string} key 相比较的属性 - 属性名
 * @param {*} value 相比较的属性 - 属性值
 */
 export function hasEqual(list: any[], key: string, value: any): boolean {
    return list.some((v: any) => v[key] === value)
}

/**
 * 字符串中是否包含中文
 */
export function hasChinese(str: string) {
    return str && escape(str).indexOf('%u') >= 0
}

/**
 * 字符串中是否包含英文
 */
export function hasEnglish(str: string) {
    return /[a-zA-Z]+/.test(str)
}
