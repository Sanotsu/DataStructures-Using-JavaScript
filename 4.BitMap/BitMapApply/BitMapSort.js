BitMap = require('../MyBitMap')

/**
 * 有多达10亿无序整数，已知最大值为15亿，请对这个10亿个数进行排序。
 * 传统排序算法都不可能解决这个排序问题，即便内存允许，其计算时间也是漫长的，如果使用BitMap就极为简单。
 * 
 * BitMap存储最大值为15亿的集合，只需要180M的空间，空间使用完全可以接受，
 * 至于速度，存储和比较过程中的位运算速度都非常快，
 * 第一次遍历，将10亿个数都放入到BitMap中，
 * 第二次，从0到15亿进行遍历，如果在BitMap，则输出该数值，这样经过两次遍历，就可以将如此多的数据排序。
 * 
 * 需要强调的一点，利用BitMap排序，待排序的集合中【不能有重复数据】。
 */

/**
 * 为了演示方便，只用一个很小的数组，[0, 6, 88, 7, 73, 34, 10, 99, 22]，已知数组最大值是99，利用BitMap排序的算法如下
 */
var arr = [0, 6, 88, 7, 73, 34, 10, 99, 22];
var sort_arr = [];
var bit_map = new BitMap.BitMap(4);

for (var i = 0; i < arr.length; i++) {
    bit_map.addMember(arr[i]);
}

for (var i = 0; i <= 99; i++) {
    if (bit_map.isExist(i)) {
        sort_arr.push(i);
    }
}
console.log("排序前：" + arr);
console.log("排序后：" + sort_arr);


/*
//嘗試隨機生成一個大批量的隨機數組，忽略其中重復的刪除之后，排序
//生產隨機數
function romdonArr(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        a = Math.floor(Math.random() * num);
        arr.push(a);
    }
    return arr;
}

//arr = [0, 6, 88, 7, 73, 34, 10, 99, 22];

function bitmapsort(arr) {

    var sort_arr = [];
    var bit_map = new BitMap.BitMap(Math.ceil(arr.length / 32));

    for (var i = 0; i < arr.length; i++) {
        bit_map.addMember(arr[i]);
    }

    for (var i = 0; i <= arr.length; i++) {
        if (bit_map.isExist(i)) {
            sort_arr.push(i);
        }
    }

    console.log("排序前：" + arr);
    console.log("去重後排序：" + sort_arr);
    console.log("排序前長度：" + arr.length);
    console.log("去重後排序長度：" + sort_arr.length);
}

bitmapsort(romdonArr(120));
*/