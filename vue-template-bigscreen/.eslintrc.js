module.exports = {
    root: true,
    env: { node: true },

    globals: {
        $: true,
        jQuery: true,
        BMap: true,
        BMapGL: true,
    },

    extends: [
        'plugin:vue/strongly-recommended', // 使用严谨模式
        'eslint:recommended',
        '@vue/prettier', // 结合 .prettierrc.js
    ],

    rules: {
        'vue/no-unused-components': 'warn',
        'no-useless-escape': 'warn',
        'no-undef': 'warn',
        'no-prototype-builtins': 'warn',
        'no-console': 'off',
        'no-debugger': 'warn',
        'no-unused-vars': [
            'off',
            {
                ignoreRestSiblings: true /* 解构剩余变量时不检查 */,
                varsIgnorePattern: '^h$', // 支持 JSX 的 h 变量
            },
        ],
        'no-var': 'warn',
        'prefer-const': ['off', { destructuring: 'all' }],
        'no-empty': 'warn',
    },

    parserOptions: {
        parser: '@typescript-eslint/parser',
        // ecmaFeatures: {
        //     // 支持装饰器
        //     legacyDecorators: true,
        // },
    },

    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)',
            ],
            env: { jest: true },
        },
    ],

    extends: [
        'plugin:vue/strongly-recommended',
        'eslint:recommended',
        '@vue/prettier',
        '@vue/typescript',
    ],
}
