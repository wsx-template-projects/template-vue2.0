/** 函数类型接口 */
interface Add {
    (x: number, y: number): number
}

/** 混合类型接口 */
interface Lib {
    a: number
    b: string
    (): void
    doSomething(): void
}
