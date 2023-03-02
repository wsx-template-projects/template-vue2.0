declare module '*.vue' {
    import Vue from 'vue'
    export default Vue
}

// -----------------自定义------------

// 封装axios
declare module 'sharegood-cloud-utils/dist/sharegood-http.esm.js' {
    import { ExInstance, ExAxiosRequestConfig } from '@/@types'
    export const axios: any
    export const createAxios: (
        config: ExAxiosRequestConfig,
        callback: any,
    ) => ExInstance
    export const cancel: any
    export const isCancel: any
    export const toFormData: any
    export const qsStringify: any
}

declare module 'qs/lib/stringify'

// 添加 echarts 声明
declare module 'echarts'
