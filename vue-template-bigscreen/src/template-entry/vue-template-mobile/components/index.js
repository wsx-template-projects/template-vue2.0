import Vue from 'vue'

const files = require.context('./global', true, /index\.vue$/)
const components = {}

files.keys().forEach(key => {
    const name = key.replace('index.vue', '').split('/')[1]
    components[name] = files(key).default || files(key)
})
Object.entries(components).forEach(item => {
    Vue.component(item[0], item[1])
})
