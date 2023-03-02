import Vue from 'vue'
import Vuex, { createLogger, Store } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import mutations from './mutations'
import modules from './modules'
import { StateType } from '../@types'

Vue.use(Vuex)
//import { InjectionKey } from 'vue'

//export const key: InjectionKey<Store<StateType>> = Symbol()

const store: Store<StateType> = new Vuex.Store({
    strict: true,
    mutations,
    actions: {},
    modules: { ...modules },
    plugins:
        process.env.NODE_ENV !== 'production'
            ? [
                  createLogger(),
                  createPersistedState({
                      paths: ['app', 'console', 'user'],
                      storage: window.localStorage,
                  }),
              ]
            : [
                  createPersistedState({
                      paths: ['app', 'console', 'user'],
                      storage: window.localStorage,
                  }),
              ],
})

export default store
