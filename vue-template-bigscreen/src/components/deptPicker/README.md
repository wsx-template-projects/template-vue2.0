# DeptPicker 左右选择树框表单

此插件基础使用场景是机构树，左边搜索领域，右边显示相应领域的机构信息。支持拼音、中文的模糊查询。实际上支持任何左右结构的树

## 使用方法

### 基础使用

```vue
<template>
    <div class="sg-page test">
        <DeptPicker v-model="org"
            :placeholder="placeholder"
            :get-left-list="getLeftList"
            :get-right-list="getRightList"
            right-value-key="code"
            right-label-key="title"
            right-children-key="children"></DeptPicker>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import DeptPicker, { CheckedInfo } from '@/components/deptPicker/index.vue'

import {
    getTerritoryList,
    Territory,
} from '@/entry/ningbo/services/sysmanage/territory'
import {
    getTerrioryOrgDeptTree,
    TerritoryOrgDTO,
} from '@/entry/ningbo/apiServices/territory'

@Component({
    components: { DeptPicker },
})
export default class Test extends Vue {
    /** 机构的值 */
    private org: CheckedInfo[] = []

    private placeholder = '请选择'
    /** 左边数据获取的方法 */
    private async getLeftList() {
        const res: Territory[] = (await getTerritoryList({
            permissionFilter: true,
        })) as Territory[]
        return res.map((v) => ({
            value: v.code,
            label: v.name,
            data: v,
        }))
    }

    /**
     * 获取右边的树
     * @param data 左边选中的数据
     */
    private async getRightList(data: CheckedInfo) {
        const territoryId = (data.data as Territory).territoryId
        const res = await getTerrioryOrgDeptTree({
            territoryId: territoryId,
            hasSelf: true,
            deptType: '2',
            orgFilter: true,
        })
        return res as TerritoryOrgDTO[]
    }
}
</script>
```

### 回显方式

```vue
<template>
    <div class="sg-page test">
        <DeptPicker v-model="org"></DeptPicker>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import DeptPicker, { CheckedInfo } from '@/components/deptPicker/index.vue'

@Component({
    components: { DeptPicker },
})
export default class Test extends Vue {
    /** 机构的值 */
    private org: CheckedInfo[] = []

    mounted() {
        this.org = [
            { value: '330800000000_913308001477326000', label: '衢州市烟草局' },
            { value: '330100000000_91330100143058496J', label: '杭州市烟草局' },
        ]
    }
}
</script>
```

### 单选方式

```vue
<template>
    <div class="sg-page test">
        <DeptPicker v-model="org" :multiple="false"></DeptPicker>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import DeptPicker, { CheckedInfo } from '@/components/deptPicker/index.vue'

@Component({
    components: { DeptPicker },
})
export default class Test extends Vue {
    /** 机构的值 */
    private org: CheckedInfo[] = []
}
</script>
```

### 禁用方式

```vue
<template>
    <div class="sg-page test">
        <DeptPicker v-model="org" :disabled="true"></DeptPicker>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import DeptPicker, { CheckedInfo } from '@/components/deptPicker/index.vue'

@Component({
    components: { DeptPicker },
})
export default class Test extends Vue {
    /** 机构的值 */
    private org: CheckedInfo[] = []
}
</script>
```

## Attributes

| 参数               | 说明                                | 类型                         | 可选值 | 默认值     |
| ------------------ | ----------------------------------- | ---------------------------- | ------ | ---------- |
| v-model            | (必填)此表单的值                    | CheckedInfo[]                | -      | []         |
| multiple           | 树是单选还是多选，默认 true 多选    | boolean                      | -      | true       |
| disabled           | 是否禁用表单，即只展示不可选状态    | boolean                      | -      | false      |
| placeholder        | 输入框的提示文案                    | string                       | -      | '请选择'   |
| get-left-list      | 左边数据获取的方法(ajax 请求)       | () => Promise<CheckedInfo[]> | -      | -          |
| get-right-list     | 右边数据（树）获取的方法(ajax 请求) | (data: CheckedInfo) => Promise<any>           | -      | -          |
| right-value-key    | 右边数据树的唯一 id 的 key          | string                       | -      | 'value'    |
| right-label-key    | 右边数据树的显示文案的 key          | string                       | -      | 'label'    |
| right-children-key | 右边数据树的子节点属性的 key        | string                       | -      | 'children' |

## 类型

### CheckedInfo

v-model 对应的数据详情

| 参数  | 说明               | 类型   | 必填 | 备注                                                         |
| ----- | ------------------ | ------ | ---- | ------------------------------------------------------------ |
| label | 需要展示的文案     | string | 是   | -                                                            |
| value | 对应的值           | string | 是   | -                                                            |
| data  | 其它的可自定义数据 | any    | 否   | 其实是接口中携带的机构详细数据，回显的时候没有此字段可以不填 |
