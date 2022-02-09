<!-- 
   my-list组件 - 案例
-->
<template>
    <div class="">
        <header-bar />
        <div class="page-main">
            <div class="">
                <van-search v-model="searchVal" placeholder="请输入搜索关键字" @blur="handleSearchBlur" />
            </div>
            <div class="list-wrap">
                <my-list
                    ref="listRef"
                    :is-loading.sync="isMoreLoading"
                    :is-error.sync="isMoreError"
                    :is-need-refresh="true"
                    :list="list"
                    :total="total"
                    :empty-config="{
                        image: 'https://img01.yzcdn.cn/vant/custom-empty-image.png',
                        description: '啥都没有了!',
                    }"
                    @load="handleLoading"
                    @init="handleInit"
                    @refresh="handleRefresh"
                >
                    <template v-slot="{ item }">
                        <div class="item sg-flexbox">
                            <div class="item-left">
                                <van-image :src="item.imgUrl" />
                            </div>
                            <div class="item-right sg-flex-1 sg-flexbox v justify-between">
                                <div class="item-right__top">
                                    <span class="title">{{ item.title }}</span>
                                    <span class="desc">{{ item.desc }}</span>
                                </div>
                                <div class="">
                                    <span class="real-price">￥{{ item.realPrice }}</span>
                                    <span class="original-price">{{ item.realPrice }}</span>
                                </div>
                            </div>

                            <van-button class="item-btn" type="info" size="mini" @click="onBtn(item)">按钮</van-button>
                        </div>
                    </template>
                </my-list>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderBar from '@/components/header-bar'
import MyList from '@/components/global/my-list'
export default {
    name: 'ExampleMyList',
    components: { HeaderBar, MyList },
    data() {
        return {
            searchVal: '',

            pageSize: 10,
            isMoreLoading: false,
            isMoreError: false,
            total: 0,
            list: [],
            resData: {},
        }
    },
    computed: {},
    created() {
        // todo: 当设置组件设置 immediateCheck 属性,可以不手动执行 getData 方法
        this.getInitData()
    },
    mounted() {},
    methods: {
        getInitData() {
            this.getData({ pageNum: 1, pageSize: this.pageSize })
        },
        handleSearchBlur(event) {
            console.log('失去焦点', this.searchVal)
            console.log('event :>> ', event)
            console.log('ref :>> ', this.$refs.listRef)
            this.$refs.listRef.initData()
        },
        onBtn(item) {
            console.log('item :>> ', item)
        },
        handleLoading(params) {
            console.log('loading...')
            this.getData(params, false)
        },
        handleInit() {
            this.getInitData()
        },
        handleRefresh() {
            this.getInitData()
        },
        /**
         * @param {object} params
         * @param {boolean} isInit 是否初始化
         */
        getData(params, isInit = true) {
            console.log('isInit :>> ', isInit)
            this.isMoreLoading = true
            this.$http
                .get('/mock/list', { params })
                .then(res => {
                    console.log('list-res :>> ', res)
                    const { total, list } = res.data
                    this.isMoreLoading = false
                    this.total = total
                    if (isInit) {
                        this.list = list
                    } else {
                        this.list = [...this.list, ...list]
                    }
                })
                .catch(error => {
                    console.log('error:', error)
                    this.isMoreLoading = false
                    this.isMoreError = true
                })
        },
    },
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.page-main {
    background: #fff;

    .item {
        position: relative;
        width: 100%;
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 6px;
        margin-bottom: 10px;

        .item-left {
            margin-right: 10px;

            .van-image {
                width: 100px;
                height: 100px;
            }
        }

        .item-right {
            &__top {
                span {
                    display: block;
                }

                .title {
                    font-size: 14px;
                    margin-bottom: 6px;
                }

                .desc {
                    font-size: 12px;
                    color: rgb(146, 143, 143);
                    line-height: 24px;
                }
            }
            .real-price {
                color: red;
            }

            .original-price {
                font-size: 12px;
                color: #ccc;
                text-decoration: line-through;
                margin-left: 6px;
            }
        }

        .item-btn {
            position: absolute;
            bottom: 10px;
            right: 10px;
        }
    }
}
</style>
