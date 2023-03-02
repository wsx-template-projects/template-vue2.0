const component = () => import( /* webpackChunkName: "SynergyCommandScreen" */ './index');

export default {
    path: '/synergy-command',
    name: 'SynergyCommand',
    component,
    meta: {
        bodyClass: '',
        parent: '',
        rank: 1,
        title: '协同指挥',
        requireAuth: false,
        keepAlive: false,
        aliveOnlyTo: [],
        noCache: false,
    }
};
