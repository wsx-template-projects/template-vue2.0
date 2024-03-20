/** 图表配置项 */
export interface ChartOption {
    legend: any[]
    xAxis: any[]
    series: any[]
    yAxis?: any[]
    stack?: any[]
    [propName: string]: any
}

/** 额外参数配置 */
export interface ChartConfig {
    [propName: string]: any
}
