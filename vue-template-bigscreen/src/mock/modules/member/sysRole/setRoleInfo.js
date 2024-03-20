import { mock } from 'mockjs'
export default [
    {
        name: '/member/sysRole/readRolePermission',
        method: 'post',
        description: '详情信息',
        onMock(opt, query, body) {
            return mock({
                code: 0,
                data: {
                    roleId: '12',
                    roleName: '@name',
                    authorizeCount: '1',
                    roleStatus: '登出',
                    roleOrgName: '适用机构',
                    roleOrgCode: '12345678',
                    roleDesc: '我是详情页的说明我是详情页的说明我是详情页的说明我是详情页的说明我是详情页的说明',
                    updateOperator: '修改人',
                    updateTime: '@date("yyyy-MM-dd")',
                    mcr8Vids: '30a9ebf36ad94b4f858c73b26ec021a1,3;'
                },
                message: '请求提示',
            })
        },
    },
]