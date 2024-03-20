<template>
  <!-- Echarts map components-->
  <div>
    <div class="echarts-map" ref="echMap"></div>
    <div class="back-map map_title_img">
      <img src="../../../assets/images/position.png" alt="" />
      <section class="breadcrumb">
        <div
          v-for="(item, index) in breadcrumb"
          :key="index.vue"
          @click="breadcrumbClick(item)"
          class="breadcrumb__item"
        >
          <span :class="{ 'breadcrumb-text': index != breadcrumb.length - 1 }">
            {{ item }}
          </span>
          <span v-if="index != breadcrumb.length - 1"> > </span>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getArea } from './JS/areaMap.js'
export default {
  name: 'EchartsMap',
  components: {},
  props: {
    /**
     *  地图数据
     * @param {Array}--
     * [{
     * name:'杭州',
     * value:'xxx',
     * mapData:'',  // 浮窗内数据都存放在这里
     * }]
     */
    mapData: {
      type: Array,
      default: () => [],
    },
    /**
     * 地图浮窗数据字段
     * @param {Array}--
     * [{
     * label: '机构数：',
     * key: 'value',
     * unit: '个',
     * }]
     */
    formatterData: {
      type: Array,
      default: () => [],
    },
    /** 是否需要下钻 */
    isDescend: {
      type: Boolean,
      default: true,
    },
    /** 是否需要下钻并且点击 */
    isDescendAndClick: {
      type: Boolean,
      default: true,
    },
    /** */
    isShowTooltip: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      zhejiangMap: require('../../../assets/map/zhejiang.json'),
      areaCodeJson: require('../../../assets/map/areaCode.json'),
      mTime: null, // 存放定时器
      mapIndex: 0, // 当前轮播下标
      cityName: '', // 当前地区
      /** 是否需要高亮轮播---下钻后为false */
      isMapActive: true,
      atPresentMap: null, // 当前地图JSON
      breadcrumb: ['浙江'], // 地图面包屑导航
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    clearInterval(this.mTime)
    this.drawMapCharts()
  },
  methods: {
    /**
     * 地图数据处理
     */
    drawMapCharts(cityName) {
      let myChart = echarts.init(this.$refs.echMap)
      let mapJson = [
        {
          name: '杭州',
          json: require('../../../assets/map/hangzhou.json'),
        },
        {
          name: '湖州',
          json: require('../../../assets/map/huzhou.json'),
        },
        {
          name: '嘉兴',
          json: require('../../../assets/map/jiaxing.json'),
        },
        {
          name: '宁波',
          json: require('../../../assets/map/ningbo.json'),
        },
        {
          name: '绍兴',
          json: require('../../../assets/map/shaoxing.json'),
        },
        {
          name: '衢州',
          json: require('../../../assets/map/quzhou.json'),
        },
        {
          name: '金华',
          json: require('../../../assets/map/jinhua.json'),
        },
        {
          name: '台州',
          json: require('../../../assets/map/taizhou.json'),
        },
        {
          name: '丽水',
          json: require('../../../assets/map/lishui.json'),
        },
        {
          name: '温州',
          json: require('../../../assets/map/wenzhou.json'),
        },
        {
          name: '舟山',
          json: require('../../../assets/map/zhoushan.json'),
        },
      ]
      /** 处理地区JSON */
      let mapJsonName = cityName
        ? mapJson.filter((element) => element.name == cityName)[0].json
        : ''
      let mapnameJson = mapJsonName || this.zhejiangMap
      let arrName = [
        '杭州',
        '湖州',
        '嘉兴',
        '宁波',
        '绍兴',
        '衢州',
        '金华',
        '台州',
        '丽水',
        '温州',
        '舟山',
      ]
      myChart.on('click', (e) => {
        //   是否需要下钻
        if (!this.isDescend) return
        //   是否需要下钻并且点击
        if (!this.isDescendAndClick) return
        // 获取当前点击区域的 区划编码并且回传
        const areaObj = JSON.parse(
          JSON.stringify(this.getAreaCodeJson(e.name)[0]),
        )
        if (this.breadcrumb.length >= 3) this.breadcrumb.pop()
        this.breadcrumb.push(e.name)
        let chooseName = mapJson.filter((item) => {
          return item.name == e.name
        })
        if (arrName.includes(e.name)) {
          this.$emit('update:areaMap', areaObj)
          mapnameJson = chooseName[0].json
          this.cityName = chooseName[0].name
          this.mapAreaChecked = [e.value] // 联动地区下拉
          this.atPresentMap = mapnameJson
          this.switchData(mapnameJson, myChart, this.cityName)
        } else {
          const areaMapJSON = JSON.parse(JSON.stringify(areaObj))
          console.log(areaMapJSON)
          ;[areaMapJSON.areacode, areaMapJSON.code] = [
            areaMapJSON.code,
            areaMapJSON.areacode,
          ]
          this.$emit('update:areaMap', areaMapJSON)
          this.clearAll()
          // 当前下标高亮
          console.log(e.dataIndex)
          myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: e.dataIndex,
          })
        }
      })
      /** 鼠标移入 */
      myChart.on('mouseover', (e) => {
        if (!this.isMapActive) return
        // 停止定时器，清除之前的高亮
        clearInterval(this.mTime)
        this.clearAll()
        // 当前下标高亮
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: e.dataIndex,
        })
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: e.dataIndex,
        })
        this.mapIndex = e.dataIndex
      })
      /** 鼠标划出重新定时器开始 */
      myChart.on('mouseout', (e) => {
        if (!this.isMapActive) return
        this.mapActive(true)
      })
      setTimeout(() => {
        this.atPresentMap = mapnameJson
        this.mapInit(mapnameJson, myChart, this.cityName ? 16 : 28)
      }, 1000)

      this.myChart = myChart
    },
    /**
     * 地区下钻的方法
     */
    async switchData(mapnameJson, myChart, cityName) {
      /** 清除定时轮播 */
      this.clearAll()
      clearInterval(this.mTime)
      this.isMapActive = false
      this.$nextTick(() => {
        this.mapInit(mapnameJson, myChart, cityName ? 16 : 28)
      })
    },
    /**
     * 返回浙江
     */
    backMapClick() {
      //   浙江
      let zhejiangMap = this.zhejiangMap
      clearInterval(this.mTime)
      this.cityName = ''
      this.switchData(zhejiangMap, this.myChart, this.cityName)
      this.$emit('update:areaMap', {
        value: '浙江省',
        code: '330000',
        areacode: '33',
      })
      this.isMapActive = true
    },
    /**
     * echarts地图初始化
     */
    mapInit(mapnameJson, myChart, fontSize) {
      let mapData = []
      if (this.isMapActive) {
        mapData = this.mapData
      } else {
        const newMapData = getArea(this.cityName, true)
        newMapData.forEach((elem) => {
          elem.value = this.getRandomValue(300)
        })
        mapData = newMapData
      }
      let max = 0,
        min = 0
      console.log(JSON.parse(JSON.stringify(mapData)))
      mapData.forEach((elem, index) => {
        if (index == 0) {
          max = elem.value
          min = elem.value
        } else {
          max = Number(elem.value) > Number(max) ? elem.value : max
          min = Number(elem.value) < Number(min) ? elem.value : min
        }
      })
      echarts.registerMap('zhejiang', mapnameJson)
      let option = {
        tooltip: {
          show: this.isShowTooltip,
          trigger: 'item',
          //   padding: 20,
          // backgroundColor: 'rgba(7, 16, 74, 0.8)', //提示框背景颜色
          //   extraCssText: 'box-shadow: 0 0px 10px 1px #00d2ff inset', //提示框阴影
          backgroundColor: 'rgba(7, 16, 74, 0)', //提示框背景颜色
          textStyle: {
            color: '#fff',
          },
          formatter: (params) => {
            if (!this.isMapActive) return
            const mapData = params.data.mapData
            const data = this.formatterData
            let str = `
            <div class="map-tooltip">
                <div class="tooltip-name">${params.name}</div>
            `
            data.forEach((elem) => {
              str += `
            <div class="tooltip-item">
                <div>${elem.label}</div>
                <div>${mapData[elem.key]}</div>
                <div>${elem.unit || ''}</div>
            </div>
              `
            })
            str += `</div>`
            return str
          },
        },
        // 阴影
        geo: {
          map: 'zhejiang',
          aspectScale: 0.8, //长宽比
          zoom: 1.2,
          roam: false,
          itemStyle: {
            normal: {
              areaColor: '#011658',
              shadowColor: '#011658',
              shadowOffsetX: 0,
              shadowOffsetY: 25,
            },
            emphasis: {
              areaColor: '#011658',
              borderWidth: 0,
              color: 'green',
              label: {
                show: false,
              },
            },
          },
        },
        visualMap: {
          min,
          max,
          show: false,
          left: '3%',
          bottom: '5%',
          calculable: true,
          seriesIndex: [0],
          inRange: {
            color: ['rgb(61, 207, 255)', 'rgba(39, 59, 255,0.7)'],
            // color: ['rgb(0, 128, 199)'],
          },
          textStyle: {
            color: '#24CFF4',
          },
        },
        series: [
          {
            type: 'map',
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#fff',
                  fontSize: fontSize,
                  //   fontWeight: 600,
                },
              },
              /** 地图高亮时文字样式 */
              emphasis: {
                textStyle: {
                  color: '#fff',
                  fontWeight: 600,
                },
              },
            },
            itemStyle: {
              normal: {
                borderColor: '#00EAEA',
                borderWidth: 2,
                areaColor: 'rgba(2, 255, 255, 0.3)',
              },
              /** 地图高亮时区块样式 */
              emphasis: {
                areaColor: 'rgba(0, 255, 240, 1)',
                borderWidth: 2,
                color: 'green',
              },
            },
            zoom: 1.2,
            aspectScale: 0.8, //长宽比
            roam: false,
            map: 'zhejiang', //使用
            data: mapData, //区域数据
          },
        ],
      }
      myChart.setOption(option)
      if (this.isMapActive) this.mapActive()
    },
    /**
     * 高亮轮播
     */
    mapActive(isMouseout = false) {
      this.clearAll()
      //   浙江
      let zhejiangMap = this.zhejiangMap
      const dataLength = zhejiangMap.features.length
      //   当前下标高亮
      if (!isMouseout) {
        this.myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: this.mapIndex,
        })
        this.myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: this.mapIndex,
        })
        this.mapIndex++
      }
      // 用定时器控制高亮
      this.mTime = setInterval(() => {
        // console.log('dataLength', dataLength, this.mapIndex)

        // 清除之前的高亮
        if (this.mapIndex == 0) {
          this.myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: dataLength - 1,
          })
        } else {
          this.myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: this.mapIndex - 1,
          })
        }

        // 当前下标高亮
        this.myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: this.mapIndex,
        })
        this.myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: this.mapIndex,
        })

        if (this.mapIndex >= dataLength - 1) {
          this.mapIndex = 0
        } else {
          this.mapIndex++
        }
      }, 5000)
    },
    /**
     * 清除全部高亮
     */
    clearAll() {
      const mapJson = this.atPresentMap
      //   浙江
      const dataLength = mapJson.features.length
      for (let i = 0; i < dataLength; i++) {
        this.myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: i,
        })
      }
    },
    /**
     * 获取地区areacode
     */
    getAreaCodeJson(areaName) {
      const areaCodeJson = this.areaCodeJson
      return areaCodeJson.filter((item) => {
        return item.value.indexOf(areaName) > -1
      })
    },
    /**
     * 面包屑点击
     */
    breadcrumbClick(e) {
      switch (e) {
        case '浙江':
          this.breadcrumb = ['浙江']
          this.backMapClick()
          break
        default:
          this.breadcrumb.pop()
          const areaMapJSON = JSON.parse(
            JSON.stringify(this.getAreaCodeJson(e)[0]),
          )
          this.$emit('update:areaMap', areaMapJSON)
          this.clearAll()
      }
    },
    /**
     * 获取随机数
     * @param scope 获取范围
     */
    getRandomValue(scope) {
      return parseInt(Math.random() * scope)
    },
  },
}
</script>

