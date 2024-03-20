<template>
  <div class="x-admintreeview">
    <el-input
      clearable
      class="x-admintreeview-search"
      placeholder="请输入名称搜索"
      v-model="searchVal"
    ></el-input>
    <div class="x-treecontrol">
      <div class="x-deptpicker-loading" v-if="loading">
        <i class="el-icon-loading"></i> 正在载入
      </div>
      <el-tree
        v-else
        class="filter-tree"
        show-checkbox
        :data="currTreeData"
        :props="defaultProps"
        :default-expanded-keys="defaultExpandedKeys"
        :default-checked-keys="defaultCheckedKeys"
        :filter-node-method="filterNode"
        @check-change="checkChange"
        :node-key="rightValueKey"
        ref="tree"
      >
        <!-- eslint-disable-next-line -->
        <div class="custom-tree-node" slot-scope="{ node, data }">
          <span v-if="searchVal" v-html="data.marker || node.label"></span>
          <span v-else>{{ node.label }}</span>
        </div>
      </el-tree>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Ref } from "vue-property-decorator";
// import {
//     getTerrioryOrgDeptTree,
//     TerritoryOrgDTO,
// } from '@/entry/ningbo/apiServices/territory'
import { searchPinYin } from "@/scripts/utils/pinyin/search";
import { Tree } from "element-ui";
import { TreeNode } from "element-ui/types/tree";

/** 选中的tab的数据详情 */
export interface CheckedInfo {
  /** 需要展示的文案 */
  label: string;
  /** 对应的值 */
  value: string;
  /** 其它的数据 */
  data?: any;
}

@Component({})
export default class DeptPickerTreeCheckbox extends Vue {
  /** 树组件的ref指引 */
  @Ref("tree") tree!: Tree<string, any>;
  /** 右边树的数据中用于值的key关键词 */
  @Prop({ type: String, default: "value" })
  private rightValueKey!: string;
  /** 右边树的数据中用于显示的key关键词 */
  @Prop({ type: String, default: "label" })
  private rightLabelKey!: string;
  /** 右边树的数据中用于指定上下级的key关键词 */
  @Prop({ type: String, default: "children" })
  private rightChildrenKey!: string;

  /** 是否显示加载中 */
  @Prop({ type: Boolean, default: false })
  private loading!: boolean;
  /** 当前树数据集合 */
  @Prop({ type: Array, default: () => [] })
  private currTreeData!: any[];

  /** 选中的选项 */
  @Prop({ type: Array, default: () => [] }) checkeds!: CheckedInfo[];
  /** 当checkeds改变时，改变选中项 */
  @Watch("checkeds") checkedsChange(val: CheckedInfo[], old: CheckedInfo[]) {
    if (val.length !== 0) {
      this.tree.setCheckedKeys(val.map((v) => v.value));
    } else {
      this.tree.setCheckedKeys([]);
    }
  }

  /** 搜索值 */
  private searchVal = "";
  @Watch("searchVal") filterText(val: string) {
    this.tree.filter(val);
    /** 如果是空,重置树 */
    if (!val) {
      this.$emit("update:rightTreeData");
    }
  }

  /** 数据指定 */
  private get defaultProps() {
    return {
      children: this.rightChildrenKey,
      label: this.rightLabelKey,
    };
  }
  /** 定时器句柄 */
  private t?: number;
  /** 默认展开 */
  private get defaultExpandedKeys() {
    const key = this.currTreeData?.[0]?.[this.rightValueKey];
    return key ? [key] : [];
  }
  /** 默认选中 */
  private get defaultCheckedKeys() {
    return this.checkeds.map((v) => v.value);
  }

  /**
   * 搜索的时候，过滤显示的列表
   * @param value 搜索值
   * @param data 树的相应数据
   * @param node 树组件的相应节点
   */
  private filterNode(value: any, data: any, node: any) {
    delete data.marker;
    /** 如果没有搜索，则全显示 */
    if (!value) {
      return true;
    }
    // 检测parent中是否已经有被标记的
    let parent = node.parent;
    while (parent) {
      if (parent.data.marker) {
        return true;
      }
      parent = parent.parent;
    }
    /** 搜索匹配到的结果 */
    const searched = searchPinYin([data[this.rightLabelKey]], value)[0]?.result;
    if (searched) {
      data.marker = searched;
      // 为了收起子目录，不得不出此下策
      setTimeout(() => {
        node.expanded = false;
      });

      return true;
    }

    return false;
  }
  /** 树被点击时触发的事件 */
  private checkChange() {
    clearTimeout(this.t);
    this.t = setTimeout(() => {
      this.updateCheck();
    }, 50);
  }

  /** 更新checked的数据 */
  private updateCheck() {
    /** 选中的数据树 */
    const nodes = this.tree.getCheckedNodes(true, false);
    /** 选中的数据最小级别的key */
    const keys = this.tree.getCheckedKeys(true);
    /** 获取所有半选状态的节点 */
    const halfCheckedNodes = this.tree.getHalfCheckedNodes();
    const halfCheckedKeys = halfCheckedNodes
      .filter((value) => value.dataType === "1")
      .map((value) => value.code);
    /** 获取所有全选状态的节点 */
    const allCheckedNodes = this.tree.getCheckedNodes(false, false);
    const allCheckedKeys = allCheckedNodes
      .filter((value) => value.dataType === "1")
      .map((value) => value.code);
    /** 需要存储的数据 */
    const list: CheckedInfo[] = nodes.map((v) => ({
      value: v[this.rightValueKey],
      label: v[this.rightLabelKey],
      data: v,
    }));
    /** 不在本树管辖范围内的 */
    const otherCheckeds = this.checkeds.filter(
      (v) => !this.tree.getNode(v.value)
    );
    const origins = [...otherCheckeds, ...list];
    this.$emit("update:checkeds", origins);
    this.$emit("change:checkeds", {
      // 最后一级选中节点的key
      checked: keys,
      // 最后一级选中节点的父元素的key
      parents: [...new Set([...allCheckedKeys, ...halfCheckedKeys])],
      // 最后一级选中节点数据
      origins: origins.map((value) => value.data),
    });
  }

  /** 重置数据 */
  public reset() {
    this.searchVal = "";
    this.tree.setCheckedKeys([]);
  }
}
</script>

<style lang="less" scoped>
.x-admintreeview {
  padding: 0 1rem;
}
.x-admintreeview-search {
  margin: 0.5rem 0;
}
.x-treecontrol {
  overflow: auto;
  height: 23rem;
}
</style>
