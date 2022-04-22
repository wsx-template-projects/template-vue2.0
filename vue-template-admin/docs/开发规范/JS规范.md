# js 规范

-   引用

```bash

  # const 和 let 都是块级作用域，var 是函数级作用域
  不可变的引用使用const，可变的引用使用let
  const notChange = 1 ; let canChange = 10

  # 对象的方法使用简写
  const obj = {
    value: 1,
    addValue (val) {
      return this.value + val
    }
  }

  # 对象属性值简写
  let age = 18
  let obj = {
    name: 'username',
    age
  }

  # 对象属性的简写和声明式的方式应该分组，不应该混合来写
  let name = 'you';
  let age = 18;
  // good 推荐
  let obj = {
    name,
    age,
    sex: '男',
    job: '程序猿'
  }
  // bad 不推荐
  let obj = {
    name,
    sex: '女',
    age,
    job: '程序媛'
  }

  # 字面量创建数组、对象
  let arr = [], obj = {}

  # 复制数组使用扩展运算服 (...)
  let target = [1,2,3]
  let result = [...target]

  # 向数组中添元素，使用push方法
  let target = [1,2]
  target.push(3)

  # 使用数组的map等方法时，请使用return声明，但一声明的语句情形下，可以省略return
  let target = [1,2,3]
  target.map(x => {
    let y = x + 1
    return x * y
  })
  target.map(x => x + 1)

  // bad 不推荐
  inbox.filter(msg => {
    const { subject, author } = msg
    if (subject === 'Mockingbird') {
      return author === 'Harper Lee'
    } else {
      return false
    }
  })

  // good 推荐
  inbox.filter(msg => {
    const { subject, author } = msg
    if (subject === 'Mockingbird') {
      return author === 'Harper Lee'
    }

    return false
  })

  # 解构赋值
  1、当需要使用对象的多个属性时，请使用解构赋值
  // bad 不推荐
  function getFullName (user) {
    const firstName = user.firstName
    const lastName = user.lastName

    return `${firstName} ${lastName}`
  }

  // good 推荐
  function getFullName (user) {
    const { firstName, lastName } = user

    return `${firstName} ${lastName}`
  }

  // better 极力推荐
  function getFullName ({ firstName, lastName }) {
    return `${firstName} ${lastName}`
  }

  2、当需要使用数组的多个值
  let arr = [1,2,3,4]
  const [first, second] = arr

  3、函数需要回传多个值，请使用对象结构，不要使用数组解构
  function func () {
    return {
      top,
      right,
      bottom,
      left
    }
  }
  // 对象解构不用考虑数据的顺序，数组解构需要看数据的顺序
  const {top,left} = func()

  # 字符串统一使用单引号 ''
  let str = 'hello'

  # 字符串拼接，推荐使用模板字符串
  let t = 'abc'
  // bad
  let str = ['a','b',t].join()
  // bad
  let str = 'a' + 'b' + t
  // good 推荐
  let str = `123${t}`

  # 推荐使用函数声明，而不是函数表达式(箭头函数例外)
  // bad
  const foo = function () {
    //do something
  }
  // good
  function foo () {
    //do something
  }

  const foo = () => {
    //do something
  }

  # 不推荐在非函数代码块中声明函数
  // bad
  if (isUse) {
    function foo () {
      //do something
    }
  }

  // good
  let foo;
  if (isUse) {
    foo = () => {
      //do something
    }
  }

  # 不要使用arguments, 可以使用...(arguments只是个类数组，而...是一个真正得数组)
  // bad
  function foo () {
    const args = Array.prototype.slice.call(arguments)
    return args.join('')
  }

  // good
  function foo (...args) {
    return args.join('')
  }

  # 使用class, 避免直接操作 prototype
  // bad
  function Queue (contents = []) {
    this._queue = [...contents]
  }
  Queue.prototype.pop = function () {
    const value = this._queue[0]
    this.queue.splice(0,1)
    return value
  }

  // good
  class Queue {
    constructor (contents = []) {
      this._queue = [...contents]
    }
    pop () {
      const value = this._queue[0]
      this._queue.splice(0,1)
      return value
    }
  }

  # 尽量使用ES6模块语法 import 和 export
  // bad
  const util = require('./util')
  module.exports = util

  // good
  import Util from './util'
  export default Util

  // better
  import { Util } from './util'
  export default Util

  # 尽量少使用 import 得通配符 * ，这样可以确保你只有一个默认得export
  // bad
  import * as Util from "./util"

  // good
  import Util from "./util"

  # 迭代器
  const numbers = [1, 2, 3, 4, 5]
  // bad
  let sum = 0
  for (let num of numbers) {
    sum += num
  }

  // good
  let sum = 0
  numbers.forEach(num => sum += num)

  // better
  const sum = numbers.reduce((total, num) => total + num, 0)

  # 对象属性使用 . 来访问
  const joke = {
    name: 'haha',
    age: 28
  }

  // bad
  const name = joke['name']

  // good
  const name = joke.name


```
