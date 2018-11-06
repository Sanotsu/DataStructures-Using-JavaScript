/**
 * 二叉搜索树
 * 
 * 二叉搜索树具有一下四点性质：
 *  （1）所有节点关键码都互不相同
 *  （2）左子树上所有节点的关键码都小于根节点的关键码
 *  （3）右子树上所有节点的关键码都大于根节点的关键码
 *  （4）左右子树也是二叉搜索树
 * 
 * 关键码是节点所保存元素中的某个属性，它能够唯一的表示（区分）这个节点。
 * 对二叉搜索树进行中序遍历，就可以按照关键码的大小从小到大的顺序将各节点排列起来，
 * 因此，二叉搜索树也叫二叉排序树
 * 几个二叉搜索树的例子參看“二叉搜索樹示例.jpg”
 * 
 * 二叉搜索树可以用来表示字典结构，它的搜索，插入，删除操作的平均时间代价为O（log2(n)），(2是下標)
 */

//類定義
var TreeNode = function(data) {
    this.data = data;
    this.leftChild = null;
    this.rightChild = null;
    this.parent = null;
};

function MyBinarySearchTree() {
    var root = null;

    /**
     * 插入
     * 插入时，从根节点开始，被插入元素的关键码如果比根节点关键码小，则进入到左子树中执行插入操作，
     * 如果左子树不存在，则被插入元素成为左孩子；反之，进入到右子树中执行插入操作，
     * 如果右子树不存在，则被插入元素成为右孩子，如果被插入元素的关键码已经存在，则返回false。
     * 
     *  19, 27, 40, 35, 25, 10, 5, 17, 13, 7, 8 的顺序插入到二叉搜索树中演示見“二叉搜索樹插入演示.jpg”
     */
    var insert_data = (node, data) => {
        if (root == null) {
            root = new TreeNode(data);
            return true;
        }
        if (data < node.data) {
            if (node.leftChild) {
                //往左子樹里插入
                return insert_data(node.leftChild, data);
            } else {
                //創建節點並插入
                var new_node = new TreeNode(data);
                node.leftChild = new_node;
                new_node.parent = node;
                return true;
            }
        } else if (data > node.data) {
            //有右子樹，向里面插入
            if (node.rightChild) {
                return insert_data(node.rightChild, data);
            } else {
                //創建節點並假如
                var new_node = new TreeNode(data);
                node.rightChild = new_node;
                new_node.parent = node;
                return true;
            }
        } else {
            //相等即是存在，不能再存入
            return false;
        }
    };

    this.insert = (data) => {
        return insert_data(root, data);
    };

    /**
     * 搜索
     * 与插入算法非常接近，仍然是从树的根节点开始，
     * 如果被搜索元素的关键码比根节点关键码小，则进入到左子树中进行搜索，若左子树不存在，返回null，
     * 如果被搜索元素的关键码比根节点关键码大，则进入到右子树中进行搜索，若右子树不存在，返回null,
     * 如果根节点的关键码和被搜索元素的关键码相同，返回这个根节点。
     */
    var search_data = (node, data) => {
        if (node == null) {
            return null;
        }
        if (data == node.data) {
            return node;
        } else if (data < node.data) {
            return search_data(node.leftChild, data);
        } else {
            return search_data(node.rightChild, data);
        }
    };
    this.search = (data) => {
        return search_data(root, data);
    }

    /**
     * 删除
     * 删除一个节点时，要考虑到必须将被删除节点的子孙节点连接到树上，同时保证二叉搜索树的性质。
     * 
     * 根据被删除节点的左右子孩子，可以总结一下几种情况：
     *      被删除节点左右孩子都不存在
     *      被删除节点没有右孩子
     *      被删除节点没有左孩子
     *      被删除节点左右孩子都存在
     *      
     *      对于第1种情况，最为简单，只需要让其父节点指向它的指针指向null即可
     *      对于第2种情况，用左孩子替代它的位置
     *      对于第3种情况，用右孩子替代他的位置
     *      对于第4中情况，稍稍有些复杂，
     *          首先，去被删除节点的右子树中找到中序遍历下的第一个节点，假设节点的data数据为x，
     *          将被删除节点的data替换成x，而后，在被删除节点的右子树中执行删除x的操作
     * 
     *  可參看"二叉搜索樹刪除節點示例圖.jpg"
     */

    // 连接父节点和子节点
    var link_parent = function(parent, node, next_node) {
        if (parent == null) {
            root = next_node;
            if (root != null) {
                root.parent = null;
            }
        } else {
            if (parent.leftChild && parent.leftChild.data == node.data) {
                parent.leftChild = next_node;
            } else {
                parent.rightChild = next_node;
            }
        }
    };

    var remove_data = (node, data) => {
        if (node == null) {
            return false;
        }
        if (data < node.data) {
            //去左子樹里刪除
            return remove_data(node.leftChild, data);
        } else if (data > node.data) {
            //去右子樹里面刪除
            return remove_data(node.rightChild, data);
        } else {
            if (node.leftChild && node.rightChild) {
                //左右子樹都存在，找到中序下的第一個節點，這個節點在右子樹里最小
                var temp = node.rightChild;
                while (temp.leftChild) {
                    temp = temp.leftChild;
                }
                //被刪除點的值等于中序下第一個節點的值
                node.data = temp.data;
                //去右子樹里刪除中序下的第一個節點
                return remove_data(node.rightChild, temp.data);
            } else {
                var parent = node.parent; //找到父節點
                if (!node.leftChild) {
                    //沒有左孩子
                    link_parent(parent, node, node.rightChild);
                } else {
                    link_parent(parent, node, node.leftChild);
                }
                return true;
            }
        }
    };
    this.remove = (data) => {
        return remove_data(root, data);
    }

    var tree_height = function(node) {
        // 左子树的高度和右子树的高度取最大值,加上当前的高度
        if (!node) {
            return 0;
        }

        var left_child_height = tree_height(node.leftChild);
        var right_child_height = tree_height(node.rightChild);
        if (left_child_height > right_child_height) {
            return left_child_height + 1;
        } else {
            return right_child_height + 1;
        }

    };
    // 返回高度
    this.height = function() {
        return tree_height(root);
    };

    var get_line = function(offset, data) {
        var line = "";
        for (var i = 0; i < offset; i++) {
            line += "  ";
        }
        return line + data;
    };

    var set_line = function(lines, index, line) {
        var old_line = lines[index];
        var sub_line = line.substring(old_line.length)
        lines[index] = old_line + sub_line;
    };

    var super_print = function(node, height, curr_height, offset, direction, lines) {
        if (!node) {
            return;
        }
        var new_offset = null;
        var width = 3;
        if (curr_height == 1) {
            new_offset = (height - 1) * 4 * width;
            var line = get_line(new_offset, node.data.toString());
            lines[0] = line;
        } else {
            var line = null;
            var link_length = height - 1;

            if (curr_height % 2 == 0) {
                link_length = 4;
            } else {
                link_length = 3;
            }
            width = height + 1 - curr_height;
            if (direction == 0) {
                for (var i = 1; i <= link_length; i++) {
                    new_offset = offset - i * width;
                    if (i == link_length) {
                        new_offset = offset - link_length * width;
                        line = get_line(new_offset, node.data.toString());
                    } else {
                        line = get_line(new_offset, ".");
                    }
                    set_line(lines, (curr_height - 2) * 4 + i, line);
                }

            } else {
                for (var i = 1; i <= link_length; i++) {
                    new_offset = offset + i * width;
                    if (i == link_length) {
                        new_offset = offset + link_length * width;
                        line = get_line(new_offset, node.data.toString());
                    } else {
                        line = get_line(new_offset, ".");
                    }
                    set_line(lines, (curr_height - 2) * 4 + i, line);
                }
            }
        }
        super_print(node.leftChild, height, curr_height + 1, new_offset, 0, lines);
        super_print(node.rightChild, height, curr_height + 1, new_offset, 1, lines);

    };

    this.print = function() {
        var height = this.height();
        var lines = new Array((height - 1) * 4 + 1);

        for (var i = 0; i < lines.length; i++) {
            lines[i] = "";
        }

        super_print(root, height, 1, null, null, lines)
        for (var i = 0; i < lines.length; i++) {
            console.log(lines[i]);
        }
    };


}

/*
//測試二叉搜索樹
function test_insert() {
    var bst = new MyBinarySearchTree();
    var arrs = [19, 27, 40, 35, 25, 10, 5, 17, 13, 7, 8, 36];
    for (var i = 0; i < arrs.length; i++) {
        bst.insert(arrs[i]);
    }

    bst.print();

    bst.remove(7);
    bst.print();
    bst.remove(17);

    bst.print();
    bst.remove(27);
    bst.print();
};
var bst = new MyBinarySearchTree();
bst.insert(4);
bst.remove(4);
test_insert();
*/

exports.BinarySearchTree = MyBinarySearchTree;