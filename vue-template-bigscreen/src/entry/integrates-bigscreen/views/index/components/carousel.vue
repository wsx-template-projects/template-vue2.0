<template>
  <div class="carousel">
    <div class="carousel-title pointer" @click="toHref()">
      创新实践
      <img src="../../../assets/images/integrates/reform-right.png" alt="" />
    </div>
    <div class="carousel-box">
      <div class="carousel-dept">
        <div class="item-title">部门特色专区</div>
        <el-carousel trigger="click" class="mt30" height="220px">
          <el-carousel-item
            v-for="(item, index) in deptCarouselList"
            :key="index"
          >
            <div class="carousel-item">
              <img :src="item.icon" alt="" />
              <div class="font24 mt10">{{ item.title }}</div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="carousel-area">
        <div class="item-title">地方特色专区</div>
        <el-carousel trigger="click" class="mt30" height="220px">
          <el-carousel-item
            v-for="(item, index) in areaCarouselList"
            :key="index"
            class="carousel-item"
          >
            <img :src="item.icon" alt="" />
            <div class="font24 mt10">{{ item.title }}</div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  components: {},
  props: {},
  data() {
    return {
      deptCarouselList: [
        {
          icon: require('../../../assets/images/integrates/carousel-swjw.png'),
          title: '省卫健委',
        },
        {
          icon: require('../../../assets/images/integrates/carousel-sjst.png'),
          title: '省建设厅',
        },
      ],
      areaCarouselList: [
        {
          icon: require('../../../assets/images/integrates/carousel-jiaxing.png'),
          title: '嘉兴市-嘉善县',
        },
        {
          icon: require('../../../assets/images/integrates/carousel-taizhou.png'),
          title: '台州市-天台县',
        },
      ],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    /**
     * 跳转
     */
    toHref() {
      window.open(
        'https://datav.aliyuncs.com/share/cb80d4dc19c6fb651882f6dcf72b9ae9',
      )
    },
  },
}
</script>

<style lang="less" scoped>
.carousel {
  width: 100%;
  .carousel-title {
    color: #fff;
    text-align: center;
    font-size: 42px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background: url('../../../assets/images/integrates/reform-title.png');
    background-repeat: no-repeat;
    background-size: 657px 60px;
    margin-bottom: 10px;
    img {
      width: 28px;
      height: 28px;
    }
  }
  .carousel-box {
    display: flex;
    width: 660px;
    height: 324px;
    background: url('../../../assets/images/integrates/reform.png') no-repeat;
    background-size: 100% 100%;

    .item-title {
      width: 100%;
      height: 45px;
      background: url('../../../assets/images/integrates/item-title.png')
        no-repeat;
      background-size: 100% 100%;
      color: #f3ecec;
      font-size: 32px;
      line-height: 40px;
      padding-left: 30px;
    }
    .carousel-dept,
    .carousel-area {
      flex: 1;
    }
    .carousel-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        margin: 0 auto;
      }
    }
  }
}
</style>
