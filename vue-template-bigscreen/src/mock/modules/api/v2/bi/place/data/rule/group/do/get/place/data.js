import { mock } from 'mockjs'
export default [
    {
        name:
            'http://59.202.42.163/api/v2/bi/place/dataRuleGroup/doGetPlaceData',
        method: 'post',
        description: '一链知全貌数据',
        onMock(opt, query, body) {
            return mock({
                code: 0,
                data: {
                    createDate: '@date("yyyy-MM-dd")',
                    title: '@csentence(3, 5)',
                },
                message: '请求提示',
            })
        },
    },
]
