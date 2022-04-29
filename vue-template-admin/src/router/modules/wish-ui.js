import Layout from '@/layout'

const wishUiRouter = {
    path: '/wish-ui',
    name: 'WishUi',
    component: Layout,
    redirect: '/with-ui/ws-form-view',
    meta: {
        title: 'wish-ui',
        icon: 'component',
    },
    children: [
        {
            path: 'ws-form-view',
            name: 'WsFormView',
            component: () => import('@/views/wish-ui/ws-form-view'),
            meta: {
                title: 'ws-form-view',
            },
        },
        {
            path: 'ws-table-view',
            name: 'WsTableView',
            component: () => import('@/views/wish-ui/ws-table-view'),
            meta: {
                title: 'ws-table-view',
            },
        },
    ],
}

export default wishUiRouter
