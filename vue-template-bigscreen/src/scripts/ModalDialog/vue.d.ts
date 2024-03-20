import Vue, { ComponentOptions } from 'vue'
import { modalDialog } from './index'

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        cancel?: Function
        confirm?: Function
    }
}

declare module 'vue/types/vue' {
    interface Vue {
        $modalDialog: modalDialog
    }
}
