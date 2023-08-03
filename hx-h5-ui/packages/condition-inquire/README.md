# 条件查询 - 组件

## 说明

### 基础属性

| 参数     | 说明    | 类型     | 默认值    |
| ------- | -------- | -------- | -------- |
| menu-config    |  下拉菜单配置项   | Object   | 参考vant组件DropdownMenu Props  |
| list    |  dropdown-item配置项   | ConditionItem   | dropdown-item配置项  |

### ConditionItem

| 参数     | 说明    | 类型     | 默认值    |
| ------- | -------- | -------- | -------- |
| value    |  下拉菜单配置项   | any   | 当前选中值  |
| format    |  日期格式化   | string   | yyyy-MM-dd  |
| splitTxt    |  多个日期中间的分割符   | string   | 至  |
| valueFormat    |  日期格式化函数,和format功能相同，二选一即可   | function   | -  |
| calendar    |  日历配置项   | Object   | 参考vant组件Calendar - Props  |
| dropdownItem    |  下拉菜单item配置项   | Object   | 参考vant组件DropdownItem - Props  |


### MyConditionInquire Events

| 事件名    |  说明   | 回调参数 |
| ------- | ------ | --------  |
| change | 点击选项导致 value 变化时触发   |   { index: number, value: any }   |

### 方法

| 名称    |  说明   |
| ------- | ------ |
| xxx | xxx    |

### 插槽

| 名称    |  说明   |
| ------- | ------ |
| calendar-footer | 自定义底部区域内容    |

### 示例

```html

<hx-condition-inquire
    :menu-config="conditionConfig.menuConfig"
    :list="conditionConfig.list"
    @change="changeCondition"
/>

```

```js

conditionConfig = {
    menuConfig: {},
    list: [
        {
            value: 0,
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

changeCondition(data: { index: number; value: any }) {
    console.log('data :>> ', data)
    const { index, value } = data
    console.log('index :>> ', index)
    console.log('value :>> ', value)
    // this.init() // 刷新列表数据
}

```
