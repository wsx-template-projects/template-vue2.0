import Search from '../packages/search/index.js'
import BaseForm from '../packages/base-form/index'
import List from '../packages/list/index.js'
import Tab from '../packages/tab/index.js'
import Dialog from '../packages/dialog/index.js'
import FieldView from '../packages/field-view/index.js'
import ButtonGroup from '../packages/button-group/index.js'
import Popup from '../packages/popup/index.js'
import ConditionInquire from '../packages/condition-inquire/index.js'
import NumberInput from '../packages/number-input/index'
import Page from '../packages/page/index.js'
import ListPage from '../packages/list-page/index.js'
import PreviewPdf from '../packages/preview-pdf/index.js'

/** 基础组件 */
const baseComponents = [
    Search,
    BaseForm,
    List,
    Tab,
    NumberInput,
    ConditionInquire,
    FieldView,
    Dialog,
    ButtonGroup,
    Popup,
]

/** 高阶组件 */
const highComponents = [Page, ListPage]

/** 其它组件 */
const otherComponents = [PreviewPdf]

const components = [...baseComponents, ...highComponents, ...otherComponents]

const install = function(Vue, opts = {}) {
    console.log('opts :>> ', opts)
    components.forEach(component => {
        component.opts = opts
        let name = ''
        // ts 组件
        if (typeof component === 'function') {
            const com$ = Object.values(component)
            name = com$[1]['name']
            console.log('ts-component-name :>> ', name)
            Vue.component(name, component)
        } else {
            name = component.name
            console.log('js-component-name :>> ', name)
            Vue.component(name, component)
        }
    })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}
export default {
    version: process.env.Version || 'debug',
    install,
}
