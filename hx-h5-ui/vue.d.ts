// declare module 'vue/types/vue' {
//     class C {}
//     interface Vue {
//         navigateTo
//         /**
//          * @description 确认 - message-box
//          * @param {string} msg 提示语
//          * @param {Function} fn 接口请求
//          * @param {*} params 请求参数
//          * @return {Promise<any>}
//          */
//         $confirm$: (
//             msg: string,
//             fn: (params?: any) => Promise<any>,
//             params: any,
//         ) => Promise<any>
//         $bridge: {
//             /**
//              * @description 日志
//              * @param {*} data 日志正文
//              * @param {string} logKey 日志key，默认为log
//              */
//             log: (data: any, logKey?: string) => void
//             /**
//              * @description 关闭 webview
//              * @param {boolean} hasDelay 是否有延迟
//              * @param {string} delay 延迟时长，默认 500 毫秒
//              */
//             close: (hasDelay?: boolean, delay?: number) => void
//             /**
//              * @param 调用客户端原生方法
//              * @param {string} fnName 客户端方法名
//              * @param {object} params 传递给客户端的参数
//              * @param {function} callback 回调
//              */
//             callNativeBridge: (
//                 fnName: string,
//                 params: Record<string, any>,
//                 callback: any,
//             ) => void
//             /** 获取证书信息 */
//             getCertInfoList: (
//                 params: Record<string, any>,
//                 callback: any,
//             ) => void
//             /** 实人认证 */
//             realAuth: (params: Record<string, any>, callback: any) => void
//             /** 下载证书 */
//             downloadCert: (params: Record<string, any>, callback: any) => void
//             /** 签名 */
//             signWithCert: (params: Record<string, any>, callback: any) => void
//             /** 跳转页面*/
//             navToPage: (params: Record<string, any>, callback: any) => void
//         }
//     }
// }
