<template>
  <div class="container">
    <Polo :value="value" />
    <div class="label-value">
      <div class="value">
        <MyCountTo
          :end-val="value * 100"
          :decimals="2"
          :is-bold="true"
          unit="%"
        />
      </div>
      <div class="label">{{label}}</div>
    </div>
  </div>
</template>

<script>
import Polo from './polo.vue'
export default {
  name: 'PoloCharts',
  props: ['value','label'],
  components: { Polo },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  .label-value {
    position: absolute;
    width: 100%;
    left: 50%;
    transform: translate(-50%);
    top: 40%;
    text-align: center;

    .value {
      font-size: 28px;
      font-weight: 600;
      color: #ffffff;
      background: linear-gradient(180deg, #00fcff 0%, #ffffff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .label {
      margin-top: 10px;
      font-size: 20px;
      font-weight: 400;
      color: #ffffff;
    }
  }
}
</style>
