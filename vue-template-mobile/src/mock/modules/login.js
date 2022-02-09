import { mock } from 'mockjs'

export default [
    {
        api: '/mock/login',
        method: 'post',
        description: '登录',
        onMock(params) {
            console.log('params :>> ', params)
            return mock({
                code: 200,
                data: [
                    {
                        token: '123456',
                        userName: '我是谁',
                    },
                ],
                message: '调用成功',
            })
        },
    },
]
