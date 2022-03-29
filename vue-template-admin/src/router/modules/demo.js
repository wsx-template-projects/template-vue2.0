import Layout from '@/layout'

const demoRouter = {
    path: '/demo',
    component: Layout,
    redirect: '/demo/demo-menus',
    name: 'Demo',
    meta: {
        title: 'Demo',
        icon: 'demo',
    },
    children: [
        {
            path: 'demo-menus',
            name: 'DemoMenus',
            component: () => import('@/views/demo/demo-menus'),
            meta: {
                title: 'demo-menus',
            },
        },
        {
            path: 'demo-dialog',
            name: 'DemoDialog',
            component: () => import('@/views/demo/demo-dialog'),
            meta: {
                title: 'demo-dialog',
            },
        },
    ],
}

export default demoRouter
