BitMap = require('../MyBitMap')
    /**
     * 支持负数（困难模式）
     * 之前所讲的BitMap只能存储大于等于0的整数，改造BitMap类，不论正数还是负数，都可以存储并判断是否存在
     * 
     * 思路分析
     * 可以用两个数组来存储数据，一个存储大于等于0的整数，另一个存储小于0的整数，
     * 不过既然已经有实现好的bitmap类，我们可以拿过来直接使用,利用它再封装一个类
     */

function SuperBitMap(size) {
    var positive_bit_map = new BitMap.BitMap(size);
    var negative_bit_map = new BitMap.BitMap(size);

    this.addMember = function(member) {
        if (member >= 0) {
            positive_bit_map.addMember(member);
        } else {
            negative_bit_map.addMember(member);
        }
    }

    this.isExist = function(member) {
        if (member >= 0) {
            return positive_bit_map.isExist(member);
        } else {
            return negative_bit_map.isExist(member);
        }
    }
}

//測試使用
/*
var arr = [1, 3, -6, -8, 8, 9];
var super_bm = new SuperBitMap();

for (var i = 0; i < arr.length; i++) {
    super_bm.addMember(arr[i]);
}

console.log(super_bm.isExist(-8)); //true
console.log(super_bm.isExist(8)); //true
console.log(super_bm.isExist(9)); //true
console.log(super_bm.isExist(-6)); //true
console.log(super_bm.isExist(-5)); //false
*/