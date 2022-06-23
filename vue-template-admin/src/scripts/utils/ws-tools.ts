/**
 * 字符串分割
 * @param {string} str 数据源 '123,456,789'
 * @param {string} format 分割标识，默认为逗号
 * @return {array} ['123','456','789']
 */
 export function strSplit(str: string, format: string = ','): string[] {
    const result = str ? str.split(format) : []
    return result
}



// isNaN(null)  注意isNaN null为false


// isNaN('50') isNaN('50%') isNaN(undefined)
