import Vue from 'vue'
import './packages/theme-chalk/src/index.css'
import './rewrite/index.less'
import sharegoodUI from '@/sharegood-ui/src'
Vue.prototype.$ShareGood = {
    uploader: {},
    DataView: {
        paramsSerializer(params = {}) {
            const result = {}
            result.pageNum = params.page || 1
            result.pageSize = params.pageSize || params.limit || 10
            delete params.page
            delete params.limit
            delete params.pageSize

            return {
                ...result,
                ...params,
            }
        },
        pagination: {
            page: 1,
            pageSize: 10,
            pageSizes: [10, 20, 50, 100, 200],
            layout: 'sizes,total,slot,->,prev, pager, next, jumper ',
            //layout: 'total, sizes, prev, next',
            // 'prev-text': '上一页',
            // 'next-text': '下一页',
        },
    },
}
Vue.use(sharegoodUI)

const $message = Vue.prototype.$message
const $$message = function(message = '', options = {}) {
    $message(message, {
        customClass: 'my-message',
        showClose: true,
        duration: 3000,
        ...options,
    })
}
$$message.success = function(message = '', options = {}) {
    $message({
        message,
        type: 'success',
        customClass: 'my-message',
        showClose: true,
        duration: 3000,
        ...options,
    })
}
$$message.error = function(message = '', options = {}) {
    $message({
        message,
        type: 'error',
        customClass: 'my-message',
        showClose: true,
        duration: 3000,
        ...options,
    })
}
$$message.info = function(message = '', options = {}) {
    $message({
        message,
        type: 'info',
        customClass: 'my-message',
        showClose: true,
        duration: 3000,
        ...options,
    })
}
$$message.warning = function(message = '', options = {}) {
    $message({
        message,
        type: 'warning',
        customClass: 'my-message',
        showClose: true,
        duration: 3000,
        ...options,
    })
}
Vue.prototype.$$message = $$message
Vue.prototype.$$confirm = function(message = '', options = {}) {
    const h = this.$createElement
    return this.$msgbox({
        title: options.title || '',
        message: h('div', null, [
            h('i', { class: 'iconfont iconjingshi warning icon' }, ''),
            h('div', { class: ['message', options.className] }, message),
            h('div', { class: ['tip', options.className] }, options.tip || ''),
        ]),

        customClass: 'my-msgbox',
        showCancelButton: true,
        confirmButtonText: options.confirmButtonText || '确定',
        cancelButtonText: options.cancelButtonText || '取消',
        center: true,
        beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
                done()
            } else {
                done()
            }
        },
    })
}
Vue.prototype.$$alert = function(message = '', options = {}) {
    const icon = options.icon || 'info'
    const h = this.$createElement
    return this.$msgbox({
        title: options.title || '',
        message: h('div', { class: 'alert' }, [
            h('i', { class: `iconfont icontishi ${icon} icon` }, ''),
            h('div', { class: 'message' }, message),
            h('div', { class: 'tip' }, options.tip || ''),
        ]),

        customClass: 'my-msgbox',
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: options.cancelButtonText || '关闭',

        center: true,
        beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
                done()
            } else {
                done()
            }
        },
    })
}
Vue.prototype.$$error = function(message = '', options = {}) {
    return this.$$alert(message, { ...options, icon: 'error' })
}
Vue.prototype.$$success = function(message = '', options = {}) {
    return this.$$alert(message, { ...options, icon: 'success' })
}
