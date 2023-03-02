/**
 * @param {import('vue-router').default} router
 */
const LocalConfig = require('../settings.js')
import store from '../store'
export default function(router: any) {
    if (router._registerInterceptor) return
    router._registerInterceptor = true

    router.beforeEach(async (to: any, from: any, next: any) => {
        const user = store.state.user
        const token = user.token
        const meta = to.meta || {}

        // 如果已经登录过则尝试进入首页
        if (token) {
            console.log('[有token判断用户权限信息]', to, store.state.user.roles)
            // 假如没有权限信息需要先拉取
            if (store.state.user.roles.length === 0) {
                console.log('[获取用户信息]')
                //获取用户信息
                store
                    .dispatch('user/GetInfo')
                    .then(({ roles, menus }) => {
                        console.log('[获取菜单信息]', menus, roles)
                        // 根据roles权限生成可访问的路由表
                        store
                            .dispatch('user/GenerateMenus', {
                                path: to.path,
                                menus,
                                roles,
                            })
                            .then(() => {
                                const addRouters = store.getters.addRouters
                                //  动态添加可访问路由表
                                router.addRoutes(addRouters)
                                // 确保addRoutes已完成,set the replace: true so the navigation will not leave a history record
                                next({
                                    ...to,
                                    replace: true,
                                })
                            })
                            .catch(err => {
                                console.error(1111, err)
                                next('/403')
                            })
                    })
                    .catch(err => {
                        store.dispatch('user/FedLogOut').then(() => {
                            next('/500')
                        })
                    })
            } else {
                console.log('[已有用户信息，直接进入页面]', to)
                next()
            }
        } else {
            /* has no token */
            if (meta.requireAuth === false) {
                console.log('[白名单，直接进入页面]', to)
                // 在免登录白名单，直接进入
                next()
            } else {
                console.log('[未登录跳转登录]', to)
                // 否则全部重定向到登录页
                next('/login')
            }
        }
    })
    /* 页面标题处理 */
    router.afterEach((to: any) => {
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
        try {
            const appMain$: any = document.getElementById('appMain')
            if (appMain$) {
                appMain$.scrollTop = 0
            }
        } catch (err) {
            console.error(err)
        }
    })
}
