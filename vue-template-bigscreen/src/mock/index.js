/* 官方示例：http://mockjs.com/examples.html */

import createMock from './createMock'
const myMock = createMock(process.env.VUE_APP_BASEURL_API)
import myMockData from './modules'
import autoMockData from './data'
const modules = {
    ...autoMockData,
    ...myMockData,
}
let apis = []

Object.keys(modules).forEach(key => {
    const target = modules[key]
    if (target.namespaced) {
        Object.keys(target).forEach(key => {
            const apis$ = target[key]
            if (apis$.length) {
                apis.push(...apis$.map(item => parseAPI(item)))
            }
        })
    } else {
        apis.push(...target.map(item => parseAPI(item)))
    }
})

function parseAPI(api) {
    let { url, name, method, onSuccess } = api
    let onMock = api.onMock || onSuccess
    url = url || name
    let reg = url
    const r = /\/\{.*?\}/g
    const hasParams = r.test(url)
    //if (hasParams) {
    url = url.replace(r, '(/.+)')
    reg = `reg:${url}`
    //}
    return {
        method,
        reg,
        onMock,
    }
}

apis = apis.sort((a, b) => {
    return b.reg.length - a.reg.length
})
console.log('[---mock apis---]', apis)
for (const api of apis) {
    myMock(api.reg, api.method, api.onMock)
}
myMock('reg:/api/upload', 'post', function() {
    return {
        status: true,
        successfulPayload: [
            {
                name: 'food.jpeg',
                url:
                    'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            },
            {
                name: 'food2.jpeg',
                url:
                    'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
            },
        ],
    }
})
/* 统一在这里注册 */
//myMock('reg:/news/getList\\?.+', 'get', news.getList)
// myMock('reg:/news/getList', 'post', news.getList)
// myMock('reg:/news/getDetails/.+', news.getDetails)

// myMock('reg:/api/pub/core/dictionary-definitions', 'post', function() {
//     return {
//         status: true,
//         successfulPayload: {
//             message: 'ok',
//         },
//     }
// })
