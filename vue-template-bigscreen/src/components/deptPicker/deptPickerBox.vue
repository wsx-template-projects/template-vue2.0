<template>
  <div
    v-if="loading"
    class="x-deptpicker"
    :style="isNoLeft ? { width: 'auto' } : {}"
  >
    <div class="x-deptpicker-loading">
      <i class="el-icon-loading"></i> 正在载入
    </div>
  </div>
  <div
    v-else-if="areasTotal"
    class="x-deptpicker"
    :style="isNoLeft ? { width: 'auto' } : {}"
  >
    <div class="x-deptpicker-body">
      <div class="x-deptpicker-area" v-if="isShowLeft">
        <el-input
          class="x-textbox x-deptpicker-area-search"
          placeholder="搜索领域..."
          v-model="searchVal"
          clearable
        ></el-input>
        <ul class="x-deptpicker-area-container">
          <li
            v-for="(area, i) in areas"
            :key="i"
            :class="{
              'x-deptpicker-selected': area.value === selected,
            }"
            @click="select(area)"
            v-html="area.label"
          ></li>
          <li v-if="areas.length === 0">
            <div class="x-tip"><i class="x-icon">⚠</i> 找不到结果</div>
          </li>
        </ul>
      </div>
      <div class="x-deptpicker-dept">
        <DeptPickerTreeCheckbox
          v-if="multiple"
          :loading="treeLoading"
          :checkeds="checkeds"
          @update:checkeds="updateCheckeds"
          @change:checkeds="changeCheckeds"
          :curr-tree-data="rightTreeData"
          ref="deptPickerTreeCheckbox"
          :right-label-key="rightLabelKey"
          :right-value-key="rightValueKey"
          :right-children-key="rightChildrenKey"
          @update:rightTreeData="updateRightTreeData"
        ></DeptPickerTreeCheckbox>
        <DeptPickerTreeRadio
          v-else
          :loading="treeLoading"
          :checkeds="checkeds"
          @update:checkeds="updateCheckeds"
          @change:checkeds="changeCheckeds"
          :curr-tree-data="rightTreeData"
          ref="deptPickerTreeRadio"
          :right-label-key="rightLabelKey"
          :right-value-key="rightValueKey"
          :right-children-key="rightChildrenKey"
          @update:rightTreeData="updateRightTreeData"
        ></DeptPickerTreeRadio>
      </div>
    </div>
    <div class="x-deptpicker-footer">
      <el-button class="x-deptpicker-ok" type="primary" @click="closeBtn"
        >关闭</el-button
      >

      <el-button class="x-deptpicker-reset" @click="reset">重置</el-button>
    </div>
  </div>
  <div v-else class="x-deptpicker" :style="isNoLeft ? { width: 'auto' } : {}">
    无可用的领域
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator'
// import {
//     getTerritoryList,
//     Territory,
// } from '@/entry/ningbo/services/sysmanage/territory'
import { searchPinYin } from '@/scripts/utils/pinyin/search'
import DeptPickerTreeCheckbox, {
    CheckedInfo,
} from './deptPickerTreeCheckbox.vue'
import DeptPickerTreeRadio from './deptPickerTreeRadio.vue'
export type { CheckedInfo } from './deptPickerTreeCheckbox.vue'

/** 地区信息 */
export interface AreaInfo<T = any> {
    /** 选项的值 */
    value: string
    /** 选项的显示文案 */
    label: string
    /** 其它想带的数据 */
    data?: T
}

/** 本插件需要的事件名称集合 */
enum EventFnNames {
    /** 点击关闭按钮事件 */
    'CLOSE_BTN' = 'close-btn',
}

@Component({
    components: { DeptPickerTreeCheckbox, DeptPickerTreeRadio },
})
export default class DeptPickerBox extends Vue {
    /** 选中的选项 */
    @Prop({ type: Array, default: () => [] }) checkeds!: CheckedInfo[]
    /** 内部机构树的指针 */
    @Ref('deptPickerTreeCheckbox')
    deptPickerTreeCheckbox!: DeptPickerTreeCheckbox
    @Ref('deptPickerTreeRadio') deptPickerTreeRadio!: DeptPickerTreeRadio
    /** 是否多选，默认：true */
    @Prop({ type: Boolean, default: true })
    private multiple!: boolean
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
    /** 右边的树数据 */
    private rightTreeData:any = []
    /** 树是否载入的问题 */
    private treeLoading = false
    /** 载入中 */
    private loading = true
    /** 总领域数据 */
    public areasTotal: CheckedInfo[] = []
    /** 筛选后用于显示的领域数据 */
    public get areas(): CheckedInfo[] {
        if (this.searchVal) {
            const list = this.areasTotal
                .map((v) => {
                    const marker = searchPinYin([v.label], this.searchVal)[0]
                        ?.result
                    if (marker) {
                        return {
                            value: v.value,
                            label: marker,
                            data: v.data,
                        }
                    }
                    return false
                })
                .filter((v) => !!v) as CheckedInfo[]
            return list
        }
        return this.areasTotal
    }
    /** 选中的选项 */
    private selected: string = ''
    /** 当前选中的相关数据 */
    private selectedData: any = null

