/* eslint-disable */
const component = () => import(/* webpackChunkName: "DemoEcharts" */ './index')

export default {
    path: '/demo/echarts',
    name: 'DemoEcharts',
    component: component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '图表示例',
        requireAuth: false,
        keepAlive: false,
        aliveOnlyTo: [],
    },
}
