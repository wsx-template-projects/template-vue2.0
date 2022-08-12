/**
 * @param {String} path
 * @return {Boolean}
 */
 export function isExternal(path: any) {
    return /^(https?:|mailto:|tel:)/.test(path)
}
/**
 * 邮箱
 * @param {*} s
 */
export function isEmail(s: any) {
    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(
        s,
    )
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile(s: any) {
    return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone(s: any) {
    return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL(s: any) {
    return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 描述
 * @date 2021-02-08
 * @param {String | Number} id
 * @returns {Boolean}
 */

export function isCodeID(id: any) {
    return /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
        id,
    )
}

/**
 * @description: 校验身份证号
 * @param rule
 * @param value
 * @param callback
 */
export function checkIdCard(rule: any, value: any, callback: any) {
    if (value === '') return callback(new Error('请输入身份证号码'))
    const reg = /(^[1-9]\d{5}(19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/
    if (!reg.test(value)) return callback('请输入正确格式的身份证号码')
    callback()
}

/**
 * @description: 校验手机号
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 * @return {*}
 */
export function checkPhone(rule: any, value: any, callback: any) {
    if (value === '') return callback(new Error('请输入手机号'))
    const reg = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/
    if (!reg.test(value)) return callback('请输入正确格式的手机号码')
    callback()
}

/**
 * @description: 校验密码
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 * @return {*}
 */
export function checkPassword(rule: any, value: any, callback: any) {
    if (value === '') return callback(new Error('请输入密码'))
    const reg = /^(?![^a-zA-Z]+$)(?!\D+$)([a-zA-z0-9]{8,16})/
    if (!reg.test(value)) return callback('密码必须为8~16位数字、字母组合')
    callback()
}

/**
 * @description: 校验url
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 * @return {*}
 */
export function checkUrl(rule: any, value: any, callback: any) {
    if (rule.enabled()) {
        if (value === '') return callback(new Error('请输入地址'))
        const reg = /^(http(s?)|):\/\/(.+)$/
        if (!reg.test(value)) {
            return callback('需要以`http://`、`https://`、`//`开头')
        }
    }
    callback()
}
