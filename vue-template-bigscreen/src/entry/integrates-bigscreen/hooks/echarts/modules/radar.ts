import _ from 'lodash'
/**
 * 基础配置 - 接口
 */
export interface BaseOption {
    grid: any
}

/**
 * 雷达图 - 基本配置
 */
export const BASE_OPTION: BaseOption = {
    grid: {
        top: '20%',
        left: 27,
        right: 27,
        bottom: 27,
        containLabel: true,
    },
}

/**
 * 图表 - 动态数据
 */
export interface RadarData {
    /**  */
    legend: any
    /**  */
    radar: any
    /**  */
    series: any
}

/**
 * 雷达图 - option
 */
export interface RadarOption extends RadarData, BaseOption {
    // title: any
    /** 其它属性 */
    [propName: string]: any
}

/**
 * @description 图表 - hooks 雷达图
 * @param option 图表动态数据
 */
export function useRadarChart(
    option: RadarData,
    config?: any,
): Record<string, RadarOption> {
    // console.log('option :>> ', option)
    // console.log('config :>> ', config)
    const { legend, radar, series } = option
    const { color = ['#B363FF', '#87FFE1'], ...otherConfig }: any = config || {}
    // console.log('color :>> ', color)
    const _option: RadarOption = {
        ...BASE_OPTION,
        color,
        title: {
            text: '',
        },
        /** 图例 - 色块 */
        legend: {
            bottom: '3%',
            color: '#fff',
            data: legend,
            itemWidth: 48,
            itemHeight: 24,
            itemGap: 40, //设置图例每项之间的间隔
            orient: 'horizontal', //设置图例列表的布局朝向，'horizontal'|'vertical'
            textStyle: {
                fontSize: 20,
                color: '#fff',
            },
            padding: 0,
            // selectorLabel: {
            //     fontSize: 30,
            //     offset: [30, 30],
            // },
        },
        /** 提示框组件 */
        tooltip: {
            show: true,
            backgroundColor: 'rgba(5,30,98,0.9)',
            // textShadowColor: '#ff0000',
            // textShadowBlur: 4,
            // textShadowOffsetX: 0,
            // textShadowOffsetY: 2,
            // boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.5)',
            // borderRadius: 6,
            //配置详情提示框组件
            //设置雷达图的tooltip不会超出div，也可设置position属性
            //设置定位不会随着鼠标移动而变化
            confine: true, //设置是否将tooltip框限制在图表的区域内
            enterable: true, //设置鼠标是否可以移动到tooltip区域内
            position: ['50%', '50%'], // 相对位置，放置在容器正中间
            padding: [20, 13, 20, 20],
            // padding: [8, 13, 8, 8],
            textStyle: {
                // 文本样式
                color: '#fff',
                fontStyle: 'normal', // 'normal、italic、oblique'
                fontSize: 24,
            },
            // formatter(params: any) {
            //     console.log('params :>> ', params)
            //     return `改革指数 <br> 123456`
            //     // return `${params.marker}${params.seriesName}：${params.value} `
            // },
        },
        /** 雷达图网格相关设置 */
        radar: {
            indicator: radar,
            splitNumber: 3, // 雷达图圈数设置
            //雷达图背景的颜色，在这儿随便设置了一个颜色，完全不透明度为0，就实现了透明背景
            splitArea: {
                show: true, // 是否显示背景
                areaStyle: {
                    color: '#001551', // 图表背景的颜色
                },
            },
            // 网格线配置
            splitLine: {
                show: true,
                lineStyle: {
                    width: 3,
                    // color: 'red', // 设置网格的颜色
                    color: '#16379E', // 设置网格的颜色
                },
            },
            // axisLabel: { 刻度线
            //     show: true,
            // },
            // shape: 'polygon', //'polygon'|'circle'
            nameGap: 10,
            name: {
                // 网格文字的设置
                textStyle: {
                    fontSize: 24,
                    color: '#83FFFE',
                    // backgroundColor: '#fff',
                    borderRadius: 3,
                    // padding: [-10, -10],
                    padding: [0, 0],
                },
                formatter: function(val: any, indicator: Record<string, any>) {
                    // console.log('val :>> ', val)
                    // console.log('indicator :>> ', indicator)
                    return val
                },
            },
        },
        series: [
            {
                name: '测试一下',
                type: 'radar',
                data: series.map((val: any, index: number) => {
                    // console.log('val :>> ', val)
                    return {
                        value: val,
                        name: legend[index],
                        areaStyle: {
                            color: color[index],
                        },
                        // symbol: 'rect', // 边角类型
                        symbolSize: 10, // 边角的点大小
                        symbolColor: color[index], // 边角点的边框颜色
                        // lineStyle: {
                        //     type: 'dashed', // 设置线条类型
                        // },
                        label: {
                            // 设置线条显示文本
                            // distance: 100,
                            show: true,
                            formatter: function(params: any) {
                                return params.value
                            },
                        },
                    }
                }),
            },
        ],
    }
    // console.log('config :>> ', config)
    return _.merge({}, _option, otherConfig)
}
