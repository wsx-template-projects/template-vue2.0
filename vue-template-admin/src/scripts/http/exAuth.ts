export const exAuth = Object.freeze({
    onBefore(config: any) {
        // const { token = '' } = app
        // config.headers = config.headers || {}
        // config.headers['token'] = token
    },
    onComplete(config: any, isResolve: any, resOrErr: any) {
        if (!isResolve) {
            const { code } = resOrErr
            // token过期
            if (code === '04') {
                // todo
            }
        }
    },
})

export default exAuth
