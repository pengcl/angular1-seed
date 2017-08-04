var ability = {
    "ability": {
        "attacking": {
            "name": "进功",
            "value": 28.6,
            "property": {
                "crossing": {
                    "name": "传中",
                    "value": "100"
                },
                "finishing": {
                    "name": "射术",
                    "value": "100"
                },
                "heading": {
                    "name": "头球",
                    "value": "100"
                },
                "shortPassing": {
                    "name": "短传",
                    "value": "100"
                },
                "volleys": {
                    "name": "凌空",
                    "value": "100"
                }
            }
        },
        "skill": {
            "name": "技巧",
            "value": 29.2,
            "property": {
                "dribbling": {
                    "name": "盘带",
                    "value": "100"
                },
                "curve": {
                    "name": "弧线",
                    "value": "100"
                },
                "freeKick": {
                    "name": "任意球",
                    "value": "100"
                },
                "longPassing": {
                    "name": "长传",
                    "value": "100"
                },
                "ballControl": {
                    "name": "控球",
                    "value": "100"
                }
            }
        },
        "movement": {
            "name": "移动",
            "value": 73.2,
            "property": {
                "acceleration": {
                    "name": "加速",
                    "value": "100"
                },
                "sprintSpeed": {
                    "name": "速度",
                    "value": "100"
                },
                "agility": {
                    "name": "敏捷",
                    "value": "100"
                },
                "reactions": {
                    "name": "反应",
                    "value": "100"
                },
                "balance": {
                    "name": "平衡",
                    "value": "100"
                }
            }
        },
        "power": {
            "name": "力量",
            "value": 77.6,
            "property": {
                "shotPower": {
                    "name": "射门力量",
                    "value": "100"
                },
                "jumping": {
                    "name": "弹跳",
                    "value": "100"
                },
                "stamina": {
                    "name": "体能",
                    "value": "100"
                },
                "strength": {
                    "name": "强壮",
                    "value": "100"
                },
                "longShots": {
                    "name": "远射",
                    "value": "100"
                }
            }
        },
        "mentality": {
            "name": "心理",
            "value": 73,
            "property": {
                "aggression": {
                    "name": "侵略性",
                    "value": "100"
                },
                "interceptions": {
                    "name": "拦截意识",
                    "value": "100"
                },
                "positioning": {
                    "name": "跑位",
                    "value": "100"
                },
                "vision": {
                    "name": "视野",
                    "value": "100"
                },
                "penalties": {
                    "name": "点球",
                    "value": "100"
                },
                "composure": {
                    "name": "沉着",
                    "value": "100"
                }
            }
        },
        "defending": {
            "name": "防守",
            "value": 38.3333333333333,
            "property": {
                "marking": {
                    "name": "盯人",
                    "value": "100"
                },
                "standingTackle": {
                    "name": "抢断",
                    "value": "100"
                },
                "slidingTackle": {
                    "name": "铲球",
                    "value": "100"
                }
            }
        },
        "goalkeeping": {
            "name": "守门",
            "value": 87.4,
            "property": {
                "diving": {
                    "name": "鱼跃",
                    "value": "100"
                },
                "handling": {
                    "name": "手抛球",
                    "value": "100"
                },
                "kicking": {
                    "name": "开球",
                    "value": "100"
                },
                "positioning": {
                    "name": "站位",
                    "value": "100"
                },
                "reflexes": {
                    "name": "反应",
                    "value": "30"
                }
            }
        }
    }
};


function getPropertyAverage(obj, lv) {
    var value = 0;
    var len = 0;
    for (var k in obj) {
        len = len + 1;
        value = value + parseInt(obj[k].value * 0.01 * lv + obj[k].value);
    }
    return value / len;
}

function getPromotedProperty(obj) {

}

function getAbility(ability, lv) {
    for (var k in ability) {
        var ave = getPropertyAverage(ability[k].property);
        ability[k].value = ave;
    }
    return ability;
}

function setPromote(ability) {
    for (var k in ability) {
        var ave = getPropertyAverage(ability[k].property);
        ability[k].value = ave;
    }
    return ability;
}

console.log(getAbility(ability.ability));