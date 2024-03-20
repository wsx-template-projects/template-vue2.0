/* eslint-disable */
const Index_404 = () => import(/* webpackChunkName: "Index_404" */ './index')
export default {
    path: '/404',
    name: 'App404',
    component: Index_404,
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
