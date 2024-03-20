//import Loading from '../packages/loading/index.js'

import Pagination from '../packages/pagination/index.js'
import QuillEditor from '../packages/quill-editor/index.js'
//import Upload from '../packages/upload/index.js'
import DataView from '../packages/data-view/index.js'
import DataForm from '../packages/data-form/index.js'
import DataExport from '../packages/data-export/index.js'
import ImgCode from '../packages/img-code/index.js'
import SmsCode from '../packages/sms-code/index.js'
import EditTable from '../packages/edit-table/index.js'
import BaseForm from '../packages/base-form/index.js'
// import Line from '../packages/charts/Line/index.js'
// import Pie from '../packages/charts/Pie/index.js'
// import Bar from '../packages/charts/Bar/index.js'
// import BaseChart from '../packages/charts/index.js'

const components = [
    // BaseChart,
    // Line,
    // Pie,
    // Bar,

    Pagination,
    QuillEditor,
    //Loading,
    //Upload,
    DataExport,
    DataView,
    DataForm,
    ImgCode,
    SmsCode,
    EditTable,
    BaseForm,
]

const install = function(Vue, opts = {}) {
    components.forEach(component => {
        component.opts = opts
        Vue.component(component.name, component)
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
