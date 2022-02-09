import { Toast } from 'vant'
// 模块自动化导入
const mockFiles = require.context('./modules', true, /\.js$/)

const modules = mockFiles.keys().reduce((prev, curr) => {
    const value = mockFiles(curr)
    // todo 此处value不可为空对象，否则会报错
    // console.log('value :>> ', value)
    return [...prev, ...value.default]
}, [])

console.log('mock_modules :>> ', modules)

const getCurrentApiData = url => {
    const result = modules.filter(item => url === item.api)
    // console.log('result :>> ', result)
    if (result.length === 0) {
        Toast('请查看接口地址是否相匹配')
        return
    }
    return result[0]
}

function get(url, params) {
    return new Promise((resolve, reject) => {
        let mock = getCurrentApiData(url)
        let res = mock.onMock(params.params)
        // console.log('get-res :>> ', res)
        resolve(res)
    })
}

function post(url, params) {
    return new Promise((resolve, reject) => {
        let mock = getCurrentApiData(url)
        let res = mock.onMock(params)
        // console.log('post-res :>> ', res)
        resolve(res)
    })
}

// function http({ url, methods, params }) {
//     methods = methods || 'GET'
//     // 1、转换成大写：toUpperCase()
//     // 2、转换成小写：toLowerCase()
//     methods = methods.toLowerCase()
//     console.log('methods :>> ', methods)
//     return new Promise((resolve, reject) => {
//         let mock = getCurrentApiData(url)
//         let res = mock.onMock(params)
//         console.log('res :>> ', res)
//         resolve(res)
//     })
// }

/**
 * mock数据
 */
export default {
    get,
    post,
}
