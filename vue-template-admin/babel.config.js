module.exports = {
    presets: [
        // https://github.com/vuejs/vue-cli/tree/master/packages/@vue/babel-preset-app
        '@vue/cli-plugin-babel/preset',
    ],
    env: {
        development: {
            // babel-plugin-dynamic-import-node plugin only does one thing by converting all import() to require().
            // This plugin can significantly increase the speed of hot updates, when you have a large number of pages.
            // https://panjiachen.github.io/vue-element-admin-site/guide/advanced/lazy-loading.html
            plugins: ['dynamic-import-node'],
        },
    },
}

// module.exports = {
//     presets:
//         process.env.ENV === 'test'
//             ? ['@babel/preset-env']
//             : ['@vue/cli-plugin-babel/preset'],

//     plugins: [
//         /* @PC.element-ui */
//         /* element-ui 按需引入，详情：https://github.com/ElementUI/babel-plugin-component */
//         // [
//         //     'component',
//         //     {
//         //         libraryName: 'element-ui',
//         //         styleLibraryName: 'theme-chalk', // 单独引用了完整的主题包时，把该行替换为 style: false
//         //     },
//         //     'element-ui',
//         // ],
//         /* @H5.vant */
//         /* vant 按需引入，详情：https://github.com/ElementUI/babel-plugin-component */
//         // [
//         //     'component',
//         //     {
//         //         libraryName: 'vant',
//         //         style: 'style/less.js',
//         //     },
//         //     'vant',
//         // ],
//         /* lodash 按需引入，详情：https://github.com/lodash/babel-plugin-lodash */
//         // ['lodash'],
//     ],
// }
