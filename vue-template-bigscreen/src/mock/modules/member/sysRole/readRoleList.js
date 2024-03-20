import { mock } from 'mockjs'
export default [
    {
        name: '/v1/zql/member/sysRole/readRoleList',
        method: 'post',
        description: '',
        onMock(opt, query, body) {
            const { pageNum, pageSize } = query
            return mock({
                code: 0,
                data: {
                    pageNum: Number(pageNum) || 1,
                    pageSize: Number(pageSize) || 10,
                    total: 66,
                    'result|10': [
                        {
                            roleId: '12',
                            roleName: '@name',
                            authorizeCount: '1',
                            roleStatus: '登出',
                            roleOrgName: '适用机构',
                            roleOrgCode: '12345678',
                            roleDesc: '角色说明角色说明角色说明角色说明角色说明角色说明',
                            updateOperator: '修改人',
                            updateTime: '@date("yyyy-MM-dd")'
                        },
                    ],
                },
                message: '请求提示',
            })
        },
    },
]