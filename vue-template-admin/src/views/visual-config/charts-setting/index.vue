<!--
    图表配置 - page
-->
<template>
    <div class="ws-page">
        <h3>charts-setting</h3>
        <div class="content">
            <div class="group-tag content-left">
                <div class="left-title">图表标题</div>
                <draggable v-model="tagList" class="drag-wrapper" item-key="id">
                    <div v-for="item in tagList" :key="item.id" class="item">
                        {{ item.label }}
                    </div>
                </draggable>
            </div>

            <div class="group-main content-center">
                <draggable
                    v-model="wrapList"
                    class="drag-wrapper"
                    item-key="id"
                >
                    <div
                        v-for="item in wrapList"
                        :key="item.id"
                        class="border-1px"
                        style="padding: 10px 20px; margin: 0 10px 10px 0"
                    >
                        {{ item }}
                    </div>
                </draggable>
            </div>

            <div class="group-setting content-right">
                <div class="right-title">{{ configData.title }}</div>
                <div class="config-wrapper">
                    <div
                        v-for="(item, index) in configData.list"
                        :key="index"
                        class="item"
                    >
                        <svg-icon :icon-class="item.icon" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
    name: 'VisualConfigChartsSetting',
    components: { draggable },
    data() {
        return {
            tagList: [
                {
                    id: '1',
                    itemId: '1',
                    label: '折线图',
                },
                {
                    id: '2',
                    itemId: '2',
                    label: '柱状图',
                },
                {
                    id: '3',
                    itemId: '3',
                    label: '饼图',
                },
            ],
            wrapList: [],
            configData: {
                title: '图表类型：',
                list: [
                    {
                        label: '折线图',
                        icon: 'svg-chart-line',
                        disableIcon: 'svg-chart-line-disabled',
                    },
                    {
                        label: '柱状图',
                        icon: 'svg-chart-bar',
                        disableIcon: 'svg-chart-bar-disabled',
                    },
                    {
                        label: '饼图',
                        icon: 'svg-chart-pie',
                        disableIcon: 'svg-chart-pie-disabled',
                    },
                ],
            },
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

.content {
    flex: 1;
    display: flex;
    height: 100%;

    .content-left {
        display: flex;
        flex-direction: column;
        width: 200px;
        border: 1px solid rgb(238, 236, 236);
        border-bottom: none;
        // padding-left: 10px;

        .left-title {
            font-size: 16px;
            line-height: 36px;
            border-bottom: 1px solid #ccc;
            padding-left: 10px;
        }

        .drag-wrapper {
            display: flex;
            flex-wrap: wrap;
            padding: 10px 0 0 10px;

            .item {
                font-size: 14px;
                margin-right: 10px;
                margin-bottom: 10px;

                &:nth-child(2n) {
                    // margin-right: none;
                }
            }
        }

        .item {
            border: 1px solid #409eff;
            border-radius: 4px;
            padding: 6px 10px;
            cursor: pointer;
        }
    }

    .content-center {
        flex: 1;
        border: 1px solid #409eff;
        border-bottom: none;
    }

    .content-right {
        width: 240px;
        border: 1px solid rgb(238, 236, 236);
        border-bottom: none;

        .right-title {
            line-height: 36px;
            border-bottom: 1px solid #ccc;
            padding: 0 10px;
        }

        .config-wrapper {
            display: flex;
            flex-wrap: wrap;
            padding: 10px 10px 0;

            .item {
                padding: 10px;
                margin: 0 10px 10px 0;

                &:hover {
                    background: #ccc;
                }

                .svg-icon {
                    width: 20px;
                    height: 20px;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
