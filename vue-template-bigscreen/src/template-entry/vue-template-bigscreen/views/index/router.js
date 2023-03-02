/* eslint-disable */
const component = () => import(/* webpackChunkName: "Index" */ './index');

export default {
    path: '/',
    name: 'Index',
    component: component,
    meta: {
        bodyClass: '',
        parent: '',
        rank: 1,
        title: '一链知全貌',
        requireAuth: false,
        keepAlive: false,
        aliveOnlyTo: []
    }
};
