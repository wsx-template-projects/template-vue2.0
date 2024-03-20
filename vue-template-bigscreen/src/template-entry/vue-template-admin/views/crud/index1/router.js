/* eslint-disable */
const AdminCrudIndex1 = () => import(/* webpackChunkName: "AdminCrudIndex1" */ './index');
export default {
    path: '/crud/index1',
    name: 'CrudIndex1',
    component: AdminCrudIndex1,
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '飒飒',
        requireAuth: true,
        keepAlive: false,
        aliveOnlyTo: []
    }
};