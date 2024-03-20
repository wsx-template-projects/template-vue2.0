/* eslint-disable */
const component = () =>
    import(/* webpackChunkName: "DemoTest" */ './echarts-demo')

export default {
    path: '/demo-test',
    name: 'DemoTest',
    component: component,
    meta: {
        bodyClass: '',
        parent: '',
        rank: 1,
        title: '',
        requireAuth: false,
        keepAlive: false,
        aliveOnlyTo: [],
    },
}
