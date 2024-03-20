const glob = require('glob')
const path = require('path')
const fs = require('fs')
const env = process.env
const LocalConfig = require('../config.js')
const platformResource = LocalConfig.assets[LocalConfig.platform]
const INDEX = env.INDEX
const TITLE = {}
glob.sync('./src/*/*/settings.js').forEach(dir => {
    const entry = path.resolve(__dirname, '..', dir.split('/settings.js')[0])
    const configDIR = path.join(entry, './settings.js')
    const config = require(configDIR)

    TITLE[entry] = {
        ...config,
    }
})
// 模板文件
function getTemplates() {
    let result = {}
    glob.sync('./src/*/**/index.html').forEach(dir => {
        const chunk = dir.split('entry/')[1].split('/index.html')[0]

        result[chunk] = dir
    })

    return result
}
// name -> gov,bank,company
function getPages(name = '') {
    let names = name.split(',').filter(item => item)
    const TPL = getTemplates()
    let pages = {}
    glob.sync('./src/*/**/main.{ts,js}').forEach(dir => {
        const chunk = dir.split('entry/')[1].split('/main.')[0]
        const entry = path.resolve(__dirname, '..', dir.split('/main.')[0])

        const template = TPL[chunk] || 'public/index.html'
        const config = TITLE[entry] || {}
        const {
            title = '',
            keywords = '',
            description = '',
            filename = '',
        } = config
        pages[chunk] = {
            entry: dir,
            title,
            keywords,
            description,
            template,
            //filename,
        }
        if (filename) {
            pages[chunk]['filename'] = filename
        }
    })

    if (!names.length) {
        return pages
    } else {
        let result = {}
        let len = names.length
        names.forEach(name => {
            result[name] = pages[name]
            // if (len === 1) {
            //     result[name]['filename'] = 'index.html'
            // }
        })
        return result
    }
    // console.log('pages',pages)
}

function handleHtml(config = {}, pages) {
    // 单页面
    if (pages === null) {
        config.plugins.delete(`prefetch`)

        config.plugin('html').tap(args => {
            args[0].title = LocalConfig.title
            if (process.env.NODE_ENV === 'production') {
                args[0].cdn = platformResource.cdn.build
            }
            if (process.env.NODE_ENV === 'development') {
                args[0].cdn = platformResource.cdn.dev
            }
            return args
        })
    } else {
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
    }
}

exports.cdn = platformResource.cdn
exports.externals = platformResource.externals
exports.getPages = getPages
exports.handleHtml = handleHtml
