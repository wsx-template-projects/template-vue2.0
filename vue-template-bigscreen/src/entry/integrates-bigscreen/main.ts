// import 'babel-polyfill'
import 'normalize.css'
import Vue from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'
import { http, newHttp } from './scripts/http'
import './components'
import '@/element-ui'
import './style.less'
// import './entry/integrates-bigscreen/lib/index.js'
//@ts-ignore
import DataV from '@jiaminghi/data-view'
import modalDialog from '@/scripts/ModalDialog'

Vue.use(DataV)
// import '@/injects'
Vue.prototype.$http = http
Vue.prototype.$newHttp = newHttp
Vue.use(modalDialog, { router, store })

/* 条件编译 (必须是运行时可用的环境变量，并且变量值不能为 undefined，否则模块必定会打包) */
if (process.env.VUE_APP_MOCK === 'true') {
    require('@/mock')
}

Vue.config.devtools = process.env.VUE_APP_ENV === 'dev'
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
