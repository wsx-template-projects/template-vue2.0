// 高阶组件模式
// 智能组件 1.0  - 容器组件
const withPromise = (wrapped: any, promiseFn: Function) => {
    return {
        name: 'with-promise',
        data() {
            return {
                loading: false,
                error: false,
                result: null,
            }
        },
        async mounted() {
            this.loading = true
            const result = await promiseFn().finally(() => {
                this.loading = false
            })
            this.result = result
        },
        render(h: any) {
            const args = {
                props: {
                    result: this.result,
                    loading: this.loading,
                    error: this.error,
                },
            }
            const wrapper = h('div', [
                h(wrapped, args),
                this.loading ? h('span', ['加载中……']) : null,
                this.error ? h('span', ['加载错误']) : null,
            ])
            return wrapper
        },
    }
}

// 木偶组件1.0 - UI组件
const view = {
    props: ['result', 'loading', 'error'],
    template: `
      <ul v-if="result">
        <li v-for="item in result">
          {{ item }}
        </li>
      </ul>
    `,
}

// HOC 组件 1.0
// 这里先用promise 模拟一个请求数据过程
const getListData = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(['foo', 'bar', 'Too'])
        }, 1000)
    })
}

export default withPromise(view, getListData)
