MinHeap = require('../MyMinHeap');
randomArr = require('../../randomArr').randomArr;

/**
 * 排序
 * 可以使用最小堆进行排序，使用待排序数组初始化最小堆，然后逐个删除堆顶元素，由于堆顶元素始终最小，所以可以得到一个有序的数组
 */

var arr1 = [53, 17, 78, 9, 45, 65, 87, 23];

// var min_heap = new MinHeap.MinHeap(8);

// for (var i = 0; i < arr.length; i++) {
//     min_heap.insert(arr[i]);
// }
// var sort_arr = [];
// for (var i = 0; i < arr.length; i++) {
//     sort_arr.push(min_heap.remove_min());
// }
// console.log(sort_arr); //[ 9, 17, 23, 45, 53, 65, 78, 87 ]

var arr2 = randomArr(34);

function MinHeapSort(arr) {

    var min_heap = new MinHeap.MinHeap(arr.length);

    for (var i = 0; i < arr.length; i++) {
        min_heap.insert(arr[i]);
    }
    var sort_arr = [];
    for (var i = 0; i < arr.length; i++) {
        sort_arr.push(min_heap.remove_min());
    }
    console.log(sort_arr)
    return sort_arr;
}

MinHeapSort(arr1);
MinHeapSort(arr2);