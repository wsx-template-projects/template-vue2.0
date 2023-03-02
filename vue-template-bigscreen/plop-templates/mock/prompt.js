const { notEmpty } = require('../utils.js')

module.exports = {
    description: '生成mock数据',
    prompts: [
        {
            type: 'input',
            name: 'url',
            message: '请输入url',
            validate: notEmpty('url'),
        },
        {
            type: 'list',
            name: 'method',
            message: '请求方式',
            choices: [
                {
                    name: 'get',
                    value: 'get',
                },
                {
                    name: 'post',
                    value: 'post',
                },
                {
                    name: 'put',
                    value: 'put',
                },
                {
                    name: 'fetch',
                    value: 'fetch',
                },
                {
                    name: 'delete',
                    value: 'delete',
                },
            ],
            validate: notEmpty('method'),
        },
        {
            type: 'input',
            name: 'description',
            message: '请求描述',
        },
        {
            type: 'list',
            name: 'isList',
            message: '返回数据结构',
            choices: [
                {
                    name: '列表',
                    value: '1',
                    checked: true,
                },
                {
                    name: '对象',
                    value: null,
                },
            ],
        },
    ],
    actions: data => {
        const url = data.url
        const method = data.method
        const description = data.description
        const name = '{{pathCase url}}'
        const isList = data.isList
        console.log('plop data', data)
        const actions = [
            {
                type: 'add',
                path: `src/mock/modules/${name}.js`,
                templateFile: 'plop-templates/mock/index.hbs',
                data: {
                    url: url,
                    method,
                    isList,
                    description,
                },
            },
        ]

        return actions
    },
}
