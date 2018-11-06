MinHeap = require('../MyMinHeap');
randomArr = require('../../randomArr').randomArr;
/**
 * Top K 问题
 * 
 * 一个非常大的数据集合有n个整数，求集合中最大的K个值。
 * 
 * 用最小堆来算，非常简单，初始化一个大小为k的最小堆，先放入k个数，
 * 这时，堆顶元素最小，集合中剩余的数依次和堆顶元素比较，
 * 如果比堆顶元素大，则删除堆顶元素，并放入新的元素，全部比较以后，堆里的元素就是最大的k个值
 */

var arr = [53, 17, 78, 9, 45, 65, 87, 23];
var arr2 = randomArr(349);
console.log(arr2);
/**
 * 兩個參數分別是，集合數組，最大的k個值
 * @param {*} arr 
 * @param {*} k 
 */
function MinHeapTopK(arr, k) {
    var min_heap = new MinHeap.MinHeap(k);

    for (var i = 0; i < k; i++) {
        min_heap.insert(arr[i]);
    }

    for (var i = k; i < arr.length; i++) {
        var item = arr[i];
        if (item > min_heap.get_min()) {
            min_heap.remove_min();
            min_heap.insert(item);
        }
    }
    min_heap.print();
}

MinHeapTopK(arr, 3); //[ 65, 78, 87 ]
MinHeapTopK(arr2, 3); //隨機數，隨機而定