/** 柱状图基础配置项 */
export const BASE_OPTION: any = {
    grid: {
        top: '20%',
        left: 27,
        right: 27,
        bottom: 27,
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

/** 默认的 legend 配置项 */
export const DEFAULT_LEGEND: any = {
    right: '3%',
    padding: [40, 15, 40, 40],
}

/** 默认的 x轴 配置项 */
export const DEFAULT_XAXIS: any = {
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

/** 默认的 y轴 配置项*/
export const DEFAULT_YAXIS: any = {
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

/** 默认的 series 配置项  */
export const DEFAULT_SERIES: any = {
    smooth: true,
    barWidth: 20,
    // symbolSize: 8,
    // coordinateSystem: 'polar',
    // areaStyle: {}, // TODO: 实现折线图下面的背景色的显示
    // stack: '' // todo 设置堆叠柱状图
}
