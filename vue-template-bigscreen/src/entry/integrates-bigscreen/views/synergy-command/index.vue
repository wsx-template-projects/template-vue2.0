<template>
  <MyScreen :is-scale="true" :width="width" :height="height">
    <div class="sg-page page-synergy-command">
      <header class="screen__header">
        <!-- 头部 -->
        <IndexTitle @back="back" :ifBack="true" :title="'协同指挥'">
          <div slot="right-one" style="font-size: 18px">
            <i
              class="el-icon-time"
              style="margin-right: 10px; font-size: 20px"
            ></i
            >{{ currentTime }}
          </div>
        </IndexTitle>
      </header>
      <section class="screen__content">
        <CommandLeft></CommandLeft>
        <section>
          <Search :onGroupDataChange="onGroupDataChange"></Search>
          <CommandCenter></CommandCenter>
        </section>
        <CommandRight></CommandRight>
      </section>
    </div>
  </MyScreen>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
/** 头部 */
import IndexTitle from '../index/components/index-title.vue'
/** 左屏 */
import CommandLeft from './components/command-left/index.vue'
/** 中屏 */
import CommandCenter from './components/command-center/index.vue'
/** 右屏 */
import CommandRight from './components/command-right/index.vue'
/** 搜索框 */
import Search from './components/search/index.vue'
import MyScreen from '../../components/global/my-screen/index.vue'
@Component({
  name: 'SynergyCommand',
  components: {
    IndexTitle,
    CommandLeft,
    CommandCenter,
    CommandRight,
    Search,
    MyScreen,
  },
})
export default class SynergyCommand extends Vue {
  public width = 2560
  public height = 1440
  public currentTime = ''
  public groupData: any = {}
  public countTimer: any // 存放（数字滚动）定时器
  public searchTimer: any // 存放（数字滚动）定时器
  /**
   * 监听返回参数
   */
  public onGroupDataChange(e: any) {
    console.log(this.setParse(e))
    clearTimeout(this.searchTimer)
    this.searchTimer = setTimeout(() => {
      this.search(e)
    }, 600)
  }
  /**
   * search
   */
  public async search(params: any) {
    const data = await this.$http.post(
      '/api/v2/bi/biformgroup/screenSearch',
      params,
    )
    console.log(data)
  }
  /**
   * 左一 方法
   */
  back() {
    // @ts-ignore
    window.open('about:blank', '_top').close()
  }
  /**
   * 拷贝
   */
  private setParse(e: any) {
    return JSON.parse(JSON.stringify(e))
  }
  created(): void {
    this.currentTime = new Date().toLocaleDateString().split('/').join('-')
  }
  mounted() {
    /** 实现统一轮播 */
    this.$nextTick(() => {
      const domData: HTMLCollectionOf<Element> =
        document.getElementsByClassName('my-countto-ref')
      this.countTimer = setInterval(() => {
        // @ts-ignore
        domData.forEach((res: any) => {
          res.__vue__ && res.__vue__.start()
        })
      }, 10000)
    })
  }
  beforeDestroy() {
    /** 组件销毁清除定时器 */
    clearInterval(this.countTimer)
  }
}
</script>

<style lang="less" scoped>
.page-synergy-command {
  .screen__header {
    width: 100%;
    height: 160px;
  }
  .screen__content {
    width: 100%;
    padding: 20px 60px 0;
    display: flex;
    justify-content: space-between;
  }
}
</style>
<style lang="less">
.page-synergy-command {
  .small-title {
    width: 100%;
    height: 47px;
    background: url('./images/small-title.png') no-repeat;
    background-size: 100% 100%;
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
    padding-left: 50px;
    display: flex;
    justify-content: space-between;
    .small-tabs {
      display: flex;
      padding-top: 4px;
      > div {
        height: 34px;
        background: rgb(74, 158, 248);
        font-family: PingFang SC;
        font-weight: 400;
        font-size: 26px;
        color: #fff;
        opacity: 0.5;
        text-align: center;
        line-height: 34px;
        cursor: pointer;
        padding: 0 15px;
      }
      .active {
        background: rgba(74, 158, 248, 0.8);
        opacity: 1;
      }
    }
  }
}
</style>
