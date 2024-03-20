# module-title

模块标题组件

## 基础属性 - Attrs

| 参数     | 说明    | 类型     | 默认值    |
| ------- | -------- | -------- | -------- |
| xx  | xx   | xx     | -     |

### 事件 - Events

| 事件名    |  说明   | 回调参数 |
| ------- | ------ | ------  |
| xx | xx    | xx   |

### 方法 - Methods

| 方法名    |  说明   |  参数 | 返回值 |
| ------- | ------ | ----- | ----- |
| xx | xx    |  xx  | xx |

### 插槽 - Slots

| 名称    |  说明   |
| ------- | ------ |
| default | xx    |

### 示例

```bash

<hx-module-title
    big-title="大标题"
    sub-title="小标题"
    right-text="右边文本"
    :has-more="true"
    @more-click="moreClick"
></hx-module-title>

moreClick() {
    console.log('more-click :>> ')
}

```
