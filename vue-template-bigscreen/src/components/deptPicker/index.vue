<template>
  <div class="tree-input" @click="stop" @mousedown="stop">
    <div
      ref="treeInputRef"
      class="tree-input-top"
      @click="showOptsClick"
      :class="{ selection: showContent }"
    >
      <p v-if="Xtabs && Xtabs.length === 0">{{ placeholder }}</p>
      <ul v-if="Xtabs && Xtabs.length">
        <li v-for="(item, i) of Xtabs" :key="i">
          {{ item.label }}
          <i v-if="!disabled" class="el-icon-close" @click="closeTab(item)"></i>
        </li>
      </ul>
      <div class="more">
        <i class="el-icon-arrow-down" :class="{ anticon: showContent }"></i>
      </div>
    </div>
    <div class="tree-nodes-box" ref="treeNodeRef">
      <div v-show="showContent" class="tree-nodes-content">
        <DeptPickerBox
          :is-show-left="isShowLeft"
          :is-no-left="isNoLeft"
          :left-checked-keys="leftCheckedKeys"
          :checkeds="Xtabs"
          @update:checkeds="XtabsChange"
          @change:checkeds="XtabsCheckedsChange"
          @close-btn="closeBox"
          :multiple="multiple"
          :get-left-list="getLeftList"
          :get-right-list="getRightList"
          :right-label-key="rightLabelKey"
          :right-value-key="rightValueKey"
          :right-children-key="rightChildrenKey"
          ref="deptPickerBox"
        ></DeptPickerBox>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import DeptPickerBox, { CheckedInfo } from './deptPickerBox.vue'
export type { CheckedInfo } from './deptPickerBox.vue'

@Component({
    components: {
        DeptPickerBox,
    },
    name: 'SgDeptPicker',
})
export default class SgDeptPicker extends Vue {
    /** 组件的值 */
    @Prop({ type: Array, default: () => [] })
    public value!: CheckedInfo[]
    @Watch('value')
    private valueChange(val: CheckedInfo[], old: CheckedInfo[]) {
        if (val === this.Xtabs) {
            return
        }

        this.Xtabs = val
    }
    /** 是否禁用，默认：false */
    @Prop({ type: Boolean, default: false })
    private disabled!: boolean
    /** 是否多选，默认：true */
    @Prop({ type: Boolean, default: true })
    private multiple!: boolean
    /** 模拟的输入框的提示 */
    @Prop({ type: String, default: '请选择' })
    private placeholder!: string
    /** 左边数据获取的方法 */
    @Prop({ type: Function, default: () => [] })
    private getLeftList!: () => Promise<CheckedInfo[]>
    /**
     * 右边数据获取的方法
     * @param data 左边当前选中的选项
     */
    @Prop({ type: Function, default: () => [] })
    private getRightList!: (data?: CheckedInfo) => Promise<any>
    /** 右边树的数据中用于值的key关键词 */
    @Prop({ type: String, default: 'value' })
    private rightValueKey!: string
    /** 右边树的数据中用于显示的key关键词 */
    @Prop({ type: String, default: 'label' })
    private rightLabelKey!: string
    /** 右边树的数据中用于指定上下级的key关键词 */
    @Prop({ type: String, default: 'children' })
    private rightChildrenKey!: string
    /** 左侧默认选中的领域 */
    @Prop({ type: String, default: '' })
    private leftCheckedKeys!: string
    /** 是否有左侧 */
    @Prop({ type: Boolean, default: false })
    private isNoLeft!: boolean
    /** 是否显示左侧领域栏 */
    @Prop({ type: Boolean, default: true })
    private isShowLeft!: boolean
    /** 选中的tab的数据详情集合 */
    private Xtabs: CheckedInfo[] = []
    /** 是否显示选择box */
    private showContent = false
    /** 验证是否需要关闭 */
    private click = false
    /** 自身点击的 */
    private selfClick = false

    /** 第一次打开树 */
    private openFlag = true

