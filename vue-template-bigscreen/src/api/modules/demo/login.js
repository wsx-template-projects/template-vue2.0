import JSEncrypt from '@/libs/jsencrypt.min.js'
const encrypt = new JSEncrypt()
encrypt.setPublicKey(
    'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKUTKxiXvoIXo6vVdRj6Y81kw8L0XtzPD1TAhW1ZdU9v+zO6XGGUH8FqQYKvEvA4/FoksoT4Si0PbBcOXbaHLj0CAwEAAQ==',
)
export default [
    Object.freeze({
        name: '/demo/login',
        onBefore(payload) {
            const { password = '' } = payload
            payload.password = encrypt.encrypt(password)
        },
        onSuccess(payload) {
            const { data } = payload
            console.log('token', data.token)
        },
    }),
]
