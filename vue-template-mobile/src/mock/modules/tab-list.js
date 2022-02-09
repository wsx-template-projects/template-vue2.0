import { mock } from 'mockjs'

export default [
    {
        api: '/mock/tab-list',
        method: 'get',
        description: 'tab列表数据',
        onMock(params) {
            console.log('params :>> ', params)
            return mock({
                code: 200,
                'data|30': [
                    {
                        'itemId|+1': 1,
                        itemTitle: '商品名',
                        itemDesc: '商品描述',
                        itemPrice: '126.0',
                        itemImg: '',
                    },
                ],
            })
        },
    },
]
