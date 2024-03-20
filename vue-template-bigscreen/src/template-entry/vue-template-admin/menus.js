module.exports = [
    {
        path: '/dashboard',
        meta: {
            title: '首\u2002\u2002\u2002页',
            icon: 'iconfont iconshouye',
        },
    },
    {
        path: '/example',
        meta: {
            title: '组件使用案例',
            icon: 'el-icon-date',
        },
        //alwaysShow: true,
        children: [
            {
                path: `/sub-app/${encodeURIComponent(
                    'http://www.baidu.com/s?wd=微服务',
                )}`,
                meta: {
                    title: '百度',
                },
            },
            {
                path: '/crud',

                meta: {
                    icon: '1',
                    title: '测试下是',
                },
                alwaysShow: true,
                children: [
                    {
                        path: '/crud/index',

                        meta: {
                            icon: '1',
                            title: '基本查询',
                        },
                        children: [
                            {
                                hidden: true,
                                path: '/crud/index/edit',

                                meta: {
                                    title: '编辑',
                                },
                            },
                        ],
                    },
                    {
                        path: '/crud/index1',

                        meta: {
                            icon: '1',
                            title: '基本查询11',
                        },
                    },
                ],
            },
            {
                path: '/admin/form/layout',

                meta: {
                    icon: '1',
                    title: '布局表单',
                },
            },
            {
                path: '/admin/form/query',

                meta: {
                    icon: '1',
                    title: '查询表单',
                },
            },
            {
                path: '/admin/form/edit',

                meta: {
                    icon: '1',
                    title: '编辑表单',
                },
            },
            {
                path: '/admin/form/slot',

                meta: {
                    icon: '1',
                    title: 'slot表单',
                },
            },
            {
                path: '/admin/form/relate',

                meta: {
                    icon: '1',
                    title: '关联表单',
                },
            },
        ],
    },
]
