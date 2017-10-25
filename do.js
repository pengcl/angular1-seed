function setForms(num) {
    var mainNumber, SubNumber, ThirdNumber;
    do {
        mainNumber = parseInt(num * Math.random());
        SubNumber = parseInt(num * Math.random());
        ThirdNumber = parseInt(num * Math.random());
        console.log(mainNumber, SubNumber, ThirdNumber);
    } while (mainNumber !== SubNumber !== ThirdNumber);
    return [mainNumber, SubNumber, ThirdNumber];
}

console.log(setForms(4));