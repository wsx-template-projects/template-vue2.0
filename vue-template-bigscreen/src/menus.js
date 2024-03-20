module.exports = [
    {
        path: '/dashboard',
        meta: {
            title: '首\u2002\u2002\u2002页',
            icon: 'iconfont iconshouye',
        },
    },
    {
        path: '/search',
        meta: {
            title: '信息查询',
            icon: 'iconfont iconsousuo',
        },
        alwaysShow: true,
        children: [
            {
                path: '/common/search/index',
                meta: {
                    title: '全景查询',
                },
            },
            {
                path: '/common/search/bossDetails',
                meta: {
                    title: '查老板',
                },
            },
            {
                path: '/common/search/risk',
                meta: {
                    title: '查风险',
                },
            },
        ],
    },
    {
        path: '/system',
        meta: {
            title: '系统维护',
            icon: 'iconfont iconxitongweihu',
        },
        alwaysShow: true,
        children: [
            {
                path: '/system/user',
                meta: {
                    title: '用户管理',
                },
            },
            {
                path: '/system/role',
                meta: {
                    title: '角色管理',
                },
            },
            {
                path: '/system/menu',
                meta: {
                    title: '菜单管理',
                },
            },
            {
                path: '/system/organization',
                meta: {
                    title: '机构管理',
                },
            },
            {
                path: '/system/resource',
                meta: {
                    title: '资源管理',
                },
            },
            {
                path: '/system/operation-log',
                meta: {
                    title: '操作日志',
                },
            },
            {
                path: '/system/parameter',
                meta: {
                    title: '参数管理',
                },
            },
            {
                path: '/system/holidaysSetting',
                meta: {
                    title: '节假日设置',
                },
            },
            {
                path: '/system/dict/type',
                meta: {
                    title: '字典类型管理',
                },
            },
            {
                path: '/system/dict/define',
                meta: {
                    title: '字典定义管理',
                },
            },

            {
                path: '/system/tombstone',
                meta: {
                    title: '逻辑删除处理',
                },
            },
            {
                path: '/system/accessGroup',
                meta: {
                    title: '数据访问组管理',
                },
            },
            {
                path: '/system/data-access',
                meta: {
                    title: '数据访问项管理',
                },
            },
        ],
    },
    {
        path: '/news',
        meta: {
            title: '资讯发布',
            icon: 'iconfont iconzixunfabu',
        },
        alwaysShow: true,
        children: [
            {
                path: '/news/list',
                meta: {
                    title: '资讯管理',
                },
                children: [
                    {
                        path: '/news/edit',
                        meta: {
                            title: '资讯编辑',
                        },
                        hidden: true,
                    },
                ],
            },
        ],
    },
    {
        path: '/demo',
        meta: {
            title: '组件使用案例',
            icon: 'el-icon-date',
        },
        alwaysShow: true,
        children: [
            {
                path: '/demo/form',

                meta: {
                    title: '表单',
                },
            },
            {
                path: '/demo/table',
                meta: {
                    title: '表格',
                },
            },
        ],
    },
]
