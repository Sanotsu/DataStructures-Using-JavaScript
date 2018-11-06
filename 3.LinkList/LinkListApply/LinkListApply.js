LinkList = require('../MyLinkList')

/**
 * 基于鏈表實現的棧
 */

function Stack() {
    var linklist = new LinkList.LinkList();

    this.push = function(item) {
        linklist.append(item);
    }
    this.pop = function() {
        return linklist.remove_tail();
    }
    this.top = function() {
        return linklist.tail();
    }
    this.size = function() {
        return linklist.length();
    }
    this.isEmpty = function() {
        return linklist.isEmpty();
    }
    this.clear = function() {
        linklist.clear();
    }
}

var s = new Stack();

s.push(5);
s.push(3);
s.push(31);
s.push(123);
console.log(s.pop()); //123
console.log(s.size()); //3
console.log(s.top()); //31
console.log(s.isEmpty()); //false
s.clear();
console.log(s.isEmpty()); //true

console.log("=========================================================================");

/**
 * 基于鏈表實現隊列
 */

function Queue() {
    var linklist = new LinkList.LinkList();

    //入隊列
    this.enqueue = function(item) {
        linklist.append(item);
    }

    //出隊列
    this.dequeue = function() {
        return linklist.remove_head();
    }

    this.head = function() {
        return linklist.head();
    }

    this.tail = function() {
        return linklist.tail();
    }
    this.size = function() {
        return linklist.length();
    }
    this.clear = function() {
        linklist.clear();
    }
    this.isEmpty = function() {
        return linklist.isEmpty();
    }
}

var q = new Queue();
q.enqueue(1);
q.enqueue(2);
q.enqueue(4);
q.enqueue(5);
q.enqueue(6);
q.enqueue(7);
console.log(q.dequeue()); //1
console.log(q.head()); //2
console.log(q.tail()); //7
console.log(q.size()); //5
console.log(q.isEmpty()); //false
q.clear();
console.log(q.isEmpty()); //true

console.log("=========================================================================");

/**
 *  翻转链表
 *  使用迭代和递归两种方法翻转链表
 */

//準備一個鏈表做測試
var Node = function(data) {
    this.data = data;
    this.next = null;
}

var node1 = new Node(1);
var node2 = new Node(2);
var node3 = new Node(3);
var node4 = new Node(4);
var node5 = new Node(5);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;

function print(node) {
    var curr_node = node;
    while (curr_node) {
        console.log(curr_node.data + "->");
        curr_node = curr_node.next;
    }
};

//es6深度拷貝函數寫法
const clone = (obj) => {
    let proto = Object.getPrototypeOf(obj);
    return Object.assign({}, Object.create(proto), obj)
}

print(node1); // 1 2 3 4 5
//print(clone(node1)); //1 2 3 4 5

/**
 * 迭代翻转思路分析
 * 
 * 假设链表中间的某个点为curr_node，它的前一个节点是pre_node,后一个节点是next_node，
 *  现在把思路聚焦到这个curr_node节点上，只考虑在这一个点上进行翻转，翻转方法如下：
 *     curr_node.next = pre_node;
 *  只需要这简单的一个步骤就可以完成对curr_node节点的翻转,
 *  对于头节点来说，它没有上一个节点，让 pre_node=null,表示它的上一个节点是一个空节点。
 * 
 * 在遍历的过程中，每完成一个节点的翻转，都让curr_node = next_node,找到下一个需要翻转的节点。
 * 同时，pre_node和next_node也跟随curr_node一起向后滑动。
 */

// 迭代翻转
function reverse_iteration(head) {
    if (!head) {
        return null;
    }
    var pre_node = null; //前一個節點
    var curr_node = head; //當前需要翻轉的節點
    while (curr_node) {
        var next_node = curr_node.next; //下一個節點
        curr_node.next = pre_node; //對當前節點進行翻轉
        pre_node = curr_node; //per_node向后滑動
        curr_node = next_node; //curr_node向后滑動
    }
    //最后要返回pre_node,当循环结束时,pre_node指向翻转前链表的最后一个节点
    //console.log(pre_node);
    return pre_node;
}

//print(reverse_iteration(node1)); //5 4 3 2 1 測試遞歸寫法時，注釋掉此行

/**
 *  递归翻转链表思路分析
 *    递归的思想，精髓之处在于甩锅，你做不到的事情，让别人去做，等别人做完了，你在别人的基础上继续做。
 * 
 *      1、函数 reverse_recursion(head) 完成的功能，是从head开始翻转链表，函数返回值是翻转后的头节点
 *      2、正式甩锅，进行递归调用，就翻转链表而言，甩锅的方法如下
 *         var new_head = reverse_recursion(head.next);
 *      3、根据别人的结果，计算自己的结果
 *          第二步中，已经完成了从head.next开始翻转链表，现在，只需要把head连接到新链表上就可以了，
 *          新链表的尾节点是head.next，执行head.next.next = head，这样，head就成了新链表的尾节点。
 *      4、找到递归的终止条件
 *          递归必须有终止条件，否则，就会进入到死循环，
 *          函数最终要返回新链表的头，而新链表的头正式旧链表的尾，所以，遇到尾节点时，直接返回尾节点，这就是递归终止的条件。
 */

function reverse_recursion(head) {
    //如果head為null
    if (!head) {
        return null;
    }
    if (head.next == null) {
        return head;
    }
    // 从下一个节点开始进行翻转
    var new_head = reverse_recursion(head.next);
    head.next.next = head; // 把当前节点连接到新链表上
    head.next = null;
    return new_head;
}
print(reverse_recursion(node1)); //測試迭代寫法時，注釋掉此行

console.log("=========================================================================");

/**
 * 从尾到头打印链表
 * 
 * 問題描述：
 * 从尾到头打印链表，不许翻转链表。
 * 
 * 思路分析：
 * 当你拿到一个链表时，得到的是头节点，只有头结点以后的节点被打印了，才能打印头节点，这不正是一个可以甩锅的事情么,先定义函数
 *       function reverse_print(head){
 *      };
 * 函数的功能，就是从head开始反向打印链表，但是现在不知道该如何反向打印，于是甩锅，先从head.next开始反向打印，等这部分打印完了，再打印head节点
 * 
 */


var node6 = new Node(6);
var node7 = new Node(7);
var node8 = new Node(8);
var node9 = new Node(9);
var node10 = new Node(10);


node6.next = node7;
node7.next = node8;
node8.next = node9;
node9.next = node10;

function reverse_print(head) {
    //遞歸終止條件
    if (head == null) {
        return;
    } else {
        reverse_print(head.next);
        console.log(head.data);
    }
}

reverse_print(node6);