const autoprefixer = require('autoprefixer')
const CompressionPlugin = require('compression-webpack-plugin')
const isDev = process.env.VUE_APP_ENV === 'dev'
const { join } = require('path')
const { getPages } = require('../../../build/utils')
const pages = getPages(process.env.VUE_APP_ENTRY)
const entry = { pages }

const staticResourceMap = {
    // 开发环境
    dev: {
        externals: {
            echarts: 'echarts',
            xlsx: 'XLSX',
        },
        cdn: {
            css: [
                process.env.BASE_URL +
                    'static/assets/npm/element-ui/2.13.2/theme-chalk/index.css',
            ],
            js: [
                process.env.BASE_URL +
                    'static/assets/npm/echarts/4.8.0/echarts.min.js',
                process.env.BASE_URL +
                    'static/assets/npm/xlsx/0.16.8/xlsx.min.js',
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
            'element-ui': 'ELEMENT',
            xlsx: 'XLSX',
            quill: 'Quill',
        },
        cdn: {
            css: [
                process.env.BASE_URL +
                    'static/assets/npm/element-ui/2.13.2/theme-chalk/index.css',
                process.env.BASE_URL +
                    'static/assets/npm/quill/1.3.7/quill.core.min.css',
                process.env.BASE_URL +
                    'static/assets/npm/quill/1.3.7/quill.snow.min.css',
                process.env.BASE_URL +
                    'static/assets/npm/quill/1.3.7/quill.bubble.min.css',
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
                process.env.BASE_URL +
                    'static/assets/npm/element-ui/2.13.2/index.js',
                process.env.BASE_URL +
                    'static/assets/npm/xlsx/0.16.8/xlsx.min.js',
                process.env.BASE_URL +
                    'static/assets/npm/quill/1.3.7/quill.min.js',
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

        if (process.env.VUE_APP_GZIP === 'true') {
            const productionGzipExtensions = ['js', 'css']
            config.plugin('compressionPlugin').use(
                new CompressionPlugin({
                    filename: '[path][base].gz', // 注意: compress版本不同配置不同
                    algorithm: 'gzip',
                    test: new RegExp(
                        '\\.(' + productionGzipExtensions.join('|') + ')$',
                    ),
                    threshold: 10240,
                    minRatio: 0.8,
                }),
            )
        }
    },
}
