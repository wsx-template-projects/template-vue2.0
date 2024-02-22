/**
 * 函数节流：在固定时间间隔内，只能执行一次的函数
 * @param {Function} fn - 需要节流的函数
 * @param {number} delay - 时间间隔，单位为毫秒
 * @returns {Function} - 节流后的函数
 */
function throttle(fn: Function, delay: number) {
    let timer: any = null
    return function(this: any, ...args: any[]) {
        if (timer) {
            return
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
            timer = null
        }, delay)
    }
}

/**
 * 防抖函数
 * @param {Function} fn - 要延迟执行的函数
 * @param {number} delay - 延迟的时间（毫秒）
 * @returns {Function} - 返回一个新的延迟执行的函数
 */
function debounce(fn: Function, delay: number) {
    let timer: any = null
    return function(this: any, ...args: any[]) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

/**
 * 计算贝塞尔曲线的坐标
 * @param t - 一个介于0和1之间的参数值
 * @param p1 - 第一个控制点的坐标
 * @param p2 - 第二个控制点的坐标
 * @param p3 - 第三个控制点的坐标
 * @returns 贝塞尔曲线的坐标
 */
function bezier(t: number, p1: number, p2: number, p3: number) {
    return (
        Math.pow(1 - t, 3) * p1 +
        3 * t * Math.pow(1 - t, 2) * p2 +
        3 * Math.pow(t, 2) * (1 - t) * p3 +
        Math.pow(t, 3)
    )
}

// vue2 自定义指令auth
function authDirective(Vue: any) {
    Vue.directive('auth', {
        inserted: function(el: any, binding: any) {
            const { value } = binding
            const { auth } = value
            const { roles } = Vue.$store.state.user
            if (auth && !roles.includes(auth)) {
                el.parentNode.removeChild(el)
            }
        },
    })
}

// vue2开发loading插件
function loadingDirective(Vue: any) {
    Vue.directive('loading', {
        inserted: function(el: any, binding: any) {
            const { value } = binding
            const { loading } = value
            if (loading) {
                el.style.display = 'block'
            } else {
                el.style.display = 'none'
            }
        },
    })
}

// vue2 + ts 开发log装饰器
function logDecorator(target: any, key: string, descriptor: any) {
    const fn = descriptor.value
    descriptor.value = function(...args: any[]) {
        console.log(`执行${key}方法`)
        return fn.apply(this, args)
    }
    return descriptor
}

// 函数柯里化
function curry(fn: Function, ...args: any[]) {
    return function(this: any, ...rest: any[]) {
        return fn.apply(this, args.concat(rest))
    }
}

// 通过函数柯里化实现1+2+3
function curryAdd(...args: number[]) {
    return curry((a: number, b: number) => a + b, ...args)
}

// 正则匹配中文
function isChinese(str: string) {
    const reg = /^[\u4e00-\u9fa5]+$/
    return reg.test(str)
}

// 判断真实的身份证号
function isRealIdCard(idCard: string) {
    const reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
    return reg.test(idCard)
}

// 判断邮箱
function isEmail(str: string) {
    const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    return reg.test(str)
}

export { throttle, debounce, bezier, authDirective }
