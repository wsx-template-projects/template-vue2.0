const pc = {
    externals: {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        axios: 'axios',
        'element-ui': 'ELEMENT',
        echarts: 'echarts',
        // 'vue-baidu-map': 'VueBaiduMap',
        // mapv: 'mapv',
    },
    cdn: {
        // 开发环境
        dev: {
            css: [
                //'//at.alicdn.com/t/font_2295884_5ckrr92moty.css',
                process.env.BASE_URL +
                    'static/assets/font/font_2510405_0ftc09q2kyhq/iconfont.css',
                process.env.BASE_URL +
                    'static/assets/npm/element-ui/2.13.2/theme-chalk/index.css',
            ],
        },
        // 生产环境
        build: {
            css: [
                process.env.BASE_URL +
                    'static/assets/font/font_2510405_0ftc09q2kyhq/iconfont.css',
                process.env.BASE_URL +
                    'static/assets/npm/element-ui/2.13.2/theme-chalk/index.css',
            ],
            js: [
                process.env.BASE_URL +
                    'static/assets/npm/vue/2.6.11/vue.min.js',
                process.env.BASE_URL +
                    'static/assets/npm/vue-router/3.3.4/vue-router.min.js',
                process.env.BASE_URL +
                    'static/assets/npm/axios/0.19.2/axios.min.js',
                process.env.BASE_URL +
                    'static/assets/npm/vuex/3.4.0/vuex.min.js',
                process.env.BASE_URL +
                    'static/assets/npm/element-ui/2.13.2/index.js',
                process.env.BASE_URL +
                    'static/assets/npm/echarts/4.8.0/echarts.min.js',
            ],
        },
    },
}
const h5 = {
    externals: {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        axios: 'axios',
        vant: 'vant',
    },
    cdn: {
        // 开发环境
        dev: {
            css: [
                process.env.BASE_URL +
                    'static/assets/npm/vant/2.10.8/index.css',
            ],
        },
        // 生产环境
        build: {
            css: [
                process.env.BASE_URL +
                    'static/assets/npm/vant/2.10.8/index.css',
            ],
            js: [
                process.env.BASE_URL +
                    'static/assets/npm/vue/2.6.11/vue.min.js',
                process.env.BASE_URL +
                    'static/assets/npm/vue-router/3.3.4/vue-router.min.js',
                process.env.BASE_URL +
                    'static/assets/npm/axios/0.19.2/axios.min.js',
                process.env.BASE_URL +
                    'static/assets/npm/vuex/3.4.0/vuex.min.js',
                process.env.BASE_URL +
                    'static/assets/npm/vant/2.10.8/vant.min.js',
            ],
        },
    },
}
const assets = {
    h5,
    pc,
}

module.exports = {
    assets,
    //mode: 'SPA', // 是否单页面 多页面入口为entry
    platform: 'pc', // 指定平台模板 h5 pc
}
