const { notEmpty } = require('../utils.js')
const { getPages } = require('../../build/utils')
/**
 * {
  loan: {
    entry: './src/entry/loan/main.ts',
    title: '贷款码',
    keywords: '',
    description: '',
    template: 'public/index.html',
    filename: 'index.html'
  }
}
 */
const entryMap = getPages()
const entryPrompt = {
    type: 'list',
    name: 'entry',
    message: '选择项目',
    choices: [
        // {
        //     name: '是',
        //     value: '1',
        // },
        // {
        //     name: '否',
        //     value: null,
        // },
    ],
}
entryPrompt.choices = Object.keys(entryMap).map((key, index) => {
    const target = entryMap[key]
    const { title } = target
    const result = {
        name: key + '-' + title,
        value: key,
    }
    if (index === 0) {
        result['checked'] = true
    }
    return result
})

module.exports = {
    description: '生成一个页面',
    prompts: [
        entryPrompt,
        {
            type: 'input',
            name: 'dir',
            message:
                '请输入组件路径，不允许空 index为默认首页（比如：dashboard、order/list、my-profile/list）',
            validate: notEmpty('dir'),
        },
        {
            type: 'input',
            name: 'title',
            message: '请输入页面标题，允许空（比如：我的订单）',
        },
        {
            type: 'checkbox',
            name: 'blocks',
            message: 'Blocks:',
            choices: [
                {
                    name:
                        '是否是二级路由(注意：后台管理的菜单一般都要设置为true)',
                    value: 'parent',
                    checked: false,
                },
                {
                    name:
                        '是否需要授权访问(注意：后台管理的菜单一般都需要设置为true)',
                    value: 'requireAuth',
                    checked: false,
                },
                {
                    name: '是否缓存组件',
                    value: 'keepAlive',
                    checked: false,
                },
                {
                    name: '是否包含子路由',
                    value: 'hasChildren',
                    checked: false,
                },
            ],
            validate(value) {
                // if (value.indexOf('script') === -1 && value.indexOf('template') === -1) {
                //     return 'View require at least a <script> or <template> tag.';
                // }
                return true
            },
        },
        {
            type: 'checkbox',
            name: 'TS',
            message: '是否使用TypeScript',
            choices: [
                {
                    name: 'typescript',
                    value: 'typescript',
                    checked: false,
                },
            ],
        },
    ],
    actions: data => {
        const entry = data.entry
        const entryDir =
            entry.indexOf('vue-template') > -1 ? 'template-entry' : 'entry'
        const dir =
            data.dir.indexOf('/') === 0 ? data.dir.substring(1) : data.dir
        const routePath = dir === 'index' ? '' : dir
        const name = !isNaN(dir) ? `app${dir}` : dir
        const layoutName = dir + '/_layout'
        const title = data.title || ''
        const isTS = data.TS.includes('typescript')
        const chunkName = dir
        const hasChildren = data.blocks.includes('hasChildren')
        console.log('页面访问地址', '/' + dir)
        const actions = [
            {
                force: true,
                type: 'add',
                path: `src/${entryDir}/${entry}/views/${dir}/index.vue`,
                templateFile: isTS
                    ? 'plop-templates/spa/index-ts.hbs'
                    : 'plop-templates/spa/index.hbs',
                data: {
                    name: name,
                },
            },
            {
                force: true,
                type: 'add',
                path: `src/${entryDir}/${entry}/views/${dir}/router.js`,
                templateFile: 'plop-templates/route/index.hbs',
                data: {
                    layoutName,
                    chunkName,
                    routePath,
                    dir,
                    name,
                    title,
                    parent: data.blocks.includes('parent') ? 'Index' : '',
                    requireAuth: data.blocks.includes('requireAuth'),
                    keepAlive: data.blocks.includes('keepAlive'),
                    hasChildren,
                },
            },
        ]
        if (hasChildren) {
            actions.push({
                force: true,
                type: 'add',
                path: `src/${entryDir}/${entry}/views/${dir}/_layout.vue`,
                templateFile: 'plop-templates/spa/layout.hbs',
                data: {
                    name: name,
                    layoutName: layoutName,
                },
            })
        }

        return actions
    },
}
