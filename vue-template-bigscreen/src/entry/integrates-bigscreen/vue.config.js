const autoprefixer = require('autoprefixer')
const isDev = process.env.VUE_APP_ENV === 'dev'
const { join } = require('path')
const { getPages } = require('../../../build/utils')
const pages = getPages(process.env.VUE_APP_ENTRY)
const entry = { pages }

const staticResourceMap = {
    // 开发环境
    dev: {
        externals: {
            jquery: 'jQuery',
            echarts: 'echarts',
        },
        cdn: {
            css: [
                process.env.BASE_URL +
                    'static/assets/npm/element-ui/2.13.2/theme-chalk/index.css',
            ],
            js: [
                'https://lib.baomitu.com/jquery/3.6.0/jquery.min.js',
                process.env.BASE_URL +
                    'static/assets/npm/echarts/4.8.0/echarts.min.js',
                'https://echarts.baidu.com/resource/echarts-liquidfill-latest/dist/echarts-liquidfill.min.js',
            ],
        },
    },
    // 生产环境
    build: {
        externals: {
            vue: 'Vue',
            'vue-router': 'VueRouter',
            vuex: 'Vuex',
            axios: 'axios',
            echarts: 'echarts',
        },
        cdn: {
            css: [
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
                    'static/assets/npm/echarts/4.8.0/echarts.min.js',
                'https://echarts.baidu.com/resource/echarts-liquidfill-latest/dist/echarts-liquidfill.min.js',
            ],
        },
    },
}
const staticResource = isDev
    ? staticResourceMap['dev']
    : staticResourceMap['build']
/**
 * @type {import('@vue/cli-service').ConfigFunction}
 */
module.exports = {
    ...entry,
    css: {
        extract: false,
        loaderOptions: {
            less: {
                globalVars: {
                    hack: `true; @import '${join(
                        __dirname,
                        '../../../',
                        './src/styles/vars.less',
                    )}'; @import '${join(__dirname, './styles/vars.less')}'; `,
                },
            },
            postcss: {
                plugins: function({ resourcePath: path }) {
                    return [autoprefixer]
                },
            },
        },
        sourceMap: isDev ? process.env.DEV_CSS_SOURCEMAP === 'true' : false,
    },
    configureWebpack: config => {
        if (isDev) config.devtool = 'source-map'
        // 不打包固定的第三方依赖
        Object.assign(config, {
            externals: staticResource['externals'],
        })
        config.optimization = {
            // 默认命名 连接符~
            splitChunks: {
                automaticNameDelimiter: '.',
            },
        }
    },
    chainWebpack: config => {
        // 多页面处理
        Object.keys(pages).forEach(key => {
            config.plugins.delete(`prefetch-${key}`)

            config.plugin('html-' + key).tap(args => {
                if (isDev) {
                    args[0].cdn = staticResourceMap['dev'].cdn
                } else {
                    args[0].cdn = staticResourceMap['build'].cdn
                }
                return args
            })
        })

        /* 跳过 babel-loader */
        config.module.rule('js').exclude.add(path => {
            return /[\\/]src[\\/]libs[\\/].+\.js$/.test(path)
        })

        const svgSpriteIconsDir = join(
            __dirname,
            '../../../',
            './src/components/SvgIcon/icons/',
        )
        config.module.rule('svg').exclude.add(svgSpriteIconsDir)
        config.module
            .rule('svg-sprite')
            .after('svg')
            .test(/\.(svg)(\?.*)?$/)
            .include.add(svgSpriteIconsDir)
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({ symbolId: 'svgSpriteIcon__[name]' })
            .end()
            .use('svgo-loader')
            .loader('svgo-loader')
    },
}
