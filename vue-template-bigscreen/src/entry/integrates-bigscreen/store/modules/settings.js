// import variables from '@/styles/element-variables.scss'
import defaultSettings from '../../settings.js'
import { getURLParameters } from 'sharegood-cloud-utils'
const { isThirdParty = '' } = getURLParameters(location.href)
const { settings = {} } = defaultSettings

const state = {
    title: '网站标题',
    /**
     * @type {boolean} true | false
     * @description Whether show the settings right-panel
     */
    showSettings: true,

    /**
     * @type {boolean} true | false
     * @description Whether need tagsView
     */
    tagsView: true,

    /**
     * @type {boolean} true | false
     * @description Whether fix the header
     */
    fixedHeader: false,

    /**
     * @type {boolean} true | false
     * @description Whether show the logo in sidebar
     */
    sidebarLogo: false,

    /**
     * @type {string | array} 'production' | ['production', 'development']
     * @description Need show err logs component.
     * The default is only used in the production env
     * If you want to also use it in dev, you can pass ['production', 'development']
     */
    errorLog: 'production',
    ...settings,
    isThirdParty: !!isThirdParty,
}

const mutations = {
    CHANGE_SETTING: (state, { key, value }) => {
        // eslint-disable-next-line no-prototype-builtins
        if (state.hasOwnProperty(key)) {
            state[key] = value
        }
    },
}

const actions = {
    changeSetting({ commit }, data) {
        commit('CHANGE_SETTING', data)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
