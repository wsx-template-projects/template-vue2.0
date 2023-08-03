/**
 * @description 关闭h5页面 - 微信中可以正常关闭，手机自带的浏览器上会生效，钉钉中不会生效
 */
export function closePage() {
    console.log('wx :>> ', window.WeixinJSBridge)
    if (window.WeixinJSBridge) {
        window.WeixinJSBridge.call('closeWindow')
    } else {
        console.log('其它')
        // todo 只在手机自带的浏览器上会生效，钉钉中不会生效
        window.close()
    }
}

/**
 * 创建唯一的字符串
 * @return {string} ojgdvbvaua40
 */
export function createUniqueString() {
    const timestamp = +new Date() + ''
    const randomNum = parseInt((1 + Math.random()) * 65536 + '') + ''
    return (+(randomNum + timestamp)).toString(32)
}
