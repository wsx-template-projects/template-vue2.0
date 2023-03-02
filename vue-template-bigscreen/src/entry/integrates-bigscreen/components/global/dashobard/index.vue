<template>
  <div class="container">
    <DashboardContainer
      :data-source="dataSource"
      :value="getValue()"
    />
    <div class="label-box">
      <div
        v-for="(ele, index) in dataSource.totalLabel.split('\n')"
        :key="index"
      >
        <div class="total-label">{{ ele }}</div>
      </div>
      <div class="value">
        <MyCountTo
          :end-val="dataSource.value"
          :is-bold="true"
        />
      </div>
      <div class="label">{{ dataSource.label }}</div>
    </div>
  </div>
</template>

<script>
import DashboardContainer from './dashboard.vue'

export default {
  name: 'Dashboard',
  props: {
    dataSource: {
      type: Object,
      default: () => ({}),
    },
  },
  components: { DashboardContainer },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    getValue() {
      const { value = 0, total = 1 } = this.dataSource
      return +(value / total).toFixed(2) * 100 || 0
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  position: relative;
  .label-box {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    text-align: center;
    bottom: 15px;
    .total-label {
      font-size: 14px;
      font-weight: 400;
      color: #ffffff;
      line-height: 18px;
    }
    .value {
      margin-top: 15px;
      font-size: 30px;
      font-weight: 600;
      color: #ffffff;
      line-height: 33px;
      background: linear-gradient(
        180deg,
        #ffffff 0%,
        #ffffff 55.2734375%,
        #00fcff 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .label {
      margin-top: 8px;
      font-size: 22px;
      font-weight: 400;
      color: #ffffff;
      line-height: 18px;
    }
  }
}
</style>
