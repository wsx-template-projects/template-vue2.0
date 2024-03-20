<template>
  <div class="synergy-command-search">
    <!-- 日期 -->
    <el-select
      v-model="yearModel"
      placeholder="请选择"
      popper-class="synergy-command-search"
      @change="selectChange"
    >
      <el-option
        v-for="item in yearOption"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <!-- 地区 -->
    <MyTreeSelect
      :isShowSelectAll="false"
      :data="areaOption"
      placeholder="全省"
      value-key="key"
      label-key="title"
      :value="areaChecked"
      :multiple="true"
      @input="handleAreaChange"
      class="command-tree"
    ></MyTreeSelect>
    <!-- 领域 -->
    <MyTreeSelect
      :isShowSelectAll="false"
      :data="dutyOption"
      placeholder="全部领域"
      value-key="key"
      label-key="title"
      :value="dutyChecked"
      :multiple="true"
      @input="handleDutyChange"
      class="command-tree"
    ></MyTreeSelect>
    <!-- 部门 -->
    <MyTreeSelect
      :isShowSelectAll="false"
      :data="deptOption"
      placeholder="所有部门"
      value-key="key"
      label-key="title"
      :value="deptChecked"
      :multiple="true"
      @input="handleDeptChange"
      class="command-tree"
    ></MyTreeSelect>
  </div>
</template>

