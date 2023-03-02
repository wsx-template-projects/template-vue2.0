/* eslint-disable */
const component = () => import(/* webpackChunkName: "InnovationPractice" */ './index');

export default {
    path: '/innovation-practice',
    name: 'InnovationPractice',
    component: component,
    meta: {
        bodyClass: '',
        parent: '',
        rank: 1,
        title: '创新实践',
        requireAuth: false,
        keepAlive: false,
        aliveOnlyTo: []
    }
};
