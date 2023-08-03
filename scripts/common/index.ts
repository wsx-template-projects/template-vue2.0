import http from '../http/index'

/**
 * @description 文件导出
 * @param {object} params 参数
 * @param {string} fileName 文件名
 */
export const $downloadFile = function(params: any, fileName: string) {
    params.responseType = 'arraybuffer'
    http.request(params).then(res => {
        const blob = new Blob([res.data])
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('target', '_blank')
        link.setAttribute('download', decodeURIComponent(fileName))
        link.click()
        window.URL.revokeObjectURL(url)
        return Promise.resolve(res)
    })
}
