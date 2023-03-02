const progress = function (progress: number, fixed: number = 2) {
    if (isNaN(progress) || progress <= -Infinity || progress >= Infinity) return 0
    return Number(progress.toFixed(fixed))
}
// 执法协作分布-城市排名
const enforceTopCityData: any = {
    // 执法协作分布-城市排名
    All_City: [{
        label: 'NO.1 湖州',
        value: 184,
        progress: 1,
    }, {
        label: 'NO.2 金华',
        value: 22,
        progress: progress(22 / 184),
    }, {
        label: 'NO.3 绍兴',
        value: 13,
        progress: progress(13 / 184),
    }, {
        label: 'NO.4 宁波',
        value: 6,
        progress: progress(6 / 184),
    }, {
        label: 'NO.5 温州',
        value: 4,
        progress: progress(4 / 184),
    }],
    // 联合执法-城市排名
    LHZF_City: [{
        label: 'NO.1 湖州',
        value: 130,
        progress: 1,
    }, {
        label: 'NO.2 金华',
        value: 7,
        progress: progress(7 / 130),
    }, {
        label: 'NO.3 宁波',
        value: 3,
        progress: progress(3 / 130),
    }],
    // 协查协办-城市排名
    XCXB_City: [{
        label: 'NO.1 湖州',
        value: 9,
        progress: 1,
    }, {
        label: 'NO.2 宁波',
        value: 1,
        progress: progress(1 / 9),
    }],
    // 抄告抄送-城市排名
    CGCS_City: [{
        label: 'NO.1 湖州',
        value: 18,
        progress: 1,
    }, {
        label: 'NO.2 绍兴',
        value: 13,
        progress: progress(1 / 18),
    }, {
        label: 'NO.3 金华',
        value: 13,
        progress: progress(10 / 18),
    }, {
        label: 'NO.4 温州',
        value: 13,
        progress: progress(4 / 18),
    }, {
        label: 'NO.5 绍兴',
        value: 13,
        progress: progress(3 / 18),
    }],
    // 线索移交-城市排名
    XSYJ_City: [{
        label: 'NO.1 金华',
        value: 3,
        progress: 1,
    }, {
        label: 'NO.2 湖州',
        value: 2,
        progress: progress(2 / 3),
    }],
    // 联合会商-部门排名
    LHHS_City: [{
        label: 'NO.1 湖州',
        value: 25,
        progress: 1,
    }, {
        label: 'NO.2 金华',
        value: 2,
        progress: progress(2 / 25),
    }],
}

// 执法协作分布-部门排名
const enforceTopDeptData: any = {
    // 执法协作分布-部门排名
    All_Dept: [{
        label: 'NO.1 湖州市吴兴区综合行政执法局',
        value: 27,
        progress: 1,
    }, {
        label: 'NO.2 德清县综合执法局',
        value: 24,
        progress: progress(24 / 27),
    }, {
        label: 'NO.3 湖州市吴兴区住房和城乡建设局（人防办（民防局））',
        value: 24,
        progress: progress(24 / 27),
    }, {
        label: 'NO.4 德清县市场监督管理局',
        value: 22,
        progress: progress(22 / 27),
    }, {
        label: 'NO.5 长兴县综合执法局',
        value: 14,
        progress: progress(14 / 27),
    }],
    // 联合执法-部门排名
    LHZF_Dept: [{
        label: 'NO.1 德清县综合执法局',
        value: 24,
        progress: 1,
    }, {
        label: 'NO.2 德清县市场监督管理局',
        value: 22,
        progress: progress(22 / 24),
    }, {
        label: 'NO.3 宁波',
        value: 21,
        progress: progress(21 / 24),
    }, {
        label: 'NO.4 湖州市吴兴区住房和城乡建设局（人防办（民防局））',
        value: 19,
        progress: progress(19 / 24),
    }, {
        label: 'NO.5 长兴县综合执法局',
        value: 14,
        progress: progress(14 / 24),
    }],
    // 协查协办-部门排名
    XCXB_Dept: [{
        label: 'NO.1 湖州吴兴',
        value: 3,
        progress: 1,
    }, {
        label: 'NO.2 湖州市生',
        value: 3,
        progress: 1,
    }, {
        label: 'NO.3 湖州市住',
        value: 2,
        progress: progress(2 / 3),
    }, {
        label: 'NO.4 宁波市综',
        value: 1,
        progress: progress(1 / 3),
    }, {
        label: 'NO.5 湖州市综',
        value: 1,
        progress: progress(1 / 3),
    }],
    // 抄告抄送-部门排名
    CGCS_Dept: [{
        label: 'NO.1 绍兴市交通局',
        value: 7,
        progress: 1,
    }, {
        label: 'NO.2 湖州市综合执法局',
        value: 7,
        progress: 1,
    }, {
        label: 'NO.3 绍兴上虞区交通局',
        value: 6,
        progress: progress(6 / 7),
    }, {
        label: 'NO.4 湖州市交通局',
        value: 4,
        progress: progress(4 / 7),
    }, {
        label: 'NO.5 丽水市交通运输局',
        value: 3,
        progress: progress(3 / 7),
    }],
    // 线索移交-部门排名
    XSYJ_Dept: [{
        label: 'NO.1 武义县公安局',
        value: 2,
        progress: 1,
    }, {
        label: 'NO.2 湖州市自然资源和规划局',
        value: 1,
        progress: progress(1 / 2),
    }, {
        label: 'NO.3 湖州市住建局',
        value: 1,
        progress: progress(1 / 2),
    }, {
        label: 'NO.4 武义县教育局',
        value: 1,
        progress: progress(1 / 2),
    }],
    // 联合会商-部门排名
    LHHS_Dept: [{
        label: 'NO.1 湖州市吴兴区综合行政执法局',
        value: 6,
        progress: 1,
    }, {
        label: 'NO.2 湖州市住房与城乡建设局',
        value: 5,
        progress: progress(5 / 6),
    }, {
        label: 'NO.3 湖州市吴兴区卫生健康局',
        value: 5,
        progress: progress(5 / 6),
    }, {
        label: 'NO.4 湖州市综合行政执法局',
        value: 5,
        progress: progress(5 / 6),
    }, {
        label: 'NO.5 湖州市吴兴区住房和城乡建设局（人防办（民防局））',
        value: 5,
        progress: progress(5 / 6),
    }],
}

const urgencyData: any = [
    [
        {
            label: '工作人员',
            value: 17,
            unit: '人次',
        },
        {
            label: '车辆',
            value: 2,
            unit: '台次',
        },
        {
            label: '无人机',
            value: 5,
            unit: '架次',
        },
        {
            label: '设备',
            value: 5,
            unit: '件次',
        },
    ], [
        {
            label: '工作人员',
            value: 17,
            unit: '人次',
        },
        {
            label: '车辆',
            value: 2,
            unit: '台次',
        },
        {
            label: '无人机',
            value: 5,
            unit: '架次',
        },
        {
            label: '设备',
            value: 5,
            unit: '件次',
        },
    ],
]
export { enforceTopCityData, enforceTopDeptData, progress, urgencyData }