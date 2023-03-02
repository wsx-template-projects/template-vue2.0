import Vue from 'vue'
import * as _utils from '@/scripts/utils'
import * as _constants from '@/scripts/constants'
import { ExApi, ExInstance } from '@/@types'
const utils = { ..._utils }
const constants = { ..._constants }

declare module 'vue/types/vue' {
    interface Vue {
        $api: ExApi
        $http: ExInstance
        $env: NodeJS.ProcessEnv
        $utils: typeof utils
        $const: typeof constants
        $isCancel: typeof _utils.isCancel
    }
}
