/* eslint-disable */
const AdminIndex = () => import(/* webpackChunkName: "AdminIndex" */ './index')
export default {
    path: '/',
    name: 'Index',
    component: AdminIndex,
    meta: {
        bodyClass: '',
        parent: '',
        rank: 1,
        title: '',
        auth: false,
        keepAlive: false,
        aliveOnlyTo: [],
        requireAuth: true,
    },
}
