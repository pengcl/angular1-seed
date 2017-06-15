function createRandomTeam() {
    var capability;
    do {
        capability = getNumberOfRND(10000, 5000);
    } while (capability < 0);
    return Math.floor(capability);
}

function createRandomTeams(num) {
    console.time('创建' + num + '只球队');
    var teams = [];
    for (var i = 0; i < num; i++) {
        teams.push({
            id: i,
            capability: createRandomTeam(),
            battle: [],
            ranking: 0,
            group: ''
        });
    }
    console.timeEnd('创建' + num + '只球队');
    return teams;
}

var Teams = createRandomTeams(100);

//获取对象或数组中选中对象的index
function getIndex(jsonArray, keyName, value) {
    for (var i = 0; i < jsonArray.length; i++) {
        if (jsonArray[i][keyName] == value) {
            return i;
        }
    }
};

var setTeamsData = function (teams) {
    for (var i = 0; i < teams.length; i++) {
        var team = teams[i];
        var id = team.id;
        var index = getIndex(Teams, 'id', id);
        //console.log(Teams[index]);
        Teams[index].group = team.group;
    }
    return Teams;
};

//小组赛
var groupCompetition = function () {

};

//
var get16 = function (teams) {

};

//32强分组
var grouping = function (teams) {//分组

    var groupsName = ['A', 'B', 'C', 'D', 'E', 'F', 'J', 'H'];
    var groups = [];
    var _teams = [];
    for (var i = 0; i < teams.length; i++) {
        _teams.push({
            id: teams[i].id,
            capability: teams[i].capability
        })
    }
    _teams = _teams.sort(function (a, b) {
        return b.capability - a.capability;
    });

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 4; j++) {
            _teams[i + j * 8].group = groupsName[i];
        }
    }

    return _teams;
};

//获取32强
var getThirtyTwo = function (teams) {
    if (teams.length <= 32) {
        return teams
    } else {
        for (var i = 1; i < teams.length; i++) {
            var matchResult = match.battle(teams[0].capability, teams[i].capability);
            var otherResult = {
                score: reverseMatchResult(matchResult.score),
                result: getResult(this.score)
            };
            teams[0].battle.push({
                other: i,
                result: matchResult
            });
            teams[i].battle.push({
                other: 0,
                result: otherResult
            });
            teams = loseFiveOut(teams);
            if (teams.length <= 32) {
                return teams
            }
        }
        return getThirtyTwo(teams);
    }
};

//失败5次淘汰
function loseFiveOut(teams) {
    var winners = [];
    for (var i = 0; i < teams.length; i++) {
        var loseTimes = 0;
        for (var j = 0; j < teams[i].battle.length; j++) {
            if (teams[i].battle[j].result.result === 'l') {
                loseTimes = loseTimes + 1;
            }
        }
        if (loseTimes <= 5) {
            winners.push(teams[i]);
        }
    }
    return winners;
}

//获取正态分布数
function getNumberOfRND(r, d) {//r[number] 为基准数,d[number] 为动态偏移
    return r + (rnd() * d);
}

//随机正态分布
function rnd() { //Random Normal Distribution
    var u = 0.0, v = 0.0, w = 0.0, c = 0.0;
    do {
        //获得两个（-1,1）的独立随机变量
        u = Math.random() * 2 - 1.0;
        v = Math.random() * 2 - 1.0;
        w = u * u + v * v;
    } while (w == 0.0 || w >= 1.0);
    //这里就是 Box-Muller转换
    c = Math.sqrt((-2 * Math.log(w)) / w);
    //返回2个标准正态分布的随机数，封装进一个数组返回
    //当然，因为这个函数运行较快，也可以扔掉一个
    //return [u*c,v*c];
    return u * c;
}

//获取胜率
function winRate(our, other) {//our[number],other[number]为战力
    return 1 / (1 + Math.pow(10, -((our - other) / (our / 20))));
}

//获取比分
function winScore(r) {//r[number]为胜率
    var our = 0, other = 0;
    do {
        our = getNumberOfRND(r * 10, 2);
        other = getNumberOfRND((1 - r) * 10, 2);
    } while (our > 10 || our < 0 || other > 10 || other < 0);
    return [Math.floor(our), Math.floor(other)]
}

//获取比赛结果
function getResult(our, other) {//our[number],other[number]比分
    var gd = our - other;//净胜球
    if (gd > 0) {
        return 'w';
    }
    else if (gd === 0) {
        return 'd';
    } else {
        return 'l';
    }
}

//反转比分
function reverseMatchResult(score) {//score[number,number]比分
    return [score[1], score[0]];
}

//比赛函数
var match = {
    battle: function (our, other) {
        var s, r;
        r = winRate(our, other);
        s = winScore(r);
        return {
            score: [s[0], s[1]],
            result: getResult(s[0], s[1])
        };
    }
};

console.log(setTeamsData(grouping(getThirtyTwo(Teams))));