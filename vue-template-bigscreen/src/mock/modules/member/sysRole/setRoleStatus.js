import { mock } from 'mockjs'
export default [
    {
        name: '/member/sysRole/setRoleStatus',
        method: 'post',
        description: '禁用和删除',
        onMock(opt, query, body) {
            return mock({
                code: 0,
                detail: "删除成功",
                message: '删除成功',
            })
        },
    },
]