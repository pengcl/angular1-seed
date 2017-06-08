var cars = ['奔驰', '本田', '皇冠'];
function checkCar() {
    var a, b, c;
    for (var i = 0; i < 3; i++) {
        a = cars[i];
        for (var j = 0; j < 3; j++) {
            if (i !== j) {
                b = cars[j];
                for (var k = 0; k < 3; k++) {
                    if (k !== i && k !== j) {
                        c = cars[k];
                        var resultNum = 0;
                        if (a === '奔驰') {
                            resultNum = resultNum + 1;
                        }
                        if (b !== '奔驰') {
                            resultNum = resultNum + 1;
                        }
                        if (c !== '皇冠') {
                            resultNum = resultNum + 1;
                        }

                        if (resultNum === 1) {
                            return [a, b, c];
                        }
                    }
                }
            }
        }
    }
}

console.log(checkCar());