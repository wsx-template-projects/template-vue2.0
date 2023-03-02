/* eslint-disable */
const IndexIndex = () => import(/* webpackChunkName: "IndexIndex" */ './index')
export default {
    path: '/',
    name: 'Index',
    component: IndexIndex,
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
