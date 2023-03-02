import http from '../scripts/http'
/**
 * @interface loginParams -登录参数
 * @property {string} grant_type -授权类型
 * @property {string} email -邮箱
 * @property {string} password -用户密码
 */
interface LoginParams {
    grant_type: string
    username: string
    password: string
}
class MockService {
    // 列表
    static async list(params: any): Promise<any> {
        return http.request({
            url: '/mock/list',
            method: 'get',
            params: params,
        })
    }
    // 登录
    static async login(params: LoginParams): Promise<any> {
        return http.request({
            url: '/mock/login',
            method: 'post',
            responseType: 'json',
            params: params,
        })
    }
}
export default MockService
