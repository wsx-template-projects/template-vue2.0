<!--
    demo-draggable - 页面
-->
<template>
    <div class="ws-page">
        <h3>demo-draggable</h3>
        <section class="page-content">
            <draggable v-model="list" class="drag-wrapper">
                <span v-for="item in list" :key="item.id">{{
                    item.label
                }}</span>
            </draggable>
        </section>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
    name: 'DemoDraggable',
    components: { draggable },
    data() {
        return {
            list: [
                {
                    id: 1,
                    label: '1',
                },
                {
                    id: 2,
                    label: '2',
                },
                {
                    id: 3,
                    label: '3',
                },
                {
                    id: 4,
                    label: '4',
                },
                {
                    id: 5,
                    label: '5',
                },
                {
                    id: 6,
                    label: '6',
                },
            ],
        }
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {},
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类

.border-1px {
    border: 1px solid #ccc;
}
</style>
