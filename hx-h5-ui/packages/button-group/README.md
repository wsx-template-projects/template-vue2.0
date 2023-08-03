## hx-button-group

按钮组组件

### 基础属性

| 参数     | 说明    | 类型        | 默认值    |
| ------- | -------- | -------- |  -------- |
| dataSource     | 配置项     | BtnColumn    | -    |
| bottomFixed     | 是否固定在底部     | Boolean    | -    |

### BtnColumn 属性

| 参数     | 说明    | 类型        | 默认值    |
| ------- | -------- | -------- |  -------- |
| text     | 按钮文本     | String    | -    |
| type     | 按钮类型(path/other)     | String    | -    |
| attr     | 按钮其它属性，参考 vant-ui 按钮属性     | Object    | -    |
| jumpConfig  | 跳转页面配置项，只在 type === 'path' 必传     | Object    | path为路径，query为参数，isReplace是否为replace跳转    |

### 方法

| 名称    |  说明   |
| ------- | ------ |
| callback | 按钮点击事件回调    |

### 示例

```html

<hx-button-group
    :data-source="footerBtns"
    @callback="handleBtnCB"
/>

footerBtns: [
    {
        type: 'other',
        text: '提交申请',
        isHide: false,
        attr: {
            type: 'info',
            round: true,
        },
    },
]


```
