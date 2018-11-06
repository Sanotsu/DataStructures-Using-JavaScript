/**
 * 1.1 节点
 * 节点包含两部分，一部分是存储数据元素的数据域，一部分是存储指向下一个节点的指针域
 * 
 * 一个节点可以用如下的方式去定义和使用，示例代码如下:
 */
var Node = function(data) {
    this.data = data;
    this.next = null;
}

var node1 = new Node(1);
var node2 = new Node(2);
var node3 = new Node(3);

node1.next = node2;
node2.next = node3;

console.log(node1.data); //1
console.log(node1.next.data); //2
console.log(node1.next.next.data); //3