//生產隨機數
function randomArr(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        a = Math.floor(Math.random() * num);
        arr.push(a);
    }
    return arr;
}

exports.randomArr = randomArr;