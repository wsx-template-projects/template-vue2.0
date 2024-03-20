export default [
    Object.freeze({
        name: '/sys/area/list',
        description: '',
        onBefore(payload) {
            payload['age'] = 1
        },
        onSuccess(payload) {},
    }),
]
