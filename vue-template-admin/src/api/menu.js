/**
 * 菜单管理 - api
 */
import request from '@/utils/request'

/**
 * 获取菜单列表
 * @param {object} params 请求参数 例如： { pageNum: 1, pageSize: 10 }
 */
export function getMenuList(params) {
    return request({
        url: '/menus/list',
        method: 'get',
        params: params,
    })
}
