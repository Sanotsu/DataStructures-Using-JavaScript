BitMap = require('../MyBitMap')
    /**
     * 两个数组，内容分别为[1, 4, 6, 8, 9, 10, 15], [6, 14, 9, 2, 0, 7]，请用BitMap计算他们的交集
     */

var arr1 = [1, 4, 6, 8, 9, 10, 15];
var arr2 = [6, 14, 9, 2, 0, 7];

function intersection_arr(arr1, arr2) {
    var intersection_arr = [];
    var bit_map = new BitMap.BitMap();

    for (var i = 0; i < arr1.length; i++) {
        bit_map.addMember(arr1[i]);
    }
    for (var i = 0; i < arr2.length; i++) {
        if (bit_map.isExist(arr2[i])) {
            intersection_arr.push(arr2[i]);
        }
    }

    return intersection_arr;
}

console.log(intersection_arr(arr1, arr2)); //[6,9]