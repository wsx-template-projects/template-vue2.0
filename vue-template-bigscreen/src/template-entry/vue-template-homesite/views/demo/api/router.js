/* eslint-disable */
const VueTemplateHomesiteDemoApi = () => import(/* webpackChunkName: "VueTemplateHomesiteDemoApi" */ './index');
export default {
    path: '/demo/api',
    name: 'DemoApi',
    component: VueTemplateHomesiteDemoApi,
    meta: {
        bodyClass: '',
        parent: '',
        rank: 1,
        title: '',
        requireAuth: false,
        keepAlive: false,
        aliveOnlyTo: []
    }
};