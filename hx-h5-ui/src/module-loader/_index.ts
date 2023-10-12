// import Vue, { Component, AsyncComponent } from 'vue'
// let _options = {}

// type modalCompFunc = (
//     Component:
//         | Component<any, any, any, any>
//         | AsyncComponent<any, any, any, any>,
//     props?: Record<string, any>,
// ) => Promise<any>

// type modalComp =
//     | Component<any, any, any, any>
//     | AsyncComponent<any, any, any, any>

// type modalProps = Record<string, any>

// /**
//  * 打开一个模态框
//  * @param {*} Component 模态框组件
//  * @param {*} props prop参数
//  */
// const initModalDialog = (options = _options) => {
//     return async (Component: modalComp, props: modalProps) => {
//         const _component = await loadComponent(Component)
//         return new Promise((resolve, reject) => {
//             // 创建构造器
//             const Profile = Vue.extend(_component)
//             // 创建 Profile 实例，并挂载到一个元素上。
//             const vm = new Profile({
//                 propsData: props,
//                 confirm,
//                 cancel,
//                 ...options,
//             }).$mount()
//             // 将组建实例加入dom中
//             document.querySelector('body').appendChild(vm.$el)

//             /**
//              * 弹窗取消方法
//              */
//             function cancel(value: any) {
//                 destroyDialog()
//                 reject(value)
//             }

//             /**
//              * 弹窗确认方法
//              */
//             function confirm(value: any) {
//                 destroyDialog()
//                 resolve(value)
//             }

//             function destroyDialog() {
//                 vm.$destroy()
//                 const flag = vm.$el.ownerDocument.body.contains(vm.$el)
//                 if (flag) document.querySelector('body').removeChild(vm.$el)
//             }
//         })
//     }
// }

// /**
//  * @description: 初始化加载组件
//  * @param {*} Component
//  * @return {*}
//  */
// function loadComponent(Component: modalCompFunc) {
//     if (typeof Component === 'function') {
//         return new Promise(resolve => {
//             Component().then(resp => {
//                 resolve(resp.default)
//             })
//         })
//     }
//     return Promise.resolve(Component)
// }

// const modalDialog = initModalDialog()

// modalDialog.install = function(Vue, options = {}) {
//     _options = options || {}
//     Vue.prototype.$modalDialog = initModalDialog(options)
// }

// export default modalDialog
// export { initModalDialog }