    /** 切换显示隐藏下拉的选项 */
    private async showOptsClick() {
        // 禁用时，不触发任何操作
        if (this.disabled) {
            return
        }

        if(this.openFlag) {
            this.openFlag = false
            await (this.$refs.deptPickerBox as any).myMonted()
        }

        this.selfClick = true
        this.showContent = !this.showContent
    }

    /** 关闭下拉选项 */
    private closeBox() {
        if(this.selfClick){
            this.selfClick = false;
            return
        }
        this.click = true
        this.showContent = false
    }
    /** 阻止关闭弹窗 */
    private stop(e: Event) {
        // e.preventDefault()
        // e.stopPropagation()
        this.selfClick = true;
    }
    /**
     * 移除单个选项
     * @param item 机构选项
     */
    private closeTab(item: CheckedInfo) {
        const list = this.Xtabs.filter((v) => v !== item)
        this.XtabsChange(list)
         this.$emit('input:change', item)
        this.selfClick = true

    }
    /** 选项改变时 */
    private XtabsChange(list: CheckedInfo[]) {
        this.Xtabs = list
        this.$emit('input', list)
    }
    /** 选项改变时 */
    private XtabsCheckedsChange(obj: any) {
        const { origins } = obj || {}
        this.Xtabs = origins
        this.$emit('input:change', obj)
    }

    /** 验证是否点击 */
    private checkClick() {
        if (!this.click) {
            this.closeBox()
        }

        this.click = false
    }

    created(): void {}
    mounted() {
        // 第一次时，就进行赋值
        this.Xtabs = this.value
        document.addEventListener('click', this.closeBox, false)
        document.addEventListener('mousedown', this.checkClick, false)
        // 动态计算下拉内容左右方向
        const iptRef = this.$refs.treeInputRef as any
        const treeRef = this.$refs.treeNodeRef as any
        let rect =  iptRef.getBoundingClientRect()
        if(window.innerWidth-rect.left-rect.width<556-rect.width) {
            treeRef.style.right=0
        }
    }
    beforeDestroy() {
        document.removeEventListener('click', this.closeBox, false)
        document.removeEventListener('mousedown', this.checkClick, false)
    }
}
</script>
<style lang="less" scoped>
.tree-input {
  position: relative;
  // padding-top: 3px;
  // min-width: 200px;
  width: 100%;
  cursor: pointer;
  .tree-input-top {
    position: relative;
    overflow: hidden;
    height: 34px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    background: #fff;

    &:not(.app-disabled):hover {
      outline: 0;
      border-color: #40a9ff;
    }

    &.selection {
      outline: 0;
      border-color: #40a9ff;
      border-right-width: 1px !important;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);

      .more {
        .anticon {
          transform: rotateZ(180deg);
        }
      }
    }

    &.app-disabled {
      background: #f5f5f5;

      .more {
        background: #f5f5f5;
      }
    }

    > p {
      margin: 0;
      padding-left: 10px;
      height: 30px;
      color: #999;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      line-height: 30px;
    }

    > ul {
      display: inline-block;
      overflow: hidden;
      margin: 0;
      padding: 4px 10px;
      width: 1000%;
      height: 34px;
      cursor: pointer;

      > li {
        display: flex;
        float: left;
        align-items: center;
        box-sizing: border-box;
        margin-right: 4px;
        padding: 0 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        line-height: 22px;
        background-color: #f4f4f5;
        border-color: #e9e9eb;
        color: #909399;
        font-size: 12px;
        span {
          display: inline-block;
          overflow: hidden;
          flex: 1;
          margin-right: 5px;
          max-width: 180px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .el-icon-close {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #c0c4cc;
          margin-left: 5px;
        }
      }
    }

    .more {
      position: absolute;
      // top: -4px;
      right: 0;
      bottom: 0;
      width: 20px;
      height: 30px;
      background: #fff;
      line-height: 30px;

      .anticon {
        transition: 0.3s ease;
        transform-origin: 50% 50%;
      }
    }
  }

  .tree-nodes-box {
    position: absolute;
    top: 37px;
    z-index: 10;
    display: block;
    border-radius: 4px;

    .tree-nodes-content {
      outline: none;
      border-radius: 4px;
      background-color: #fff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }
  }
}
</style>
