## vux

参考[https://blog.csdn.net/weixin_43618932/article/details/90115927]

## 1.下载

```
npm i vuex
```

## 2.在 src 目录下新建 store 文件夹，新建 store.js

## 3.在刚才新建的 store.js 中引入 vue 和 vuex;在 main.js 中使用

store.js

```
import vue from 'vue'
import vuex from 'vuex
vue.use(vuex)
```

main.js

```
import Vue from 'vue'
import store from './vuex/store'
new Vue({
    el: '#app',
    store,
    .
    .
    .

})
```

store.js

### 3.1 state,vuex 中存放数据的地方

```store.js
const state = {
    str:'',
    newStr:'',
    ...
}
```

### 3.2 getters 可以不使用，使用他主要是为了方便，如:

```
多个vue文件重复使用state中的str字段，则需要在每个vue文件中写
this.state.str
当这个存储的字段名字改变就需要多个文件中重复修改
```

如果换做 getters 来处理的话

```
const getters = {
    stateStr(state){
        return state.str
    }
}
然后再页面中调用

this.getters.stateStr

当然也可以搭配mapGetters使用

import { mapGetters } from 'vuex'

computed:{
    ...mapGetters([
        myStateStr:'stateStr' // 前面名字随意，后面的是getters中定义的名字
    ])
}
```

### 3.3 mutations 改变 state 中数据的唯一方法,里面的函数第一个参数为 state

```
const mutations = {
    setStr(state,newVal){
        state.str = newVal
    }
}
同样也有mapMutations
import { mapMutations } from 'vuex'

methods:{
    ...mapMutations([
        'setStr'  // this.setStr == this.$store.commit('setStr')
    ])
}
```

### 3.4 actions 可以异步操作，然后调用 mutations 改变 state;第一个参数 context，为 store 的实例，有 commit，state 等属性，一般直接解构赋值出 commit 使用；异步操作，上一步没有返回会报错

```
const actions = {
    asyncSetStr(context,val){
        let str = new Promise((resolve,reject) => {
            setTimeOut(()=>{
                resolve(val)
            },1000)
        }).then(res => {
            context.commit('setStr',res)
        })
    }
}
同样有mapActions
import { mapActions } from 'vuex'

methods:{
    ...mapActions([
        'asyncSetStr'  // this.asyncSetStr == this.$store.dispatch('asyncSetStr')
    ])
    <!-- ...mapActions({
        myAsyncSetStr: 'asyncSetStr'  // this.myAsyncSetStr == this.$store.dispatch('asyncSetStr')
    }) -->
}

```

## modules

将 store 分为多个模块，每个模块下的 state 有自己的命名空间，避免多人多模块开发时命名冲突的问题;在未特意声明的情况下 mutations 和 actions 并不受该命名空间的影响,仍全局可访问,但是 state 中的数据使用时需要指定命名空间

## vuex-persistedstate 
插件,解决刷新数据消失的问题 [npm地址](https://www.npmjs.com/package/vuex-persistedstate)
[部分功能地址](https://liuxianyu.cn/article/vuex-persistedstate.html)

配置项
- key  string 存储时的键名，默认vuex
- reducer function 默认参数 state 将根据给定路径调用以减少状态持久化的函数
- storage object 三个函数类型的属性，getItem(key),setItem(key:key,value:当前改变后的state),removeItem(key)
- getState function  两个参数 key,stroage key就是上面自己定义的key，默认vue；stroage也是上面定义的 storage 存储后的值
- setState function 两个参数 key,state key就是上面自己定义的key，默认vuex； state是当前state中的值
- 其他参数


```
store.js

import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const state = {
    name:'',
    cardID:'',
}
const mutations = {
    setCardID(state,val){
        state.cardId = val
    }
}

const persistTag = store =>{
    store.subscribe((mutation,state) => {
        // mutation有两个属性 type 键名 ,payload 要设置的值
        // mutation.type 和 mutation中的key保持一致
        if (mutation.type == 'setCardID') {
            localStorage.setItem('uexCardID',state.cardID)
        }
    })
}

export default new Vuex.Store({
    state,
    mutations,
    // plugins: [createPersistedState()], // 默认存储到localStorage
    // plugins: [createPersistedState({  
            storage: window.sessionStorage,  // 指定存储到sessionStorage
            reducer(state) {
                return {
                    // 只储存state中的 name
                    name: state.name 
                }
            },
            storage: {
                getItem: (key) => state[key],
                setItem:(key,value) => sessionStorage.setItem(key,value),
                removeItem: (key) => sessionStorage.removeItem(key),
            }
        }),
        persistTag
    ]

})

     