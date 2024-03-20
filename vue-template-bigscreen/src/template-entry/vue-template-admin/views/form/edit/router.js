/* eslint-disable */
const ExampleFormEdit = () =>
    import(/* webpackChunkName: "ExampleFormEdit" */ './index')
export default {
    path: '/admin/form/edit',
    name: 'ExampleFormEdit',
    component: ExampleFormEdit,
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '编辑表单',
        auth: false,
        keepAlive: false,
        aliveOnlyTo: [],
        requireAuth: true,
    },
}
