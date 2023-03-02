/* eslint-disable */
const AdminDashboard = () =>
    import(/* webpackChunkName: "AdminDashboard" */ './index')
export default {
    path: '/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: 'dashboard',
        auth: false,
        keepAlive: false,
        aliveOnlyTo: [],
        requireAuth: true,
    },
}