<style lang="less" scoped>
.back-map {
  position: absolute;
  top: 20px;
  left: 1%;
  img {
    width: 36px;
    height: 40px;
  }
  .breadcrumb {
    color: #f3ecec;
    font-size: 28px;
    display: flex;
    align-items: center;
    .breadcrumb__item {
      margin-left: 8px;
    }
    .breadcrumb-text {
      color: #01e6e9;
      cursor: pointer;
    }
  }
}
.map_title_img {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .map_title_img_text {
    margin-left: 8px;
  }
}
.echarts-map {
  width: 100%;
  height: 100%;
  position: relative;
}
// 地图浮窗
.echarts-map /deep/ .map-tooltip {
  min-width: 280px;
  background: url('../../../assets/images/reform/map_tooltip.png') no-repeat;
  background-size: 100% 100%;
  padding: 20px;
  padding-bottom: 40px;
  .tooltip-name {
    width: 93%;
    height: 46px;
    font-size: 24px;
    line-height: 46px;
    text-align: center;
    position: relative;
    margin: 0 auto;
    margin-bottom: 12px;
    border-bottom: 1px solid rgb(0, 246, 255);
  }
  .tooltip-item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: left;
    font-size: 20px;
    padding: 10px;
    > :nth-child(2) {
      font-size: 22px;
      //   color: #6bff5b;
      color: rgb(0, 246, 255);
    }
    > :last-child {
      margin-left: 2px;
    }
  }
}
</style>
<style lang="less" >
</style>