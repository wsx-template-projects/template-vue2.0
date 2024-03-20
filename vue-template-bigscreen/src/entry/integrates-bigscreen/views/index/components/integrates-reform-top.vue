<template>
  <!-- 废弃 -->
  <div class="sg-page page-reform-top">
    <div class="center-top-area-scroller">
      <div class="top-scroller-item">
        <ul class="animation-box">
          <li
            v-for="item in topCenterArr"
            :key="item.idx"
            class="pointer"
            v-html="item.name"
            @click="itemClick(item.idx)"
          ></li>
          <!-- <li><img src="../../demo-test/image/1.png" alt="" /></li>
          <li><img src="../../demo-test/image/2.png" alt="" /></li>
          <li><img src="../../demo-test/image/3.png" alt="" /></li>
          <li><img src="../../demo-test/image/4.png" alt="" /></li>
          <li><img src="../../demo-test/image/5.png" alt="" /></li> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IntegratesReformTop',
  components: {},
  props: {},
  data() {
    return {
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
  mounted() {},
  methods: {
    /**
     * 点击
     */
    itemClick(e) {
      switch (e) {
        case 1:
          window.open(
            'http://zfzg.zjsft.gov.cn:8080/bs/zfzj/front?regionCode=0000&tid=cc4d413676b34e2ca1ec53e17b9c9830',
            '_blank',
          )
          break
        case 2:
          window.open(
            'http://59.202.53.241:8073/zjjgk/zjqlk/bigscreen/index.html',
            '_blank',
          )
          break
        case 4:
          window.open(
            'http://zfjd.zjsft.gov.cn/enforcement/workbench',
            '_blank',
          )
          break
      }
    },
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
    li {
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
    }
  }
}
ul {
  width: 200px;
  height: 200px;
  /*background-color: red;*/
  position: absolute;
  bottom: 120px;
  left: 50%;
  margin-left: -100px;
  transform-style: preserve-3d;
  /*transform: rotateX(-10deg);*/
  animation: sport 15s linear 0s infinite normal;
}
ul li:nth-child(1) {
  transform: rotateY(72deg) translateZ(260px);
}
ul li:nth-child(2) {
  transform: rotateY(144deg) translateZ(260px);
}
ul li:nth-child(3) {
  transform: rotateY(216deg) translateZ(260px);
}
ul li:nth-child(4) {
  transform: rotateY(288deg) translateZ(260px);
}
ul li:nth-child(5) {
  transform: rotateY(360deg) translateZ(260px);
}
ul li img {
  width: 200px;
  height: 200px;
  border: 5px solid skyblue;
  box-sizing: border-box;
}
ul:hover {
  animation-play-state: paused;
}
@keyframes sport {
  from {
    /*
                注意点:
                1.动画中如果有和默认样式中同名的属性, 会覆盖默认样式中同名的属性
                2.在编写动画的时候, 固定不变的值写在前面, 需要变化的值写在后面
                */
    transform: rotateX(-13deg) rotateY(0deg);
  }
  to {
    transform: rotateX(-13deg) rotateY(360deg);
  }
}
</style>
