import Vue from 'vue'

/**
 * 表单字段 - field
 */
export interface Field {
    /**分组名 */
    groupName?: string
    /**分组Id */
    groupId?: string
    /**组件名 */
    tag: any
    /**名称，提交表单的标识符 */
    name: string
    /**输入框左侧文本 */
    label: string
    /**隐藏输入框左侧文本 */
    hiddenLabel?: boolean
    /**是否必填 */
    required?: boolean
    /**默认值 */
    defaultValue?: any
    /**其余配置参数 */
    props?: Record<string, any>
    /**事件 */
    on?: Record<string, any>
    /**校验规则 */
    rules?: any[]
    /**排序 */
    sort?: string | number
    /**隐藏 */
    hidden?: boolean
    /**联动规则 */
    linkageRule?:
        | LinkageWatcher
        | {
              value?: LinkageWatcher
              options?: LinkageWatcher
          }
    /**自定义组件插槽类名 */
    slotName?: string
    /**动态渲染表单控制 */
    ifRender?: Function | boolean
}

/**
 * 表单字段组 - 接口
 */
export interface GroupField {
    /**分组名 */
    groupName: string
    /**分组Id */
    groupId: string
    /** 分组表单项 */
    children: Field[]
}

/** 参考 vant - Search => props */
export interface BaseSearch {
    label?: string
    shape?: string
    clearable?: boolean
    background?: string
    [propName: string]: any
}

/** 参考 vant - DropdownMenu => props */
export interface BaseDropdownMenu {
    'active-color'?: string
    direction?: string
    [propName: string]: any
}

/** 参考 vant - DropdownItem => props */
export interface BaseDropdownItem {
    options?: Record<string, any>
    [propName: string]: any
}

/** 参考 vant - Calendar => props */
export interface BaseCalendar {
    [propName: string]: any
}

export interface BaseList {
    offset?: number
    'error-text': string
    'finished-text': string
    'immediate-check': boolean
    /** 其它属性 */
    [propName: string]: any
}

/** 空数据配置项 */
export interface EmptyConfig {
    image: string
    description: string
}

/**
 * @description list组件 - 接口
 */
export interface ListComponent {
    config?: BaseList
    emptyConfig?: EmptyConfig
    autoLoad?: boolean
    disableRefresh?: boolean
    diyAnimation?: boolean
    load?: (query: any) => Promise<any>
    /** 其它属性 */
    [propName: string]: any
}

export interface SearchRef extends Vue {
    init: {
        (): void
    }
    /** 其它属性 */
    [propName: string]: any
}

export interface ConditionRef extends Vue {
    init: {
        (): void
    }
    /** 其它属性 */
    [propName: string]: any
}

/** 列表ref */
export interface ListRef extends Vue {
    init: {
        (): void
    }
    /** 其它属性 */
    [propName: string]: any
}

/** 列表页ref */
export interface ListPageRef extends Vue {
    onInit: {
        (): void
    }
    /** 其它属性 */
    [propName: string]: any
}

export interface ConditionItem {
    value: any
    format?: string | undefined
    splitTxt?: string
    valueFormat?: ((times: string | string[]) => string) | undefined
    calendar?: BaseCalendar
    dropdownItem?: BaseDropdownItem
    [propName: string]: any
}

/**
 * @description 条件查询组件 - 接口
 */
export interface ConditionComponent {
    menu?: BaseDropdownMenu
    leftItem?: ConditionItem
    rightItem?: ConditionItem
    /** 其它属性 */
    [propName: string]: any
}

/**
 * @description search组件 - 接口
 */
export interface SearchComponent {
    duration?: number
    config?: BaseSearch
}

/**
 * tab 标签item - 接口
 */
export interface BaseTab {
    /** 标签页文本 */
    title: string
    /** 唯一标识 */
    name: any
    /** 其它属性 */
    [propName: string]: any
}

/**
 * tabs - 接口
 */
export interface BaseTabs {
    /** 是否吸顶 */
    sticky?: boolean
    /** 其它属性 */
    [propName: string]: any
}

/**
 * tab标签页组件 - 接口
 */
export interface TabComponent {
    /** 标签数据项 */
    list: BaseTab[]
    /** 属性配置项 */
    attrs?: BaseTabs
    /** 默认选中的值 */
    defaultActiveTab?: any
}

/**
 * 当前组件对外暴露出去的接口
 * @param {string} activeTab 选中的tab
 */
export interface TabRef extends Vue {
    /** 选中的tab */
    activeTab: string
    init: () => void
    /** 其它属性 */
    [propName: string]: any
}

/**
 * form表单组件 - 接口
 */
export interface AppForm extends Vue {
    /**表单提交 */
    submit(): Promise<void>
    /** 取消 */
    cancel(): Promise<void>
    /**表单校验 */
    validate(name?: string | string[]): Promise<void>
    /**通过name获取对应组件的实例 */
    getRefField(name: string): any
    /** 重置表单项的验证提示 */
    resetValidateFormItem(name?: string | string[]): void
}
