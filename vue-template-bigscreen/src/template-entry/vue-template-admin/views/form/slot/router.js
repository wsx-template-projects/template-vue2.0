/* eslint-disable */
const ExampleFormSlot = () =>
    import(/* webpackChunkName: "ExampleFormSlot" */ './index')
export default {
    path: '/admin/form/slot',
    name: 'ExampleFormSlot',
    component: ExampleFormSlot,
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: 'slot',
        auth: false,
        keepAlive: false,
        aliveOnlyTo: [],
        requireAuth: true,
    },
}
