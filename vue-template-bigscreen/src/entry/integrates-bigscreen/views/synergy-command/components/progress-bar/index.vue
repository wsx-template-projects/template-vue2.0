<template>
  <!-- 计划完成进度 -->
  <section class="progress-bar">
    <div class="progress-bar__content">
      <div class="font24 ellipsis" :title="progressData.label">
        {{ progressData.label }}
      </div>
      <MyCountTo
        :endVal="Number(progressData.value)"
        :decimals="0"
        countToClass="font28"
      ></MyCountTo>
    </div>
    <div
      class="bottom-line"
      :style="{ background: progressData.topLineColor }"
    ></div>
    <div class="progress-box">
      <div class="progress-container">
        <div
          class="progress-value"
          :style="{
            width: progressData.progress * 100 + '%',
            background: progressData.progressColor,
          }"
        >
          <div
            class="triangle"
            :style="{ borderColor: progressData.progressColor }"
          ></div>
        </div>
      </div>
      <div class="last-line"></div>
      <div v-if="isSuffix" class="progress-suffix">
        <MyCountTo
          :endVal="Number((progressData.progress * 100).toFixed(2))"
          :decimals="0"
          countToClass="font24"
          suffix="%"
        ></MyCountTo>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  name: 'ProgressBar',
  components: {},
})
export default class ProgressBar extends Vue {
  @Prop({}) private progressData!: {}
  /** 是否需要后缀 */
  @Prop({ type: Boolean, default: true }) private isSuffix!: boolean

  created() {}
  mounted() {}
}
</script>

<style lang="less" scoped>
.progress-bar {
  &__content {
    display: flex;
    justify-content: space-between;
    .ellipsis {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    > :last-child {
      color: #00fcff;
      margin-left: 10px;
    }
  }
  .bottom-line {
    width: 100%;
    height: 2px;
    margin-bottom: 2px;
  }
  .progress-box {
    display: flex;

    .progress-container {
      flex: 1;
      height: 10px;
      background: rgba(86, 181, 249, 0.2);
      .progress-value {
        width: 0;
        height: 10px;
        position: relative;
        transition: all 0.5s linear;
      }
      .triangle {
        position: absolute;
        top: 10px;
        right: 0;
        width: 0;
        height: 0;
        border: 3px solid #56b5f9;
        border-left-color: #56b5f900 !important;
        border-bottom-color: #56b5f900 !important;
      }
    }
    .last-line {
      width: 2px;
      height: 8px;
      background: #eca963;
      position: relative;
      left: -2px;
      top: -4px;
    }
    .progress-suffix {
      min-width: 54px;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #eca963;
      position: relative;
      > div {
        text-align: center;
        padding: 0 4px;
      }
    }
  }
}
</style>
