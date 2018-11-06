BinaryTree = require('../MyBinaryTree')

/**
 * 寻找两个节点的最近公共祖先
 */

var bt = new BinaryTree.BinaryTree();
bt.init_tree("A(B(D,E(G,)),C(,F))#");
var root_node = bt.get_root();

var node1 = bt.find("D");
var node2 = bt.find("G");
//console.log(node1.data); D
//console.log(node2.data); G

var lowest_common_ancestor = function(root_node, node1, node2) {
    //如果根節點不存在，或者傳入的兩個節點等于根節點，那最近的公共節點就是根節點
    if (!root_node || root_node == node1 || root_node == node2) {
        return root_node;
    }

    //找左子樹中是否有最近公共祖先
    var left = lowest_common_ancestor(root_node.leftChild, node1, node2);
    //找右子樹是否有最近公共祖先
    var right = lowest_common_ancestor(root_node.rightChild, node1, node2);

    //如果左右子樹都找到最近的公共祖先，那其實就是根節點
    if (left && right) {
        return root_node;
    }
    if (left) {
        return left;
    }
    return right;
}

var ancestor = lowest_common_ancestor(root_node, node1, node2);
console.log(ancestor.data); //D G節點最近公共祖先是 B，此處輸出B (可參看圖片“廣義表代表的tree.jpg”)