import _ from 'lodash'

// _.multiply(0.1,3) 小数乘法js精度丢失
// console.log('mul :>> ', _.multiply(0.1, 3))

/*
 * @Author: wangshengxian
 * @Date: 2020-08-13 15:33:38
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-14 16:56:40
 * @Desc: js四则运算精度处理模块
 */
// 0.1 + 0.2 = 0.30000000000000004
// 4.44 + 2.22;
// 8.88 + 2.22;
// 13.32 + 2.22;
// 0.1 * 3;

/**
 * 加法
 */
function add(num1, num2) {
    // console.log('num1 :>> ', num1)
    // console.log('num2 :>> ', num2)
    let num1Digits, num2Digits, maxDigits
    try {
        num1Digits = num1.toString().split('.')[1].length
    } catch (e) {
        num1Digits = 0
    }
    try {
        num2Digits = num2.toString().split('.')[1].length
    } catch (e) {
        num2Digits = 0
    }
    maxDigits = Math.pow(10, Math.max(num1Digits, num2Digits))
    return (
        (Math.round(num1 * maxDigits) + Math.round(num2 * maxDigits)) /
        maxDigits
    )
}

/**
 * 减法
 */
function sub(num1, num2) {
    return add(num1, -num2)
}

/**
 * 乘法
 */
function mul(num1, num2) {
    let val1, val2, max1, max2
    if (num1 === null || num1 === undefined || num1 === '') {
        val1 = '0'
    } else {
        val1 = num1.toString()
    }
    if (num2 === null || num2 === undefined || num2 === '') {
        val2 = '0'
    } else {
        val2 = num2.toString()
    }
    try {
        max1 = val1.split('.')[1].length
    } catch (e) {
        max1 = 0
    }
    try {
        max2 = val2.split('.')[1].length
    } catch (e) {
        max2 = 0
    }
    // console.log(val1, val2, max1, max2)
    const max = Math.max(max1, max2)
    // const max = Math.max(getDecimalLength(val1), getDecimalLength(val2))
    const multiplier = Math.pow(10, max)
    const intVal1 = Math.round(val1 * multiplier)
    const intVal2 = Math.round(val2 * multiplier)
    // console.log('intVal1 :>> ', intVal1)
    // console.log('intVal2 :>> ', intVal2)
    return _.divide(_.multiply(intVal1, intVal2), Math.pow(multiplier, 2))
    // return (
    //     (Number(val1.replace('.', '')) * Number(val2.replace('.', ''))) /
    //     Math.pow(10, max1 + max2)
    // )
}

/**
 * 除法，需要验证一下num1,num2为空字符串、null、undefined
 */
function div(num1, num2) {
    let len1, len2, val1, val2
    try {
        len1 = num1.toString().split('.')[1].length
    } catch (e) {
        len1 = 0
    }

    try {
        len2 = num2.toString().split('.')[1].length
    } catch (e) {
        len2 = 0
    }
    val1 = Number(num1.toString().replace('.', ''))
    val2 = Number(num2.toString().replace('.', ''))
    console.log(val1, val2, len1, len2)

    return (val1 / val2) * Math.pow(10, len2 - len1)
}

/**
 * arg以四舍五入的方式保留小数点后n位
 */
function toFixed(arg, n) {
    if (n == 0) {
        return Math.round(arg)
    }
    try {
        let d,
            carryD,
            i,
            ds = arg.toString().split('.'),
            len = ds[1].length,
            b0 = '',
            k = 0
        if (len > n) {
            while (k < n && ds[1].substring(0, ++k) == '0') {
                b0 += '0'
            }
            d = Number(ds[1].substring(0, n))
            carryD = Math.round(Number('0.' + ds[1].substring(n, len)))
            len = (d + carryD).toString().length
            if (len > n) {
                return Number(ds[0]) + 1
            } else if (len == n) {
                return Number(ds[0] + '.' + (d + carryD))
            }
            return Number(ds[0] + '.' + b0 + (d + carryD))
        }
    } catch (e) {
        console.log(e)
    }
    return arg
}

/**
 * 数组求和
 */
function sum(arr) {
    return arr.reduce((prevVal, currVal) => {
        console.log('-sum-', prevVal, currVal)
        return add(prevVal, currVal)
    })
}

/**
 * @description 获取小数位
 */
function getDecimalLength(num) {
    const strNum = String(num)
    const decimalIndex = strNum.indexOf('.')
    return decimalIndex === -1 ? 0 : strNum.length - decimalIndex - 1
}

export default {
    // 加法
    add,
    // 减法
    sub,
    // 乘法
    mul,
    // 除法
    div,
    // 保留n位小数
    toFixed,
    // 数组求和
    sum,
}
