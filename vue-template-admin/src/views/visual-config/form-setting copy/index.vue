<!--
   表单配置 - page
-->
<template>
    <div class="container">
        <div class="left-board">
            <h1>form-setting</h1>
            <el-scrollbar class="left-scrollbar">
                <div class="components-list">
                    <div
                        v-for="(item, listIndex) in leftComponents"
                        :key="listIndex"
                    >
                        <div class="components-title">
                            <svg-icon icon-class="component" />
                            {{ item.title }}
                        </div>
                        <draggable
                            class="components-draggable"
                            :list="item.list"
                            :group="{
                                name: 'componentsGroup',
                                pull: 'clone',
                                put: false,
                            }"
                            :clone="cloneComponent"
                            draggable=".components-item"
                            :sort="false"
                            @end="onEnd"
                        >
                            <div
                                v-for="(element, index) in item.list"
                                :key="index"
                                class="components-item"
                                @click="addComponent(element)"
                            >
                                <div class="components-body">
                                    <svg-icon
                                        :icon-class="element.__config__.tagIcon"
                                    />
                                    {{ element.__config__.label }}
                                </div>
                            </div>
                        </draggable>
                    </div>
                </div>
            </el-scrollbar>
        </div>
        <!-- 中间视图 - 区域 -->
        <div class="center-board">
            <!-- <div class="action-bar">
                <el-button icon="el-icon-plus" type="text" @click="handleForm">
                    保存
                </el-button>
                <el-button icon="el-icon-video-play" type="text" @click="run">
                    运行
                </el-button>
                <el-button icon="el-icon-view" type="text" @click="showJson">
                    查看json
                </el-button>
                <el-button
                    icon="el-icon-download"
                    type="text"
                    @click="download"
                >
                    导出vue文件
                </el-button>
                <el-button
                    class="copy-btn-main"
                    icon="el-icon-document-copy"
                    type="text"
                    @click="copy"
                >
                    复制代码
                </el-button>
                <el-button
                    class="delete-btn"
                    icon="el-icon-delete"
                    type="text"
                    @click="empty"
                >
                    清空
                </el-button>
            </div> -->
            <el-scrollbar class="center-scrollbar">
                <el-row class="center-board-row" :gutter="formConf.gutter">
                    <el-form
                        :size="formConf.size"
                        :label-position="formConf.labelPosition"
                        :disabled="formConf.disabled"
                        :label-width="formConf.labelWidth + 'px'"
                    >
                        <draggable
                            class="drawing-board"
                            :list="drawingList"
                            :animation="340"
                            group="componentsGroup"
                        >
                            <draggable-item
                                v-for="(item, index) in drawingList"
                                :key="item.renderKey"
                                :drawing-list="drawingList"
                                :current-item="item"
                                :index="index"
                                :active-id="activeId"
                                :form-conf="formConf"
                                @activeItem="activeFormItem"
                                @copyItem="drawingItemCopy"
                                @deleteItem="drawingItemDelete"
                            />
                        </draggable>
                        <div v-show="!drawingList.length" class="empty-info">
                            从左侧拖入或点选组件进行表单设计
                        </div>
                    </el-form>
                </el-row>
            </el-scrollbar>
        </div>
    </div>
</template>

<script>
import {
    inputComponents,
    selectComponents,
    layoutComponents,
    formConf,
} from '../scripts/config'
import {
    exportDefault,
    beautifierConf,
    isNumberStr,
    titleCase,
    deepClone,
} from '../scripts/utils'
import drawingDefault from '../scripts/drawingDefault'
import {
    getDrawingList,
    saveDrawingList,
    getIdGlobal,
    saveIdGlobal,
    getFormConf,
} from '@/utils/db'
import draggable from 'vuedraggable'
import DraggableItem from './components/draggable-item.vue'

let tempActiveData
const idGlobal = getIdGlobal()

