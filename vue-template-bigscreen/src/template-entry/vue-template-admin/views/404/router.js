/* eslint-disable */
const Admin404 = () => import(/* webpackChunkName: "Admin_404" */ './index')
export default {
    path: '/404',
    name: 'Admin404',
    component: Admin404,
    meta: {
        bodyClass: '',
        parent: '',
        rank: 1,
        title: '',
        auth: false,
        keepAlive: false,
        aliveOnlyTo: [],
    },
}
