import Vue from 'vue'
import './rewrite/index.less'
import './styles/index.less'
import HxMobileUI from './src'
import HxLoading from './plugins/loading'
import ModuleLoad from './src/module-loader/index'

console.log('HxMobileUI :>> ', HxMobileUI)
console.log('hx-mobile-ui-version :>> ', HxMobileUI.version)

Vue.prototype.$HxMobile = {
    uploader: {},
}

Vue.prototype.$$dialogConfirm = function(message = '', options = {}) {
    console.log('this :>> ', this)
    console.log('options :>> ', options)
    const h = this.$createElement
    console.log('h :>> ', h)
    return this.$dialog.confirm({
        title: '提示',
        message: message || '',
        beforeClose: (action, done) => {
            if (action !== 'confirm') {
                done()
            } else {
                done()
            }
        },
        ...options,
    })
}

Vue.use(HxMobileUI)

Vue.use(HxLoading)

Vue.use(ModuleLoad)
