const axios = require('axios')
const { generate } = require('api-server')

async function main() {
    ;[
        'http://api.fed.icinfo.co/business-component/spring-boot-main/de/api.json',
    ].forEach(async url => {
        const result = await axios(url)

        generate(result.data, {
            mockDir: 'src/mock/data',
            tsDir: 'src/template-entry/vue-template-admin/services',
            merge: true,
            request: 'http.request',
            prepend: `
import { ExAxiosRequestConfig } from '@/@types'
import http from "@/template-entry/vue-template-admin/scripts/http"`,
            optionsType: 'ExAxiosRequestConfig',
            dataDescription: '要提交给服务器的数据',
            optionsDescription: '附加选项',
        })

        // eslint-disable-next-line no-console
        console.log('已成功生成：', url.replace(/\/api\.json$/, ''))
    })
}

main()
