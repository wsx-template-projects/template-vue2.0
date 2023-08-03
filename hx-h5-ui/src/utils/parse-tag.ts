const templateIdent: Record<string, any> = {
    '${input}': {
        tag: 'van-field',
        className: 'custom-input--cn sg-m-l-10',
        text: '',
        attrs: {
            value: '',
        },
    },
}

const defaultTemplate = {
    tag: 'span',
    className: 'custom-span--cn',
    text: '',
}

function transformTemplateData(list: any[]) {
    console.log('list :>> ', list)
    const result = list.map((item: any) => {
        console.log('item :>> ', item)
        let template: any = { text: '' }
        template = templateIdent?.[item]
            ? { ...template, ...templateIdent?.[item] }
            : { ...template, ...defaultTemplate }
        template.text = item
        console.log('template :>> ', template)
        return template
    })
    return result
}

function parseTemplateData(Comp: any, list: any[]) {
    console.log('Comp :>> ', Comp)
    const templateEls: any = this.transformTemplateData(list)
    console.log('templateEls :>> ', templateEls)
    const domEls = templateEls.map((dom: Record<string, any>) => {
        console.log('dom :>> ', dom)
        // return <Comp></Comp>
        return dom
    })
    console.log('domEls :>> ', domEls)
    return domEls
}

function createTemplate() {
    return {}
}
