/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const moduleRouter = {
    path: '/big-screen',
    component: Layout,
    redirect: '/big-screen/base-echarts',
    name: 'BigScreen',
    meta: {
        title: 'big-screen',
        icon: 'chart',
    },
    children: [
        {
            path: 'base-echarts',
            component: () => import('@/views/big-screen/base-echarts'),
            name: 'BaseEcharts',
            meta: { title: 'BaseEcharts' },
        },
        {
            path: 'setting-fields',
            component: () => import('@/views/big-screen/setting-fields'),
            name: 'SettingFields',
            meta: { title: 'SettingFields' },
        },
    ],
}

export default moduleRouter
