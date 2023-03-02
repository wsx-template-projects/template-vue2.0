/* 动态 path 匹配例子：https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js */

import AutoRouteGenerator from '@/async-router'

let generator = new AutoRouteGenerator(
    require.context(`../views/`, true, /router\.js/),
)
const routes = generator.generate()
// console.log('所有一维路由', routes)
export default [
    ...routes,
    {
        path: '*',
        redirect: '/404',
    },
]
