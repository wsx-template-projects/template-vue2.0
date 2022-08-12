<!--
    demo-other
-->
<template>
    <div class="sg-page">
        <div class="content">
            <div class="" v-for="(group, i) in total" :key="i">
                <div
                    class="item"
                    :class="[
                        item.num <= 20 && colors[0],
                        item.num > 20 && item.num < 40 && colors[1],
                        item.num >= 40 && colors[2],
                        `item_${i}`,
                    ]"
                    v-for="(item, j) in group"
                    :data-index="`${i}-${j}`"
                    :key="j"
                    @click="onItem(item)"
                >
                    {{ item.x || item.y || '' }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    components: {},
    data() {
        return {
            colors: ['red', 'orange', 'blue'],
            x: [],
            y: [],
            total: [],
        }
    },
    computed: {},
    created() {},
    mounted() {
        for (let i = 0; i < Math.ceil(Math.random() * 100); i++) {
            this.x.push({ x: i + 1, y: 0, num: 0, isAxis: true })
            this.x.unshift({ x: 0, y: 0, num: 0, ixAxis: true })
        }

        for (let i = 0; i < Math.ceil(Math.random() * 40); i++) {
            this.y.push({ x: 0, y: i, num: 0, isAxis: true })
        }
        console.log('x :>> ', this.x)
        console.log('y :>> ', this.y)
        this.total = this.getItem(this.x, this.y)
    },
    methods: {
        /** 色块点击事件 */
        onItem(item) {
            console.log('item :>> ', item)
        },
        /** 获取item数 */
        getItem(x, y) {
            console.log('x :>> ', x)
            console.log('y :>> ', y)
            const result = []
            for (let i = 0; i < x.length; i++) {
                // console.log('x[i] :>> ', x[i])
                const mid = []
                for (let j = 0; j < y.length; j++) {
                    // console.log('y[j] :>> ', y[j])
                    const temp = {
                        x: i,
                        y: j,
                        axis: `${i}-${j}`,
                        num: Math.ceil(Math.random() * 100),
                    }
                    mid.push(temp)
                }
                result.push(mid)
            }
            // const len = x.length * y.length
            // for (let i = 0; i < len; i++) {
            //     const temp = {
            //         x: 0,
            //         y: 0,
            //         num: Math.ceil(Math.random() * 100),
            //     }
            //     // console.log('temp :>> ', temp)
            //     result.push(temp)
            // }
            console.log('result :>> ', result)
            return result
        },
    },
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
.content {
    display: flex;
    flex-wrap: wrap;
    border: 1px solid #ccc;
    padding: 20px;
}
.item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 0 6px 6px 0;
    cursor: pointer;
}
// .red {
//     background: red;
// }
// .orange {
//     background: orange;
// }
// .blue {
//     background: blue;
// }
</style>
