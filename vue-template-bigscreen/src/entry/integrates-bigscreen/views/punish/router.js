/* eslint-disable */
const component = () => import( /* webpackChunkName: "Punish" */ './index');

export default {
    path: '/punish',
    name: 'Punish',
    component: component,
    meta: {
        bodyClass: '',
        parent: '',
        rank: 1,
        title: '处罚办案',
        requireAuth: false,
        keepAlive: false,
        aliveOnlyTo: []
    }
};
