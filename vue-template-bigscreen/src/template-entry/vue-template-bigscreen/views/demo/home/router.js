/* eslint-disable */
const VueTemplateBigscreenDemoHome = () =>
    import(/* webpackChunkName: "VueTemplateBigscreenDemoHome" */ './_layout')
export default {
    path: '/demo/home',
    name: 'DemoHome',
    component: VueTemplateBigscreenDemoHome,
    redirect: '/demo/home/index',
    meta: {
        bodyClass: '',
        parent: '',
        rank: 1,
        title: '',
        requireAuth: false,
        keepAlive: false,
        aliveOnlyTo: [],
    },
}
