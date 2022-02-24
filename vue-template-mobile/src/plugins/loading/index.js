/*
 * loading插件
 */
import Loading from './index.vue'

let $vm

const LoadingPlugins = {
    install: function(Vue, option = {}) {
        if (!$vm) {
            const LoadingConstructor = Vue.extend(Loading)
            // $vm = new LoadingConstructor({el: document.createElement('div')})
            $vm = new LoadingConstructor()
            $vm.$mount(document.createElement('div'))
            document.documentElement.appendChild($vm.$el)
        }
        const loading = {
            show(text) {
                $vm.isShow = true
                $vm.text = text
            },
            hide() {
                $vm.isShow = false
                $vm.text = ''
            },
        }
        Vue.prototype.$loading = loading
        return Vue
    },
}

export default LoadingPlugins
