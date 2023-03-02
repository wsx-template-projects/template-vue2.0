<template>
  <div class="polo-container">
    <BaseEcharts :options="options" />
  </div>
</template>

<script>
export default {
  name: 'Polo',
  props: ['value'],
  components: {},
  data() {
    return {
      options: {
        backgroundColor: 'transparent',
        title: {
          show: false,
        },
        graphic: [],
        series: [
          {
            name: '水球图',
            type: 'liquidFill',
            radius: '99%',
            // center: ["50%", "55%"],
            // waveAnimation: 5, // 动画时长
            // amplitude: 10, // 振幅
            data: [this.value, this.value],
            color: [
              {
                type: 'linear',
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 1,
                    color: ['rgba(2,144,255,0.8)'], // 0% 处的颜色
                  },
                  {
                    offset: 0,
                    color: ['rgba(45,175,230,0.1)'], // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            ],
            /** 背景 */
            backgroundStyle: {
              color: 'rgba(255,255,255,0)',
            },
            label: {
              formatter: '',
            },
            outline: {
              show: true,
              borderDistance: 5,
              itemStyle: {
                borderColor: '#54B1F9',
                borderWidth: 3,
              },
            },
          },
        ],
      },
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style lang="less" scoped>
.polo-container {
  width: 100%;
  height: 100%;
}
</style>
