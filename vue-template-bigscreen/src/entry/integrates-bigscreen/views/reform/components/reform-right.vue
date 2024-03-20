<template>
  <div class="reform-right">
    <!-- 方式方法体系 -->
    <section class="method-system">
      <div class="reform-title pointer" @click="toHref(1)">
        方式方法体系
        <img src="../../../assets/images/integrates/reform-right.png" alt="" />
      </div>
      <div class="system-content">
        <section>
          <div class="item-title">轻微违法告知承诺</div>
          <section class="inform">
            <div
              v-for="(item, index) in informListData"
              class="team-list"
              :key="index"
            >
              <img :src="item.icon" alt="" />
              <div>
                <div>{{ item.label }}</div>
                <div>
                  <count-to
                    v-if="!isNaN(item.value)"
                    class="number-color font32"
                    :startVal="0"
                    :endVal="Number(item.value)"
                    :duration="2000"
                    ref="countRef"
                  ></count-to>
                  <div v-else>{{ item.value }}</div>
                  <span v-if="!isNaN(item.value)" class="font20">{{
                    item.unit
                  }}</span>
                </div>
              </div>
            </div>
          </section>
        </section>
        <section>
          <div class="item-title">重点领域严格监管</div>
          <section class="supervise">
            <div
              v-for="(item, index) in superviseListData"
              class="team-list"
              :key="index"
            >
              <img :src="item.icon" alt="" />
              <div>
                <div>{{ item.label }}</div>
                <div>
                  <count-to
                    v-if="!isNaN(item.value)"
                    class="number-color font32"
                    :startVal="0"
                    :endVal="Number(item.value)"
                    :duration="2000"
                    ref="countRef"
                  ></count-to>
                  <div v-else>{{ item.value }}</div>
                  <span v-if="!isNaN(item.value)" class="font20">{{
                    item.unit
                  }}</span>
                </div>
              </div>
            </div>
          </section>
        </section>
        <section>
          <div class="item-title">监管一件事</div>
          <section class="one-thing">
            <div
              v-for="(item, index) in oneThingData"
              class="team-list"
              :key="index"
            >
              <img :src="item.icon" alt="" />
              <div>
                <div>{{ item.label }}</div>
                <div>
                  <count-to
                    v-if="!isNaN(item.value)"
                    class="number-color font32"
                    :startVal="0"
                    :endVal="Number(item.value)"
                    :duration="2000"
                    ref="countRef"
                  ></count-to>
                  <div v-else>{{ item.value }}</div>
                  <span v-if="!isNaN(item.value)" class="font20">{{
                    item.unit
                  }}</span>
                </div>
              </div>
            </div>
          </section>
        </section>
        <section>
          <div class="item-title">信用监管</div>
          <section class="credit">
            <div class="credit-left">
              <div
                class="credit-left-item"
                v-for="(item, index) in creditListData"
                :key="index"
              >
                <img :src="item.icon" alt="" />
                <div>
                  <div>{{ item.label }}</div>
                  <div>
                    <count-to
                      v-if="!isNaN(item.value)"
                      class="number-color font32"
                      :startVal="0"
                      :endVal="Number(item.value)"
                      :duration="2000"
                      :decimals="2"
                      ref="countRef"
                    ></count-to>
                    <div v-else>{{ item.value }}</div>
                    <span v-if="!isNaN(item.value)" class="font20">{{
                      item.unit
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
            <MyEcharts class="credit-right" :option="creditOption"></MyEcharts>
          </section>
        </section>
      </div>
    </section>
    <!-- 执法制度体系 -->
    <section class="regime-system">
      <div class="reform-title margin10-0 pointer" @click="toHref(2)">
        执法制度体系
        <img src="../../../assets/images/integrates/reform-right.png" alt="" />
      </div>
      <section class="flex justify-between">
        <div
          class="regime-system-item"
          v-for="(item, index) in systemData"
          :key="index"
        >
          <img :src="item.icon" alt="" />
          <div>{{ item.label }}</div>
          <div>
            <countTo
              v-if="!isNaN(item.value)"
              class="number-color font32"
              :startVal="0"
              :endVal="Number(item.value)"
              :duration="3000"
              ref="countRef"
            ></countTo>
            <div v-else>{{ item.value }}</div>
            <span v-if="!isNaN(item.value)" class="font20">{{
              item.unit
            }}</span>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
/** 数字翻牌器 */
import countTo from 'vue-count-to'
import MyEcharts from './MyEcharts.vue'
export default {
  name: 'ReformRight',
  components: { countTo, MyEcharts },
  props: {
    param: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      informListData: [], // 轻微违法告知承诺
      superviseListData: [], // 重点领域严格监管
      oneThingData: [], // 监管一件事
      creditListData: [], // 信用监管
      creditOption: {},
      systemData: {}, // 制度体系
      allData: [], // 全部数据
      interval: null,
    }
  },
  computed: {},
  watch: {
    param(e) {
      console.log('reform-right', e)
      this.getData()
    },
  },
  created() {},
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
        placeCode: 'DZH-GG',
        placeAreaCode: 'DZH-GG-ZB',
        param: {
          areacode: '33',
          ...this.param,
        },
      }
      const { 'dzh-zbj-gg': data } = await this.$http
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
      this.allData = data
      this.getMethodData()
      this.getSystemDataData()
    },
    /**
     * 获取方式方法体系数据
     */
    getMethodData() {
      const data = this.allData
      this.informListData = [
        {
          icon: require('../../../assets/images/reform/fgly.png'),
          label: '覆盖领域',
          value: this.filterData(data, '告知承诺覆盖领域'),
          unit: '个',
        },
        {
          icon: require('../../../assets/images/reform/sssxs.svg'),
          label: '实施事项数',
          value: this.filterData(data, '告知承诺实施事项数'),
          unit: '项',
        },
      ]
      this.superviseListData = [
        {
          icon: require('../../../assets/images/reform/zdly.svg'),
          label: '重点领域',
          value: this.filterData(data, '重点领域数'),
          unit: '个',
        },
        {
          icon: require('../../../assets/images/reform/dayas.png'),
          label: '大案要案数',
          value: this.filterData(data, '大案要案数'),
          unit: '',
        },
      ]
      this.oneThingData = [
        {
          icon: require('../../../assets/images/reform/jgyjs.svg'),
          label: '监管一件事',
          value: this.filterData(data, '监管一件事数量'),
          unit: '件',
        },
        {
          icon: require('../../../assets/images/reform/jsqygr.svg'),
          label: '减少企业干扰',
          value: this.filterData(data, '减少企业干扰'),
          unit: '户次',
        },
      ]
      this.creditListData = [
        {
          icon: require('../../../assets/images/reform/xyjgl.svg'),
          label: '信用监管率',
          value: this.filterData(data, '信用监管率'),
          unit: '%',
        },
        {
          icon: require('../../../assets/images/reform/wtjcl.svg'),
          label: '问题检出率',
          value: this.filterData(data, '问题检出率'),
          unit: '%',
        },
      ]
      const xyjglAllData = data.filter(
        (elem) =>
          elem.item_position == '信用监管折线图' &&
          elem.itemcode == '信用监管率',
      )

      const wtjclAllData = data.filter(
        (elem) =>
          elem.item_position == '信用监管折线图' &&
          elem.itemcode == '问题检出率',
      )
      const hisXAxis = []
      const xyjgl = [] // 信用监管率
      const wtjcl = [] // 问题检出率
      xyjglAllData.forEach((elem) => {
        hisXAxis.push(elem.dim6)
        xyjgl.push(elem.value)
      })
      wtjclAllData.forEach((elem) => {
        wtjcl.push(elem.value)
      })
      this.creditOption = {
        color: ['rgb(25, 226, 76)', 'rgb(182, 43, 85)'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          },
        },
        legend: {
          show: true,
          itemGap: 20,
          textStyle: {
            color: 'rgba(255,255,255,0.7)',
            fontSize: 14,
          },
        },
        grid: {
          left: '5%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            show: true,
            type: 'category',
            // boundaryGap: true,
            // 坐标轴刻度标签的相关设置
            axisLabel: {
              //   interval: 0,
              fontSize: 14,
              color: '#ccc',
              formatter: `{value}`,
            },
            // 坐标轴线数据
            axisLine: {
              show: true,
              lineStyle: {
                type: 'solid',
                color: 'rgba(255, 255, 255, 0.7)',
              },
            },
            // 坐标轴指示器配置项
            axisPointer: {
              show: true,
              label: {
                show: true,
                color: '#fff',
                backgroundColor: 'rgba(50,50,50,0.9)',
                padding: [4, 4, 4, 4],
                // formatter: function (params) {
                //   return `${params.value}月`
                // },
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: 'rgba(255, 255, 255, 0.1)',
              },
            },
            // 坐标轴刻度相关设置
            axisTick: {
              show: false,
              //   alignWithLabel: true,
            },
            // 坐标轴两边留白策略
            boundaryGap: ['30%', '30%'],
            // 坐标轴数据
            data: hisXAxis,
          },
        ],
        yAxis: {
          min: 0,
          max: 100,
          type: 'value',
          position: 'left',
          axisLine: {
            show: true,
            lineStyle: {
              type: 'solid',
              color: 'rgba(255, 255, 255,0.7)',
            },
          },
          axisLabel: {
            formatter: `{value}%`,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.1)',
              type: 'dashed',
            },
          },
          // 坐标轴指示器配置项
          axisPointer: {
            show: true,
            label: {
              show: true,
              color: '#fff',
              backgroundColor: 'rgba(50,50,50,0.9)',
              padding: [4, 4, 4, 4],
              formatter: function (params) {
                const value = params.value.toFixed(2)
                return `${value}%`
              },
            },
          },
          // 坐标轴刻度相关设置
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            name: '信用监管率',
            type: 'line',
            data: xyjgl,
            smooth: true, //平滑曲线显示
            showAllSymbol: true, //显示所有图形。
            symbol: 'circle', //标记的图形为实心圆
            symbolSize: 6, //标记的大小
            label: {
              show: true,
              position: 'top',
              color: 'rgba(255,255,255,0.7)',
            },
          },
          {
            name: '问题检出率',
            type: 'line',
            data: wtjcl,
            smooth: true, //平滑曲线显示
            showAllSymbol: true, //显示所有图形。
            symbol: 'circle', //标记的图形为实心圆
            symbolSize: 6, //标记的大小
            label: {
              show: true,
              position: 'top',
              color: 'rgba(255,255,255,0.7)',
            },
          },
        ],
      }
    },
    /**
     * 获取执法制度体系
     */
    getSystemDataData() {
      const data = this.allData
      this.systemData = [
        {
          icon: require('../../../assets/images/reform/fggz.png'),
          label: '法规规章',
          value: this.filterData(data, '法规规章'),
          unit: '个',
        },
        {
          icon: require('../../../assets/images/reform/zdgf.png'),
          label: '制度规范',
          value: this.filterData(data, '制度规范'),
          unit: '个',
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
    toHref(e) {
      let herf = ''
      switch (e) {
        case 1:
          window.open(
            'https://datav.aliyuncs.com/share/fa8c029cf293c9e20a16b30080b0341e',
          )
          break
        case 2:
          window.open(
            'https://datav.aliyuncs.com/share/a16f6a345274a543d8b368144184a343',
          )
          break
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
}
</script>

<style lang="less" scoped>
.reform-right {
  width: 660px;
  height: 100%;
  max-height: 1280px;
  color: #fff;
  .margin10-0 {
    margin: 10px 0px;
  }
  .flex {
    display: flex;
  }
  .justify-between {
    justify-content: space-between;
  }
  > section {
    .item-title {
      width: 100%;
      height: 45px;
      background: url('../../../assets/images/integrates/item-title.png')
        no-repeat;
      background-size: 100% 100%;
      color: #f3ecec;
      font-size: 32px;
      line-height: 40px;
      padding-left: 34px;
    }
  }
  .reform-title {
    text-align: center;
    font-size: 42px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background: url('../../../assets/images/integrates/reform-title.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-size: 660px 60px;
    color: #f3ecec;
    margin-bottom: 15px;

    img {
      width: 28px;
      height: 28px;
    }
  }
  .method-system {
    .system-content {
      width: 100%;
      height: 850px;
      background: url('../../../assets/images/integrates/section_bg.png')
        no-repeat;
      background-size: 100% 100%;
    }
    .team-list {
      width: 310px;
      height: 110px;
      margin: 4px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(0, 57, 138, 0.5);
      font-size: 24px;

      img {
        width: 50px;
        height: 50px;
        margin-right: 20px;
      }
    }
    .inform,
    .supervise,
    .one-thing {
      width: 100%;
      height: 120px;
      margin: 10px 0;
      display: flex;
      padding: 0 5px;
      justify-content: space-around;
      flex-wrap: wrap;
    }
    .credit {
      height: 224px;
      background: rgba(0, 57, 138, 0.5);
      margin: 10px;
      display: flex;
      align-items: center;
      &-left {
        width: 250px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }
      &-left-item {
        width: 200px;
        height: 80px;
        margin: 10px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;

        img {
          width: 50px;
          height: 50px;
          margin-right: 14px;
        }
      }
      &-right {
        flex: 1;
        height: 200px;
      }
    }
  }
  .regime-system {
    .regime-system-item {
      width: 325px;
      height: 260px;
      background: url('../../../assets/images/integrates/section_bg.png')
        no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      img {
        width: 50px;
        height: 50px;
      }
      > :nth-child(2) {
        margin: 10px 0;
      }
    }
  }
}
</style>