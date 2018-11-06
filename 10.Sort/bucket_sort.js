/**
 * 桶排序的思想是将待排序序列划分成n个等长的子区间，这些子区间也称为箱，
 * 将各个元素根据自己所属的区间放入相应的桶中，如果待排序序列是均匀分布的，那么每个桶中的元素也是均匀的，
 * 只需要将每个桶内的元素排好序，再依次收集这些桶中的元素，就得到了最终的有序序列，
 * 
 * 仍然以arr = [7, 2, 8, 1, 4, 6, 9, 3]为例，数据范围是0到10之间的数据，我们来划分四个桶。
 * 
 * 确定数据范围是0到10，划分为4个桶，10/4=2.5，实际使用时向上取整，除数取3。
 */

const quick_sort = require("./quick_sort.js");

function bucket_sort(arr) {
    var sort_arr = []
    var buckets = new Array(4);
    for (var i = 0; i < buckets.length; i++) {
        buckets[i] = [];
    }
    // 放入对应的桶里
    for (var i = 0; i < arr.length; i++) {
        var index = Math.floor(arr[i] / 3);
        buckets[index].push(arr[i])
    }
    // 对每一个桶进行排序
    for (var i = 0; i < buckets.length; i++) {
        quick_sort.quick_sort(buckets[i]);
    }

    // 搜集桶里的数据
    for (var i = 0; i < buckets.length; i++) {
        for (var j = 0; j < buckets[i].length; j++) {
            sort_arr.push(buckets[i][j]);
        }
    }
    return sort_arr;
};

var arr = [7, 2, 8, 1, 4, 6, 9, 3];
sort_arr = bucket_sort(arr);
console.log(sort_arr);