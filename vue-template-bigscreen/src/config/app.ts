// 请求配置
const RequestConfig = {
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;charset=UTF-8',
        //'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    timeout: 30 * 1000, // 默认超时30s
    baseURL: process.env.VUE_APP_BASEURL_API,
    isResponseSuccess(payload: any) {
        if (
            payload.code === 0 ||
            payload.code === 200 ||
            payload.code === 2010 ||
            payload.status === 'success' ||
            payload.error === null ||
            payload.errors === null
        ) {
            return true
        } else {
            return false
        }
    },
    getResponseSuccess(res: any) {
        return res.data
    },
    getResponseError(res: any) {
        const { message = '网络走神了', code = '-1' } = res
        return {
            message,
            code,
        }
    },
}
// 静态配置
const StaticConfig = {
    PasswordPublicKey:
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmweroebYTrMKehZgk0WP 15wANffH5rwnz+J31xho2tsITrYzTDPjtG7uVU1tzeMyGSPUy36IAkvwcGo12i4O DogOtPeKgDiKRHOfSuuTSTXl5d/hKTLbhzmxQaT6VCdWsEHw1Zr73MlJ4L961M9t QPIZbdO/gw02Bsftq+RkEO2Fh2A4DDqmTiG7Vc4MlgFWg0m/2ogiPNaa1MLLeAkI fRWxgrlEDiYqlqb0Rwp1+QvhSI+4c2Z6lMaW5M1Cf5pb6GnUstGbT1jnz2XQHrdQ CpXdfGYHAWry5Dyimw1jUu3RyFtL59+ZLfIKoEnDh/2CIGU82tc+r0IZ1P7aZo1z hwIDAQAB',
}
// 不同环境配置
const EnvMap: any = {
    dev: {
        OLD_PREFFIX: '/old',
        OLD_ORIGIN: 'http://223.4.72.147',
        OLD_LOGIN_URL: '/reg/server/loginNew',
    },
    test: {
        OLD_PREFFIX: '',
        OLD_ORIGIN: 'http://223.4.72.147',
        OLD_LOGIN_URL: '/reg/server/loginNew',
    },
    prod: {
        OLD_PREFFIX: '',
        OLD_ORIGIN: 'http://223.4.72.147',
        OLD_LOGIN_URL: '/reg/server/loginNew',
    },
}
const config = EnvMap[process.env.VUE_APP_ENV] || {}
const AppConfig = {
    ...StaticConfig,
    ...config,

    RequestConfig,
}
console.log('AppConfig', AppConfig)

export default AppConfig
