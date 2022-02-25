import request from '@/utils/request'

/**
 * 下载文件
 * @param {object} params 请求参数
 * @param {object} config 请求配置项
 */
const download = function (params = {}, config = {}) {
    const method = config.method || 'post'
    const body = {
        ...params
    }
    if (method === 'post') {
        config['data'] = body
    } else {
        config['params'] = body
    }
    config = {
        ...config,
        // responseType: 'arraybuffer' // blob
        responseType: 'blob' // blob
    }
    // console.log('config :>> ', config)

    return request(config).then((response) => {
        // console.log('response :>> ', response)
        if (response.headers) {
            let filename = response.headers['x-suggested-filename']

            if (!filename) {
                const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
                const matches = filenameRegex.exec(
                    response.headers['content-disposition']
                )
                if (matches != null && matches[1]) {
                    filename = matches[1].replace(/['"]/g, '')
                }
            }
            // console.log('filename :>> ', filename)
            if (filename) {
                const url = window.URL.createObjectURL(
                    new Blob([response.data])
                )
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('target', '_blank')
                link.setAttribute('download', decodeURIComponent(filename))
                link.click()
                window.URL.revokeObjectURL(url)

                return Promise.resolve(response)
            } else {
                return Promise.reject(response)
            }
        } else {
            return response
        }
    })
}

/**
 * 导出文件
 * @param {string} url 接口地址
 * @param {string} method 请求方式，默认为post
 * @param {object} params 请求参数
 * @param {object} config 其它配置
 */
function downloadFile(url, params, method, config) {
    method = method || 'post'
    download(params, {
        url,
        method,
        ...config
    })
}

export default downloadFile
