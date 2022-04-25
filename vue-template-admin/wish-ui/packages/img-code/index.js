import CP from './src/index.vue'

CP.install = function (Vue) {
    Vue.components(CP.name, CP)
}
