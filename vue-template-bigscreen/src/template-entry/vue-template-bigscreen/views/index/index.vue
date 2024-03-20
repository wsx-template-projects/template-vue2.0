<template>
    <div class="sg-page page-index">
        <section class="head">
            <h1>一链知全貌</h1>
            <div class="time">
                {{ getCurrentDate() }}
            </div>
        </section>
        <section class="content">
            <!-- 区域分布 -->
            <div class="areal_distribution">
                <div class="contentTitle">区域分布</div>
            </div>
            <!-- 地图 -->
            <div class="map"></div>
            <!-- 行业分布 -->
            <div class="industry_distribution">
                <div class="contentTitle">行业分布（国民经济行业）</div>
            </div>
        </section>
    </div>
</template>

<script>
import { dateFormat } from '@/scripts/utils'
export default {
    name: 'Index',
    components: {},
    props: {},
    data() {
        return {}
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
        // 获取当前年月日和星期
        getCurrentDate() {
            let Week = ['日', '一', '二', '三', '四', '五', '六']
            let now = new Date()
            let day = now.getDay() //得到周几
            let time = ''
            time =
                dateFormat(new Date(), 'YYYY年MM月DD日') + ' 星期' + Week[day]
            return time
        },
    },
}
</script>

<style lang="less" scoped>
.page-index {
    overflow: hidden;
    width: 2560px;
    height: 1440px;
    background: url('~@/template-entry/vue-template-bigscreen/assets/images/background.png');
    background-size: cover;
    color: #fff;
    .contentTitle {
        height: 36px;
        background: url('~@/template-entry/vue-template-bigscreen/assets/images/contentTitle.png');
        background-size: cover;
        color: #ffffff;
        text-align: center;
        font-weight: 400;
        font-size: 28px;
        line-height: 15px;
    }
    .head {
        position: relative;
        width: 100%;
        height: 105px;
        text-align: center;
        line-height: 105px;
        h1 {
            text-shadow: 1px 2px 6px rgba(0, 9, 68, 0.56);
            font-weight: bold;
            font-size: 70px;
        }
        .time {
            position: absolute;
            top: 41px;
            right: 52px;
            color: #55b2f9;
            font-weight: 400;
            font-size: 20px;
            line-height: 20px;
        }
    }
    .content {
        display: flex;
        justify-content: space-between;
        padding: 52px 50px;
        height: 1213px;
        .industry_distribution,
        .areal_distribution {
            width: 794px;
        }
    }
}
</style>
