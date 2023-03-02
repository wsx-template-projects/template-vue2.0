const state = {
    routes: [],
    addRoutes: [],
}

const mutations = {
    SET_ROUTES: (state, routes) => {},
}

const actions = {
    generateRoutes({ commit }, roles) {
        return new Promise(resolve => {
            resolve([])
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
