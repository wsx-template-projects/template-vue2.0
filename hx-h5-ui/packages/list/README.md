# my-list

列表组件

## 基础属性

| 参数     | 说明    | 类型     | 默认值    |
| ------- | -------- | -------- | -------- |
| load     |  请求方法    | Function   | result为数据集;total为总数  |
| autoLoad     |  第一次是否自动请求    | Boolean       | true    |
| disableRefresh  | 禁用下拉刷新     | Boolean     | true    |
| diyAnimation  | 是否自定义loading加载动画     | Boolean   | false |
| config  | 列表配置项，参考 vant API - props属性   | Object   | -    |
| emptyConfig  | 空数据的配置项   | EmptyConfig     | -     |

### EmptyConfig属性

| 参数     | 说明    | 类型     | 默认值    |
| ------- | -------- | -------- | -------- |
| image     |  图片类型，可选值为 error network search，支持传入图片 URL | String   | default  |
| image-size  |  图片大小，默认单位为 px  | Number/String/Array    | true    |
| description  | 图片下方的描述文字     | Boolean   | true    |

### 方法

| 名称    |  说明   |
| ------- | ------ |
| init | 初始化请求数据    |

### 插槽

| 名称    |  说明   |
| ------- | ------ |
| default | 列表内容    |
| header | 列表头部插槽   |

### 示例

```html

<hx-list
    :disable-refresh="false"
    :diy-animation="true"
    :empty-config="{
        image: require('@/entry/zlb-hz-h5/assets/img/company.png'),
        description: '没有更多数据了！',
    }"
    :load="syncData"
>
    <template v-slot:header>
        <div>
            xxx
        </div>
    </template>
    <template v-slot:default="{ item }">
        <div class="item">
            xxx
        </div>
    </template>
</hx-list>

```
