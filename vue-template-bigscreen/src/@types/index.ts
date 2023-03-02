import {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
    Method,
} from 'axios'
interface ExAxiosResponse<T = any> {
    code?: any
    message?: any
    data?: any
    [propName: string]: any
}
/**
 * 请求配置
 * @param exNoErrorMassage 响应异常时不要弹出消息层
 * @param exShowLoading 请求过程中显示全局 loading
 * @param exCancel 请求前先取消未完成的请求（通常用于幂等性请求，如列表查询等）
 */
export declare interface ExAxiosRequestConfig extends AxiosRequestConfig {
    exNoErrorMassage?: boolean
    exShowLoading?: boolean
    /**
     * 请求前先取消未完成的请求（通常用于幂等性请求，如列表查询等）
     * 通过名称来取消一个或一类请求（名称相同的都会被取消），参数值对应的名称规则如下：
     *  true ---------- method + baseURL + path
     * '/xxx/*' ------- method + baseURL + '/xxx/*'
     * 'xxx' ---------- 'xxx'
     */
    exCancel?: boolean | string | Array<boolean | string>

    /* 通过该值对应的名称可以取消该请求 */
    exCancelName?: boolean | string // 参数值对应的名称规则同上，默认值为 true
    exNoHooks?: boolean // 跳过所有全局拦截器
    exApiHooks?: Array<string> // 局部接口过滤器
    exRetry?: boolean | number // 失败后是否重试
    [propName: string]: any
}
interface ExHook {
    // 请求前调用（在请求拦截器之前）
    onBefore?: (config: ExAxiosRequestConfig) => any

    // 请求完成调用（在响应拦截器之后，then 之前）
    onComplete?: (
        config: ExAxiosRequestConfig,
        isResolve: boolean,
        resOrErr: AxiosResponse | AxiosError | Error | any,
    ) => any
}

export interface ExInstance extends AxiosInstance {
    request<T = any, R = ExAxiosResponse<T>>(
        config: ExAxiosRequestConfig,
    ): Promise<R>
    get<T = any, R = ExAxiosResponse<T>>(
        url: string,
        config?: ExAxiosRequestConfig,
    ): Promise<R>
    delete<T = any, R = ExAxiosResponse<T>>(
        url: string,
        config?: ExAxiosRequestConfig,
    ): Promise<R>
    head<T = any, R = ExAxiosResponse<T>>(
        url: string,
        config?: ExAxiosRequestConfig,
    ): Promise<R>
    options<T = any, R = ExAxiosResponse<T>>(
        url: string,
        config?: ExAxiosRequestConfig,
    ): Promise<R>
    post<T = any, R = ExAxiosResponse<T>>(
        url: string,
        data?: any,
        config?: ExAxiosRequestConfig,
    ): Promise<R>
    put<T = any, R = ExAxiosResponse<T>>(
        url: string,
        data?: any,
        config?: ExAxiosRequestConfig,
    ): Promise<R>
    patch<T = any, R = ExAxiosResponse<T>>(
        url: string,
        data?: any,
        config?: ExAxiosRequestConfig,
    ): Promise<R>
    defaults: ExAxiosRequestConfig
    /**
     * 钩子函数队列
     * 所有钩子函数的 config 参数均为同一对象
     * 钩子之间的通信可通过 config 进行
     * 钩子与拦截器之间的通信可能需要通过引用类型的数据进行（与拦截器中的 config 不是同一对象）
     */
    exHooks: Array<{
        // 请求前调用（在请求拦截器之前）
        onBefore?: (config: ExAxiosRequestConfig) => any

        // 请求完成调用（在响应拦截器之后，then 之前）
        onComplete?: (
            config: ExAxiosRequestConfig,
            isResolve: boolean,
            resOrErr: AxiosResponse | AxiosError | Error | any,
        ) => any
    }> & {
        // 用于添加一组钩子函数（返回的函数可用于移除该组钩子函数）
        add: (obj: ExHook) => () => any
    }
}

export declare interface ExApiHook {
    name: string
    method?: Method
    description?: string
    onBefore: (payload: any) => {}
    onSuccess: (payload: any) => {}
    config?: ExAxiosRequestConfig
    requestMap?: any
    responseMap?: any
}
export declare interface ExApi {
    dispatch: (
        name: string,
        payload?: object,
        config?: ExAxiosRequestConfig,
    ) => {}
}
/*
/** http请求响应格式  */
export declare interface ApiResponse {
    errCode: number
    errMsg?: string
    data?: any
}

// 对接状态
export enum DockingStatus {
    '对接中' = 1,
    '对接成功',
    '对接失败',
    '未对接',
    '分发中',
}
