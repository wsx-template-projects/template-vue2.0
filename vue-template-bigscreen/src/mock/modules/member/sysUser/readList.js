import { mock } from 'mockjs'
export default [
    {
        name: '/member/sysUser/readList',
        method: 'post',
        description: 'memberSysUserReadList',
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
                            userUsername: 'admin',
                            userRealName: '王源',
                            telPhone: '手机号',
                            companyName: '所属机构',
                            deptName: '科室',
                            post: '职务',
                            phone: '13698272234',
                            role: '角色',
                            userStatus: '状态',
                            userCreateTime: '@date("yyyy-MM-dd")',
                            userLastLoginTime: '@date("yyyy-MM-dd")',
                            userSetPerson: '黎宁',
                            setdate: '@date("yyyy-MM-dd")',
                            createDate: '@date("yyyy-MM-dd")',
                            title: '@csentence(3, 5)',
                        },
                    ],
                },
                message: '请求提示',
            })
        },
    },
]