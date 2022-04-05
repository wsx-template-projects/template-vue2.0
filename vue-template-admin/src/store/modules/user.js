import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const LocalMenus = require('@/menus.local')

const state = {
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    user_menus: [], // 用户菜单
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
        state.introduction = introduction
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
    SET_USER_MENUS: (state, menus) => {
        console.log('mutations-menus :>> ', menus)
        state.user_menus = menus
    },
}

const actions = {
    // 生成用户的权限菜单和路由
    generateMenus({ commit }, { menus = [] }) {
        return new Promise((resolve) => {
            let accessedMenus = []
        })
    },
    // user login
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password })
                .then((response) => {
                    const { data } = response
                    commit('SET_TOKEN', data.token)
                    setToken(data.token)
                    resolve()
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token)
                .then((response) => {
                    // console.log('response :>> ', response)
                    // todo 此处只用来处理本地的数据不为正常的
                    // response = {
                    //     Data: [
                    //         {
                    //             roles: ['admin'],
                    //             name: '这是本地测试账号',
                    //             avatar: '',
                    //             introduction: '',
                    //         },
                    //     ],
                    // }
                    // const data = response.Data[0]
                    const { data } = response

                    if (!data) {
                        reject('Verification failed, please Login again.')
                    }

                    const {
                        roles = ['admin'],
                        name = '',
                        avatar = '',
                        introduction = '',
                    } = data

                    // roles must be a non-empty array
                    if (!roles || roles.length <= 0) {
                        reject('getInfo: roles must be a non-null array!')
                    }

                    commit('SET_ROLES', roles)
                    commit('SET_NAME', name)
                    commit('SET_AVATAR', avatar)
                    commit('SET_INTRODUCTION', introduction)
                    resolve(data)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    // user logout
    logout({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
            logout(state.token)
                .then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    removeToken() // 清除token
                    resetRouter() // 重置路由
                    // reset visited views and cached views
                    // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
                    dispatch('tagsView/delAllViews', null, { root: true })
                    resolve()
                })
                .catch((error) => {
                    reject(error)
                })
        })
    },
    /** remove token */
    resetToken({ commit }) {
        return new Promise((resolve) => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
        })
    },
    /** dynamically modify permissions */
    async changeRoles({ commit, dispatch }, role) {
        const token = role + '-token'

        commit('SET_TOKEN', token)
        setToken(token)

        const { roles } = await dispatch('getInfo')

        resetRouter()

        // generate accessible routes map based on roles
        const accessRoutes = await dispatch(
            'permission/generateRoutes',
            roles,
            {
                root: true,
            },
        )
        // dynamically add accessible routes
        router.addRoutes(accessRoutes)

        // reset visited views and cached views
        dispatch('tagsView/delAllViews', null, { root: true })
    },
}

export default {
    namespaced: true, // 开启命名空间
    state,
    mutations,
    actions,
}
