/* eslint-disable */
const Admin500 = () => import(/* webpackChunkName: "Admin_500" */ './index')
export default {
    path: '/500',
    name: 'Admin500',
    component: Admin500,
    meta: {
        bodyClass: '',
        parent: '',
        rank: 1,
        title: '',
        requireAuth: false,
        keepAlive: false,
        aliveOnlyTo: [],
    },
    props: route => ({ message: route.query.message }),
}
