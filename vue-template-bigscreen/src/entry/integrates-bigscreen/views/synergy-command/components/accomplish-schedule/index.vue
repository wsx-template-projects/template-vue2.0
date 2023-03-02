<template>
  <!-- 计划完成进度 -->
  <section class="accomplish">
    <div class="accomplish-schedule">
      <div
        v-for="(item, index) in scheduleData"
        :key="index"
        :style="{ width: item.value * 100 + '%' }"
      ></div>
    </div>
    <div class="accomplish-schedule-label">
      <div
        v-for="(item, index) in scheduleData"
        :key="index"
        :style="{ width: item.value * 100 + '%' }"
      >
        <div class="font22 space-nowrap">{{ item.label }}</div>
        <MyCountTo
          :endVal="Number((item.value * 100).toFixed(2))"
          :decimals="2"
          countToClass="font28"
          suffix="%"
        ></MyCountTo>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  name: 'AccomplishSchedule',
  components: {},
})
export default class AccomplishSchedule extends Vue {
  @Prop({}) private scheduleData!: []
  created() {}
  mounted() {}
}
</script>

<style lang="less" scoped>
.accomplish {
  .space-nowrap {
    white-space: nowrap;
  }
  .accomplish-schedule {
    width: 100%;
    height: 15px;
    border-radius: 8px;
    background: rgb(14, 59, 133);
    display: flex;
    > div {
      width: 0;
      height: 15px;
      transition: all 0.5s linear;
    }
    > :first-child {
      background: linear-gradient(
        0deg,
        #5bbdbe 0%,
        #72fffd 56.00000000000001%,
        #94fdff 100%
      );
      border-radius: 8px 0px 0px 8px;
      border-right: 2px solid #000;
    }
    > :nth-child(2) {
      background: linear-gradient(
        0deg,
        #326bad 0%,
        #4a9df8 56.00000000000001%,
        #4a9df8 100%
      );
      border-right: 2px solid #000;
    }
    > :nth-child(3) {
      background: linear-gradient(
        0deg,
        #4230ad 0%,
        #6043f5 56.00000000000001%,
        #6043f6 100%
      );
      border-radius: 0px 8px 8px 0px;
    }
  }
  .accomplish-schedule-label {
    display: flex;
    position: relative;
    top: -8px;
    > div {
      padding-top: 12px;
    }
    > :first-child {
      color: #79fbfd;
      border-left: 1px solid #7afbfe;
      padding-left: 6px;
    }
    > :nth-child(2) {
      color: #5eadf9;
      border-left: 1px solid rgb(74, 157, 248);
      padding-left: 6px;
      flex: 1;
    }
    > :nth-child(3) {
      text-align: right;
      color: #836cf7;
      border-right: 1px solid #6042f5;
      padding-right: 6px;
      min-width: 18%;
    }
  }
}
</style>
