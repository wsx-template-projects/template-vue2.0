/**
 * 可视化配置 - router
 */
import Layout from '@/layout'

const moduleRouter = {
    path: '/visual-config',
    component: Layout,
    redirect: '/visual-config/form-setting',
    name: 'VisualConfig',
    meta: {
        title: '可视化配置',
        icon: 'chart',
    },
    children: [
        {
            path: 'form-setting',
            component: () => import('@/views/visual-config/form-setting'),
            name: 'VisualConfigFormSetting',
            meta: { title: '表单配置' },
        },
        {
            path: 'charts-setting',
            component: () => import('@/views/visual-config/charts-setting'),
            name: 'VisualConfigChartsSetting',
            meta: { title: '图表配置' },
        },
        {
            path: 'table-setting',
            component: () => import('@/views/visual-config/table-setting'),
            name: 'VisualConfigTableSetting',
            meta: { title: '表格配置' },
        },
    ],
}

export default moduleRouter
