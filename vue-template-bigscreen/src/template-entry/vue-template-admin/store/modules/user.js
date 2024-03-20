const LocalMenus = require('../../menus')
import http from '../../scripts/http'
import {
    isNoPermission,
    generateRoutes,
    generateMenus,
    generateRoutesVid,
    generateRedirectRoutes,
} from '@/scripts/utils'
// 所有异步路由
import routes from '../../router/routes'
const permissionRoutes = routes.filter(item => item.meta.requireAuth === true)

const state = {
    roles: [], // 用户角色
    addRouters: [], // 用户路由
    token: '', // 用户token
    menus: [], // 用户菜单
    info: {}, // 用户信息
    routes: [], //所有路由
}

const mutations = {
    LOG: (state, log) => {
        state.log.push(log)
    },
    LOGIN: (state, token) => {
        console.log('LOGIN', token)
        state.token = token
    },
    SET_ROLES: (state, data) => {
        state.roles = data
    },
    SET_ROUTES: (state, data) => {
        state.addRouters = data
        state.routes = data
    },
    SET_MENUS: (state, menu) => {
        state.menus = menu
    },
    SET_INFO: (state, info) => {
        state.info = info
    },
    LOGOUT: state => {
        state.token = null
    },
}

const actions = {
    FedLogOut({ commit }) {
        return new Promise(resolve => {
            commit('LOGOUT', null)
            resolve()
        })
    },
    LogOut({ commit }) {
        return new Promise(resolve => {
            commit('LOGOUT', null)
            resolve()
        }).then(() => {
            location.reload()
        })
    },
    // 获取用户权限信息
    GetInfo({ commit }) {
        return http.get('/mock/getUserInfo').then(data => {
            let { roles = 'admin', menus = [] } = data
            commit('SET_ROLES', roles)
            return {
                roles,
                menus,
            }
        })
    },
    // todo
    GenerateMenus({ commit }, { menus = [], roles = '', path = '' }) {
        return new Promise((resolve, reject) => {
            let accessedMenus = []
            if (roles.includes('admin')) {
                accessedMenus = [...LocalMenus]
            } else {
                accessedMenus = generateMenus(menus, LocalMenus)
            }

            const noAuth = isNoPermission(LocalMenus, accessedMenus, path)

            if (noAuth || !accessedMenus.length) {
                reject({
                    message: '无访问权限',
                })
            } else {
                // 给路由添加vid
                const newRoutes = generateRoutesVid(
                    accessedMenus,
                    permissionRoutes,
                )

                const firstMenu = accessedMenus[0] || {}
                // 首页默认为第一个菜单项
                const defaultPath =
                    firstMenu.path || firstMenu.url || firstMenu.uri || ''
                // 将菜单的路由重定向到子菜单
                const redirctRouters = generateRedirectRoutes(accessedMenus)

                // 生成完整的二级路由
                const addRouters = generateRoutes(newRoutes, defaultPath)

                console.log('[权限菜单]', accessedMenus)
                console.log('[默认路由]', defaultPath)
                console.log('[重定向路由]', redirctRouters)
                console.log('[权限路由]', addRouters)
                commit(
                    'SET_ROUTES',
                    redirctRouters.concat(addRouters).concat([
                        {
                            path: '*',
                            redirect: '/404',
                        },
                    ]),
                )
                commit('SET_MENUS', accessedMenus)
                resolve(accessedMenus)
            }
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
