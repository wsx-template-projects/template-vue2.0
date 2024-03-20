const { notEmpty } = require('../utils.js')
let pkg = require('../../package.json')
const path = require('path')
const fs = require('fs')
let dir = path.resolve(__dirname, '../../', 'package.json')
const { getPages } = require('../../build/utils')
const entryMap = getPages()
const entryPrompt = {
    type: 'list',
    name: 'templateName',
    message: '选择模板',
    choices: [],
}
entryPrompt.choices = Object.keys(entryMap)
    .map((key, index) => {
        const target = entryMap[key]
        const { description } = target
        const result = {
            name: key + ' ' + description,
            value: key,
        }

        if (key.indexOf('vue-template') > -1) {
            return result
        } else {
            return null
        }
    })
    .filter(item => item)

module.exports = {
    description: '创建一个新项目',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: '项目英文名称（请使用小写 xxx）',
            validate: notEmpty('name'),
        },
        {
            type: 'input',
            name: 'title',
            message: '项目标题',
        },
        entryPrompt,
    ],
    actions: data => {
        const { name, templateName, title } = data
        console.log(data)
        pkg.scripts[
            `dev:${name}`
        ] = `cross-env VUE_APP_ENTRY=${name} vue-cli-service serve --open`
        pkg.scripts[
            `build:test:${name}`
        ] = `cross-env VUE_APP_ENTRY=${name} vue-cli-service build --mode=test`
        pkg.scripts[
            `build:${name}`
        ] = `cross-env VUE_APP_ENTRY=${name} vue-cli-service build --mode=production`
        fs.writeFileSync(dir, JSON.stringify(pkg, null, 4))
        const actions = [
            {
                force: true,
                type: 'addMany',
                destination: `src/entry/${name}`,
                base: `src/template-entry/${templateName}`,
                templateFiles: `src/template-entry/${templateName}`,
                transform(content, data) {
                    const { name } = data
                    return content
                        .replace(new RegExp(templateName, 'g'), name)
                        .replace(/网站标题/g, title)
                },
                data,
            },
        ]

        return actions
    },
}
