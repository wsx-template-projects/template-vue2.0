import 'babel-polyfill'
import 'normalize.css'
import Vue from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'
import '@/injects'
import '@/vant'
import './components'
import http from './scripts/http'
import './style.less'

Vue.prototype.$http = http

// 坑位埋点指令 <el-button v-stat="{ name: '获取nodes' }">获取nodes</el-button>
Vue.directive('stat', {
    bind(el, binding) {
        el.addEventListener(
            'click',
            () => {
                const data = binding.value
                http.request({
                    // todo 修改正确的地址
                    url: '/mock/stat',
                    params: {
                        ...data,
                    },
                })
            },
            false,
        )
    },
})
/* 条件编译 (必须是运行时可用的环境变量，并且变量值不能为 undefined，否则模块必定会打包) */
if (process.env.VUE_APP_MOCK === 'true') {
    require('@/mock')
}

Vue.config.devtools =
    process.env.VUE_APP_ENV === 'dev' || process.env.VUE_APP_ENV === 'stage'
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')