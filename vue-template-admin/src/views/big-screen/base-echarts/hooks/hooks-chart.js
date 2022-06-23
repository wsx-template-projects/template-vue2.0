/**
 * 图表类型
 */
const CHART_TYPES = {
    line: 'line-chart',
    bar: 'bar-chart',
    pie: 'pie-chart',
    map: 'map-chart',
    funnel: 'funnel-chart',
}

/**
 * 图表 - hooks
 * @param {string} type 图表类型 line/bar/pie/map/funnel
 */
export function useChart(type, config) {
    console.log(`type`, type)
    const options = {
        ...config,
    }
    return options
}