    /** 搜索值 */
    private searchVal = ''
    /** 监听搜索内容改变 */
    @Watch('searchVal') private searchValChange(val: string) {
        this.select(this.areas?.[0])
    }
    /** 重置数据 */
    public reset() {
        this.searchVal = ''
        this.searchValChange('')
        this.updateCheckeds([])
        this.changeCheckeds({ checked: [], parents: [], origins: [] })
        this.deptPickerTreeCheckbox?.reset()
        this.deptPickerTreeRadio?.reset()
    }

    /** 重置一下右边树的结构 */
    public updateRightTreeData(){
        this.rightTreeData = [...this.rightTreeData]
    }

    /**
     * 选中
     */
    public async select(areaInfo?: CheckedInfo) {

        if(this.isNoLeft) {
            this.treeLoading = true;
            this.rightTreeData = await this.getRightList();
            this.treeLoading = false;
        }

        if (areaInfo) {
            this.selected = areaInfo.value
            this.selectedData = areaInfo.data || null

            this.treeLoading = true;
            this.rightTreeData = await this.getRightList(areaInfo);
            this.treeLoading = false;
        }
    }

    /** 点击关闭按钮，通知父级 */
    private closeBtn() {
        this.$emit(EventFnNames.CLOSE_BTN)
    }

    /** 更新Checked数据 */
    private updateCheckeds(list: CheckedInfo[]) {
        this.$emit('update:checkeds', list)
    }
    /** 更新Checked数据 */
    private changeCheckeds(checkedInfo: any) {
        this.$emit('change:checkeds', checkedInfo)
    }

    public async mounted() {
        this.loading = false
    }

    public async myMonted() {
         let areaInfo;
        if(!this.isNoLeft) {
            this.areasTotal = await this.getLeftList()
            areaInfo = this.areasTotal.find(value => value.value === this.leftCheckedKeys)
        }
        this.select(areaInfo || this.areas?.[0])
    }
}
</script>
<style lang="less" scoped>
@border-color: #e0e0e0;

.x-deptpicker {
  width: 34.75rem;
  border: 1px solid @border-color;

  ul,
  li {
    margin: 0;
    padding: 0;
  }

  li {
    padding: 0.5rem 1rem;
    list-style: none;
    line-height: 1.5rem;
    cursor: pointer;
  }

  li:hover {
    background-color: #fafafa;
  }

  .x-textbox {
    display: block;
    box-sizing: border-box;
    margin: 0.5rem 1rem;
    width: 8rem;
    -webkit-appearance: searchfield !important;

    &::-webkit-search-cancel-button {
      display: block !important;
      -webkit-appearance: searchfield-cancel-button !important;
    }
  }
}

.x-deptpicker-body {
  display: flex;
}

.x-deptpicker-area {
  width: 10rem;
  border-right: 1px solid @border-color;
}

.x-deptpicker-dept {
  flex: 1;
  width: 20rem;

  .x-admintreeview {
    padding: 0 1rem;
    // width: 23rem;
  }

  .x-textbox {
    margin-left: 0;
    width: 22.75rem !important;
  }
}

.x-deptpicker-area-container,
.x-deptpicker .x-treecontrol {
  overflow: auto;
  height: 23rem;
}

.x-deptpicker-footer {
  padding: 1rem;
  border-top: 1px solid @border-color;
  text-align: center;
}

.x-deptpicker-selected,
.x-deptpicker-selected:hover {
  background-color: #e7f2fc !important;
}

.x-deptpicker-simple {
  width: 24.75rem;

  .x-deptpicker-area {
    display: none;
  }
}

.tree-nodes-box {
  .x-deptpicker {
    border: 0;
  }

  .x-button {
    line-height: 1.5rem;
  }
}

.x-deptpicker-loading {
  padding: 0.5rem;
  line-height: 2rem;
}

.x-deptpicker /deep/ mark {
  background: none;
  color: #ff6f00;
}
</style>
