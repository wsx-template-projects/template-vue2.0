/* eslint-disable */
const component = () => import( /* webpackChunkName: "Punish" */ './index');

export default {
    path: '/reform',
    name: 'Reform',
    component: component,
    meta: {
        bodyClass: '',
        parent: '',
        rank: 1,
        title: '改革全景',
        requireAuth: false,
        keepAlive: false,
        aliveOnlyTo: []
    }
};
