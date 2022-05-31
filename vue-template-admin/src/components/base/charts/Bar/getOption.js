export default function (option, data) {
    const { tooltip, xAxis, yAxis, yCategory, series = [], ...rest } = data
    return { ...data }
}
