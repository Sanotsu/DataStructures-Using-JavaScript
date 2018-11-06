/**
 * 鏈表
 * 
 * 链表中的第一个节点是首节点，最后一个节点是尾节点。
 * 
 * 无头链表是指第一个节点既有数据域，又有指针域，第一个节点既是首节点又是头节点。
 * 
 * 有头链表是指第一个节点只有指针域，而没有数据域。
 * 
 * 以下內容全為【无头链表】
 */

//定義鏈表類
function MyLinkList() {
    //定義節點
    var Node = function(data) {
        this.data = data;
        this.next = null;
    }
    var length = 0; //鏈表長度
    var head = null; //頭結點
    var tail = null; //尾節點
    /**
     * 链表的方法如下：
     * 
     * append， 添加一个新的元素
     * insert，在指定位置插入一个元素
     * remove，删除指定位置的节点
     * remove_head，删除首节点
     * remove_tail，删除尾节点
     * indexOf，返回指定元素的索引
     * get，返回指定索引位置的元素
     * head，返回首节点
     * tail，返回尾节点
     * length，返回链表长度
     * isEmpty，判断链表是否为空
     * clear，清空链表
     * print，打印整个链表
     */

    //在尾節點后添加一個元素
    this.append = function(data) {
        //創建新節點
        var node = new Node(data);
        //如果是空鏈表
        if (head == null) {
            head = node;
            tail = node;
        } else {
            tail.next = node; // 尾节点指向新创建的节点
            tail = node; //tail指向鏈表的最后一個節點
        }
        length += 1; //長度+1
        return true;
    };

    // 返回链表大小
    this.length = function() {
        return length;
    };



    /*
    append只能在链表的末尾添加元素，而insert可以在指定位置插入一个元素，新增数据的方式更加灵活，
    insert方法需要传入参数index，指明要插入的索引位置。该方法的关键是找到索引为index-1的节点，
    只有找到这个节点，才能将新的节点插入到链表中。
    */

    //獲取指定位置的節點

    var get_node = function(index) {
        if (index < 0 || index >= length) {
            return null;
        }
        var curr_node = head;
        var node_index = index;
        while (node_index-- > 0) {
            curr_node = curr_node.next;
        }
        return curr_node;
    }

    /**
     * 算法思路如下：
     *  如果index范围不合法，返回false
     *  考虑边界情况，如果index==length，就是在尾部插入，直接调用append方法，
     *      如果index==0, 那么这个节点就变成了新的头节点
     *  不是边界，找到索引为index-1的节点，用这个节点连接新节点
     */

    //在指定位置插入新的元素
    this.insert = function(index, data) {
        //index==length,說明是直接在尾節點新增，直接調用append
        if (index === length) {
            return this.append(data);
        } else if (index > length || index < 0) {
            //超出邊界，返回false
            return false;
        } else {
            var new_node = new Node(data);
            if (index === 0) {
                //如果在頭結點前面插入，新的節點就變成頭結點
                new_node.next = head;
                head = new_node;
            } else {
                //要插入的位置是index，找到索引為index-1的節點，然后進行連接
                var pre_node = get_node(index - 1);
                new_node.next = pre_node.next;
                pre_node.next = new_node;
            }
            length += 1;
            return true;
        }

    }

    /**
     * 删除指定位置的节点，需要传入参数index,和insert方法一样，先考虑索引的范围是否合法，然后考虑索引在边界时的操作，
     * 关键点是找到索引为index-1的这个节点，这个节点的next指向了要删除的节点。
     * 
     *  如果index< 0或者 index>=length，索引都是错误的，返回null
     *  如果index==0,删除的是头节点，只需要执行head = head.next就可以把头节点删除
     *  如果index > 0,那么就找到索引为index-1的节点，利用这个节点将索引为index的节点删除
     *  删除节点时，如果被删除的节点是尾节点，tail要指向新的尾节点 
     */

    this.remove = function(index) {
        if (index < 0 || index >= length) {
            return null;

        } else {
            var del_node = null;
            if (index === 0) {
                del_node = head;
                head = head.next;
                //如果head == null,说明之前链表只有一个节点
                if (!head) {
                    tail = null;
                }
            } else {
                var pre_node = get_node(index - 1);
                del_node = pre_node.next;
                pre_node.next = pre_node.next.next;
                // 如果删除的是尾节点
                if (del_node.next == null) {
                    tail = pre_node;
                }
            }

        }
        length -= 1;
        del_node.next = null;
        return del_node.data;
    };

    // 删除尾节点
    this.remove_tail = function() {
        return this.remove(length - 1);
    };

    // 删除头节点
    this.remove_head = function() {
        return this.remove(0);
    };

    //獲取指定索引位置的節點，需要傳入index
    this.get = function(index) {
        var node = get_node(index);
        if (node) {
            return node.data;
        } else {
            return null;
        }
    }

    // 返回链表头节点的值
    this.head = function() {
        return this.get(0);
    }

    // 返回链表尾节点的值
    this.tail = function() {
        return this.get(length - 1);
    }

    /**
     * 返回指定元素所在的位置，如果链表中没有这个元素，则返回-1，如果存在多个，则返回第一个，需要传入参数data。
     * 
     * 使用一个while循环遍历链表，index表示元素索引位置，初始值为-1，curr_node指向头节点，
     * while循环的条件是curr_node不为null，在循环体内，index加1，比较curr_node.data和data是否相等，
     * 如果相等，则返回index，反之curr_node指向下一个节点。
     * 
     * 如果循环结束前仍然没有return，说明没要找到期望的data，返回-1
     */

    this.indexOf = function(data) {
        var index = -1;
        var curr_node = head;
        while (curr_node) {
            index += 1;
            if (curr_node.data === data) {
                return index;
            } else {
                curr_node = curr_node.next;
            }
        }
        return -1;
    }

    //print方法纯粹是为了验证链表其他方法是否正确而存在的，目的是随时可以输出链表
    this.print = function() {
        var curr_node = head;
        var str_link = "";
        while (curr_node) {
            str_link += curr_node.data.toString() + "->";
            curr_node = curr_node.next;
        }
        str_link = +"null";
        console.log(str_link);
        console.log("長度為" + length.toString());

    }

    // isEmpty
    this.isEmpty = function() {
        return length == 0;
    };

    // 清空链表
    this.clear = function() {
        head = null;
        tail = null;
        length = 0;
    };
}

exports.LinkList = MyLinkList;