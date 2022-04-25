import TableView from '../packages/table-view'
import ImgCode from '../packages/img-code'

const components = [TableView, ImgCode]

const install = function (Vue, opts = {}) {
    components.forEach((component) => {
        component.opts = opts
        Vue.components(component.name, component)
    })
}

console.log('Vue :>> ', Vue)

if (window.Vue !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    version: process.env.version || 'debug',
    install,
}
