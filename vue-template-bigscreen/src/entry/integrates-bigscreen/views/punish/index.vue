<template>
  <MyScreen :is-scale="true" :width="width" :height="height">
    <div class="sg-page page-punish">
      <header class="page-punish__header">
        <index-title @back="back" :title="'处罚办案'" :ifBack="true">
          <div slot="right-one" style="font-size: 18px">
            <i
              class="el-icon-time"
              style="margin-right: 10px; font-size: 20px"
            ></i
            >2022-05-18
          </div>
        </index-title>
      </header>
      <div class="page-punish__content mt20">
        <!-- 左屏 -->
        <punish-left :param="param"></punish-left>
        <div class="layout">
          <punish-top :param="param"></punish-top>
          <section class="punish-center paddingTop30">
            <el-select
              clearable
              class="integrates-map-select"
              popper-class="integrates-map-select"
              v-model="deptValue"
              placeholder="请选择部门"
              @change="selectChange"
            >
              <el-option
                v-for="item in deptOption"
                :key="item.value"
                :label="item.title"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <echarts-map
              :areaMap.sync="areaMap"
              :mapData="mapData"
              :formatterData="formatterData"
              class="EchartsMap"
            ></echarts-map>
          </section>

          <!-- <countTo :start-val="0" :end-val="1234" :duration="3000"></countTo> -->
          <PunishFooter :param="param" class="foot mt30" />
        </div>

        <punish-right :param="param" class="test"></punish-right>
      </div>
    </div>
  </MyScreen>
</template>

<script>
/** 数字翻牌器 */
import countTo from 'vue-count-to'
/** 左屏 */
import PunishLeft from './components/punish-left.vue'
/** 右屏 */
import PunishRight from './components/punish-right.vue'
/**中屏顶部 */
import PunishTop from './components/punish-top.vue'
/**中屏底部 */
import PunishFooter from './components/punish-footer.vue'
/**引入头部 */
import IndexTitle from '../index/components/index-title.vue'
import MyScreen from '../../components/global/my-screen/index.vue'
export default {
  name: 'Punish',
  components: {
    countTo,
    PunishLeft,
    PunishRight,
    PunishTop,
    PunishFooter,
    IndexTitle,
    MyScreen,
  },
  props: {},
  data() {
    return {
      width: 2560,
      height: 1440,
      areaMap: '',
      mapData: [],
      formatterData: [],
      deptValue: null,
      areacode: '33', // 默认全省 '33'
      deptOption: [],
      param: {},
    }
  },
  computed: {},
  watch: {
    areaMap(e) {
      this.areacode = e.areacode
      let dutycode = ' '
      if (!(this.deptValue == '33' || !this.deptValue))
        dutycode = this.deptValue
      this.param = {
        areacode: this.areacode,
        dutycode,
      }
      console.log(e)
    },
  },
  created() {},
  mounted() {
    this.getDeptCode()
    this.getMapData()
  },
  methods: {
    /**
     * 获取领域
     */
    async getDeptCode() {
      this.deptOption = []
      const deptOption = []
      let params = {
        placeCode: 'CODE',
        placeAreaCode: 'CODE',
        param: { itemcode: 'dutycode' },
      }
      const { dutycode: data } = await this.$http
        .post('/api/v2/bi/place/dataRuleGroup/doGetPlaceData', params)
        .then((res) => {
          const obj = {}
          const { processResult } = res[0]
          processResult.forEach((elem) => {
            obj[elem.key] = elem.value
          })
          return obj
        })
      data.forEach((elem) => {
        deptOption.push({
          title: elem.dutyname,
          value: elem.dutycode,
        })
      })
      deptOption.unshift({
        title: '全部',
        value: '33',
      })
      this.deptOption = deptOption
    },
    /**
     * 获取地图数据
     */
    async getMapData() {
      let params = {
        placeCode: 'DZH-CF',
        placeAreaCode: 'DZH-CF',
        param: {
          item_position: '地图',
          areacode: '33',
          dutycode: ' ',
        },
      }
      const { 'dzh-zbj-cf': mapAllData } = await this.$http
        .post('/api/v2/bi/place/dataRuleGroup/doGetPlaceData', params)
        .then((res) => {
          const obj = {}
          const { processResult } = res[0]
          processResult.forEach((elem) => {
            obj[elem.key] = obj[elem.key]
              ? [...obj[elem.key], ...elem.value]
              : elem.value
          })
          return obj
        })
      const formatterData = [
        {
          label: '核查立案数：',
          itemcode: '核查立案数',
          key: 'hclas',
        },
        {
          label: '案源总数：',
          itemcode: '案源总数',
          key: 'ayzs',
        },
        {
          label: '大案要案数：',
          itemcode: '大案要案数',
          key: 'dayas',
        },
        {
          label: '轻微违法案件占比：',
          itemcode: '轻微违法案件占比',
          key: 'qwwfzb',
        },
        {
          label: '涉案金额数：',
          itemcode: '涉案金额数',
          key: 'sajes',
        },
        {
          label: '案件移送率：',
          itemcode: '案件移送率',
          key: 'asysl',
        },
        {
          label: '案件办结率：',
          itemcode: '案件办结率',
          key: 'ajbjl',
        },
      ]
      const mapData = [
        {
          name: '杭州',
          value: 100,
          mapData: {},
        },
        {
          name: '宁波',
          value: 200,
          mapData: {},
        },
        {
          name: '温州',
          value: 300,
          mapData: {},
        },
        {
          name: '嘉兴',
          value: 350,
          mapData: {},
        },
        {
          name: '湖州',
          value: 400,
          mapData: {},
        },
        {
          name: '绍兴',
          value: 500,
          mapData: {},
        },
        {
          name: '金华',
          value: 550,
          mapData: {},
        },
        {
          name: '衢州',
          value: 650,
          mapData: {},
        },
        {
          name: '舟山',
          value: 700,
          mapData: {},
        },
        {
          name: '台州',
          value: 750,
          mapData: {},
        },
        {
          name: '丽水',
          value: 900,
          mapData: {},
        },
      ]
      mapData.forEach((elem) => {
        // 过滤每个地区的数据
        const areaData = mapAllData.filter(
          (v) => v.dim6 == elem.name || v.dim6.indexOf(elem.name) > -1,
        )
        // 往地图 mapData 添加数据
        formatterData.forEach((item) => {
          const filterData = areaData.filter((v) => v.itemcode == item.itemcode)
          elem.mapData[item.key] =
            filterData.length > 0 ? filterData[0].value : 0
          if (item.key == 'hclas')
            elem.value = filterData.length > 0 ? filterData[0].value : 0
          switch (item.key) {
            case 'sajes':
              elem.mapData[item.key] =
                (elem.mapData[item.key] / 100000000).toFixed(2) + '亿元'
              break
            case 'qwwfzb':
            case 'asysl':
            case 'ajbjl':
              elem.mapData[item.key] += '%'
              break
          }
        })
      })

      this.formatterData = formatterData
      this.mapData = mapData
    },
    /**
     *下拉框change事件
     */
    selectChange(e) {
      let dutycode = e
      if (e == '33' || !e) dutycode = ' '
      this.param = {
        areacode: this.areacode,
        dutycode,
      }
    },
    /**
     * 返回
     */
    back() {
      window.open('about:blank', '_top').close()
    },
  },
}
</script>

