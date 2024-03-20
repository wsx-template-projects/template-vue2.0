import { createAxios } from 'sharegood-cloud-utils/dist/sharegood-http.esm.js'
import exShowLoading from './exShowLoading'
import exShowErrMessage from './exShowErrMessage'
import exConsole from '@/scripts/http/exConsole'
import exData from '@/scripts/http/exData'

import AppConfig from '@/config/app'
const { RequestConfig } = AppConfig

const http = createAxios(
    {
        ...RequestConfig,
    },
    (instance: any) => {
        instance.exHooks.add(exData)
        instance.exHooks.add(exConsole)
        instance.exHooks.add(exShowLoading)
        instance.exHooks.add(exShowErrMessage)
    },
)

export default http
