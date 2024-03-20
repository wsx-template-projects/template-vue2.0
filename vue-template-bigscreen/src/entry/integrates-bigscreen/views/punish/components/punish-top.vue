<template>
  <div class="punish-top">
    <div class="container font20">
      <div
        class="container-item mb10"
        v-for="(item, index) in zlAllData"
        :key="index"
      >
        <div class="desc">{{ item.label }}</div>
        <div class="num">
          <count-to
            v-if="!isNaN(item.value)"
            class="number-color font32"
            :start-val="0"
            :end-val="Number(item.value)"
            :duration="2000"
            :decimals="item.decimals || 0"
            ref="countRef"
          ></count-to>
          <div v-else>{{ item.value }}</div>
          <span class="font20">{{ item.unit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
export default {
  name: 'PunishTop',
  props: {
    param: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      zlAllData: [], // 总览数据
      interval: null,
    }
  },
  components: {
    countTo,
  },
  watch: {
    param(e) {
      console.log('punish-top', e)
      this.getData()
    },
  },
  mounted() {
    this.getData()
    this.interval = setInterval(() => {
      const countRef = this.$refs.countRef
      countRef.forEach((e) => {
        e.start()
      })
    }, 10 * 1000)
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
      this.zlAllData = [
        {
          label: '核查立案数',
          value: this.filterData(data, '核查立案数'),
          decimals: 0,
          unit: '件',
        },
        {
          label: '简易程序',
          value: this.filterData(data, '简易程序'),
          decimals: 0,
          unit: '件',
        },
        {
          label: '普通程序',
          value: this.filterData(data, '普通程序'),
          decimals: 0,
          unit: '件',
        },
        {
          label: '人均办件',
          value: this.filterData(data, '人均办件'),
          decimals: 0,
          unit: '件',
        },
        {
          label: '轻微违法',
          value: this.filterData(data, '轻微违法'),
          decimals: 0,
          unit: '件',
        },
        {
          label: '大案要案',
          value: this.filterData(data, '大案要案'),
          decimals: 0,
          unit: '件',
        },
        {
          label: '查罚一体',
          value: this.filterData(data, '查罚一体'),
          decimals: 0,
          unit: '件',
        },

        {
          label: '听证案件',
          value: this.filterData(data, '听证案件'),
          decimals: 0,
          unit: '件',
        },
        {
          label: '掌上办案率',
          value: this.filterData(data, '掌上办案率'),
          decimals: 2,
          unit: '%',
        },
        {
          label: '案件办结率',
          value: this.filterData(data, '案件办结率'),
          decimals: 2,
          unit: '%',
        },
        {
          label: '不予处罚率',
          value: this.filterData(data, '不予处罚率'),
          decimals: 2,
          unit: '%',
        },
        {
          label: '行刑衔接率',
          value: this.filterData(data, '行刑衔接率'),
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
  beforeDestroy() {
    clearInterval(this.interval)
  },
}
</script>

<style lang="less" scoped>
.punish-top {
  //   margin: 0 30px;
  width: 921px;
  height: 241px;
  background: rgba(0, 57, 138, 0.5);
  border: 1px solid #2c5fbc;
  border-radius: 5px;
  padding: 20px 40px;
  box-sizing: border-box;
  z-index: 5;
  color: #fff;
  .container {
    height: 65px;
    display: flex;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .container-item {
      width: 25%;
      display: flex;
      flex-direction: column;
      .desc {
        flex: 1;
      }
    }
  }
}
</style>
