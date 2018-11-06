const Stack = require('../1.Stack/MyStack');
const Queue = require('../2.Queue/MyQueue');

//定義二叉樹的節點
var BinTreeNode = function(data) {
    this.data = data;
    this.leftChild = null; // 左孩子
    this.rightChild = null; // 右孩子
    this.parentNode = null; // 父节点
};

//定義二叉樹
function MyBinaryTree() {
    var root = null; //根節點

    /**
     * 这里我们先实现init_tree,它接收一个表示二叉树的广义表，创建一颗树。
     * 
     * 如何用广义表来表达二叉树呢，以广义表 A(B(D,E(G,)),C(,F))# 为例，算法如下
     *      广义表的表名放在表前，表示树的根节点，括号中的是根的左右子树
     *      每个节点的左右子树用逗号隔开，如果有仅有右子树没有左子树，逗号不省略
     *      整个广义表的最后加上特殊符号#表示输入结束
     * 
     *      广义表 A(B(D,E(G,)),C(,F))# 所代表的树结构如下图 "images/廣義表代表的tree.jpg"
     * 
     * 遍历这个A(B(D,E(G,)),C(,F))# 字符串，来建立一颗二叉树。
     *      遇到左括号的时候，说明前面有一个节点，这个括号里的两个节点都是它的子节点，
     *          但是子节点后面还会有子节点，因此，我们需要一个先进后出的数据结构，把前面的节点保存下来，
     *          这样，栈顶就是当前要处理的两个节点的父节点。
     *      逗号分隔了左右子树，因此需要一个变量来标识遇到的是左子树还是右子树，
     *          假设这个变量为k，遇到左括号的时候，k=1，表示开始识别左子树，遇到逗号，k=2表示开始识别右子树。
     *      遇到右括号，说明一棵子树结束了，那么栈顶的元素正是这棵子树的根节点，执行pop方法出栈。
     */

    this.init_tree = function(string) {
        var stack = new Stack.Stack();
        var k = 0;
        var new_node = null;
        for (var i = 0; i < string.length; i++) {
            var item = string[i];
            if (item == "#") {
                break;
            }
            if (item == "(") {
                stack.push(new_node);
                k = 1;
            } else if (item == ")") {
                stack.pop();
            } else if (item == ",") {
                k = 2;
            } else {
                new_node = new BinTreeNode(item);
                if (root == null) {
                    root = new_node;
                } else if (k == 1) {
                    //左子樹
                    var top_item = stack.top();
                    top_item.leftChild = new_node;
                    new_node.parentNode = top_item;
                } else {
                    //右子樹
                    var top_item = stack.top();
                    top_item.rightChild = new_node;
                    new_node.parentNode = top_item;
                }
            }

        }
    };

    this.get_root = function() {
        return root;
    }

    /**
     * in_order 中序遍历算法
     * 中序遍历，是先遍历处理节点的左子树，然后是当前节点，对当前节点处理后，遍历处理节点的右子树
     */

    this.in_order = function(node) {
        if (node == null) {
            return;
        }
        this.in_order(node.leftChild);
        console.log(node.data);
        this.in_order(node.rightChild);
    }

    //pre_order 前序遍历算法
    this.pre_order = function(node) {
        if (node == null) {
            return;
        }
        console.log(node.data);
        this.pre_order(node.leftChild);
        this.pre_order(node.rightChild);
    }

    //post_order 后序遍历算法
    this.post_order = function(node) {
        if (node == null) {
            return;
        }
        this.post_order(node.leftChild);
        this.post_order(node.rightChild);
        console.log(node.data);
    }

    //size 返回节点数量
    var tree_node_count = function(node) {
            //左子樹的節點數量加上右子樹的節點數量，再+1
            if (!node) {
                return 0;
            }
            var left_node_count = tree_node_count(node.leftChild);
            var right_node_count = tree_node_count(node.rightChild);
            return left_node_count + right_node_count + 1;
        }
        //返回節點數量
    this.size = function() {
        return tree_node_count(root);
    }

    //hegit 返回樹的高度
    var tree_height = function(node) {
        if (!node) {
            return 0;
        }
        var left_node_height = tree_height(node.leftChild);
        var right_node_height = tree_height(node.rightChild);
        if (left_node_height > right_node_height) {
            return left_node_height + 1;
        } else {
            return right_node_height + 1;
        }
    }
    this.height = function() {
        return tree_height(root);
    }

    //查找節點
    var find_node = function(node, data) {
        if (!node) {
            return null;
        }
        if (node.data == data) {
            return node;
        }
        left_res = find_node(node.leftChild, data);
        if (left_res) {
            return left_res;
        }
        return find_node(node.rightChild, data);
    }

    //查找data
    this.find = function(data) {
        return find_node(root, data);
    }

}

exports.BinaryTree = MyBinaryTree;