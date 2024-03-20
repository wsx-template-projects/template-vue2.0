/* eslint-disable */
const component = () => import(/* webpackChunkName: "ReformTarget" */ './index');

export default {
    path: '/reform-target',
    name: 'ReformTarget',
    component: component,
    meta: {
        bodyClass: '',
        parent: '',
        rank: 1,
        title: '改革指数',
        requireAuth: false,
        keepAlive: false,
        aliveOnlyTo: []
    }
};
