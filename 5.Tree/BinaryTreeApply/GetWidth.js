BinaryTree = require('../MyBinaryTree')
Queue = require('../../2.Queue/MyQueue');
/**
 * 输出指定层的节点个数
 * 实现函数get_width 返回第n层的节点个数
 */

var bt = new BinaryTree.BinaryTree();
bt.init_tree("A(B(D,E(G,)),C(,F))#");
var root_node = bt.get_root();

// 获得宽度
var get_width = function(node, n) {
    if (node == null) {
        return 0
    }
    var queue = new Queue.Queue();
    // 把当前节点放入到队列
    queue.enqueue(node);
    queue.enqueue(0);
    var width = 1;
    var level = 0;
    while (!queue.isEmpty()) {
        del_item = queue.dequeue();
        if (del_item == 0) {
            level += 1;
            if (level == n) {
                return width;
            }
            width = queue.size();
            if (queue.isEmpty()) {
                break;
            } else {
                queue.enqueue(0);
            }
        }

        // 把左右子节点放入到队列
        if (del_item.leftChild) {
            queue.enqueue(del_item.leftChild);
        }
        if (del_item.rightChild) {
            queue.enqueue(del_item.rightChild);
        }
    }
};

console.log(get_width(root_node, 1)); //1
console.log(get_width(root_node, 2)); //2
console.log(get_width(root_node, 3)); //3
console.log(get_width(root_node, 4)); //1