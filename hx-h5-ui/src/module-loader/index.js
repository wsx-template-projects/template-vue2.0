import Vue from 'vue'
let _options = {}

/**
 * 模块加载器
 * @param {*} Component 模块组件
 * @param {*} props prop参数
 */
const initModuleLoad = (options = _options) => {
    return async (Component, props, container = 'body') => {
        console.log('container :>> ', container)
        const _component = await loadComponent(Component)
        return new Promise((resolve, reject) => {
            // 创建构造器
            const Profile = Vue.extend(_component)
            // 创建 Profile 实例，并挂载到一个元素上。
            const vm = new Profile({
                propsData: props,
                confirm,
                cancel,
                ...options,
            }).$mount()
            // 将组建实例加入dom中
            document.querySelector(container).appendChild(vm.$el)

            /**
             * 弹窗取消方法
             */
            function cancel(value) {
                destroyModule()
                reject(value)
            }

            /**
             * 弹窗确认方法
             */
            function confirm(value) {
                destroyModule()
                resolve(value)
            }

            function destroyModule() {
                vm.$destroy()
                const flag = vm.$el.ownerDocument.body.contains(vm.$el)
                if (flag) document.querySelector(container).removeChild(vm.$el)
            }
        })
    }
}

/**
 * @description: 初始化加载组件
 * @param {*} Component
 * @return {*}
 */
function loadComponent(Component) {
    if (typeof Component === 'function') {
        return new Promise(resolve => {
            Component().then(resp => {
                resolve(resp.default)
            })
        })
    }
    return Promise.resolve(Component)
}

const moduleLoad = initModuleLoad()

moduleLoad.install = function(Vue, options = {}) {
    _options = options || {}
    Vue.prototype.$moduleLoad = initModuleLoad(options)
}

export default moduleLoad
export { initModuleLoad }
