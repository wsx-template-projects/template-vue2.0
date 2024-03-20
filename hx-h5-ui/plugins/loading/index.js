/**
 * loading插件
 */
import Vue from 'vue'
import LoadingComp from './index.vue'

let $vm

const initLoading = function(options = {}) {
    console.log('options :>> ', options)
    // 当$vm不存在的时候，需要创建一个实例
    if (!$vm) {
        const LoadingPlugin = Vue.extend(LoadingComp)
        $vm = new LoadingPlugin({ el: document.createElement('div') })
        document.body.appendChild($vm.$el)
    }
    const loading = {
        fullLoading(text = '') {
            $vm.isShow = true
            $vm.isFullScreen = true
            $vm.text = text
        },
        /** 显示loading, text:文字描述（可选） */
        show({ text = '', isFullScreen = false }) {
            $vm.isShow = true
            $vm.isFullScreen = isFullScreen
            $vm.text = text
        },
        /** 关闭loading */
        hide() {
            $vm.isShow = false
            $vm.text = ''
        },
    }

    // function destroyLoading() {
    //     vm.$destroy()
    //     const flag = vm.$el.ownerDocument.body.contains(vm.$el)
    //     if (flag) document.querySelector('body').removeChild(vm.$el)
    // }

    return loading
}

export default {
    install: function(Vue, options = {}) {
        Vue.prototype.$$loading = initLoading(options)
    },
}
