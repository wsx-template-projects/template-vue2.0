<template>
  <div class="punish-footer">
    <HeadLine text="创新实践"></HeadLine>
    <div class="container">
      <div
        class="container-item"
        v-for="(item, index) in innovateData"
        :key="index"
      >
        <div class="item-top">
          <span class="icon" :class="item.iconClass"></span>
          <span class="desc">{{ item.title }}</span>
        </div>
        <div class="item-bottom">
          <div class="title">{{ item.label }}</div>
          <div>
            <count-to
              v-if="!isNaN(item.value)"
              class="number-color font32"
              :startVal="0"
              :endVal="Number(item.value)"
              :duration="2000"
              :decimals="item.decimals || 0"
              ref="countRef"
            ></count-to>
            <span v-else>{{ item.value }}</span>
            <span v-if="!isNaN(item.value)"> {{ item.unit }} </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/** 数字翻牌器 */
import countTo from 'vue-count-to'
import HeadLine from './head-line.vue'
export default {
  name: 'PunishFooter',
  components: {
    countTo,
    HeadLine,
  },
  props: {
    param: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      innovateData: [],
    }
  },
  watch: {
    param(e) {
      console.log('punish-footer', e)
      this.getData()
    },
  },
  mounted() {
    this.getData()
    setInterval(() => {
      const countRef = this.$refs.countRef
      countRef.forEach((e) => {
        e.start()
      })
    }, 1000 * 10)
  },

  methods: {
    /**
     * 获取数据
     */
    async getData() {
      let params = {
        placeCode: 'DZH-CF',
        placeAreaCode: 'DZH-CF',
        param: {
          areacode: '33',
          dutycode: ' ',
          ...this.param,
        },
      }
      const { 'dzh-zbj-cf': data } = await this.$http
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
      this.innovateData = [
        {
          title: '简案快办',
          label: '案件占比',
          iconClass: 'icon1',
          value: this.filterData(data, '简案快办案件占比'),
          decimals: 2,
          unit: '%',
        },
        {
          title: '首违免罚',
          label: '案件占比',
          iconClass: 'icon2',
          value: this.filterData(data, '首违不罚占比'),
          decimals: 2,
          unit: '%',
        },
        {
          title: '非诉执行',
          label: '案件占比',
          iconClass: 'icon3',
          value: this.filterData(data, '非诉执行占比'),
          decimals: 2,
          unit: '%',
        },
        {
          title: '线上法制审核',
          label: '审核率',
          iconClass: 'icon4',
          value: this.filterData(data, '线上法制审核'),
          decimals: 2,
          unit: '%',
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
.punish-footer {
  //   position: absolute;
  // left: 1200px;
  //   bottom: 70px;
  //   margin: 0 auto;
  //   bottom: 200px;
  //   left: 50%;
  //   transform: translate(-50%, 0);
  width: 921px;
  height: 295px;
  background: url('../../../assets/images/integrates/section_bg.png') no-repeat !important;
  background-size: 100% 100% !important;
  .container {
    padding: 0 10px;
    display: flex;
    justify-content: space-around;
    .container-item {
      padding: 10px;
      box-sizing: border-box;
      width: 195px;
      height: 229px;
      box-sizing: border-box;
      background: rgba(0, 57, 138, 0.5);
      border: 1px solid #2c5fbc;
      border-radius: 5px;
      color: #fff;
      .item-top {
        height: 120px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon {
          width: 60px;
          height: 60px;

          margin-bottom: 20px;
        }
        .icon1 {
          background: url('../../../assets/images/innovation/简案快办备份.svg')
            no-repeat;
          background-size: 100% auto;
        }
        .icon2 {
          background: url('../../../assets/images/innovation/首违免罚.svg')
            no-repeat;
          background-size: 100% auto;
        }
        .icon3 {
          background: url('../../../assets/images/innovation/非诉执行备份.svg')
            no-repeat;
          background-size: 100% auto;
        }
        .icon4 {
          background: url('../../../assets/images/innovation/线上法制审核.svg')
            no-repeat;
          background-size: 100% auto;
        }
        .desc {
          font-size: 25px;
          font-weight: 500;
        }
      }
      .item-bottom {
        display: flex;
        flex-direction: column;
        height: 106px;
        align-items: center;
        .title {
          font-size: 24px;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
