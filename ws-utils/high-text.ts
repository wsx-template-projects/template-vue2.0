const DEFAULT_CONFIG = {
    defaultColor: '#333',
    activeColor: 'red',
}

interface IHighConfig {
    defaultColor?: string
    activeColor?: string
}

/**
 * @description 高亮文本
 * @param {String} source 数据源
 * @param {String} keyword 关键字
 * @param {IHighConfig} config 配置项
 * @returns {String}
 */
export const highText = (source: string, keyword: string, config: IHighConfig = {}) => {
    const { defaultColor, activeColor } = { ...DEFAULT_CONFIG, ...config }
    const reg = new RegExp(keyword, 'g')
    if (!keyword) return `<font style="color:${defaultColor}">${source}</font>`
    return source.replace(reg, `<b style="background: #F5FAFF;color:${activeColor}">${keyword}</b>`)
}


// 示例
// const source = '123456798'
// const keyword = '123'
// highText(source, keyword, { activeColor: '#0797F3' })
