/* eslint-disable */
const AdminSystemUser = () =>
    import(/* webpackChunkName: "AdminSystemUser" */ './index')
export default {
    path: '/admin/system/user',
    name: 'AdminSystemUser',
    component: AdminSystemUser,
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '',
        auth: false,
        keepAlive: false,
        aliveOnlyTo: [],
        requireAuth: true,
    },
}
