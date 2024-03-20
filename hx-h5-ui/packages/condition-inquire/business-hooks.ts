/** 下拉菜单 - menu 默认配置 */
const DEFAULT_MENU_CONFIG = {
    /** 菜单标题和选项的选中态颜色 */
    'active-color': '#ee0a24',
    /** 菜单展开方向，可选值为up */
    direction: 'down',
    /** 菜单栏 z-index 层级 */
    'z-index': 10,
    /** 动画时长，单位秒 */
    duration: 0.2,
    /** 是否显示遮罩层 */
    overlay: true,
    /** 是否在点击遮罩层后关闭菜单 */
    'close-on-click-overlay': true,
    /** 是否在点击外部元素后关闭菜单 */
    'close-on-click-outside': true,
}

/** 下拉菜单 - item 默认配置 */
const DEFAULT_ITEM_CONFIG = {
    value: '',
    title: '',
    options: [],
    disables: false,
    'lazy-render': true,
    'title-class': '',
    'get-container': '',
}

/** 日期组件 - 默认配置 */
const DEFAULT_CALENDAR_CONFIG = {
    type: 'range',
    color: '#1989fa',
    'allow-same-day': true,
    'confirm-disabled-text': '请选择结束时间',
}

export function useConstant() {
    return {
        /** 下拉菜单 - menu 默认配置 */
        menuConfig: DEFAULT_MENU_CONFIG,
        /** 下拉菜单 - item 默认配置 */
        itemConfig: DEFAULT_ITEM_CONFIG,
        /** 日期组件 - 默认配置 */
        calendarConfig: DEFAULT_CALENDAR_CONFIG,
    }
}
