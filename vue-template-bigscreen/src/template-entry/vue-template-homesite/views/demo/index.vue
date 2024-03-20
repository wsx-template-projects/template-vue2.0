<template>
    <div class="sg-page page-demo">
        {{ result }}
        <div>
            <el-button v-stat="{ name: '获取nodes' }" @click="getTree"
                >获取nodes</el-button
            >
        </div>
        <div class="block">
            <span class="demonstration">默认显示所有Tag</span>
            <el-cascader
                ref="tree"
                v-model="result"
                :options="options"
                :props="props"
            ></el-cascader>
        </div>
        <!-- <div class="block">
            <span class="demonstration">折叠展示Tag</span>
            <el-cascader
                :options="options"
                :props="props"
                collapse-tags
                clearable
            ></el-cascader>
        </div> -->
    </div>
</template>

<script>
export default {
    name: 'Demo',
    components: {},
    props: {},
    data() {
        return {
            result: [],
            props: { multiple: true, emitPath: false },
            options: [
                {
                    value: 1,
                    label: '东南',
                    children: [
                        {
                            value: 2,
                            label: '上海',
                            children: [
                                { value: 3, label: '普陀' },
                                { value: 4, label: '黄埔' },
                                { value: 5, label: '徐汇' },
                            ],
                        },
                        {
                            value: 7,
                            label: '江苏',
                            children: [
                                { value: 8, label: '南京' },
                                { value: 9, label: '苏州' },
                                { value: 10, label: '无锡' },
                            ],
                        },
                        {
                            value: 12,
                            label: '浙江',
                            children: [
                                { value: 13, label: '杭州' },
                                { value: 14, label: '宁波' },
                                { value: 15, label: '嘉兴' },
                            ],
                        },
                    ],
                },
                {
                    value: 17,
                    label: '西北',
                    children: [
                        {
                            value: 18,
                            label: '陕西',
                            children: [
                                { value: 19, label: '西安' },
                                { value: 20, label: '延安' },
                            ],
                        },
                        {
                            value: 21,
                            label: '新疆维吾尔族自治区',
                            children: [
                                { value: 22, label: '乌鲁木齐' },
                                { value: 23, label: '克拉玛依' },
                            ],
                        },
                    ],
                },
            ],
        }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
        getTree() {
            let nodes = this.$refs['tree'].getCheckedNodes()
            let result = [...nodes]
            let temp = []
            let removeNode = node => {
                let children = node.children
                let index = result.indexOf(node)
                if (index > -1) {
                    result.splice(index, 1)
                    if (children) {
                        for (let child of children) {
                            removeNode(child)
                        }
                    }
                }
            }
            for (let node of result) {
                if (node.hasChildren) {
                    removeNode(node)
                    temp.push(node)
                }
            }
            console.log(nodes, result)
            console.log(result.map(item => item.label))
            console.log(temp.map(item => item.label))
        },
    },
}
</script>

<style lang="less" scoped></style>
