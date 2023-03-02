/** 浙江--行政区划 */
const zjAreaData = [{
        name: '杭州市',
        area: 3301,
        areaCode: '330100'
    },
    {
        name: '宁波市',
        area: 3302,
        areaCode: '330200'
    },
    {
        name: '温州市',
        area: 3303,
        areaCode: '330300'
    },
    {
        name: '嘉兴市',
        area: 3304,
        areaCode: '330400'
    },
    {
        name: '湖州市',
        area: 3305,
        areaCode: '330500'
    },
    {
        name: '绍兴市',
        area: 3306,
        areaCode: '330600'
    },
    {
        name: '金华市',
        area: 3307,
        areaCode: '330700'
    },
    {
        name: '衢州市',
        area: 3308,
        areaCode: '330800'
    },
    {
        name: '舟山市',
        area: 3309,
        areaCode: '330900'
    },
    {
        name: '台州市',
        area: 3310,
        areaCode: '331000'
    },
    {
        name: '丽水市',
        area: 3311,
        areaCode: '331100'
    }
]
/** 各地区--行政区划 */
const areaMap = {
    // 杭州市	
    3301: [{
            name: '上城区',
            areaCode: '330102'
        },
        {
            name: '拱墅区',
            areaCode: '330105'
        },
        {
            name: '西湖区',
            areaCode: '330106'
        },
        {
            name: '滨江区',
            areaCode: '330108'
        },
        {
            name: '萧山区',
            areaCode: '330109'
        },
        {
            name: '余杭区',
            areaCode: '330110'
        },
        {
            name: '富阳区',
            areaCode: '330111'
        },
        {
            name: '临安区',
            areaCode: '330112'
        },
        {
            name: '临平区',
            areaCode: '330113'
        },
        {
            name: '钱塘区',
            areaCode: '330114'
        },
        {
            name: '桐庐县',
            areaCode: '330122'
        },
        {
            name: '淳安县',
            areaCode: '330127'
        },
        {
            name: '建德市',
            areaCode: '330182'
        },
        {
            name: '下城区',
            areaCode: '330103'
        },
        {
            name: '江干区',
            areaCode: '330104'
        }
    ],
    // 宁波市
    3302: [{
            name: '海曙区',
            areaCode: '330203'
        },
        {
            name: '江北区',
            areaCode: '330205'
        },
        {
            name: '北仑区',
            areaCode: '330206'
        },
        {
            name: '镇海区',
            areaCode: '330211'
        },
        {
            name: '鄞州区',
            areaCode: '330212'
        },
        {
            name: '奉化区',
            areaCode: '330213'
        },
        {
            name: '象山县',
            areaCode: '330225'
        },
        {
            name: '宁海县',
            areaCode: '330226'
        },
        {
            name: '余姚市',
            areaCode: '330281'
        },
        {
            name: '慈溪市',
            areaCode: '330282'
        }
    ],
    // 温州市
    3303: [{
            name: '鹿城区',
            areaCode: '330302'
        },
        {
            name: '龙湾区',
            areaCode: '330303'
        },
        {
            name: '瓯海区',
            areaCode: '330304'
        },
        {
            name: '洞头区',
            areaCode: '330305'
        },
        {
            name: '永嘉县',
            areaCode: '330324'
        },
        {
            name: '平阳县',
            areaCode: '330326'
        },
        {
            name: '苍南县',
            areaCode: '330327'
        },
        {
            name: '文成县',
            areaCode: '330328'
        },
        {
            name: '泰顺县',
            areaCode: '330329'
        },
        {
            name: '温州经济技术开发区',
            areaCode: '330371'
        },
        {
            name: '瑞安市',
            areaCode: '330381'
        },
        {
            name: '乐清市',
            areaCode: '330382'
        },
        {
            name: '龙港市',
            areaCode: '330383'
        }
    ],
    // 嘉兴市
    3304: [{
            name: '南湖区',
            areaCode: '330402'
        },
        {
            name: '秀洲区',
            areaCode: '330411'
        },
        {
            name: '嘉善县',
            areaCode: '330421'
        },
        {
            name: '海盐县',
            areaCode: '330424'
        },
        {
            name: '海宁市',
            areaCode: '330481'
        },
        {
            name: '平湖市',
            areaCode: '330482'
        },
        {
            name: '桐乡市',
            areaCode: '330483'
        }
    ],
    // 湖州市	
    3305: [{
            name: '吴兴区',
            areaCode: '330502'
        },
        {
            name: '南浔区',
            areaCode: '330503'
        },
        {
            name: '德清县',
            areaCode: '330521'
        },
        {
            name: '长兴县',
            areaCode: '330522'
        },
        {
            name: '安吉县',
            areaCode: '330523'
        }
    ],
    // 绍兴市
    3306: [{
            name: '越城区',
            areaCode: '330602'
        },
        {
            name: '柯桥区',
            areaCode: '330603'
        },
        {
            name: '上虞区',
            areaCode: '330604'
        },
        {
            name: '新昌县',
            areaCode: '330624'
        },
        {
            name: '诸暨市',
            areaCode: '330681'
        },
        {
            name: '嵊州市',
            areaCode: '330683'
        }
    ],
    // 金华市
    3307: [{
            name: '婺城区',
            areaCode: '330702'
        },
        {
            name: '金东区',
            areaCode: '330703'
        },
        {
            name: '武义县',
            areaCode: '330723'
        },
        {
            name: '浦江县',
            areaCode: '330726'
        },
        {
            name: '磐安县',
            areaCode: '330727'
        },
        {
            name: '兰溪市',
            areaCode: '330781'
        },
        {
            name: '义乌市',
            areaCode: '330782'
        },
        {
            name: '东阳市',
            areaCode: '330783'
        },
        {
            name: '永康市',
            areaCode: '330784'
        }
    ],
    // 衢州市
    3308: [{
            name: '柯城区',
            areaCode: '330802'
        },
        {
            name: '衢江区',
            areaCode: '330803'
        },
        {
            name: '常山县',
            areaCode: '330822'
        },
        {
            name: '开化县',
            areaCode: '330824'
        },
        {
            name: '龙游县',
            areaCode: '330825'
        },
        {
            name: '江山市',
            areaCode: '330881'
        }
    ],
    // 舟山市	
    3309: [{
            name: '定海区',
            areaCode: '330902'
        },
        {
            name: '普陀区',
            areaCode: '330903'
        },
        {
            name: '岱山县',
            areaCode: '330921'
        },
        {
            name: '嵊泗县',
            areaCode: '330922'
        }
    ],
    // 台州市	
    3310: [{
            name: '椒江区',
            areaCode: '331002'
        },
        {
            name: '黄岩区',
            areaCode: '331003'
        },
        {
            name: '路桥区',
            areaCode: '331004'
        },
        {
            name: '三门县',
            areaCode: '331022'
        },
        {
            name: '天台县',
            areaCode: '331023'
        },
        {
            name: '仙居县',
            areaCode: '331024'
        },
        {
            name: '温岭市',
            areaCode: '331081'
        },
        {
            name: '临海市',
            areaCode: '331082'
        },
        {
            name: '玉环市',
            areaCode: '331083'
        }
    ],
    // 丽水市	
    3311: [{
            name: '莲都区',
            areaCode: '331102'
        },
        {
            name: '青田县',
            areaCode: '331121'
        },
        {
            name: '缙云县',
            areaCode: '331122'
        },
        {
            name: '遂昌县',
            areaCode: '331123'
        },
        {
            name: '松阳县',
            areaCode: '331124'
        },
        {
            name: '云和县',
            areaCode: '331125'
        },
        {
            name: '庆元县',
            areaCode: '331126'
        },
        {
            name: '景宁县',
            areaCode: '331127'
        },
        {
            name: '龙泉市',
            areaCode: '331181'
        }
    ],
}
/**
 * @param key 地市名或者地市行政区划编码
 * @param isCity 返回类型  地市或者区县 
 */
export function getArea(key, isCity = false) {
    // 如果传入的地市名
    let areaData = []
    if (isNaN(Number(key))) {
        areaData = zjAreaData.filter(elem => elem.name.indexOf(String(key)) > -1)
    } else {
        areaData = zjAreaData.filter(elem => {
            if (key.toString().length == 4) {
                return key == elem.area
            } else {
                return key == elem.areaCode
            }
        })
    }
    if (isCity) {
        return areaMap[areaData[0].area]
    } else {
        return areaData
    }
}
