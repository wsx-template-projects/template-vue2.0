/* eslint-disable */
const Login = () => import(/* webpackChunkName: "AdminLogin" */ './index')
export default {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
        bodyClass: 'admin-login',
        parent: '',
        rank: 1,
        title: '',
        requireAuth: false,
        keepAlive: false,
        aliveOnlyTo: [],
    },
}
