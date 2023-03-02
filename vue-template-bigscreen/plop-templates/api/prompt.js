const { notEmpty } = require('../utils.js')

module.exports = {
    description: '生成api-hook数据',
    prompts: [
        {
            type: 'input',
            name: 'url',
            message: '请输入url',
            validate: notEmpty('url'),
        },
        {
            type: 'input',
            name: 'description',
            message: '请求描述',
        },
    ],
    actions: data => {
        const url = data.url
        const name = '{{pathCase url}}'

        const actions = [
            {
                type: 'add',
                path: `src/api/modules/${name}.js`,
                templateFile: 'plop-templates/mock/api.hbs',
                data: {
                    url: url,
                    name: name,
                },
            },
        ]

        return actions
    },
}