<script lang="ts">
interface search {
  year?: string | number
  /** 地区 */
  area?: Array<any>
  /** 领域 */
  duty?: Array<any>
  /** 部门 */
  dept?: Array<any>
}
interface group {
  groupParams?: any[]
  groupTable?: object
  groupUid?: string
  quotaDescription?: string
}
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import MyTreeSelect from '@/entry/integrates-bigscreen/components/global/my-tree-select/index.vue'
@Component({
  name: 'Search',
  components: {
    MyTreeSelect,
  },
})
export default class Search extends Vue {
  /** 回传查询参数 */
  @Prop({}) private onGroupDataChange!: Function
  public yearOption: any[] = []
  public yearModel: any = ''
  public areaChecked: any[] = [] // 选中地区
  public areaOption: any[] = [] // 地区数据
  public dutyChecked: any[] = [] // 选中领域
  public dutyOption: any[] = [] // 领域数据
  public deptChecked: any[] = [] // 选中部门
  public deptOption: any[] = [] // 部门数据
  public deptTime: any = null // 存放定时器
  public deptParam: any = {} // 存放部门参数
  private groupData: group = {} // 参数
  /** 部门参数监听 */
  @Watch('deptParam') deptParamChange(e: any) {
    this.getDept()
    console.log(this.setParse(e))
  }
  /** 初始化参数 */
  @Watch('groupData') groupDataChange(e: any) {
    /** 回传查询参数 */
    this.onGroupDataChange(e)
  }
  /**
   * 获取并处理请求参数
   */
  private async getParams() {
    const data: any = await this.$http.get(
      '/api/v2/bi/biformgroup/template/B3DBAFC5971141209C57FA0567192983',
    )
    const year = new Date().getFullYear()
    data.groupParams.forEach((res: any) => {
      res.paramValue = ''
    })
    /** 处理返回参数  ---须拆分 */
    let dateIndex = 0
    const formDate = data.groupParams.find((res: any, index: any) => {
      res.widgetType == 'dateRange' && (dateIndex = index)
      return res.widgetType == 'dateRange'
    })
    const params = formDate.param.split('|')
    const newParams = params.map((res: any) => {
      return {
        ...formDate,
        param: res,
      }
    })
    data.groupParams.splice(dateIndex, 1, ...newParams)
    this.groupData = data
    /** 初始化查询当年 */
    const atYear = new Date().getFullYear() // 获取当年
    this.$nextTick(() => {
      this.yearModel = atYear
      this.selectChange(atYear)
    })
  }
  /**
   * 获取年份下拉项
   */
  private getYearOption() {
    const atYear = new Date().getFullYear() // 获取当年
    const yearOption: any[] = []
    for (let i = 0; i < 5; i++) {
      yearOption.push({
        value: atYear - i,
        label: atYear - i + '年',
      })
    }
    this.yearOption = yearOption
  }
  /**
   * 获取筛选条件指标  区县
   */
  private async getAreacity() {
    const params = {
      dimensionCode: 'areacitycode',
      paramMap: {
        groupUid: 'B3DBAFC5971141209C57FA0567192983',
      },
    }
    const { data } = await this.$http.post(
      '/api/v2/bi/forms/dimensions/dimension/screen/range',
      params,
    )
    this.areaOption = data
  }
  /**
   * 获取筛选条件指标  领域
   */
  private async getDutyCode() {
    const params = {
      dimensionCode: 'dutycode',
      paramMap: {
        groupUid: 'B3DBAFC5971141209C57FA0567192983',
      },
    }
    const { data } = await this.$http.post(
      '/api/v2/bi/forms/dimensions/dimension/screen/range',
      params,
    )
    const newData = data.map((elem: any) => {
      return {
        ...elem,
        label: elem.dimensionname,
        value: elem.dimensioncode,
        title: elem.dimensionname,
        key: elem.dimensioncode,
        level: 1,
      }
    })
    this.dutyOption = [
      {
        children: newData,
        isLeaf: false,
        key: '33',
        level: 0,
        title: '全部',
        value: '33',
      },
    ]
  }
  /**
   * 获取筛选条件指标  部门
   */
  private getDept() {
    const params = {
      dimensionCode: 'deptcode',
      paramMap: {
        groupUid: 'B3DBAFC5971141209C57FA0567192983',
        ...this.deptParam,
      },
    }
    this.deptTime && clearTimeout(this.deptTime)
    this.deptTime = setTimeout(async () => {
      const { data } = await this.$http.post(
        '/api/v2/bi/forms/dimensions/dimension/screen/range',
        params,
      )
      this.deptOption = data
      this.deptTime = null
    }, 500)
  }
  /**
   * 年份
   */
  public selectChange(e: any) {
    const groupParams = this.groupData.groupParams || []
    groupParams.forEach((res: any) => {
      switch (res.param) {
        // 计划年度
        case 'plan_year':
          res.paramValue = String(e)
          break
        //   统计时间  开始时间
        case 'stat_date_from':
          res.paramValue = `${e}-01-01`
          break
        //   统计时间 截止时间
        case 'stat_date_to':
          res.paramValue = this.getYesterday(e)
          break
        //   任务期限止
        case 'stat_year_end':
          res.paramValue = `${e}-12-31`
          break
      }
    })
    this.$set(this.groupData, 'groupParams', groupParams)
    this.groupData = this.setParse(this.groupData)
  }
  /**
   * 获取 统计时间 截止时间
   */
  private getYesterday(e: string) {
    if (e != String(new Date().getFullYear())) {
      return `${e}-12-31`
    } else {
      const time = new Date(new Date().getTime() - 1000 * 60 * 60 * 24)
        .toLocaleDateString()
        .split('/')
      const newTime = time.map((res: string, index: number) => {
        if (index > 0 && res.length < 2) {
          return `0${res}`
        } else {
          return res
        }
      })
      return newTime.join('-')
    }
  }
  /** 地区change */
  public handleAreaChange(e: any) {
    const keyData = this.getKey(e).flat(Infinity)
    this.$set(this.deptParam, 'citycode', keyData.join(','))
    this.deptParam = this.setParse(this.deptParam)
    /** 修改查询参数配置 */
    const groupParams = this.groupData.groupParams || []
    groupParams.forEach((res: any) => {
      res.param == 'citycode' && (res.paramValue = keyData.join(','))
    })
    this.$set(this.groupData, 'groupParams', groupParams)
    this.groupData = this.setParse(this.groupData)
  }
  /** 领域change */
  public handleDutyChange(e: any) {
    const keyData = this.getKey(e).flat(Infinity)
    this.$set(this.deptParam, 'dutycode', keyData.join(','))
    this.deptParam = this.setParse(this.deptParam)
    /** 修改查询参数配置 */
    const groupParams = this.groupData.groupParams || []
    groupParams.forEach((res: any) => {
      res.param == 'dutycode' && (res.paramValue = keyData.join(','))
    })
    this.$set(this.groupData, 'groupParams', groupParams)
    this.groupData = this.setParse(this.groupData)
  }
  /** 部门change */
  public handleDeptChange(e: any) {
    const keyData = this.getKey(e).flat(Infinity)
    /** 修改查询参数配置 */
    const groupParams = this.groupData.groupParams || []
    groupParams.forEach((res: any) => {
      res.param == 'cityduty_deptcode' && (res.paramValue = keyData.join(','))
    })
    this.$set(this.groupData, 'groupParams', groupParams)
    this.groupData = this.setParse(this.groupData)
  }

  handleNodeClick(val: any) {
    console.log(val)
  }
  /**
   * 获取树的key
   */
  private getKey(e: any) {
    const keyData: any[] = []
    e.forEach((res: any) => {
      keyData.push(res.key)
      if (Array.isArray(res.children) && res.children.length > 0) {
        keyData.push(this.getKey(res.children))
      }
    })
    return keyData
  }
  /**
   * 拷贝
   */
  private setParse(e: any) {
    return JSON.parse(JSON.stringify(e))
  }
  created() {
    this.getYearOption() // 获取(年份)配置
    this.getParams() // 获取(查询参数)配置
    this.getAreacity() // 获取(地区)配置
    this.getDutyCode() // 获取(领域)配置
    this.getDept() // 获取(部门)配置
  }
  mounted() {}
}
</script>

