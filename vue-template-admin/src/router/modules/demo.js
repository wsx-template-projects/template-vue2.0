import Layout from '@/layout'

const demoRouter = {
    path: '/demo',
    component: Layout,
    redirect: '/demo/demo-menus',
    name: 'Demo',
    meta: {
        title: 'Demo',
        icon: 'component',
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
            path: 'demo-list',
            name: 'DemoList',
            component: () => import('@/views/demo/demo-list'),
            meta: {
                title: 'demo-list',
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
        {
            path: 'demo-draggable',
            name: 'DemoDraggable',
            component: () => import('@/views/demo/demo-draggable'),
            meta: {
                title: 'demo-draggable',
            },
        },
        {
            path: 'demo-charts',
            name: 'DemoCharts',
            component: () => import('@/views/demo/demo-charts'),
            redirect: '/demo/demo-charts/charts-bar',
            meta: {
                title: 'demo-charts',
            },
            children: [
                {
                    path: 'charts-bar',
                    name: 'ChartsBar',
                    component: () =>
                        import('@/views/demo/demo-charts/charts-bar'),
                    meta: {
                        title: 'charts-bar',
                    },
                },
                {
                    path: 'charts-line',
                    name: 'ChartsLine',
                    component: () =>
                        import('@/views/demo/demo-charts/charts-line'),
                    meta: {
                        title: 'charts-line',
                    },
                },
                {
                    path: 'charts-pie',
                    name: 'ChartsPie',
                    component: () =>
                        import('@/views/demo/demo-charts/charts-pie'),
                    meta: {
                        title: 'charts-pie',
                    },
                },
                {
                    path: 'charts-map',
                    name: 'ChartsMap',
                    component: () =>
                        import('@/views/demo/demo-charts/charts-map'),
                    meta: {
                        title: 'charts-map',
                    },
                },
                {
                    path: 'charts-other',
                    name: 'ChartsOther',
                    component: () =>
                        import('@/views/demo/demo-charts/charts-other'),
                    meta: {
                        title: 'charts-other',
                    },
                },
            ],
        },
    ],
}

export default demoRouter
