# search - 组件

## 说明

### 基础属性 - API

| 参数     | 说明    | 类型     | 默认值    |
| ------- | -------- | -------- | -------- |
| hasSearchJump     | 是否点击搜索框直接跳转    | boolean   | false  |
| isChangeDispatch     | 是否搜索框值改变触发自定义事件    | boolean   | false  |
| duration     | input事件触发，节流时间间隔    | number   | 2000  |
| config     | 搜索栏配置项    | Object   | 参考vant组件Search - Props  |

### 方法 - Events

| 名称    |  说明   | 回调参数 |
| ------- | ------ | -------  |
| search | 确定搜索时触发    |   value: string (当前输入的值)   |
| input | 输入框内容变化时触发    |   value: string (当前输入的值)   |
| focus | 输入框获得焦点时触发    |   event: Event   |
| blur | 输入框失去焦点时触发    |   event: Event   |
| clear | 点击清除按钮后触发    |   event: Event   |
| cancel | 点击取消按钮时触发    |   -   |
| search-jump | hasSearchJump为true时，点击搜索框触发    | -   |

### 插槽 - Slots

| 名称    |  说明   |
| ------- | ------ |
| xxx | xxx   |

### 示例 - Example

```html

<hx-search
    ref="searchRef"
    v-bind="searchConfig"
    @search="searchHandler"
    @search-jump="searchJumpHandler"
/>

```


```js

searchConfig = {
    hasSearchJump: true,
    duration: 5000,
    config: {
        clearable: true,
        'show-action': true,
        placeholder: '请输入xxx',
    },
}

searchHandler(data: any) {
    console.log('search-data :>> ', data)
    // todo 更新列表数据
    this.$refs.listRef.init()
}
searchJumpHandler() {
    // todo 跳转搜索页
    this.$router.push('/search-result')
}


```
