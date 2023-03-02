<template>
  <div class="sg-page page-reform-top">
    <div class="center-top-area-scroller">
      <div
        class="top-scroller-item"
        @mouseover="mouseover()"
        @mouseout="mouseout()"
      >
        <!--         @mouseover="mouseover()"
        @mouseout="mouseout()" -->
        <p
          v-for="(item, index) in topCenterArr"
          :key="item.idx"
          :style="topStyleArr[index]"
          class="pointer"
          :class="item.class"
          v-html="item.name"
          @click="itemClick(item.idx)"
        ></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IntegratesReformTopOne',
  components: {},
  props: {},
  data() {
    return {
      topStyleArr: [
        'transform: translateX(-50%) scale(1);left: 38%; bottom: -28%;',
        'transform: translateX(-50%) scale(0.825);left: 80%; bottom: -13%;',
        'transform: translateX(-50%) scale(0.575);left: 65%; bottom: 7%;',
        'transform: translateX(-50%) scale(0.575);left: 17%; bottom: 7%;',
        'transform: translateX(-50%) scale(0.825);left: -20%; bottom: -13%;',
      ],
      topCenterArr: [
        {
          idx: 1,
          name: `
          <div>“金字塔型”</div>
          <div>的执法</div>
          <div>队伍体系</div>
          `,
          class: 'img1',
        },
        {
          idx: 2,
          name: `
          <div>权责统一</div>
          <div>的执法</div>
          <div>职责体系</div>
          `,
          class: 'img2',
        },
        {
          idx: 3,
          name: `
          <div>权威高效</div>
          <div>的执法</div>
          <div>制度体系</div>
          `,
          class: 'img3',
        },
        {
          idx: 4,
          name: `
          <div>有力有效</div>
          <div>的执法制</div>
          <div>约监督体系</div>
          `,
          class: 'img4',
        },
        {
          idx: 5,
          name: `
          <div>科学规范</div>
          <div>的执法</div>
          <div>方式方法体系</div>
          `,
          class: 'img5',
        },
      ],
      interval: null,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.interval = setInterval(() => {
      this.topStyleArr.push(this.topStyleArr[0])
      this.topStyleArr.shift()
    }, 4000)
  },
  methods: {
    /** 鼠标移入 */
    mouseover() {
      clearInterval(this.interval)
    },
    /** 鼠标移出 */
    mouseout() {
      this.interval = setInterval(() => {
        this.topStyleArr.push(this.topStyleArr[0])
        this.topStyleArr.shift()
      }, 4000)
    },
    /**
     * 点击
     */
    itemClick(e) {
      switch (e) {
        //   执法队伍体系
        case 1:
          window.open(
            'https://datav.aliyuncs.com/share/b3376f1e65b431049104248ce0a4e863',
            '_blank',
          )
          break
        //   执法职责体系
        case 2:
          window.open(
            'https://datav.aliyuncs.com/share/a2f0f3cba7fd39fe65c16797955ebc79',
            '_blank',
          )
          break
        //   执法制度体系
        case 3:
          window.open(
            'https://datav.aliyuncs.com/share/a16f6a345274a543d8b368144184a343',
            '_blank',
          )
          break
        //  执法制约监督体系
        case 4:
          window.open(
            'http://zfjd.zjsft.gov.cn/enforcement/workbench',
            '_blank',
          )
          break
        //   方式方法体系
        case 5:
          window.open(
            'https://datav.aliyuncs.com/share/fa8c029cf293c9e20a16b30080b0341e',
            '_blank',
          )
          break
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
}
</script>

<style lang="less" scoped>
.page-reform-top {
  .center-top-area-scroller {
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
  }
  .top-scroller-item {
    width: 100%;
    height: 110%;
    background: url('../../../assets/images/integrates/gp.png') no-repeat;
    background-size: 100%;
    position: relative;
    z-index: 3;
    p {
      width: 240px;
      height: 205px;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      font-size: 28px;
      text-align: center;
      margin: auto;
      box-sizing: border-box;
      background: url('../../../assets/images/integrates/reform-item-bg.png')
        no-repeat;
      background-size: 240px 240px;
      padding-top: 30px;
      transition: all 0.5s ease-in-out;
    }
  }
}
</style>
