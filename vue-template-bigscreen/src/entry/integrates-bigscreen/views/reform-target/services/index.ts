/** 地区 - code */
export enum AREA_CODE {
    /** 全省 - code */
    QUANSHENG = '33',
    /** 省本级 - code */
    SHENGBENJI = '3300',
    /** 杭州 - code */
    HANGZHOU = '3301',
    /** 宁波 - code */
    NINGBO = '3302',
    /** 温州 - code */
    WENZHOU = '3303',
    /** 嘉兴 - code */
    JIAXING = '3304',
    /** 湖州 - code */
    HUZHOU = '3305',
    /** 绍兴 - code */
    SHAOXING = '3306',
    /** 金华 - code */
    JINHUA = '3307',
    /** 衢州 - code */
    QUZHOU = '3308',
    /** 舟山 - code */
    ZHOUSHAN = '3309',
    /** 丽水 - code */
    LISHUI = '3325'
}

/** 地区code - map */
export const areaMap: Record<string,any> = {
    [AREA_CODE.QUANSHENG]: {
        label: '全省',
        value: AREA_CODE.QUANSHENG
    },
    [AREA_CODE.SHENGBENJI]: {
        label: '省本级',
        value: AREA_CODE.SHENGBENJI
    },
    [AREA_CODE.HANGZHOU]: {
        label: '杭州',
        value: AREA_CODE.HANGZHOU
    },
    [AREA_CODE.NINGBO]: {
        label: '宁波',
        value: AREA_CODE.NINGBO
    },
    [AREA_CODE.WENZHOU]: {
        label: '温州',
        value: AREA_CODE.WENZHOU
    },
    [AREA_CODE.JIAXING]: {
        label: '嘉兴',
        value: AREA_CODE.JIAXING
    },
    [AREA_CODE.HUZHOU]: {
        label: '湖州',
        value: AREA_CODE.HUZHOU
    },
    [AREA_CODE.SHAOXING]: {
        label: '绍兴',
        value: AREA_CODE.SHAOXING
    },
    [AREA_CODE.JINHUA]: {
        label: '金华',
        value: AREA_CODE.JINHUA
    },
    [AREA_CODE.QUZHOU]: {
        label: '衢州',
        value: AREA_CODE.QUZHOU
    },
    [AREA_CODE.ZHOUSHAN]: {
        label: '舟山',
        value: AREA_CODE.ZHOUSHAN
    },
    [AREA_CODE.LISHUI]: {
        label: '丽水',
        value: AREA_CODE.LISHUI
    },
}
