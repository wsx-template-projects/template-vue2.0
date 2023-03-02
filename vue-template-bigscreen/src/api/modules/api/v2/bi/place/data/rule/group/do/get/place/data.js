export default [
    Object.freeze({
        name:
            'http://59.202.42.163/api/v2/bi/place/dataRuleGroup/doGetPlaceData',
        description: '一链知全貌数据',
        onBefore(payload) {},
        onSuccess(payload) {
            console.log(payload)
        },
    }),
]
