import _Vue, { Component, AsyncComponent } from 'vue'

export type moduleLoad = (
    Component:
        | Component<any, any, any, any>
        | AsyncComponent<any, any, any, any>,
    props?: Record<string, any>,
    container?: string | 'body',
) => Promise<any>
export declare function initModuleLoad(options?: any): moduleLoad
export declare function install(
    Vue: typeof _Vue,
    options?: Record<string, any>,
): void
declare const _default: {
    // initModuleLoad: typeof initModuleLoad
    install: typeof install
}
export default _default
