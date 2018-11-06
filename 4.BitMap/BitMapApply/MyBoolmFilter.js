murmurhash3_32_gc = require('./murmurhash3_32_gc').mhash32;
/**
 * 前面所讲的BitMap的确很厉害， 可是， 却有着很强的局限性， 
 * BitMap只能用来处理整数， 无法用于处理字符串， 
 * 
 * 假设让你写一个强大的爬虫， 每天爬取数以亿计的网页， 那么你就需要一种数据结构， 能够存储你已经爬取过的url， 这样， 才不至于重复爬取。
 * 
 * 你可能会想到使用hash函数对url进行处理，转成整数，这样，似乎又可以使用BitMap了，
 * 但这样还是会有问题。假设BitMap能够映射的最大值是M，一个url的hash值需要对M求模，这样，就会产生冲突，而且随着存储数据的增多，冲突率会越来越大。
 * 
 * 布隆过滤器的思想非常简单，其基本思路和BitMap是一样的，可以把布隆过滤器看做是BitMap的扩展。
 * 为了解决冲突率，布隆过滤器要求使用k个hash函数，
 * 新增一个key时，把key散列成k个整数，然后在数组中将这个k个整数所对应的二进制位设置为1，
 * 判断某个key是否存在时，还是使用k个hash函数对key进行散列，得到k个整数，如果这k个整数所对应的二进制位都是1，就说明这个key存在，否则，这个key不存在。
 * 
 * 对于一个布隆过滤器，有两个参数需要设置，一个是预估的最多存放的数据的数量，一个是可以接受的冲突率。
 * 
 * 假设预估最多存放n个数据，可已接受的冲突率是p，那么就可以计算出来布隆过滤器所需要的bit位数量m,也可以计算所需要的hash函数的个数k,计算公式如下
 * m=−(n∗ln(p)/(ln2)^2)
 * k=(ln2)∗(m/n)
 * 
 */


//定义一个BoolmFilter类
function BoolmFilter(max_count, error_rate) {
    // 位图映射变量
    var bitMap = [];
    // 最多可放的数量
    var max_count = max_count;
    // 错误率
    var error_rate = error_rate;
    // 位图变量的长度
    var bit_size = Math.ceil(max_count * (-Math.log(error_rate) / (Math.log(2) * Math.log(2))));
    // 哈希数量
    var hash_ount = Math.ceil(Math.log(2) * (bit_size / max_count));

    /**
     * 每次add的时候，都要把key散列成k个值，并将这个k个值对应的二进制位设置为1，
     * 那么设置为1的这个动作就需要执行k次，这种需要重复执行的操作，我们就应该单独作为一个函数来实现。
     * @param {*} bit 
     */

    // 设置位的值
    var set_bit = function(bit) {
        var arr_index = Math.floor(bit / 32);
        var bit_index = Math.floor(bit % 32);
        bitMap[arr_index] |= (1 << bit_index);
    };

    // 读取位的值
    var get_bit = function(bit) {
        var arr_index = Math.floor(bit / 32);
        var bit_index = Math.floor(bit % 32);
        return bitMap[arr_index] &= (1 << bit_index);
    };

    // 添加key
    this.add = function(key) {
        if (this.isExist(key)) {
            return -1; //表示已经存在
        }

        for (var i = 0; i < hash_ount; i++) {
            var hash_value = murmurhash3_32_gc(key, i);
            set_bit(Math.abs(Math.floor(hash_value % (bit_size))));
        }
    };

    // 检测是否存在
    this.isExist = function(key) {
        for (var i = 0; i < hash_ount; i++) {
            var hash_value = murmurhash3_32_gc(key, i);
            if (!get_bit(Math.abs(Math.floor(hash_value % (bit_size))))) {
                return false;
            }
        }

        return true;
    };
};

var bloomFilter = new BoolmFilter(1000000, 0.01);

bloomFilter.add('https://blog.csdn.net/houzuoxin/article/details/20907911');
bloomFilter.add('https://www.jianshu.com/p/888c5eaebabd');
console.log(bloomFilter.isExist('https://blog.csdn.net/houzuoxin/article/details/20907911')); //true
console.log(bloomFilter.isExist('https://www.jianshu.com/p/888c5eaebabd')); //true
console.log(bloomFilter.isExist('https://www.jianshu.com/p/888c5eaebabd435')); //false