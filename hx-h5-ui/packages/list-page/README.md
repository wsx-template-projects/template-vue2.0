# my-list-page

列表页面组件

## 基础属性

| 参数     | 说明    | 类型     | 默认值    |
| ------- | -------- | -------- | -------- |
| searchConfig  | search组件的配置项   | SearchConfig     | -     |
| conditionConfig  | 条件查询组件的配置项   | ConditionConfig     | -     |
| tabConfig  | tab组件的配置项   | TabConfig     | -     |
| listConfig  | list组件的配置项   | ListConfig     | -     |
| load     |  请求方法    | Function   | result为数据集;total为总数  |

### SearchConfig属性

| 参数     | 说明    | 类型     | 默认值    |
| ------- | -------- | -------- | -------- |
| hasSearchJump     | 是否点击搜索框直接跳转    | boolean   | false  |
| isChangeDispatch     | 是否搜索框值改变触发自定义事件    | boolean   | false  |
| duration     | input事件触发，节流时间间隔    | number   | 2000  |
| config     | 搜索栏配置项    | Object   | 参考vant组件Search - Props  |

### 方法

| 名称    |  说明   |
| ------- | ------ |
| onInit | 初始化请求数据    |

### 插槽

| 名称    |  说明   |
| ------- | ------ |
| default | 列表内容    |

### 示例

```html

<hx-list-page
    class="page-list"
    ref="listPageRef"
    :search-config="searchConfig"
    :condition-config="conditionConfig"
    :tab-config="tabConfig"
    :list-config="listConfig"
    :load="syncData"
    @search-jump="searchJumpHandler"
>
    <template v-slot:default="{ row }">
        <item :item="row" />
    </template>
</hx-list-page>


```

```js

import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { formatDate } from 'icinfo-util'
import Item from './components/item.vue'
import { ListPageRef } from '@/hx-h5-ui'

@Component({
    name: 'DemoListPage',
    components: { Item },
})

export default class DemoListPage extends Vue {
    @Ref('listPageRef') listPageRef!: ListPageRef
    searchConfig: Record<string, any> = {
        hasSearchJump: true,
        // isChangeDispatch: true,
        duration: 3000,
        config: {
            label: 'label',
            'show-action': true,
        },
    }
    conditionConfig: Record<string, any> = {
        menuConfig: {},
        list: [
            {
                value: 1,
                dropdownItem: {
                    options: [
                        { text: '全部状态', value: 0 },
                        { text: '待授权', value: 1 },
                        { text: '待回函', value: 2 },
                        { text: '已处理', value: 3 },
                        { text: '已逾期', value: 4 },
                    ],
                },
            },
            {
                value: '日期选择',
                // format: 'yyyy-MM-dd',
                splitTxt: '至',
                valueFormat: (date: string | string[]) => {
                    console.log('date :>> ', date)
                    return !Array.isArray(date)
                        ? formatDate(date, 'yyyy.MM.dd')
                        : date
                              .map((time: string) =>
                                  formatDate(time, 'yyyy.MM.dd'),
                              )
                              .join(' - ')
                },
                calendar: {
                    type: 'range',
                    title: '这是标题',
                    color: '#1989fa',
                    'confirm-text': '确认按钮文本',
                    formatter: function(day: any) {
                        // console.log('day :>> ', day)
                        const month = day.date.getMonth() + 1
                        const date = day.date.getDate()

                        if (month === 5) {
                            if (date === 1) {
                                day.topInfo = '劳动节'
                            } else if (date === 4) {
                                day.topInfo = '青年节'
                            } else if (date === 11) {
                                day.text = '今天'
                            }
                        }

                        if (day.type === 'start') {
                            day.bottomInfo = '开始'
                        } else if (day.type === 'end') {
                            day.bottomInfo = '结束'
                        }

                        return day
                    },
                },
            },
        ],
    }
    tabConfig: Record<string, any> = {
        defaultActiveTab: 'name1',
        list: [
            { title: '全部', name: '' },
            { title: 'tab1', name: 'name1' },
            { title: 'tab2', name: 'name2' },
            { title: 'tab3', name: 'name3' },
        ],
        config: {
            color: '#3192E4',
            'title-active-color': '#3192E4',
            'title-inactive-color': '#666',
        },
    }
    listConfig: Record<string, any> = {
        disableRefresh: false,
        // disableRefresh: true,
        diyAnimation: true,
        emptyConfig: {
            image: require('../assets/home-empty-data.png'),
            description: '没有更多数据了！',
        },
    }
    mounted() {}
    onInit() {
        this.listPageRef.onInit()
    }
    searchJumpHandler() {
        // this.$router.push('/index/home')
    }
    async syncData(query: any) {
        console.log('query :>> ', query)
        const { pageNum, pageSize } = query
        const res: any = await this.setTestData(query, 16)
        console.log('list-page-res :>> ', res)
        const { list, total } = res.data
        const start = (pageNum - 1) * pageSize
        const end = start + pageSize
        const result = list.slice(start, end)
        return {
            result,
            total,
        }
    }
    setTestData(query: any, len: number) {
        return new Promise((resolve: any, reject: any) => {
            setTimeout(() => {
                let code = 200
                let obj: any = { name: '小明', age: 18, sex: 'boy' }
                const result = new Array(len).fill(obj).map((v, index) => {
                    return {
                        ...v,
                        name: `${v.name}_${index}`,
                        id: index + 1,
                    }
                })
                const res = {
                    code,
                    data: {
                        list: result,
                        total: len,
                    },
                    message: '请求成功',
                }
                if (res.code == 200) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }, 1500)
        })
    }
}
```
