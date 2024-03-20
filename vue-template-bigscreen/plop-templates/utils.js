exports.notEmpty = name => {
    return v => {
        if (!v || v.trim === '') {
            return `${name} is required`
        } else {
            return true
        }
    }
}
exports.renderApiName = (url, typeKey = '') => {
    let r = /\/\{.*?\}/g
    let suffix = ''

    if (r.test(url)) {
        suffix = url.match(/\{(.*?)\}/)[1]
        suffix = suffix.replace(/^(\w)/, ($, $1) => $1.toUpperCase())
    }

    let apiName = url.replace(/\/\{.*?\}/g, '') // 把{}去掉
    apiName = apiName.replace(/-(\w)/g, ($, $1) => $1) // 把一部分有- 先忽略
    if (
        apiName.match(/\/(\w*)$/) &&
        apiName.match(/\/(\w*)$/)[1] &&
        apiName.match(/\/(\w*)$/)[1].length > 15
    ) {
        // 如果最后的单词大于七位就直接取最后一位 不然就是全部
        apiName = apiName.match(/\w*?$/) ? apiName.match(/\w*?$/)[0] : apiName
    }
    apiName = apiName.replace(/\/(\w)/g, ($, $1) => $1.toUpperCase()) // 转化驼峰
    apiName = apiName.replace(/^(\w)/, ($, $1) => $1.toUpperCase()) // 首字母大写
    apiName = apiName.replace(RegExp(`(${typeKey})`, 'gi'), '') // 都把方法名都去掉
    apiName = typeKey + apiName // 方法名加上
    apiName = apiName.replace(/^(\w)/, ($, $1) => $1.toLowerCase())

    apiName = apiName + (suffix || '')

    return apiName
}
