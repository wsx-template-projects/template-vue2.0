// 全局处理数据鉴权
import { ExAxiosRequestConfig, ExApiResponse } from 'icinfo-request'
import { userStore } from '@/entry/ezt-admin/store/useStore'
import { MessageBox } from 'element-ui'
let isLock = false
export const exAuth = Object.freeze({
    onBefore(config: ExAxiosRequestConfig) {
        const token = userStore.token
        config.headers = config.headers || {}
        if (token) {
            // config.headers['Authorization'] = `Bearer ${token}`
            // config.headers['Accept-Token'] = token
            // 更改token的参数名
            config.headers['admin-token'] = token
            // config.headers['Accept-Token'] = token
        }

        return config
    },
    onComplete(
        config: ExAxiosRequestConfig,
        isResolve: boolean,
        resOrErr: ExApiResponse,
    ) {
        if (resOrErr && !isResolve) {
            const message = resOrErr.message || ''
            // 401 用户信息失效 403 无权限 450 无效token 505 身份信息失效
            if ([401, 403, 450, 505].includes(resOrErr.code)) {
                // 2秒内只提示一次
                if (!isLock) {
                    MessageBox({
                        title: '提示',
                        type: 'warning',
                        message: `登录状态异常, 请退出重新登录!`,
                    }).then(() => {
                        userStore.FedLogOut()
                    })
                    isLock = true
                    setTimeout(() => {
                        isLock = false
                    }, 2000)
                }
            }
        }
    },
})

export default exAuth
