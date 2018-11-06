/**
 * 设计一个类，实现addMember和isExist方法，用更快的速度，更少的内存。
 * 
 * 数据范围是0到100，那么只需要4个整数就可以表示4*32个数的存在与否，创建一个大小为4的数组
 * 
 * 执行addMember时，先用member/32，确定member在数组里的索引（arr_index），
 * 然后用member%32，确定在整数的哪个二进制位行操作(bit_index)，
 * 最后执行bit_arr[arr_index] = bit_arr[arr_index] | 1<<bit_index;
 * 
 * 执行isExist时，先用member/32，确定member在数组里的索引（arr_index），
 * 然后用member%32，确定在整数的哪个二进制位行操作(bit_index)，
 * 最后执行bit_arr[arr_index] & 1<<bit_index，如果结果不为0，就说明memeber存在
 * 
 * size是最大數值的整數
 */

function MyBitMap(size) {
    //存储数据
    var bit_arr = new Array(size);
    // 先都初始化成0
    for (var i = 0; i < bit_arr.length; i++) {
        bit_arr[i] = 0;
    }
    //加入一個整數
    this.addMember = function(member) {
        var arr_index = Math.floor(member / 32); //決定在數組中的索引
        var bit_index = member % 32; //決定在整數的32個bit位的哪一位上
        bit_arr[arr_index] = bit_arr[arr_index] | 1 << bit_index;
    };
    this.isExist = function(member) {
        var arr_index = Math.floor(member / 32); //決定在數組中的索引
        var bit_index = member % 32; //決定在整數的32個bit位的哪一位
        var value = bit_arr[arr_index] & 1 << bit_index;
        if (value != 0) {
            return true;
        }
        return false;
    }

}

/*
var bit_map = new MyBitMap(4);
var arr = [0, 3, 5, 6, 9, 34, 23, 78, 99];
for (var i = 0; i < arr.length; i++) {
    bit_map.addMember(arr[i]);
}

console.log(bit_map.isExist(3)); //ture
console.log(bit_map.isExist(7)); //false
console.log(bit_map.isExist(78)); //true
*/

exports.BitMap = MyBitMap;

/**
 * 不足：
 * 这种数据结构基于位做映射，能够用很少的内存存储数据，和数组不同，
 * 它只能存储表示某个数是否存在，可以用于大数据去重，大数据排序，两个集合取交集。
 * BitMap在处理大数据时才有优势，而且要求数据集紧凑，
 * 如果要处理的数只有3个，1， 1000， 100000，那么空间利用率太低了，最大的值决定了BitMap要用多少内存。
 */