<style lang="less" scoped>
.synergy-command-search {
  display: flex;
  align-items: center;
  justify-content: space-around;
  > * {
    width: 220px;
  }
  > :first-child {
    width: 180px;
  }
}
</style>
<style lang="less">
.synergy-command-search {
  // select
  .el-input__inner {
    height: 46px;
    line-height: 46px;
    border-radius: 4px;
    border: 0px;
    background-color: transparent;
    background: url('../../images/search-box.png') no-repeat;
    background-size: 100% 100%;
    // box-shadow: 0px 2px 4px 0px rgba(6, 40, 64, 0.7);
    font-size: 22px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
  }
  .el-select .el-input .el-select__caret {
    color: #00a8ff;
  }
  &.el-select-dropdown {
    background: linear-gradient(134deg, #00deff, #006dca);
    padding: 1px;
    border: 0;
    transform: scale(0.75, 0.75) translate(-15%, 0px);
  }
  .el-select-dropdown__wrap {
    background: rgba(12, 31, 74, 0.95);
    box-shadow: 0px 2px 4px 0px rgba(6, 40, 64, 0.7);
    border-radius: 6px 12px 22px 13px;
  }
  .el-select-dropdown__item {
    width: 175px;
    height: 50px;
    line-height: 50px;
    color: rgba(255, 255, 255, 0.5);
    font-size: 24px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .el-select-dropdown__item.selected {
    background: rgba(41, 69, 133, 0.6);
    color: #ffffff;
    position: relative;
    &::after {
      width: 31px;
      height: 22px;
      content: '';
      background: url('../../images/select-active.png') no-repeat;
      background-size: 100% 100%;
      display: inline-block;
      margin-left: 20px;
    }
  }
  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    background: rgba(41, 69, 133, 0.6);
    color: #ffffff;
  }
  &.el-popper[x-placement^='bottom'] .popper__arrow {
    border-bottom-color: #00deff;
    &::after {
      border-bottom-color: #00deff;
    }
  }
  //   cascader
  .el-cascader-node:not(.is-disabled):focus,
  .el-cascader-node:not(.is-disabled):hover {
    background: rgba(41, 69, 133, 0.6);
    color: #ffffff;
  }
  .el-cascader-menu {
    color: #fff;
  }
  &.el-cascader__dropdown {
    background: linear-gradient(134deg, #00deff, #006dca);
    padding: 1px;
    border: 0;
  }
  .el-input__prefix,
  .el-input__suffix {
    color: #00a8ff;
  }
  .el-cascader-panel {
    background: rgba(12, 31, 74, 0.95);
    box-shadow: 0px 2px 4px 0px rgba(6, 40, 64, 0.7);
    border-radius: 6px;
  }
  .el-cascader__tags {
    left: 1px;
    zoom: 1.2;
    right: 22px;
    flex-wrap: nowrap;
  }
  .el-cascader__tags .el-tag {
    background: rgba(12, 31, 74, 0);
    box-shadow: 0px 2px 4px 0px rgba(6, 40, 64, 0.7);
    border-image: linear-gradient(134deg, #00deff, #006dca) 10 10;
    max-width: 95px;
  }
  .el-tag.el-tag--info {
    color: #fff;
    font-size: 14px;
  }
  .el-cascader__tags .el-tag .el-icon-close {
    background-color: #00aaff00;
    color: #00a8ff;
    zoom: 1.3;
    top: 1px;
  }
  /** 下拉树样式 */
  .tree-input.command-tree {
    .tree-input-top {
      background: url('../../images/search-box.png') no-repeat;
      background-size: 100% 100%;
      > * {
        height: 46px;
        line-height: 46px;
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ccc;
      }
    }
    .tree-nodes-box {
      .el-input__inner {
        height: 36px;
        line-height: 36px;
        font-size: 20px;
        background: transparent;
      }
    }
    .el-tree {
      background: transparent;
      color: #fff;
    }
    .x-admintreeview {
      padding: 0;
    }
    .el-tree-node:focus > .el-tree-node__content {
      background: rgba(41, 69, 133, 0.6);
    }
    .el-tree-node__content:hover {
      background: rgba(41, 69, 133, 0.6);
    }
    ::-webkit-scrollbar {
      width: 6px; /* 滚动条宽度， width：对应竖滚动条的宽度  height：对应横滚动条的高度*/
      background: #007acc00;
    }
    /*定义滚动条轨道（凹槽）样式*/
    ::-webkit-scrollbar-track {
      background-color: #ddd0;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0); /* 较少使用 */
      border-radius: 3px;
    }
    /*定义滑块 样式*/
    ::-webkit-scrollbar-thumb {
      border-radius: 3px;
      height: 100px; /* 滚动条滑块长度 */
      background-color: #ccc;
    }
  }
  .el-tree-node__content {
    height: 34px;
    zoom: 1.2;
  }
}
</style>