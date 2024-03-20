/* eslint-disable */
const component = () => import(/* webpackChunkName: "ReformCourse" */ './index');

export default {
    path: '/reform-course',
    name: 'ReformCourse',
    component: component,
    meta: {
        bodyClass: '',
        parent: '',
        rank: 1,
        title: '改革历程',
        requireAuth: false,
        keepAlive: false,
        aliveOnlyTo: []
    }
};
