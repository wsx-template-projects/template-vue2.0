import Mock from 'mockjs'

Mock.setup({
    timeout: '200-600',
})

const Random = Mock.Random

let total = 0

export default [
    {
        api: '/mock/list',
        method: 'get',
        description: '列表数据',
        onMock(params) {
            // console.log('params :>> ', params)
            const { pageNum, pageSize } = params
            if (pageNum === 1) {
                total = Math.floor(Math.random() * 100)
            }
            let currNum = 0
            if (total >= pageNum * pageSize) {
                currNum = pageSize
            } else {
                currNum = total - (pageNum - 1) * pageSize
            }
            let options = {}
            options[`list|${currNum}`] = [
                {
                    'id|+1': (pageNum - 1) * pageSize,
                    title: `商品名:@ctitle`,
                    desc: '商品描述',
                    realPrice: '@integer(0,2000)',
                    originalPrice: '@integer(0,2000)',
                    imgUrl: Random.image(),
                    createTime: Random.date('yyyy-MM-dd'),
                    username: Random.first(),
                },
            ]
            return Mock.mock({
                code: 200,
                data: {
                    currentPage: pageNum,
                    totalPage: Math.ceil(total / pageSize),
                    total: total,
                    ...options,
                },
            })
        },
    },
]
