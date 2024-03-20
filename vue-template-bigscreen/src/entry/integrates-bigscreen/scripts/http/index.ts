import { createAxios } from 'sharegood-cloud-utils/dist/sharegood-http.esm.js'
import exShowLoading from '@/scripts/http/exShowLoading'
import exShowErrMessage from '@/scripts/http/exShowErrMessage'
import exConsole from '@/scripts/http/exConsole'
import exData from '@/scripts/http/exData'

import AppConfig from '@/config/app'
const { RequestConfig } = AppConfig

export const http = createAxios(
    {
        ...RequestConfig,
        baseURL: process.env.VUE_APP_BASEURL_API_BGISCREEN,
    },
    (instance: any) => {
        instance.exHooks.add(exData)
        instance.exHooks.add(exConsole)
        instance.exHooks.add(exShowLoading)
        instance.exHooks.add(exShowErrMessage)
    },
)
export const newHttp = createAxios(
    {
        ...RequestConfig,
        baseURL: process.env.VUE_APP_BASEURL_API_NEW_BGISCREEN,
    },
    (instance: any) => {
        instance.exHooks.add(exData)
        instance.exHooks.add(exConsole)
        instance.exHooks.add(exShowLoading)
        instance.exHooks.add(exShowErrMessage)
    },
)
export default { http, newHttp }
