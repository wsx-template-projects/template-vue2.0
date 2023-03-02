import _ from 'lodash'
import {
    BASE_OPTION,
    DEFAULT_LEGEND,
    DEFAULT_XAXIS,
    DEFAULT_YAXIS,
    DEFAULT_SERIES,
} from './default-config'
import { ChartConfig, ChartOption } from './interface'

/**
 * @description 图表 - hooks，目前只支持 折线图、柱状图
 * @param {array} types 图表类型  [ 'line', 'bar' ]
 * @param {*} option 图表参数 { legend:[], xAxis: [], yAxis: [], series: [] }
 * @param {*} config 额外配置参数， 例如：{ trigger: 'axis',series: {} } ，用来设置tooltip样式
 * @return {*} 图表 option
 */
export function useChart(
    types: string[],
    option: ChartOption,
    config: ChartConfig,
) {
    console.log('types :>> ', types)
    console.log('option :>> ', option)
    console.log('config :>> ', config)
    const {
        legend: legendData,
        xAxis: xAxisData,
        yAxis: yAxisData,
        series: seriesData,
    } = option
    const { series = {}, ...otherConfig } = config
    const _option = {
        title: { text: '' },
        legend: {
            ...DEFAULT_LEGEND,
            data: legendData,
        },
        xAxis: {
            ...DEFAULT_XAXIS,
            data: xAxisData,
        },
        yAxis: yAxisData || [DEFAULT_YAXIS],
        series: seriesData.map((val: any, index: any) => ({
            ...DEFAULT_SERIES,
            name: legendData[index],
            type: types[index],
            data: val,
            ...series,
        })),
    }
    console.log('chart-option :>>', BASE_OPTION, option)
    console.log('config :>> ', config)
    return _.merge({}, { ...BASE_OPTION }, _option, otherConfig)
}

/**
 * 工具栏 - 自定义提示框 - hooks ==> 需要待验证，暂不可用
 */
export function useTooltip(list: any) {
    console.log('list :>> ', list)
    const total = list.reduce((prev: any, curr: any) => {
        const val = curr.value || 0
        return prev + val
    }, 0)
    console.log('total :>> ', total)
    const fields: any = [],
        len = list.length
    const result = list
        .map((v: any, index: any) => {
            v.value = v.value || 0
            let field = Math.round((v.value / total) * 10000) / 100
            if (index === len - 1) {
                field =
                    100 -
                    fields.reduce((prev: any, curr: any) => prev + curr, 0)
            }
            if (!total) {
                field = 0
            }
            fields.push(field)
            return `${v.marker}${v.seriesName}：${
                v.value
            } 占比：${+field.toFixed(2)}% <br>`
        })
        .join('')
    // 信用等级月度趋势 返回的是 字符串number 需要拼接月   其他不需要拼接月
    if (!isNaN(Number(list[0].name))) {
        // eslint-disable-next-line no-useless-concat
        return `${list[0].name}月` + '<br>' + result
    }
    // eslint-disable-next-line no-useless-concat
    return `${list[0].name}` + '<br>' + result
}
