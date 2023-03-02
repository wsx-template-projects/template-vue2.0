import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const router = new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/',
            name: 'component-examples',
            meta: { title: '开发相关文档' },
            component: () => import('@/components/ComponentExamples/index.vue'),
            // beforeEnter(to, from, next) {
            //     if (from.matched.length === 0 && from.path === '/') {
            //         next()
            //         return
            //     }
            //     next(false)
            //     window.open(router.resolve(to.fullPath).href)
            // },
        },
    ],
})

export default router
