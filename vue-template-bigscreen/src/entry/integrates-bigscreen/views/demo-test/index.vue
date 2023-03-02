<template>
  <div class="sg-page page-demo-test">
    <div class="center-top-area-scroller">
      <ul>
        <li><img src="./image/1.png" alt="" /></li>
        <li><img src="./image/2.png" alt="" /></li>
        <li><img src="./image/3.png" alt="" /></li>
        <li><img src="./image/4.png" alt="" /></li>
        <li><img src="./image/5.png" alt="" /></li>
        <li><img src="./image/1.png" alt="" /></li>
      </ul>
    </div>
  </div>
</template>

<script>
import MyEcharts from '../reform/components/MyEcharts.vue'
export default {
  name: 'DemoTest',
  components: { MyEcharts },
  props: {},
  data() {
    return {
      myOption: {},
      topStyleArr: [
        'transform: translateX(-50%) scale(1);left: 47%; bottom: 13%;',
        'transform: translateX(-50%) scale(0.975);left: 65%; bottom: 18%;font-size: 14px;',
        'transform: translateX(-50%) scale(0.875);left: 80%; bottom: 45%;',
        'transform: translateX(-50%) scale(0.775);left: 70%; bottom: 60%;',
        'transform: translateX(-50%) scale(0.675);left: 55%; bottom: 72%;',
        'transform: translateX(-50%) scale(0.675);left: 40%; bottom: 72%;',
        'transform: translateX(-50%) scale(0.775);left: 25%; bottom: 60%;',
        'transform: translateX(-50%) scale(0.775);left: 12%; bottom: 45%;',
        // 'transform: translateX(-50%) scale(0.875);left: 20%; bottom: 25%;',
        'transform: translateX(-50%) scale(0.975);left: 28%; bottom: 18%;font-size: 14px;',
      ],
      topCenterArr: [
        {
          idx: 1,
          name: '书证',
        },
        {
          idx: 2,
          name: '物证',
        },
        {
          idx: 3,
          name: '视听材料取证端',
        },
        {
          idx: 4,
          name: '电子数据取证端',
        },
        {
          idx: 5,
          name: '鉴定意见取证端',
        },
        {
          idx: 6,
          name: '现场勘验图',
        },
        {
          idx: 7,
          name: '现场照片取证端',
        },
        {
          idx: 8,
          name: '智能笔录取证端',
        },
        {
          idx: 9,
          name: '远程视频取证端',
        },
        // {
        //   idx: 10,
        //   name: '司法鉴定平台',
        // },
      ],
      interval: null,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // this.getOption()
    // this.interval = setInterval(() => {
    //   this.topStyleArr.push(this.topStyleArr[0])
    //   this.topStyleArr.shift()
    // }, 3000)
  },
  methods: {
    getOption() {
      const gaugeData = [
        {
          value: 20,
          name: 'Perfect',
          title: {
            offsetCenter: ['0%', '-30%'],
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ['0%', '-20%'],
          },
        },
        {
          value: 40,
          name: 'Good',
          title: {
            offsetCenter: ['0%', '0%'],
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ['0%', '10%'],
          },
        },
        {
          value: 60,
          name: 'Commonly',
          title: {
            offsetCenter: ['0%', '30%'],
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ['0%', '40%'],
          },
        },
      ]
      this.myOption = {
        series: [
          {
            type: 'gauge',
            startAngle: 90,
            endAngle: -270,
            pointer: {
              show: false,
            },
            progress: {
              show: true,
              overlap: false,
              roundCap: true,
              clip: false,
              itemStyle: {
                borderWidth: 1,
                borderColor: '#464646',
              },
            },
            axisLine: {
              lineStyle: {
                width: 40,
              },
            },
            splitLine: {
              show: false,
              distance: 0,
              length: 10,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
              distance: 50,
            },
            data: gaugeData,
            title: {
              fontSize: 14,
            },
            detail: {
              width: 50,
              height: 14,
              fontSize: 14,
              color: 'auto',
              borderColor: 'auto',
              borderRadius: 20,
              borderWidth: 1,
              formatter: '{value}%',
            },
          },
        ],
      }
    },
    mouseover() {
      clearInterval(this.interval)
    },
    mouseout() {
      this.interval = setInterval(() => {
        this.topStyleArr.push(this.topStyleArr[0])
        this.topStyleArr.shift()
      }, 3000)
    },
  },
}
</script>

<style lang="less" scoped>
.demo-test {
  margin: 20px;
  width: 500px;
  height: 500px;
}
.center-top-area-scroller {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 48%;
}
.top-scroller-item {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 3;
  p {
    width: 80px;
    height: 80px;
    color: #ffe56e;
    display: flex;
    transition: all 0.5s ease-in-out;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    // background: url('../../assets/images/bg.jpeg') no-repeat;
    background-size: 100% 100%;
    position: absolute;
    font-size: 14px;
    text-align: center;
    padding: 5px 10px;
    box-sizing: border-box;
    line-height: 16px;

    &.on {
      font-size: 18px;
      line-height: 18px;
    }
  }
}
.continent {
  transform-style: preserve-3d;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 200px;
  height: 300px;
  animation: move 14s linear infinite;
}
@keyframes move {
  0% {
    transform: rotateY(0);
  }
  100% {
    transform: rotateY(360deg);
  }
}
.item {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 200px;
  height: 300px;
  background-color: aqua;
  //倒影
  -webkit-box-reflect: below 10px linear-gradient(transparent, white);
}
.img1 {
  background-image: url('./image/1.png');
  background-size: cover;
  transform: rotateY(60deg) translateZ(400px);
}
.img2 {
  background-image: url('./image/2.png');
  background-size: cover;
  transform: rotateY(120deg) translateZ(400px);
}
.img3 {
  background-image: url('./image/3.png');
  background-size: cover;
  transform: rotateY(180deg) translateZ(400px);
}
.img4 {
  background-image: url('./image/4.png');
  background-size: cover;
  transform: rotateY(240deg) translateZ(400px);
}
.img5 {
  background-image: url('./image/5.png');
  background-size: cover;
  transform: rotateY(300deg) translateZ(400px);
}
.img6 {
  background-image: url('./image/1.png');
  background-size: cover;
  transform: rotateY(360deg) translateZ(400px);
}
ul {
  width: 200px;
  height: 200px;
  /*background-color: red;*/
  position: absolute;
  bottom: 100px;
  left: 50%;
  margin-left: -100px;
  transform-style: preserve-3d;
  /*transform: rotateX(-10deg);*/
  animation: sport 6s linear 0s infinite normal;
}
ul li {
  list-style: none;
  width: 200px;
  height: 200px;
  font-size: 60px;
  text-align: center;
  line-height: 200px;
  position: absolute;
  left: 0;
  top: 0;
  background-color: black;
}
ul li:nth-child(1) {
  transform: rotateY(60deg) translateZ(200px);
}
ul li:nth-child(2) {
  transform: rotateY(120deg) translateZ(200px);
}
ul li:nth-child(3) {
  transform: rotateY(180deg) translateZ(200px);
}
ul li:nth-child(4) {
  transform: rotateY(240deg) translateZ(200px);
}
ul li:nth-child(5) {
  transform: rotateY(300deg) translateZ(200px);
}
ul li:nth-child(6) {
  transform: rotateY(360deg) translateZ(200px);
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
ul:hover li img {
  opacity: 0.5;
}
ul li:hover img {
  opacity: 1;
}
@keyframes sport {
  from {
    /*
                注意点:
                1.动画中如果有和默认样式中同名的属性, 会覆盖默认样式中同名的属性
                2.在编写动画的时候, 固定不变的值写在前面, 需要变化的值写在后面
                */
    transform: rotateX(-10deg) rotateY(0deg);
  }
  to {
    transform: rotateX(-10deg) rotateY(360deg);
  }
}
.heart {
  width: 173px;
  height: 157px;
  position: absolute;
  left: 100px;
  bottom: 100px;
  animation: move 10s linear 0s infinite normal;
}
@keyframes move {
  0% {
    left: 100px;
    bottom: 100px;
    opacity: 1;
  }
  20% {
    left: 300px;
    bottom: 300px;
    opacity: 0;
  }
  40% {
    left: 500px;
    bottom: 500px;
    opacity: 1;
  }
  60% {
    left: 800px;
    bottom: 300px;
    opacity: 0;
  }
  80% {
    left: 1200px;
    bottom: 100px;
    opacity: 1;
  }
  100% {
    left: 800px;
    bottom: -200px;
  }
}
</style>
