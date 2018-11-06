/**
 * 数据集合有序，能够为各种操作带来便利，但有些应用并不要求所有数据都是有序的，
 * 或者在操作开始之前就变得完全有序。 一些应用需要先收集一部分数据，从中挑选出最大或者最小的关键码记录开始处理，
 * 后续会收集更多数据但始终处理数据集中有最小或最大关键码的记录，比如优先级队列，优先级队列并不满足先进先出的特性，
 * 它能做到高优先级的先出队列，在优先级队列的各种实现中，堆是最高效的一种数据结构。
 * 
 * 1. 概念
 * 1.1 关键码
 * 假定在数据记录中存在一个能够标识数据记录的数据项，并可依据该数据项对数据进行组织，则称此数据项为关键码（key）。
 * 
 * 如果有一个关键码集合K = {k0 , k1 , k2 , k3 , ... kn-1 } ，把它的所有元素按照完全二叉树的顺序存储方式存放在一个一维数组中，
 * 并且满足ki ≤ k(2i+1) 且 ki ≤ (k2i+2) --->根節點值小于等于左右第一個子節點的任何一個值
 * （或者 ki ≥ k(2i+1) 且 ki ≥ k(2i+2)）--->根節點值大于等于左右第一個子節點的任何一個值
 *  ,i = 0, 1,2, ... (n-2)/2,
 * 则称这个集合为最小堆(最大堆)。
 * 
 * 在最小堆中，父节点的关键码小于等于它的左右子女的关键码，最大堆中，父节点的关键码大于等于左右子女的关键码。
 * 
 * 数组中的索引从0开始，元素个数为n, 在堆中给定索引为i的节点时：
 *      如果i=0, 节点i是根节点，否则节点i的父节点为(i-1)/2
 *      如果2*i + 1 > n-1, 则节点i无左子女，否则节点i的左子女为2*i + 1
 *      如果2*i + 2 > n-1, 则节点i无右子女，否则节点i的右子女为2*i + 2
 */

//最小堆实现

function MyMinHeap(size) {
    var heap = new Array(size); //數組
    var curr_size = 0; //當前堆的大小
    var max_size = size; //堆最大值

    /**
     * 用数组初始化最小堆
     * 可以使用一个数组直接初始化，例如給定的初始化數組為 [53, 17, 78, 9, 45, 65, 87, 23]
     * 
     * 调整的过程自下而上，先保证局部是一个最小堆，然后从局部到整体，逐步扩大，直到将整棵树都调整为最小堆。
     * 调整算法的基本思想是找到所有的分支节点，然后根据这些分支节点的索引从大到小依次进行调整，
     * 每次调整时，从该分支节点向下进行调整，使得这个分支节点和它的子孙节点构成一个最小堆，
     * 假设数组的大小为n，则最后一个分支节点的索引是（n-2）/2，第一个分支节点的索引是0。
     * 
     * 在局部进行调整时，如果父节点的关键码小于等于两个子女中的最小关键码，说明，不需要调整了，
     * 否则，将父节点和拥有最小关键码的子女进行位置互换，并继续向下比较调整。
     * 
     * 調整過程查看圖片“完全二叉樹調整為最小堆.png”：
     */
    var shif_down = function(start, m) {
        //從start這個位置開始，向下下滑調整
        var parent_index = start; //start 就是當前這個局部的父節點
        var min_child_index = parent_index * 2 + 1; //一定會有左孩子（完全二叉樹），min_child_index等于做孩子的索引
        while (min_child_index <= m) {
            //min_child_index+1是左孩子的索引，左孩子大于右孩子
            if (min_child_index < m && heap[min_child_index] > heap[min_child_index + 1]) {
                //min_child_index，永遠指向最小的那個孩子
                min_child_index = min_child_index + 1;
            }
            //父節點的值小于等于兩個孩子的最小值
            if (heap[parent_index] <= heap[min_child_index]) {
                break; //循環結束，不用再調整了
            } else {
                //父節點和子節點的值互換
                var temp = heap[parent_index];
                heap[parent_index] = heap[min_child_index];
                heap[min_child_index] = temp;

                parent_index = min_child_index;
                min_child_index = 2 * min_child_index + 1;
            }
        }
    };

    //傳入一個數組，然后調整為最小堆
    this.init = function(arr) {
        max_size = arr.length;
        curr_size = max_size;
        heap = new Array(arr.length);
        //填充heap，目前還不是一個堆
        for (var i = 0; i < curr_size; i++) {
            heap[i] = arr[i];
        }
        var curr_pos = Math.floor((curr_size - 2) / 2); //這是堆的最后一個分支節點
        while (curr_pos >= 0) {
            shif_down(curr_pos, curr_size - 1); //局部自上向下下滑調整
            curr_pos -= 1; //調整下一個分支節點
        }
    }

    var shif_up = function(start) {
        var child_index = start; // 当前节点是叶节点
        var parent_index = Math.floor((child_index - 1) / 2); // 找到父节点
        while (child_index > 0) {
            // 父节点更小,就不用调整了
            if (heap[parent_index] <= heap[child_index]) {
                break;
            } else {
                // 父节点和子节点的值互换
                var tmp = heap[child_index];
                heap[child_index] = heap[parent_index];
                heap[parent_index] = tmp;
                child_index = parent_index;
                parent_index = Math.floor((parent_index - 1) / 2);
            }
        }
    };

    this.insert = function(item) {
        // 插入一个新的元素
        // 堆满了,不能再放元素
        if (curr_size == max_size) {
            return false;
        }

        heap[curr_size] = item;
        shif_up(curr_size);
        curr_size++;
        return true;
    };

    /**
     * remove_min
     * 删除掉最小堆的最小值，
     * 用后一个元素取代堆顶元素，取代后，最小堆被破坏，使用shif_down方法向下做调整。
     */
    this.remove_min = function() {
        if (curr_size <= 0) {
            return null;
        }
        var min_value = heap[0];
        heap[0] = heap[curr_size - 1];
        curr_size--;
        shif_down(0, curr_size - 1);
        return min_value;
    }

    this.size = function() {
        return curr_size;
    };

    this.print = function() {
        console.log(heap);
    };

    this.get_min = function() {
        if (curr_size > 0) {
            return heap[0];
        }
        return null;
    }
}

/*
var arr = [53, 17, 78, 9, 45, 65, 87, 23];
var min_heap = new MyMinHeap(3);

for (var i = 0; i < 3; i++) {
    min_heap.insert(arr[i]);
}

for (var i = 3; i < arr.length; i++) {
    var item = arr[i];
    if (item > min_heap.get_min()) {
        min_heap.remove_min();
        min_heap.insert(item);
    }
}

min_heap.print(); //[ 65, 78, 87 ]
*/
exports.MinHeap = MyMinHeap;