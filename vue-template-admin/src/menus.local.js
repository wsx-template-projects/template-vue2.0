// 地址 host
const Host = location.origin

console.log('Host :>> ', Host)

// 本地路由
module.exports = [
    {
        label: 'demo',
        icon: '',
        children: [
            {
                label: 'demo-menus',
                icon: '',
                uri: '/demo/demo-menus',
            },
        ],
    },
]
