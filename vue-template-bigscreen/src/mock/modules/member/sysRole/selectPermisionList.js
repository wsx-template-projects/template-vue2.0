import { mock } from 'mockjs'
export default [
    {
        name: '/member/sysPermision/selectPermisionList',
        method: 'post',
        description: '权限树',
        onMock(opt, query, body) {
            const { pageNum, pageSize } = query
            return mock({
                code: 0,
                data: {
                    successfulPayload: [
                        {
                            id: "1d6e10b4a7f040ac8f3d0b03c569d933",
                            label: "金融机构",
                            children: [
                                {
                                 id: "9ed2e845910447a487f488341799ac22",
                                 label: "汇信科技"
                                },
                                {
                                 id: "9ed2e845910447a487f488341799ac22",
                                 label: "汇信科技2"
                                },
                             ]
                        },
                        {
                            id: "1d6e10b4a7f040ac8f3d0b03c569d933",
                            label: "政府机关",
                            children: [
                               {
                                id: "9ed2e845910447a487f488341799ac22",
                                label: "人民银行"
                               },
                               {
                                id: "9ed2e845910447a487f488341799ac22",
                                label: "宁波银行"
                               },
                            ]
                        }
                    ]
                },
                message: '请求提示',
            })
        },
    },
]