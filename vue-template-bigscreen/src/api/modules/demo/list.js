export default [
    Object.freeze({
        name: '/demo/list',
        description: '修改demo参数',
        onBefore(payload) {
            payload.age = 1
        },
        onSuccess(payload) {
            payload.xxx = 1
        },
        requestMap: {
            // $paramA [10,100] =>
            $date(val, payload) {
                if (val && val[0] && val[1]) {
                    payload['A'] = val[0]
                    payload['B'] = val[1]
                } else {
                    payload['A'] = ''
                    payload['B'] = ''
                }
            },
            page: {
                newKey: 'start',
                replace: true,
            },
        },
        responseMap: {
            id: {
                newKey: 'uuid',
                handler(val, payload) {
                    if (val == '0') {
                        payload['xxxxxx'] = 1
                    }
                    return parseInt(val)
                },
            },
            // $paramA [10,100] =>
            $paramA(val, payload) {
                if (val && val[0] && val[1]) {
                    payload['A'] = val[0]
                    payload['B'] = val[1]
                } else {
                    payload['A'] = ''
                    payload['B'] = ''
                }
            },
        },
    }),
]
