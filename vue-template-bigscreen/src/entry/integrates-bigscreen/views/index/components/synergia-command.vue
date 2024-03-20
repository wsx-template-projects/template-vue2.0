<template>
  <div class="synergia-command">
    <div class="synergia-command-title pointer" @click="toHref()">
      协同指挥
      <img src="../../../assets/images/integrates/reform-right.png" alt="" />
    </div>
    <div class="synergia-command-box">
      <div
        class="command-box-item"
        v-for="(item, index) in commandListData"
        :key="index"
      >
        <div class="item-title">{{ item.title }}</div>
        <div class="align-center">
          <img :src="item.icon" alt="" />
        </div>
        <div class="command-list">
          <div
            class="command-list-item"
            v-for="(elem, i) in item.element"
            :key="i"
          >
            <div>{{ elem.label }}</div>
            <template>
              <count-to
                v-if="!isNaN(elem.value)"
                class="number-color font32"
                :startVal="0"
                :endVal="Number(elem.value)"
                :duration="2000"
                :decimals="elem.decimals || 0"
                ref="countRef"
              ></count-to>
              <div v-else>{{ elem.value }}</div>
              <span v-if="!isNaN(elem.value)" class="font20">{{
                elem.unit
              }}</span>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/** 翻牌器 */
import countTo from 'vue-count-to'
export default {
  name: 'SynergiaCommand',
  components: { countTo },
  props: {
    param: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      commandListData: [],
    }
  },
  computed: {},
  watch: {
    param(e) {
      console.log(e)
      this.getData()
    },
  },
  created() {},
  mounted() {
    this.getData()
  },
  methods: {
    /**
     * 跳转
     */
    toHref() {
      window.open(
        // 'https://datav.aliyuncs.com/share/2a5e3e64fa94fe5e264b675b909ae1dd',
        'synergy-command',
      )
    },
    /**
     * 获取数据
     */
    async getData() {
      let params = {
        placeCode: 'DZH-ZP',
        placeAreaCode: 'DZH-ZP-ZB',
        param: {
          areacode: '33',
          dutycode: ' ',
          ...this.param,
        },
      }
      const { 'dzh-zbj': data } = await this.$http
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
      this.commandListData = [
        {
          title: '监测预警',
          icon: require('../../../assets/images/integrates/YJ_jcyj.svg'),
          element: [
            {
              label: '监测模型',
              value: this.filterData(data, '监测模型'),
            },
            {
              label: '监测线索数',
              value: this.filterData(data, '监测线索数'),
            },
            {
              label: '来源部门',
              value: this.filterData(data, '来源部门'),
            },
            {
              label: '问题检出率',
              value: this.filterData(data, '问题处置率'),
              decimals: 2,
              unit: '%',
            },
          ],
        },
        {
          title: '协同处置',
          icon: require('../../../assets/images/integrates/CZ_xtcz.svg'),
          element: [
            {
              label: '协同处置场景',
              value: this.filterData(data, '协同处置场景'),
            },
            {
              label: '协同处置任务',
              value: this.filterData(data, '协同任务数'),
            },
            {
              placeholder: true,
            },
            {
              label: '任务完成率',
              value: this.filterData(data, '任务完成率'),
              decimals: 2,
              unit: '%',
            },
          ],
        },
        {
          title: '指挥调度',
          icon: require('../../../assets/images/integrates/DD_zhdd.svg'),
          element: [
            {
              label: '指挥调度场景',
              value: this.filterData(data, '指挥调度场景'),
            },
            {
              label: '协同处置任务',
              value: this.filterData(data, '指挥调度次数'),
            },
            {
              placeholder: true,
            },
            {
              label: '调度达成率',
              value: this.filterData(data, '调度达成率'),
              decimals: 2,
              unit: '%',
            },
          ],
        },
      ]
    },
    /**
     * 数据过滤
     */
    filterData(data, itemcode) {
      const filterData =
        Array.isArray(data) &&
        data.filter((item) => {
          return item.itemcode == itemcode
        })
      return filterData.length > 0 ? filterData[0].value : 0
    },
  },
}
</script>

<style lang="less" scoped>
.synergia-command {
  width: 100%;
  color: #f3ecec;
  .synergia-command-title {
    width: 100%;
    height: 60px;
    text-align: center;
    font-size: 42px;
    line-height: 60px;
    text-align: center;
    background: url('../../../assets/images/integrates/command-title.png')
      no-repeat;
    background-size: 100% 100%;
    margin-bottom: 10px;
    img {
      width: 28px;
      height: 28px;
    }
  }

  .synergia-command-box {
    display: flex;
    justify-content: space-between;
    .item-title {
      width: 100%;
      height: 45px;
      background: url('../../../assets/images/integrates/item-title.png')
        no-repeat;
      background-size: 100% 100%;
      font-size: 32px;
      line-height: 40px;
      padding-left: 30px;
    }

    .command-box-item {
      width: 355px;
      height: 310px;
      background: url('../../../assets/images/integrates/reform.png') no-repeat;
      background-size: 100% 100%;
      img {
        width: 60px;
        margin: 20px auto;
      }
    }
    .command-box-item .command-list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      font-size: 24px;
      padding: 10px;
      &-item {
        width: 160px;
        margin-bottom: 15px;
      }
    }
  }
}
</style>
