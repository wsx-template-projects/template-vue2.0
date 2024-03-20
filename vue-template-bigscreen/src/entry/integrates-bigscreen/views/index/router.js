/* eslint-disable */
const component = () => import( /* webpackChunkName: "Integrates" */ './index');

export default [{
    path: '/',
    name: 'Index',
    component: component,
    redirect: '/index',
    meta: {
        bodyClass: '',
        parent: '',
        rank: 1,
        title: '大综合一体化执法监管数字应用',
        requireAuth: false,
        keepAlive: false,
        aliveOnlyTo: []
    },
}, {
    path: '/index',
    name: 'Index',
    component: component,
    meta: {
        bodyClass: '',
        parent: '',
        rank: 1,
        title: '大综合一体化执法监管数字应用',
        requireAuth: false,
        keepAlive: false,
        aliveOnlyTo: []
    }
}];
