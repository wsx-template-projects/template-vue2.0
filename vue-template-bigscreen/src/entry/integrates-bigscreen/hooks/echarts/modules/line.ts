import _ from 'lodash'
/**
 * 基础配置 - 接口
 */
export interface BaseOption {
    grid: any
    color: any
    tooltip: any
    /**  */
    [propName: string]: any
}

/**
 * legend - 接口
 */
export interface LegendOption {
    right?: string
    padding?: number[]
    [propName: string]: any
}

/**
 * 图表 - 动态数据
 */
export interface LineData {
    /**  */
    legend: any
    /** x轴数据 */
    xAxis: any
    /** 线条数据 */
    series: any
    /** y轴配置项数据 */
    yAxis?: any[]
    /**  */
    stack?: any[]
    /**  */
    [propName: string]: any
}

/**
 * 折线图 - option
 */
export interface LineOption extends LineData, BaseOption {
    // title: any
    /** 其它属性 */
    [propName: string]: any
}

/**
 * 折线图 - 基本配置
 */
export const BASE_OPTION: BaseOption = {
    grid: {
        top: '16%',
        left: 12,
        right: 12,
        bottom: 10,
        containLabel: true,
    },
    color: ['#31D9A4', '#0796F4'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
        },
    },
}

/**
 * 默认的 legend 配置项
 * */
export const DEFAULT_LEGEND: LegendOption = {
    right: '3%',
    padding: [40, 15, 40, 40],
}

/**
 * 默认的 x轴 配置项
 * */
export const DEFAULT_X_AXIS: any = {
    data: [],
    axisTick: {
        show: false, //是否显示网状线 默认为true
        alignWithLabel: true,
    },
    axisLine: {
        show: false, //这里的show用于设置是否显示x轴那一条线 默认为true
    },
    axisLabel: {
        interval: 0, //坐标轴刻度标签的显示间隔(在类目轴中有效) 0:显示所有  1：隔一个显示一个 :3：隔三个显示一个...
        // rotate: -20, //标签倾斜的角度，显示不全时可以通过旋转防止标签重叠（-90到90）
    },
}

/**
 * 默认的 y轴 配置项
 * */
export const DEFAULT_Y_AXIS: any = {
    type: 'value',
    // name: '数量',
    min: 0,
    axisLabel: {
        formatter: '{value}',
    },
    axisTick: {
        show: false, //是否显示网状线 默认为true
        alignWithLabel: true,
    },
    axisLine: {
        show: false, //这里的show用于设置是否显示x轴那一条线 默认为true
        lineStyle: {
            color: '#999',
        },
    },
}

/**
 * 默认的 series 配置项
 * */
export const DEFAULT_SERIES: any = {
    smooth: true,
    barWidth: 20,
    // symbolSize: 8,
    // coordinateSystem: 'polar',
    // areaStyle: {}, // TODO: 实现折线图下面的背景色的显示
    // stack: '' // todo 设置堆叠柱状图
}

/**
 * @description 图表 - hooks 折线图
 * @param option 图表动态数据
 */
export function useLineChart(
    option: LineData,
    config?: any,
): Record<string, LineOption> {
    console.log('option :>> ', option)
    const { legend, xAxis, yAxis, series: seriesData } = option
    const { series = {}, ...otherConfig } = config
    const _option: LineOption = {
        ...BASE_OPTION,
        title: {
            text: '',
        },
        legend: {
            ...DEFAULT_LEGEND,
            data: legend,
        },
        xAxis: {
            ...DEFAULT_X_AXIS,
            data: xAxis,
        },
        yAxis: yAxis || [DEFAULT_Y_AXIS],
        series: seriesData.map((val: any, index: any) => ({
            ...DEFAULT_SERIES,
            name: legend[index],
            type: 'line',
            data: val,
            ...series,
        })),
    }
    console.log('chart-option :>>', BASE_OPTION, option)
    console.log('config :>> ', config)
    return _.merge({}, _option, otherConfig)
}
