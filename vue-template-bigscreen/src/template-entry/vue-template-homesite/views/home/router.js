/* eslint-disable */
const component = () => import(/* webpackChunkName: "Home" */ './index');

export default {
    path: '/home',
    name: 'Home',
    component: component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '',
        requireAuth: false,
        keepAlive: false,
        aliveOnlyTo: []
    }
};
