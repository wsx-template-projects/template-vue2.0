import Vue, { ComponentOptions } from 'vue'
import { moduleLoad } from './index'
type FC = (p?: any) => Promise<any>
declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        cancel?: FC
        confirm?: FC
    }
}

declare module 'vue/types/vue' {
    interface Vue {
        $moduleLoad: moduleLoad
    }
}