export default {
    name: 'VisualConfigFormSetting',
    components: { draggable, DraggableItem },
    data() {
        return {
            formConf,
            leftComponents: [
                {
                    title: '输入型组件',
                    list: inputComponents,
                },
                {
                    title: '选择型组件',
                    list: selectComponents,
                },
                {
                    title: '布局型组件',
                    list: layoutComponents,
                },
            ],

            // 中间视图相关数据
            drawingList: drawingDefault,
            activeId: drawingDefault[0].formId,
            activeData: drawingDefault[0],
        }
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
        /**
         * 选中的表单项
         */
        activeFormItem(currentItem) {
            this.activeData = currentItem
            this.activeId = currentItem.__config__.formId
        },
        /**
         * 复制表单项
         */
        drawingItemCopy(item, list) {
            let clone = deepClone(item)
            clone = this.createIdAndKey(clone)
            list.push(clone)
            this.activeFormItem(clone)
        },
        /**
         * 删除表单项
         */
        drawingItemDelete(index, list) {
            list.splice(index, 1)
            this.$nextTick(() => {
                const len = this.drawingList.length
                if (len) {
                    this.activeFormItem(this.drawingList[len - 1])
                }
            })
        },

        /**
         *
         */
        onEnd(obj) {
            if (obj.from !== obj.to) {
                // this.fetchData(tempActiveData)
                // this.activeData = tempActiveData
                // this.activeId = this.idGlobal
            }
        },
        /**
         * 添加表单组件
         */
        addComponent(item) {
            const clone = this.cloneComponent(item)
            this.fetchData(clone)
            this.drawingList.push(clone)
            this.activeFormItem(clone)
        },
        /**
         *
         */
        fetchData(component) {
            console.log('component :>> ', component)
            const { dataType, method, url } = component.__config__
            if (dataType === 'dynamic' && method && url) {
                // this.setLoading(component, true)
                // this.$axios({
                //     method,
                //     url,
                // }).then((resp) => {
                //     this.setLoading(component, false)
                //     this.setRespData(component, resp.data)
                // })
            }
        },
        activeFormItem(currentItem) {
            console.log('currentItem :>> ', currentItem)
            // this.activeData = currentItem
            // this.activeId = currentItem.__config__.formId
        },
        /**
         *
         */
        cloneComponent(origin) {
            const clone = deepClone(origin)
            const config = clone.__config__
            config.span = this.formConf.span // 生成代码时，会根据span做精简判断
            this.createIdAndKey(clone)
            clone.placeholder !== undefined &&
                (clone.placeholder += config.label)
            tempActiveData = clone
            return tempActiveData
        },
        /**
         * 创建 id 和 key
         */
        createIdAndKey(item) {
            const config = item.__config__
            config.formId = ++this.idGlobal
            config.renderKey = `${config.formId}${+new Date()}` // 改变renderKey后可以实现强制更新组件
            if (config.layout === 'colFormItem') {
                item.__vModel__ = `field${this.idGlobal}`
            } else if (config.layout === 'rowFormItem') {
                config.componentName = `row${this.idGlobal}`
                !Array.isArray(config.children) && (config.children = [])
                delete config.label // rowFormItem无需配置label属性
            }
            if (Array.isArray(config.children)) {
                config.children = config.children.map((childItem) =>
                    this.createIdAndKey(childItem),
                )
            }
            return item
        },
    },
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
$selectedColor: #f6f7ff;
$lighterBlue: #409eff;

.container {
    position: relative;
    width: 100%;
    height: 100%;
}

.components-list {
    padding: 8px;
    box-sizing: border-box;
    height: 100%;
    .components-item {
        display: inline-block;
        width: 48%;
        margin: 1%;
        transition: transform 0ms !important;
    }
}
.components-draggable {
    padding-bottom: 20px;
}
.components-title {
    font-size: 14px;
    color: #222;
    margin: 6px 2px;
    .svg-icon {
        color: #666;
        font-size: 18px;
    }
}

.components-body {
    padding: 8px 10px;
    background: $selectedColor;
    font-size: 12px;
    cursor: move;
    border: 1px dashed $selectedColor;
    border-radius: 3px;
    .svg-icon {
        color: #777;
        font-size: 15px;
    }
    &:hover {
        border: 1px dashed #787be8;
        color: #787be8;
        .svg-icon {
            color: #787be8;
        }
    }
}

.left-board {
    width: 260px;
    position: absolute;
    left: 0;
    top: 0;
    height: 100vh;
}
.left-scrollbar {
    height: calc(100vh - 42px);
    overflow: hidden;
}
.center-scrollbar {
    height: calc(100vh - 42px);
    overflow: hidden;
    border-left: 1px solid #f1e8e8;
    border-right: 1px solid #f1e8e8;
    box-sizing: border-box;
}
.center-board {
    height: 100vh;
    width: auto;
    margin: 0 350px 0 260px;
    box-sizing: border-box;
}
.empty-info {
    position: absolute;
    top: 46%;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 18px;
    color: #ccb1ea;
    letter-spacing: 4px;
}
.action-bar {
    position: relative;
    height: 42px;
    text-align: right;
    padding: 0 15px;
    box-sizing: border-box;
    border: 1px solid #f1e8e8;
    border-top: none;
    border-left: none;
    .delete-btn {
        color: #f56c6c;
    }
}
.logo-wrapper {
    position: relative;
    height: 42px;
    background: #fff;
    border-bottom: 1px solid #f1e8e8;
    box-sizing: border-box;
}
.logo {
    position: absolute;
    left: 12px;
    top: 6px;
    line-height: 30px;
    color: #00afff;
    font-weight: 600;
    font-size: 17px;
    white-space: nowrap;
    > img {
        width: 30px;
        height: 30px;
        vertical-align: top;
    }
    .github {
        display: inline-block;
        vertical-align: sub;
        margin-left: 15px;
        > img {
            height: 22px;
        }
    }
}

.center-board-row {
    padding: 12px 12px 15px 12px;
    box-sizing: border-box;
    & > .el-form {
        // 69 = 12+15+42
        height: calc(100vh - 69px);
    }
}
.drawing-board {
    height: 100%;
    position: relative;
    .components-body {
        padding: 0;
        margin: 0;
        font-size: 0;
    }
    .sortable-ghost {
        position: relative;
        display: block;
        overflow: hidden;
        &::before {
            content: ' ';
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            height: 3px;
            background: rgb(89, 89, 223);
            z-index: 2;
        }
    }
    .components-item.sortable-ghost {
        width: 100%;
        height: 60px;
        background-color: $selectedColor;
    }
    .active-from-item {
        & > .el-form-item {
            background: $selectedColor;
            border-radius: 6px;
        }
        & > .drawing-item-copy,
        & > .drawing-item-delete {
            display: initial;
        }
        & > .component-name {
            color: $lighterBlue;
        }
    }
    .el-form-item {
        margin-bottom: 15px;
    }
}
.drawing-item {
    position: relative;
    cursor: move;
    &.unfocus-bordered:not(.active-from-item) > div:first-child {
        border: 1px dashed #ccc;
    }
    .el-form-item {
        padding: 12px 10px;
    }
}
.drawing-row-item {
    position: relative;
    cursor: move;
    box-sizing: border-box;
    border: 1px dashed #ccc;
    border-radius: 3px;
    padding: 0 2px;
    margin-bottom: 15px;
    .drawing-row-item {
        margin-bottom: 2px;
    }
    .el-col {
        margin-top: 22px;
    }
    .el-form-item {
        margin-bottom: 0;
    }
    .drag-wrapper {
        min-height: 80px;
    }
    &.active-from-item {
        border: 1px dashed $lighterBlue;
    }
    .component-name {
        position: absolute;
        top: 0;
        left: 0;
        font-size: 12px;
        color: #bbb;
        display: inline-block;
        padding: 0 6px;
    }
}
.drawing-item,
.drawing-row-item {
    &:hover {
        background: $selectedColor; // 修改过

        & > .el-form-item {
            background: $selectedColor;
            border-radius: 6px;
        }
        & > .drawing-item-copy,
        & > .drawing-item-delete {
            display: initial;
        }
    }
    & > .drawing-item-copy,
    & > .drawing-item-delete {
        display: none;
        position: absolute;
        top: -10px;
        width: 22px;
        height: 22px;
        line-height: 22px;
        text-align: center;
        border-radius: 50%;
        font-size: 12px;
        border: 1px solid;
        cursor: pointer;
        z-index: 1;
    }
    & > .drawing-item-copy {
        right: 56px;
        border-color: $lighterBlue;
        color: $lighterBlue;
        background: #fff;
        &:hover {
            background: $lighterBlue;
            color: #fff;
        }
    }
    & > .drawing-item-delete {
        right: 24px;
        border-color: #f56c6c;
        color: #f56c6c;
        background: #fff;
        &:hover {
            background: #f56c6c;
            color: #fff;
        }
    }
}
</style>
