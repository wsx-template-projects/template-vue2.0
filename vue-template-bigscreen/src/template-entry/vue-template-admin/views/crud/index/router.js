/* eslint-disable */
const CrudIndex = () =>
    import(/* webpackChunkName: "AdminCrudIndex" */ './index')
export default {
    path: '/crud/index',
    name: 'CrudIndex',
    component: CrudIndex,
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '基本查询',
        auth: false,
        keepAlive: false,
        aliveOnlyTo: [],
        requireAuth: true,
    },
}
