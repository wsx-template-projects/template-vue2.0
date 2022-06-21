/**
 * 校验模块
 * 命名规则：is + 描述名词
 * 例如：校验手机号，isMobile或者isPhone
*/

/**
 * 校验手机号
*/
export function isMobile(val: any) {
    var reg = /^[1][3456789]\d{9}$/
    return reg.test(val)
}

/**
 * 校验身份证号码
*/
function isIdCard(val: any) {
    var reg = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/
    return reg.test(val)
}
