<template>
  <div class="table-list">
    <header class="table-list__header">
      <div>序号</div>
      <div v-for="(item, index) in tableListData.header" :key="index">
        {{ item }}
      </div>
    </header>
    <section
      class="table-list__content"
      :style="{ height: showCount * 40 + 'px' }"
    >
      <template
        v-if="tableListData.content && tableListData.content.length > 0"
      >
        <vueSeamlessScroll
          v-if="isScroll"
          :data="tableListData.content"
          :class-option="defaultOption"
        >
          <div
            class="content-item"
            v-for="(item, index) in tableListData.content"
            :key="index"
          >
            <div>{{ index + 1 }}</div>
            <div v-for="(elem, i) in tableListData.porp" :key="i">
              {{ item[elem] || '-' }}
            </div>
          </div>
        </vueSeamlessScroll>
        <div
          v-else
          class="content-item"
          v-for="(item, index) in tableListData.content"
          :key="index"
        >
          <div>{{ index + 1 }}</div>
          <div v-for="(elem, i) in tableListData.porp" :key="i">
            {{ item[elem] || '-' }}
          </div>
        </div>
      </template>
      <template v-else> <span class="font18">暂无数据</span> </template>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
// @ts-ignore
import vueSeamlessScroll from 'vue-seamless-scroll' // vue2引入方式
@Component({
  name: 'TableList',
  components: { vueSeamlessScroll },
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
})
export default class TableList extends Vue {
  /** 是否需要序号 */
  @Prop({ type: Boolean, default: true }) private isIndex!: boolean
  @Prop({ type: Boolean, default: true }) private isScroll!: boolean
  @Prop() private tableListData!: {}
  @Prop({ type: Number, default: 3 }) private showCount!: number
  created() {}
  mounted() {}
}
</script>

<style lang="less" scoped>
.table-list {
  width: 100%;
  &__header {
    width: 100%;
    height: 46px;
    background: rgba(0, 143, 255, 0.4);
    color: #ffffff;
    font-size: 20px;
    display: flex;
    line-height: 46px;
    > *:not(:first-child) {
      flex: 1;
      padding: 0 20px;
      text-align: center;
    }
    > :first-child {
      width: 80px;
      text-align: center;
    }
  }
  &__content {
    overflow: hidden;
    border: 2px solid rgba(0, 145, 255, 0.3);
    border-top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .content-item {
      display: flex;
      height: 40px;
      line-height: 40px;
      background: rgba(0, 145, 255, 0.25);
      font-size: 18px;
      > *:not(:first-child) {
        flex: 1;
        padding: 0 20px;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      > :first-child {
        width: 80px;
        text-align: center;
      }
    }
    .content-item:nth-of-type(odd) {
      background: rgba(0, 145, 255, 0);
    }
  }
}
</style>
