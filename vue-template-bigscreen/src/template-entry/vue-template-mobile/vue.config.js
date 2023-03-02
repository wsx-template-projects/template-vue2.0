const autoprefixer = require('autoprefixer')
const postcssPxtorem = require('postcss-pxtorem') // @H5 将 px 转成 rem
const CompressionPlugin = require('compression-webpack-plugin')
const _ = require('lodash')
const { join } = require('path')
const { getPages } = require('../../../build/utils')
const env = process.env
const VUE_APP_ENTRY = process.env.VUE_APP_ENTRY
const isDev = env.VUE_APP_ENV === 'dev'
const pages = getPages(VUE_APP_ENTRY)
const entry = { pages }
const platformResource = {
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
const devServerOptions = env.DEV_PROXY_TARGET_API
    ? {
          devServer: {
              host: '0.0.0.0',
              /* 更详细的配置规则：https://webpack.docschina.org/configuration/dev-server/#devserver-proxy */
              proxy: {
                  [env.VUE_APP_BASEURL_API]: {
                      changeOrigin: true,
                      pathRewrite: { '^/@API': '' },
                      target: env.DEV_PROXY_TARGET_API,
                  },
              },
          },
      }
    : {}
/**
 * @type {import('@vue/cli-service').ConfigFunction}
 */
module.exports = {
    ...entry,
    ...devServerOptions,
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
                    const pxtorem = postcssPxtorem({ propList: ['*'] }) // @H5 将 px 转成 rem

                    return [pxtorem, autoprefixer]
                },
            },
        },
        sourceMap: isDev ? env.DEV_CSS_SOURCEMAP === 'true' : false,
    },

    productionSourceMap: env.VUE_APP_ENV === 'stage',

    configureWebpack: config => {
        if (isDev) config.devtool = 'source-map'
        // 不打包固定的第三方依赖
        Object.assign(config, {
            externals:
                env.VUE_APP_ENV === 'dev' ? {} : platformResource.externals,
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
                if (process.env.NODE_ENV === 'production') {
                    args[0].cdn = platformResource.cdn.build
                }
                if (process.env.NODE_ENV === 'development') {
                    args[0].cdn = platformResource.cdn.dev
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

        // /* @H5.vant */
        const vant = config.module
            .rule('less')
            .oneOf('vant')
            .before('vue-modules')
            .test(/[\\/]node_modules[\\/]vant[\\/]/)
        config.module
            .rule('less')
            .oneOf('normal')
            .toConfig()
            .use.forEach(({ __useName, loader, options = {} }) => {
                const ops = _.cloneDeep(options)
                if (__useName === 'less-loader') {
                    delete ops.globalVars
                    ops.modifyVars = {
                        hack: `true; @import '${join(
                            __dirname,
                            '../../../',
                            './src/vant/vars.less',
                        )}'`,
                    }
                }
                vant.use(__useName)
                    .loader(loader)
                    .options(ops)
            })

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