<style lang="less" scoped>
.page-punish {
  .EchartsMap {
    width: 100%;
    height: 675px;
  }
  &__header {
    width: 100%;
    height: 160px;
  }
  &__content {
    padding: 0 60px;
    display: flex;
    justify-content: space-between;
  }
  .layout {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    .foot {
      //   margin-top: -100px;
      z-index: 10;
    }
  }
  .punish-center {
    width: 100%;
    position: relative;
    .integrates-map-select {
      position: absolute;
      right: 32px;
      top: 10px;
      z-index: 10;

      /deep/.el-input--medium {
        font-size: 24px;
      }
      /deep/.el-input--medium .el-input__inner {
        width: 220px;
        height: 52px;
        line-height: 52px;
      }
      /deep/.el-input__inner {
        background: rgba(89, 89, 89, 0.11);
        border-color: #0a74ff83;
        color: #fdfcfb;
      }
      /deep/.el-select-dropdown__item {
        color: #fdfcfb;
        font-size: 20px;
        height: 40px;
        line-height: 40px;
        &:hover {
          background: #5967b95c;
          color: #52e0ff;
        }
      }
      &:hover .el-input__inner {
        border-color: #0a74ff96;
      }
    }
  }
}

/deep/.integrates-map-select.el-select-dropdown {
  background: rgb(4, 15, 77, 0.9);
  //   background: rgba(89, 89, 89, 0.11);
  color: #fdfcfb;
  border-color: #52e0ff;
}
</style>
<style lang="less">
.page-punish .number-color {
  background-image: -webkit-linear-gradient(90deg, #02ffff 0%, #ffffff 99%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  //
}
.integrates-map-select {
  .el-input--medium {
    font-size: 24px;
  }
  .el-input--medium .el-input__inner {
    width: 220px;
    height: 52px;
    line-height: 52px;
  }
  .el-input__inner {
    background: rgba(89, 89, 89, 0.11);
    border-color: #0a74ff83;
    color: #fdfcfb;
  }
  .el-select-dropdown__item {
    color: #fdfcfb;
    font-size: 20px;
    height: 40px;
    line-height: 40px;
  }
  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    background: #5967b95c;
    color: #52e0ff;
  }
}
.integrates-map-select.el-select:hover .el-input__inner {
  border-color: #0a74ff96;
}
.integrates-map-select.el-select-dropdown {
  background: rgb(4, 15, 77, 0.9);
  //   background: rgba(89, 89, 89, 0.11);
  color: #fdfcfb;
  border-color: #52e0ff;
}
</style>