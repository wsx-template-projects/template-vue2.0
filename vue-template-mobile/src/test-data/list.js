// 记录请求次数
const count = 0

/**
 * 初始化list数据
 */
function initResData() {
    const res = {
        total: 0,
        list: [],
    }
    let len = Math.floor(Math.random() * 100)
    for (let i = 0; i < len; i++) {
        res.list.push(i)
    }
    res.total = res.list.length
    console.log('init-res:', res)
    return res
}

let resData = []

function reqFunc(params, index = 0) {
    console.log('params:', params)
    return new Promise((resolve, reject) => {
        if (!resData[index]) {
            console.log('初始化数据 :>> ')
            resData[index] = initResData()
        }
        const { total, list } = resData[index]
        const res = { total, list }
        const start = (params.pageNum - 1) * params.pageSize
        const end = params.pageNum * params.pageSize
        res.list = res.list.slice(start, end)
        console.log('res:', res)
        setTimeout(() => {
            count > 1 ? resolve(res) : reject(new Error('出错了'))
        }, 500)
    })
}

export default {
    // 初始化数据
    initResData,
    // 请求数据
    reqFunc,
}
