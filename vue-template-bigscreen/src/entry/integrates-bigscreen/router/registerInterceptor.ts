/**
 * @param {import('vue-router').default} router
 */
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const LocalConfig = require('../settings.js')
// import store from '../store'
export default function(router: any) {
    if (router._registerInterceptor) return
    router._registerInterceptor = true

    router.beforeEach(async (to: any, from: any, next: any) => {
        NProgress.start()
        next()
    })
    /* 页面标题处理 */
    router.afterEach((to: any) => {
        NProgress.done()
        let { title, bodyClass } = to.meta
        title = typeof title === 'function' ? title(to) : title
        if (title) {
            document.title = title
        } else {
            document.title = LocalConfig.title
        }
        if (bodyClass) {
            document.body.className = bodyClass
        } else {
            document.body.className = ''
        }
    })
}
