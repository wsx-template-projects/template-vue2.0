/* eslint-disable */
const component = () => import(/* webpackChunkName: "DemoDialogs" */ './index')

export default {
    path: '/demo/dialogs',
    name: 'DemoDialogs',
    component: component,
    meta: {
        bodyClass: '',
        parent: 'Index',
        rank: 1,
        title: '弹框',
        requireAuth: false,
        keepAlive: false,
        aliveOnlyTo: [],
    },
}
