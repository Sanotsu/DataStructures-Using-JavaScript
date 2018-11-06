MinHeap = require('./MyMinHeap');
/**
 * 前置概念
 * 
 * 路径长度
 * 路径：从树中的一个节点到另一个节点之间的分支构成这两点之间的路径
 * 路径长度：路径上的分支条数，树的路径长度是从树的根节点到每一个节点的路径长度之和
 * 可參看圖片“路徑長度說明.jpg”
 * 
 * 帶權路徑長度
 * 有一个集合 { w1, ... wn },其中 wi ≥ 0 （1≤i≤n），若T 是一棵有n个叶节点的二叉树，
 * 将权值 w1, ... wn 赋给T的n个叶节点，则我们称T是权值为wi ≥ 0 （1≤i≤n）的扩充二叉树，
 * 带有权值的叶节点叫做扩充二叉树的外节点，其余不带权值的节点叫做内节点。
 * 
 * 外节点的带权路径长度为T的根节点到该节点的路径长度与该节点上的权值的乘积
 * 可參看“帶權路徑長度.jpg”
 * 
 * 【带权路径长度最小的二叉树就是哈夫曼树，节点权值越大，距离根节点就越近】
 * 
 * 哈夫曼算法
 * 哈夫曼算法是构造权值集合为 { w1, ... wn } 的哈夫曼树，其算法思路如下
 *  1、根据给定的n个权值 { w1, ... wn }， 构造具有n棵扩充二叉树的森林 F = { T1, ... Tn}, 
 *      对于每棵扩充二叉树Ti 只有一个带权值的wi 的根节点，左右子树都为空
 *  2、重复一下步骤，知道F中只剩下一棵树为止
 *      （1） 在F中选取两棵根节点的权值最小的扩充二叉树，把这两棵树作为左右子树构造一棵新的二叉树，
 *          这个新的二叉树的根节点的权值为其左右两棵子树根节点的权值之和
 *      （2） 在F中删除第一步中选取的两棵二叉树
 *      （3） 将第一步中构造的新的二叉树加入到F中
 *  最后得到的就是哈夫曼树
 * 可參看“構建哈夫曼樹示例.jpg”
 */

/**
 * 哈夫曼编码
 * 在通信领域，经过哈夫曼编码的的信息小于大量冗余数据，提高传输效率，是重要的数据压缩方法。
 * 一段信息由 a b c d e 5个字符组成，各自出现的概率是0.12 0.4 0.15 0.08 0.25 ，
 * 把这几个字符串编码成二进制的0，1 序列，有两种方法，一种是定长编码，另一种是变长编码，如下图所示
 *      符号	概率	定长编码	变长编码
 *      a	 0.12	000	      1111
 *      b	 0.4	001	      0
 *      c	 0.15	010	      110
 *      d	 0.08	011	      1110
 *      e	 0.25	100	      10
 * 如果采用定长编码，平均编码长度为 (0.12 + 0.4 + 0.15 + 0.08 + 0.25)*3 = 3 
 * 采用变长编码，平均编码长度为 0.12*4 + 0.4*1 + 0.15*3 + 0.08*4 + 0.25* 2 = 2.15
 * 可參看“變長編碼的二叉樹表示.jpg”
 */

/**
 *  代码实现
 哈夫曼算法，每次都要从F中找出权值最小的两个根节点，构造出新的树以后，删除这两个根节点并加入新构造的树，这个过程用最小堆来实现正合适。

 先将森林里的根节点加入到一个最小堆中，循环n-1次，每次循环，先连续两次删除最小堆的堆顶，利用这两个堆顶，
 构造新的树并将新的树的根节点放入到最小堆中，循环结束后，堆顶就是哈夫曼树的根节点。
 */

// 定义存储编码和概率的类
// 编码
var CodeNode = function(code, rate) {
    this.code = code; // 字符
    this.rate = rate; // 概率
};

//定義樹節點
var TreeNode = function(data) {
    this.data = data;
    this.leftChild = null;
    this.rightChild = null;
    this.parent = null;
};

function MyHuffmanTree() {
    var root = null;

    this.init_tree = function(arr) {
        var min_heap = new MinHeap.MinHeap();
        min_heap.init(arr);
        for (var i = 0; i < arr.length - 1; i++) {
            var first = min_heap.remove_min();
            var second = min_heap.remove_min();

            var new_item = new CodeNode("", first.data.rate + second.data.rate);
            var new_node = new TreeNode(new_item);
            min_heap.insert(new_node);

            new_node.leftChild = first;
            new_node.rightChild = second;
            first.parent = new_node;
            second.parent = new_node;

            root = new_node;
        }
    };

    var get_code_from_tree = function(node, dict, code_str) {
        if (!node.leftChild && !node.rightChild) {
            //業節點
            dict[node.data.code] = code_str;
            return;
        }
        if (node.leftChild) {
            get_code_from_tree(node.leftChild, dict, code_str + "0");
        }
        if (node.rightChild) {
            get_code_from_tree(node.rightChild, dict, code_str + "1");
        }
    }
    this.get_code = function() {
        //獲得最終的變長編碼
        var code_dict = {};
        get_code_from_tree(root, code_dict, "");
        return code_dict;
    }

    this.print = function() {
        console.log(root);
    }
}

//準備數據
var code_dict = {
    "a": 0.12,
    "b": 0.4,
    "c": 0.15,
    "d": 0.08,
    "e": 0.25
};
var forest = [];
for (var key in code_dict) {
    var item = new CodeNode(key, code_dict[key]);
    forest.push(new TreeNode(item));
}

//使用
var huffman_tree = new MyHuffmanTree();
huffman_tree.init_tree(forest);
console.log(huffman_tree.get_code()); //{ b: '0', e: '10', c: '110', d: '1110', a: '1111' }