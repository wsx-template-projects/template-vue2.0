<template>
  <div class="reform-left">
    <!-- 执法职责体系 -->
    <section class="enforce-law-duty">
      <div class="reform-title pointer" @click="toHref(1)">
        执法职责体系
        <img src="../../../assets/images/integrates/reform-right.png" alt="" />
      </div>
      <div class="item-title margin5-0">执法事项</div>
      <div class="enforce-task">
        <section class="task-item">
          <div v-for="(item, index) in taskItem" :key="index">
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
              <span v-else>{{ item.value || '-' }}</span>
              <span v-if="!isNaN(item.value)" class="font20">{{
                item.unit
              }}</span>
            </div>
          </div>
        </section>
        <section class="task-ech">
          <div class="histogram-box">
            <MyEcharts :option="taskHisOption"></MyEcharts>
          </div>
          <div class="annular-box">
            <div class="annular-label">
              <count-to
                class="color-fdfcfb font32"
                :startVal="0"
                :endVal="Number(this.annularData)"
                :duration="2000"
                :decimals="2"
                suffix="%"
                ref="countRef"
              ></count-to>
            </div>
            <MyEcharts :option="taskAnnularOption"></MyEcharts>
            <div>零办件处罚事项</div>
          </div>
        </section>
        <section class="task-list">
          <div class="task-list-tab">
            <div
              class="task-list-tab-item"
              v-for="(item, index) in taskListTab"
              :key="index"
              :class="{ 'active-tab': tabIndex === item.key }"
              @click="taskTabClick(item.key)"
            >
              {{ item.label }}
            </div>
          </div>
          <div class="task-list-content">
            <vue-seamless-scroll
              :data="taskListData"
              :class-option="defaultOption"
            >
              <div
                class="task-list-content-item"
                v-for="(item, index) in taskListData"
                :key="index"
                :class="{ 'bg-item': index % 2 == 0 }"
                :title="item.value"
              >
                {{ item.value }}
              </div>
            </vue-seamless-scroll>
          </div>
        </section>
      </div>
    </section>
    <!-- 执法队伍体系 -->
    <section class="enforce-law-team">
      <div class="reform-title margin10-0 pointer" @click="toHref(2)">
        执法队伍体系
        <img src="../../../assets/images/integrates/reform-right.png" alt="" />
      </div>
      <div class="team-content">
        <div class="item-title">执法主体</div>
        <div class="enforce-main">
          <div
            v-for="(item, index) in teamListData"
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
                <span v-else>{{ item.value || '-' }}</span>
                <span v-if="!isNaN(item.value)" class="font20">{{
                  item.unit
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="item-title">执法人员</div>
        <div class="enforce-personnel">
          <div
            v-for="(item, index) in personnelListData"
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
                  :decimals="2"
                  ref="countRef"
                ></count-to>
                <span v-else>{{ item.value || '-' }}</span>
                <span v-if="!isNaN(item.value)" class="font20">{{
                  item.unit
                }}</span>
              </div>
            </div>
          </div>
          <div class="pyramid">
            <div class="sheng">省</div>
            <div class="shi">市</div>
            <div class="xian">县</div>
            <div class="xiang">乡</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
/** 数字翻牌器 */
import countTo from 'vue-count-to'
import MyEcharts from './MyEcharts.vue'
import vueSeamlessScroll from 'vue-seamless-scroll' // vue2引入方式
export default {
  name: 'ReformLeft',
  components: { countTo, MyEcharts, vueSeamlessScroll },
  props: {
    param: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      taskItem: [],
      tabIndex: 'gpl', // 事项tab
      taskListTab: [
        {
          key: 'gpl',
          label: '高频率事项',
        },
        {
          key: 'gzh',
          label: '高综合事项',
        },
        {
          key: 'gxq',
          label: '高需求事项',
        },
      ],
      taskListData: [],
      teamListData: [],
      taskHisOption: {}, // 事项柱状图
      taskAnnularOption: {}, // 事项环形图
      annularData: 0,
      personnelListData: [],
      allData: [], // 全部数据
      taskListAllData: {}, // 事项列表全部数据
      interval: null,
    }
  },
  computed: {
    defaultOption() {
      return {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      }
    },
  },
  watch: {
    param(e) {
      console.log('reform-left', e)
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
      this.annularData = 0
      this.$nextTick(() => {
        this.getTaskEcharts()
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
      this.getTaskData()
      this.getTeamData()
      this.getTaskListData()
      this.getTaskEcharts()
    },
    /**
     * 获取执法事项数据
     */
    getTaskData() {
      const data = this.allData
      this.taskItem = [
        {
          label: '行政检查',
          value: this.filterData(data, '行政检查'),
          unit: '项',
        },
        {
          label: '行政处罚',
          value: this.filterData(data, '行政处罚'),
          unit: '项',
        },
        {
          label: '行政强制',
          value: this.filterData(data, '行政强制'),
          unit: '项',
        },
        {
          label: '其他事项',
          value: this.filterData(data, '其他事项'),
          unit: '项',
        },
      ]
    },
    /**
     * 获取事项列表数据
     */
    async getTaskListData() {
      let params = {
        placeCode: 'DZH-GG',
        placeAreaCode: 'DZH-GG-ZB',
        param: {
          areacode: '33',
          item_position: '事项列表',
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
      const keyList = [
        {
          key: 'gpl',
          label: '高频率',
        },
        {
          key: 'gzh',
          label: '高综合',
        },
        {
          key: 'gxq',
          label: '高需求',
        },
      ]
      const taskData = {}
      keyList.forEach((elem) => {
        taskData[elem.key] = data.filter(
          (item) =>
            item.item_position == '事项列表' &&
            item.itemcode.indexOf(elem.label) > -1,
        )
      })
      this.taskListAllData = taskData
      this.taskTabClick(this.tabIndex)
    },
    /**
     * 获取事项echarts数据
     */
    getTaskEcharts() {
      const data = this.allData
      const hisXAxis = ['综合执法事项', '专业执法事项', '乡镇执法事项']
      const seriesData = [
        this.filterData(data, '综合执法事项'),
        this.filterData(data, '专业执法事项'),
        this.filterData(data, '乡镇执法事项'),
      ]
      this.taskHisOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
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
            axisTick: {
              alignWithLabel: true,
            },
            // 坐标轴刻度标签的相关设置
            axisLabel: {
              interval: 0,
              fontSize: 14,
              color: '#ccc',
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
            },
            // 坐标轴两边留白策略
            boundaryGap: ['30%', '30%'],
            // 坐标轴数据
            data: hisXAxis,
          },
        ],
        yAxis: {
          type: 'value',
          position: 'left',
          axisLine: {
            show: true,
            lineStyle: {
              type: 'solid',
              color: 'rgba(255, 255, 255,0.7)',
            },
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
            },
          },
          // 坐标轴刻度相关设置
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            name: '事项数',
            type: 'bar',
            barWidth: '40%',
            data: seriesData,
            itemStyle: {
              //每个柱单独颜色
              normal: {
                color: function (params) {
                  var colorlist = ['#FF683D', '#FFE1F3', '#55C0C4']
                  return colorlist[params.dataIndex]
                },
              },
            },
            label: {
              show: true,
              position: 'top',
            },
          },
        ],
      }
      this.annularData = this.filterData(data, '零办件处罚事项占比')
      this.taskAnnularOption = {
        polar: {
          radius: ['80%', '68%'],
          center: ['50%', '50%'],
        },
        angleAxis: {
          max: 100,
          show: false,
          startAngle: 90, // 开始角度
        },
        radiusAxis: {
          type: 'category',
          show: true,
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            name: '',
            type: 'bar',
            roundCap: true,
            barWidth: 60,
            showBackground: true,
            data: [this.annularData],
            coordinateSystem: 'polar',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  {
                    offset: 0,
                    color: '#faad14',
                  },
                  {
                    offset: 1,
                    color: '#faad14',
                  },
                ]),
              },
            },
          },
        ],
      }
    },
    /**
     * 执法队伍体系
     */
    getTeamData() {
      const data = this.allData
      this.teamListData = [
        {
          icon: require('../../../assets/images/reform/zfztzs.svg'),
          label: '执法主体总数',
          value: this.filterData(data, '执法主体总数'),
          unit: '个',
        },
        {
          icon: require('../../../assets/images/reform/fqxz.svg'),
          label: '其中赋权乡镇',
          value: this.filterData(data, '其中赋权乡镇'),
          unit: '个',
        },
        {
          icon: require('../../../assets/images/reform/zfdwzs.svg'),
          label: '执法队伍总数',
          value: this.filterData(data, '执法队伍总数'),
          unit: '个',
        },
        {
          icon: require('../../../assets/images/reform/jjdws.svg'),
          label: '已精简队伍数',
          value: this.filterData(data, '已精简队伍数'),
          unit: '个',
        },
      ]
      this.personnelListData = [
        {
          icon: require('../../../assets/images/reform/zfry.svg'),
          label: '执法人员总数',
          value: this.filterData(data, '执法人员总数') / 10000,
          unit: '万人',
        },
      ]
    },
    /** */
    taskTabClick(e) {
      this.tabIndex = e
      this.taskListData = this.taskListAllData[e]
    },
    /**
     * 跳转
     */
    toHref(e) {
      let href = ''
      switch (e) {
        //   执法职责体系
        case 1:
          href =
            'https://datav.aliyuncs.com/share/a2f0f3cba7fd39fe65c16797955ebc79'
          break
        //   执法队伍体系
        case 2:
          href =
            'https://datav.aliyuncs.com/share/b3376f1e65b431049104248ce0a4e863'
          break
      }
      window.open(href)
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
.color-fdfcfb {
  color: #fdfcfb;
}
.reform-left {
  width: 660px;
  height: 100%;
  max-height: 1280px;
  color: #fdfcfb;
  .margin5-0 {
    margin: 5px 0px;
  }
  .margin10-0 {
    margin: 10px 0px;
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
  .enforce-law-duty {
    .enforce-task {
      width: 100%;
      height: 530px;
      background: url('../../../assets/images/integrates/section_bg.png')
        no-repeat;
      background-size: 100% 100%;
      padding: 16px 14px;
    }
    .task-item {
      font-size: 24px;
      display: flex;
      justify-content: space-around;
    }
    .task-ech {
      width: 100%;
      height: 210px;
      display: flex;
      margin-top: 8px;
      .histogram-box {
        width: 365px;
        background: rgba(0, 57, 138, 0.5);
        margin-right: 5px;
        > :first-child {
          width: 350px;
          height: 180px;
        }
      }
      .annular-box {
        flex: 1;
        background: rgba(0, 57, 138, 0.5);
        text-align: center;
        color: #f3ecec;
        font-size: 24px;
        position: relative;
        /deep/.my-echarts {
          width: 100%;
          height: 170px;
          margin: auto;
        }
        .annular-label {
          position: absolute;
          width: 140px;
          height: 140px;
          left: 50%;
          margin-left: -70px;
          top: 16px;
          text-align: center;
          line-height: 140px;
        }
      }
    }
    .task-list {
      margin-top: 10px;
      .task-list-tab {
        display: flex;
        &-item {
          width: 120px;
          height: 42px;
          text-align: center;
          line-height: 42px;
          border-bottom: 2px solid rgba(255, 255, 255, 0);
          font-size: 16px;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
        }
        &-item:hover {
          background: #0a73ff;
          font-size: 20px;
          font-weight: 600;
          color: #fff;
        }
        .active-tab {
          background: #0a73ff;
          font-size: 20px;
          font-weight: 600;
          color: #fff;
          border-bottom-color: #fff;
        }
      }
      .task-list-content {
        height: 160px;
        overflow: hidden;
        &-item {
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          padding: 0 6px;
        }
        .bg-item {
          background: rgba(160, 160, 160, 0.09);
        }
      }
    }
  }
  .enforce-law-team {
    .team-content {
      width: 100%;
      height: 530px;
      background: url('../../../assets/images/integrates/section_bg.png')
        no-repeat;
      background-size: 100% 100%;
    }
    .enforce-main {
      width: 100%;
      height: 220px;
      display: flex;
      padding: 0 5px;
      justify-content: space-around;
      flex-wrap: wrap;
      .team-list {
        width: 310px;
        height: 100px;
        margin: 4px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 57, 138, 0.5);
        font-size: 24px;

        img {
          width: 50px;
          height: 50px;
          margin-right: 12px;
        }
      }
    }
    .enforce-personnel {
      width: 100%;
      height: 200px;
      display: flex;
      align-items: center;
      .pyramid {
        position: relative;
        width: 215px;
        height: 164px;
        background: url('../../../assets/images/reform/jinzita.png') no-repeat;
        background-size: 100% 100%;
        color: #f3ecec;
        font-size: 18px;
        > div {
          position: absolute;
        }
        .sheng {
          top: 24px;
          left: 106px;
        }
        .shi {
          top: 58px;
          left: 120px;
        }
        .xian {
          top: 90px;
          left: 134px;
        }
        .xiang {
          top: 124px;
          left: 148px;
        }
      }
      .team-list {
        width: 310px;
        height: 100px;
        margin: 4px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;

        img {
          width: 50px;
          height: 50px;
          margin-right: 20px;
        }
      }
    }
  }
}
</style>