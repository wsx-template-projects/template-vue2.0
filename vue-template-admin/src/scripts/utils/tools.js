/**
 * 导出excel，form表单的方式（注意：后端接口不要验证 key）
 * @param {string} url 完整的接口 url
 * @param {object} params 参数对象
 */
export function exportExcel(url, params) {
    console.log('url :>> ', url)
    var form = document.createElement('form')
    form.style.display = 'none'
    form.action = url
    form.method = 'post'
    form.enctype = 'multipart/form-data'
    document.body.appendChild(form)
    for (var key in params) {
        var input = document.createElement('input')
        input.type = 'hidden'
        input.name = key
        input.value = params[key]
        form.appendChild(input)
    }
    form.submit()
    form.remove()
}
