import { withInstall } from '../utils'
import _HxSearch from './index.vue'

export const HxSearch = withInstall(_HxSearch)

console.log('HxSearch :>> ', HxSearch)

export default HxSearch

declare module 'vue' {
    export interface GlobalComponents {
        HxSearch: typeof _HxSearch
    }
}
