/* eslint-disable */
const VueTemplateAdminNewsList = () => import(/* webpackChunkName: "VueTemplateAdminNewsList" */ './index');
export default {
    path: '/news/list',
    name: 'NewsList',
    component: VueTemplateAdminNewsList,
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '',
        requireAuth: true,
        keepAlive: false,
        aliveOnlyTo: []
    }
};