/**
 * @description 问题数据扁平处理
 */
export function arrayFlat(list: any[]) {
    const stack = [...list]
    const result = []
    while (stack.length) {
        const pop = stack.pop()
        if (pop?.children?.length) {
            result.push(...pop.children)
        }
        result.push(pop)
    }
    return result
}

export function signCheck(list: any[]) {
    return list.filter((c: any) => c.isChecked)
}

export function textareaCheck(list: any[]) {
    return list.filter((c: any) => c.name)
}

export function mulCheck(list: any[], arr: any[]) {
    return list.filter((c: any, i: number) => arr?.includes(i))
}

/**
 * @description 转化提交的数据
 */
export function transSubmitData(list: any[]) {
    const result = list.map((item: any) => {
        // console.log('item :>> ', item)
        const temp = { ...item }

        if (item.chooseType == 3) {
            temp.optionList = textareaCheck(temp.optionList)
        } else if (item.chooseType == 2) {
            // todo 多选
            temp.optionList = mulCheck(temp.optionList, temp.choice)
            console.log('多选 :>> ', temp.optionList)
        } else {
            temp.optionList = signCheck(temp.optionList)
        }

        return temp
    })
    return result
}
