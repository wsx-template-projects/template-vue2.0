/* eslint-disable */
const ExampleFormRelate = () =>
    import(/* webpackChunkName: "ExampleFormRelate" */ './index')
export default {
    path: '/admin/form/relate',
    name: 'ExampleFormRelate',
    component: ExampleFormRelate,
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '关联',
        auth: false,
        keepAlive: false,
        aliveOnlyTo: [],
        requireAuth: true,
    },
}
