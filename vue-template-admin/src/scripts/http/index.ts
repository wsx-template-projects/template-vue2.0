import { createAxios } from 'sharegood-cloud-utils/dist/sharegood-http.esm.js'
import exShowLoading from '@/scripts/http/exShowLoading'
import exShowErrMessage from '@/scripts/http/exShowErrMessage'
import exConsole from '@/scripts/http/exConsole'
import exData from '@/scripts/http/exData'
import exAuth from './exAuth'

const { RequestConfig } = require('@/config/app')

const http = createAxios(
    {
        ...RequestConfig,
    },
    (instance: any) => {
        instance.exHooks.add(exData)
        instance.exHooks.add(exConsole)
        instance.exHooks.add(exShowLoading)
        instance.exHooks.add(exShowErrMessage)
        instance.exHooks.add(exAuth)
    },
)

// 默认显示loading
// http.defaults.exShowLoading = true
export default http
