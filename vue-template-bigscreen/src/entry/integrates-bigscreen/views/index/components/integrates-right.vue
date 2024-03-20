<template>
  <div class="integrates-right">
    <!-- 执法闭环 -->
    <div class="enforce-title">执法闭环</div>
    <div class="enforce-box">
      <section>
        <div class="item-title">许可审批</div>
        <div class="permission-exa">
          <div
            class="permission-exa__item"
            v-for="(item, index) in permissionExaData"
            :key="index"
          >
            <img :src="item.icon" alt="" />
            <div>
              <div>{{ item.label }}</div>
              <div>
                <count-to
                  v-if="!isNaN(item.value)"
                  class="number-color font32"
                  :startVal="0"
                  :endVal="Number(item.value)"
                  :duration="2000"
                  :decimals="item.decimals || 0"
                  ref="countRef"
                ></count-to>
                <div v-else>{{ item.value }}</div>
                <span v-if="!isNaN(item.value)" class="font20">{{
                  item.unit
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="item-title is-href pointer" @click="toHref(1)">
          监管检查
        </div>
        <div class="supervise-inspect">
          <div
            class="supervise-inspect__item"
            v-for="(item, index) in superviseInspectData"
            :key="index"
          >
            <div>
              <img :src="item.icon" alt="" />
              <div>{{ item.label }}</div>
            </div>
            <div>
              <div class="margin0-2" v-for="(elem, i) in item.element" :key="i">
                <div>{{ elem.label }}</div>
                <div>
                  <count-to
                    v-if="!isNaN(elem.value)"
                    class="number-color font32"
                    :startVal="0"
                    :endVal="Number(elem.value)"
                    :duration="2000"
                    :decimals="elem.decimals || 0"
                    ref="countRef"
                  ></count-to>
                  <div v-else>{{ elem.value }}</div>
                  <span v-if="!isNaN(elem.value)" class="font20">{{
                    elem.unit
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="item-title is-href pointer" @click="toHref(2)">
          处罚办案
        </div>
        <div class="punish">
          <div
            class="punish__item"
            v-for="(item, index) in punishData"
            :key="index"
          >
            <img :src="item.icon" alt="" />
            <div>
              <div>{{ item.label }}</div>
              <div>
                <count-to
                  v-if="!isNaN(item.value)"
                  class="number-color font32"
                  :startVal="0"
                  :endVal="Number(item.value)"
                  :duration="2000"
                  :decimals="item.decimals || 0"
                  ref="countRef"
                ></count-to>
                <div v-else>{{ item.value }}</div>
                <span v-if="!isNaN(item.value)" class="font20">{{
                  item.unit || ''
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="item-title is-href pointer" @click="toHref(3)">
          监督评价
        </div>
        <div class="supervision-eva">
          <div
            class="supervision-eva__item"
            v-for="(item, index) in supervisionEvaData"
            :key="index"
          >
            <div>
              <img class="mb10" :src="item.icon" alt="" />
              <div>{{ item.label }}</div>
            </div>
            <div>
              <div class="mt20" v-for="(elem, i) in item.element" :key="i">
                <template v-if="elem.img">
                  <el-popover
                    placement="top-start"
                    width="200"
                    trigger="hover"
                    popper-class="integrates-popover"
                  >
                    <img :src="elem.img" alt="" style="width: 100%" />
                    <img
                      class="pointer"
                      :src="elem.img"
                      alt=""
                      slot="reference"
                      style="width: 60px; height: 60px"
                    />
                  </el-popover>
                </template>
                <template v-else>
                  <div>{{ elem.label }}</div>
                  <div>
                    <count-to
                      v-if="!isNaN(elem.value)"
                      class="number-color font32"
                      :startVal="0"
                      :endVal="Number(elem.value)"
                      :duration="2000"
                      :decimals="elem.decimals || 0"
                      ref="countRef"
                    ></count-to>
                    <div v-else>{{ elem.value }}</div>
                    <span v-if="!isNaN(elem.value)" class="font20">{{
                      elem.unit || ''
                    }}</span>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
/** 翻牌器 */
import countTo from 'vue-count-to'
/** 执法闭环 */
export default {
  name: 'IntegratesRight',
  components: { countTo },
  props: {
    param: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      permissionExaData: [], // 许可审批
      superviseInspectData: [], // 监管检查
      punishData: [], // 处罚办案
      supervisionEvaData: [], // 监督评价
      interval: null,
    }
  },
  watch: {
    param(e) {
      console.log(e)
      this.getData()
    },
  },
  mounted() {
    this.getData()
    this.interval = setInterval(() => {
      const countRef = this.$refs.countRef
      countRef.forEach((e) => {
        e.start()
      })
    }, 10 * 1000)
  },
  methods: {
    /**
     * 获取数据
     */
    async getData() {
      let params = {
        placeCode: 'DZH-ZP',
        placeAreaCode: 'DZH-ZP-ZB',
        param: {
          areacode: '33',
          dutycode: ' ',
          ...this.param,
        },
      }
      const { 'dzh-zbj': data } = await this.$http
        .post('/api/v2/bi/place/dataRuleGroup/doGetPlaceData', params)
        .then((res) => {
          const obj = {}
          const { processResult } = res[0]
          processResult.forEach((elem) => {
            obj[elem.key] = obj[elem.key]
              ? [...obj[elem.key], ...elem.value]
              : elem.value
          })
          return obj
        })

      this.permissionExaData = [
        {
          icon: require('../../../assets/images/integrates/SP_xksx.svg'),
          label: '许可事项',
          value: this.filterData(data, '许可审批事项'),
          unit: '项',
        },
        {
          icon: require('../../../assets/images/integrates/SP_plcsx.svg'),
          label: '跑零次事项',
          value: this.filterData(data, '跑零次事项'),
          unit: '项',
        },
        {
          icon: require('../../../assets/images/integrates/SP_xkbjl.svg'),
          label: '许可办件量',
          value: (this.filterData(data, '许可办件量') / 10000).toFixed(2),
          decimals: 2,
          unit: '万件',
        },
      ]
      this.superviseInspectData = [
        {
          icon: require('../../../assets/images/integrates/JC_ssjcc.svg'),
          label: '双随机抽查',
          element: [
            {
              label: '问题检出率',
              value: this.filterData(data, '双随机问题检出率'),
              decimals: 2,
              unit: '%',
            },
          ],
        },
        {
          icon: require('../../../assets/images/integrates/JC_rcxc.svg'),
          label: '日常巡查',
          element: [
            {
              label: '问题检出率',
              value: this.filterData(data, '日常巡查问题检出率'),
              decimals: 2,
              unit: '%',
            },
          ],
        },
        {
          icon: require('../../../assets/images/integrates/JC_zdzx.svg'),
          label: '重点专项',
          element: [
            {
              label: '问题检出率',
              value: this.filterData(data, '专项检查问题检出率'),
              decimals: 2,
              unit: '%',
            },
          ],
        },
        {
          icon: require('../../../assets/images/integrates/JC_zhcyc.svg'),
          label: '综合查一次',
          element: [
            {
              label: '联合检查',
              value: this.filterData(data, '联合检查户次'),
              unit: '户次',
            },
            {
              label: '减少企业干扰',
              value: this.filterData(data, '减少企业干扰户次'),
              unit: '户次',
            },
          ],
        },
      ]
      this.punishData = [
        {
          icon: require('../../../assets/images/integrates/CF_qwmf.svg'),
          label: '轻微免罚',
          value: this.filterData(data, '轻微免罚案件数'),
        },
        {
          icon: require('../../../assets/images/integrates/CF_jakb.svg'),
          label: '简案快办',
          value: this.filterData(data, '简案快办'),
        },
        {
          icon: require('../../../assets/images/integrates/CF_fszx.svg'),
          label: '非诉执行',
          value: this.filterData(data, '非诉执行'),
        },
        {
          icon: require('../../../assets/images/integrates/CF_xxxj.svg'),
          label: '行刑衔接',
          value: this.filterData(data, '行刑衔接'),
        },
      ]
      this.supervisionEvaData = [
        {
          icon: require('../../../assets/images/integrates/JD_zfjd.svg'),
          label: '政府监督',
          element: [
            {
              label: '问题线索数',
              value: this.filterData(data, '问题线索定位数'),
              unit: '条',
            },
            {
              label: '问题处置率',
              value: this.filterData(data, '问题监管处置率'),
              decimals: 2,
              unit: '%',
            },
          ],
        },
        {
          icon: require('../../../assets/images/integrates/JD_gqljd.svg'),
          label: '公权力监督',
          element: [
            {
              label: '异常信息数',
              value: this.filterData(data, '异常信息数'),
            },
          ],
        },
        {
          icon: require('../../../assets/images/integrates/JD_shjd.svg'),
          label: '社会监督',
          element: [
            {
              img: require('../../../assets/images/integrates/JD_ewm.png'),
            },
            {
              label: '群众满意率',
              value: this.filterData(data, '群众满意率'),
              decimals: 2,
              unit: '%',
            },
          ],
        },
      ]
    },
    /**
     * 数据过滤
     */
    filterData(data, itemcode) {
      const filterData =
        Array.isArray(data) &&
        data.filter((item) => {
          return item.itemcode == itemcode
        })
      return filterData.length > 0 ? filterData[0].value : 0
    },
    /**
     * 跳转
     */
    toHref(e) {
      let href = ''
      switch (e) {
        /** 监管检查 */
        case 1:
          href =
            'https://datav.aliyuncs.com/share/ba6ccf99dbe075eb7a723bf2b78b23fe'
          break
        /** 处罚办案 */
        case 2:
          href = 'punish'
          break
        /** 监督评价 */
        case 3:
          href = 'http://zfjd.zjsft.gov.cn/enforcement/workbench'
          break
      }
      window.open(href)
    },
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
}
</script>

<style lang="less" scoped>
.integrates-right {
  width: 660px;
  height: 100%;
  max-height: 1280px;
  color: #fdfcfb;
  .margin0-2 {
    margin: 0 2px;
  }
  .margin0-6 {
    margin: 0 6px;
  }
  .margin0-10 {
    margin: 0 10px;
  }
  .space-nowrap {
    white-space: nowrap;
  }
  .enforce-title {
    text-align: center;
    font-size: 42px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background: url('../../../assets/images/integrates/reform-title.png')
      no-repeat;
    background-size: 660px 60px;
    img {
      width: 28px;
      height: 28px;
    }
  }
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
  .item-title.is-href::after {
    width: 24px;
    height: 24px;
    content: '';
    display: inline-block;
    background: url('../../../assets/images/integrates/reform-right.png')
      no-repeat;
    background-size: 100% 100%;
    margin-left: 10px;
  }
  .enforce-box {
    width: 100%;
    height: 1194px;
    margin-top: 10px;
    padding-top: 20px;
    background: url('../../../assets/images/integrates/reform.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  /** 许可审批 */
  .enforce-box .permission-exa {
    display: flex;
    padding: 10px 15px;
    justify-content: space-between;
    &__item {
      width: 205px;
      height: 80px;
      background: rgba(0, 58, 140, 0.5);

      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      white-space: nowrap;
      img {
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }
    }
  }
  /** 监管检查 */
  .enforce-box .supervise-inspect {
    display: flex;
    padding: 5px 15px;
    justify-content: space-between;
    flex-wrap: wrap;
    &__item {
      width: 310px;
      height: 175px;
      background: rgba(0, 58, 140, 0.5);
      font-size: 24px;
      margin: 5px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
      > :first-child {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
      }
      > :last-child {
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
  }
  /** 处罚办案 */
  .enforce-box .punish {
    display: flex;
    padding: 5px 15px;
    justify-content: space-between;
    flex-wrap: wrap;
    &__item {
      width: 310px;
      height: 80px;
      background: rgba(0, 58, 140, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      margin: 5px 0;
      img {
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }
    }
  }
  /** 监督评价 */
  .enforce-box .supervision-eva {
    display: flex;
    padding: 5px 15px;
    justify-content: space-between;
    flex-wrap: wrap;
    &__item {
      width: 205px;
      height: 300px;
      background: rgba(0, 58, 140, 0.5);
      font-size: 24px;
      margin: 5px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 30px;
      text-align: center;
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
      > :first-child {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
<style lang="less">
.integrates-popover.el-popover {
  padding: 0;
}
</style>
