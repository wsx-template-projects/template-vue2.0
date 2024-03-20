/* eslint-disable */
const ExampleFormQuery = () =>
    import(/* webpackChunkName: "ExampleFormQuery" */ './index')
export default {
    path: '/admin/form/query',
    name: 'ExampleFormQuery',
    component: ExampleFormQuery,
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '查询',
        auth: false,
        keepAlive: false,
        aliveOnlyTo: [],
        requireAuth: true,
    },
}
