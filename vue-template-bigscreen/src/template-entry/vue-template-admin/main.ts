import 'babel-polyfill'
import 'normalize.css'
import '@/styles/reset.less'
import Vue from 'vue'
import '@/catchError'
import '@/element-ui' // @PC.element-ui
import '@/sharegood-ui'
// import './vant' // @H5.vant
import '@/styles/global.less'
import router from './router'
import store from './store'
import '@/injects'
import App from './App.vue'
import http from './scripts/http'
import './components'
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
if (process.env.VUE_APP_ENV === 'dev') {
    Vue.prototype.$isDev = true
}

Vue.config.devtools = process.env.VUE_APP_ENV === 'dev'

new Vue({
    router,
    store,
    render: h => h(App),
    mounted() {
        //触发渲染的时间，用于获取数据后再保存渲染结果
        // setTimeout(() => {
        //     document.dispatchEvent(new Event('render-event'))
        // }, 2000)
    },
}).$mount('#app')
