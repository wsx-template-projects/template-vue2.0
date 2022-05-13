/**
 * js - 合并对象的方法 (扩展运算符)
 */

let formData = { a: 1 } // 表单数据
let tableList = [{ key1: 1 }, { key2: '123456' }] // 表格数据
let params_1 = {
    // 需要提交的数据
    ...formData,
    list: tableList,
}

let params_2 = Object.assign({}, formData, { list: tableList })

console.log('params_1 :>>', params_1)
console.log('params_2 :>>', params_2)
