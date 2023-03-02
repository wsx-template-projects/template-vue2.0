/* eslint-disable */
const AdminCurdEdit = () =>
    import(/* webpackChunkName: "AdminCurdEdit" */ './index')
export default {
    path: '/curd/index/edit',
    name: 'CurdEdit',
    component: AdminCurdEdit,
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '编辑',
        requireAuth: true,
        keepAlive: false,
        aliveOnlyTo: [],
        activeMenu: '/crud/index',
    },
}
