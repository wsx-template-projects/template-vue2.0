<template>
  <div class="clue-source">
    <div class="echarts-box">
      <BaseEcharts class="clue-source__ech" :options="clueOption"></BaseEcharts>
      <div class="echarts-line">
        <div class="font20">线索来源</div>
        <MyCountTo
          class="font32 count-color"
          :endVal="Number(sourceSum)"
          :isBold="true"
        ></MyCountTo>
      </div>
    </div>
    <div class="clue-source__content">
      <div
        class="content-item"
        v-for="(item, index) in clueSourceData"
        :key="index"
      >
        <div :style="{ background: item.color }"></div>
        <div class="font20 mr10">{{ item.name }}</div>
        <!-- <div class="mr10">{{ item.value }}</div> -->
        <MyCountTo class="mr10" :endVal="Number(item.value)"></MyCountTo>
        <MyCountTo
          class="mr10"
          :endVal="Number((item.proportion * 100).toFixed(0))"
          suffix="%"
        ></MyCountTo>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
@Component({
  name: 'ClueSource',
  components: {},
})
export default class ClueSource extends Vue {
  public clueOption = {}
  @Prop({}) private clueSource!: any[]
  public sourceSum = 0
  public clueSourceData: any[] = []
  @Watch('clueSource') clueSourceChange() {
    this.getClueOption()
  }
  private getClueOption() {
    const data = this.clueSource
    let lastProportion = 1
    let sum = 0
    const colorData: any[] = []
    data.forEach((elem: any) => {
      sum += Number(elem.value)
      colorData.push(elem.color)
    })
    this.sourceSum = sum
    data.forEach((elem: any, index: any) => {
      if (index == data.length - 1) {
        index == data.length - 1 && (elem.proportion = lastProportion)
      } else {
        elem.proportion = (elem.value / sum).toFixed(2)
        lastProportion -= elem.proportion
      }
    })
    this.clueOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      series: [
        {
          name: '线索来源',
          type: 'pie',
          selectedMode: 'single',
          radius: ['60%', '85%'],
          label: {
            show: false,
            position: 'inner',
            fontSize: 14,
          },
          labelLine: {
            show: false,
          },
          itemStyle: {
            borderColor: 'rgba(12, 60, 195)',
            borderWidth: 2,
          },
          data: this.clueSource,
          selectedOffset: 5,
          hoverOffset: 5,
          color: colorData,
        },
      ],
    }
    this.clueSourceData = data
  }
  created() {}
  mounted() {
    this.getClueOption()
  }
}
</script>

<style lang="less" scoped>
.clue-source {
  width: 100%;
  height: 220px;
  display: flex;
  align-items: center;
  .echarts-box {
    width: 200px;
    height: 200px;
    position: relative;
    .echarts-line {
      width: 106px;
      height: 106px;
      border: 2px solid #418af7;
      opacity: 0.8;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: calc(50% - 53px);
      top: calc(50% - 53px);
    }
  }
  &__ech {
    width: 200px;
    height: 200px;
  }
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .content-item {
      display: flex;
      align-items: center;
      font-size: 28px;
      padding: 5px 0;
      > :first-child {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        margin-right: 6px;
      }
    }
  }
  .count-color {
    background: linear-gradient(180deg, #00fcff 0%, #ffffff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
