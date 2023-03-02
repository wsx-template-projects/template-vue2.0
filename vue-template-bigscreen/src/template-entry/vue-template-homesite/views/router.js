/* eslint-disable */
const component = () => import(/* webpackChunkName: "Index" */ './index')
export default {
    path: '/',
    name: 'Index',
    component: component,
    redirect: '/home',
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
