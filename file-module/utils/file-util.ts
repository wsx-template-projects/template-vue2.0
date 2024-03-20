import { http } from '@/entry/help-center/scripts/http'
import { Message } from 'element-ui'

export enum OPERA_TYPE {
    /** 下载 */
    DOWNLOAD = 'down',
    /** 预览 */
    PREVIEW = 'view',
}

/** 下载/预览地址 */
const DOWNLOAD_URL = `/usercenter/portal/contentManageHomePage/downloadHelpFile`

/**
 * @description 获取文件下载/预览地址
 * @param {Object} row
 * @param {OPERA_TYPE} operaType 操作类型
 */
export const getUrl = (row: any, operaType: OPERA_TYPE, isPrefix = true) => {
    const { uid } = row
    const prefix = process.env.VUE_APP_BASEURL_API
    const url = DOWNLOAD_URL + `?uid=${uid}&type=${operaType}`
    // const url = DOWNLOAD_URL + `?uid=${uid}&fileUrl=${fileUrl}&type=${operaType}`
    return isPrefix ? prefix + url : url
}

/**
 * @description 获取文件流
 */
export const getStreamFile = async (apiUrl: string) => {
    const res = await http.get(apiUrl, {
        responseType: 'blob',
    })
    return res
}

/**
 * @description 通过文件流获取blob-url
 * @param {string} res 文件流
 * @param {string} name 前端自定义的下载文件名，带上文件后缀名，选填
 * chrome会优先使用接口返回的命名，edge会优先使用此name
 */
export const getBlobUrlByArrayBuffer = (res: any) => {
    const blob = new Blob([res.data], { type: res.data.type })
    const url = window.URL.createObjectURL(blob)
    console.log('blob :>> ', blob)
    console.log('blob-url :>> ', url)
    return url
}

/**
 * 流文件下载
 * @param {string} res 文件流
 * @param {string} name 前端自定义的下载文件名，带上文件后缀名，选填
 * chrome会优先使用接口返回的命名，edge会优先使用此name
 */
export const downloadFileByArraybuffer = (res: any, name: string) => {
    const url = getBlobUrlByArrayBuffer(res)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('target', '_blank')
    link.setAttribute('download', decodeURIComponent(name))
    link.click()
    window.URL.revokeObjectURL(url)
}

/**
 * @description 下载文件
 */
export const downloadFile = async (row: any, isHref = true, fileName?: string) => {
    if (isHref) {
        const url = getUrl(row, OPERA_TYPE.DOWNLOAD)
        console.log('download-url :>> ', url)
        window.location.href = url
        return
    }
    if (!fileName) {
        Message.warning('文件名不能为空!')
        return
    }
    const apiUrl = getUrl(row, OPERA_TYPE.DOWNLOAD, false)
    const res = await getStreamFile(apiUrl)
    console.log('apiUrl :>> ', apiUrl)
    console.log('stream-res :>> ', res)
    downloadFileByArraybuffer(res, fileName)
}

/**
 * @description 获取文件预览地址
 */
export const getPreviewUrl = (row: any) => {
    // 'http://192.168.2.57:8080/@API/usercenter/portal/contentManageHomePage/downloadHelpFile?uid=5F1867E3B7D54DCF95E3FCCFBC14F4E3&fileUrl=/data/kxrz-user-center-fileInfo/c149202c-8283-40da-ad86-294e2adcb53a.pdf&type=view'
    return getUrl(row, OPERA_TYPE.PREVIEW)
}

/**
 * @description 可以预览的文件类型
 */
const CAN_PREVIEW_FILE = ['pdf', 'jpg', 'png', 'jpeg', 'mp4']

/**
 * @description 是否可以预览
 * @param {string} value 带文件后缀的文件名OR文件地址
 */
export const isCanPreview = (value: string) => {
    if (!value || value.indexOf('.') == -1) {
        return false
    }
    const fileType = value.split('.')?.[1] ?? ''
    // console.log('fileType :>> ', fileType)
    return CAN_PREVIEW_FILE.includes(fileType)
}

/**
 * @description 获取文件复制地址
 */
export const getCopyUrl = (row: any) => {
    if (isCanPreview(row.fileName)) {
        return getUrl(row, OPERA_TYPE.PREVIEW)
    }
    return getUrl(row, OPERA_TYPE.DOWNLOAD)
}
