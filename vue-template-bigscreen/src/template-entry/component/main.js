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
import '@/injects'
import App from './App.vue'

Vue.config.devtools = process.env.VUE_APP_ENV === 'dev'

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
