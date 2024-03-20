/* eslint-disable */
const AdminFormLayout = () =>
    import(/* webpackChunkName: "AdminFormLayout" */ './index')
export default {
    path: '/admin/form/layout',
    name: 'AdminFormLayout',
    component: AdminFormLayout,
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '布局表单',
        auth: false,
        keepAlive: false,
        aliveOnlyTo: [],
        requireAuth: true,
    },
}
