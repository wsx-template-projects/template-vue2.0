import http from '../../../scripts/http'

export default {
    async getMockList({ commit, state }: any) {
        return http.get('/mock/list').then((payload: any) => {
            commit('setMockList', payload)
            return payload
        })
    },
}
