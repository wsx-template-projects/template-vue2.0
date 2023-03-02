<template>
  <div class="container">
    <div class="dashboard-container">
      <Dashboard
        v-for="(item, index) in dataSource"
        :data-source="item"
        :key="index"
      />
    </div>
    <div class="polo-container">
      <PoloCharts :value="0.5" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'EchartsDemo',
  props: {},
  components: {},
  data() {
    return {
      dataSource: [
        {
          label: '联合执法',
          value: 1241,
          total: 3000,
          totalLabel: '近一年\n累计总数',
        },
        {
          label: '联合执法',
          value: 1241,
          total: 3000,
          totalLabel: '累计总数',
        },
        {
          label: '联合执法',
          value: 1241,
          total: 3000,
          totalLabel: '累计总数',
        },
      ],
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
.container {
  .dashboard-container {
    display: flex;
    justify-content: space-between;
  }
  .polo-container {
    width: 170px;
    height: 170px;
  }
}
</style>
