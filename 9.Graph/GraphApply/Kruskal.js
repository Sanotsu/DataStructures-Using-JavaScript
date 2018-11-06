/**
 * 最小生成樹問題，參看圖片“最小生成樹問題.jpg”
 * 
 * 
 * Kruskal算法
 * 
 * 克鲁斯卡尔算法与哈夫曼树的生成算法非常相似，先将所有的边都存入到一个最小堆中，用权值做关键码，
 * 那么堆顶的边，一定会被至少一棵最小生成树所采用，于是将堆顶删除放入到最小生成树中，
 * 现在，堆顶是剩余的边中权值最小的，继续删除并放入到最小生成树中。
 * 
 * 在反复的删除堆顶的边并加入到最小生成树的过程中，要判断边的两个顶点是否在同一个连通分量中，
 * 如果是，那么这个边就不能使用，否则会形成回路。
 * 
 * 为什么这样就可以创建最小生成树呢?以(0,5)这条边为例，假设最小生成树里没有这条边，
 * 那么，必然是其他的两条边将顶点0和5接入到最小生成树，可是，(0,5)这两条边是能够找到的权值最小的边，
 * 如果前面假设的那两条边的权值大于10，那么显然不如用(0,5),如果前面假设的那两条边的权值等于10呢？
 * （0，5）这条边确实可以不在最小生成树中，但是当你选取了另外两条边将顶点0和5带入最小生成树中，
 * 你依然遵循着选取权重最小的边这个规则， 而且另外两条边的选取依然面临着(0, 5)这条边的问题，
 * 所以，总是选取权重最小的边，必然构建出最小生成树。
 * 
 * 构建最小生成树的过程參看圖“构建最小生成树的过程.jpg”
 */


const MinHeap = require("../../6.Heap/MyMinHeap");
const UFSets = require("./SimpleUFSets");
const Graph = require("../MyGraph");

var max_value = 9999;

var Edge = function(head, tail, cost) {
    this.head = head;
    this.tail = tail;
    this.cost = cost;
};


function kruskal(graph) {
    var mst = [];
    var node_num = graph.get_node_num();
    var edge_num = graph.get_edge_num();
    var min_heap = new MinHeap.MinHeap(edge_num);
    var ufset = new UFSets.UFSets(node_num);

    for (var i = 0; i < node_num; i++) {
        for (var j = i + 1; j < node_num; j++) {
            var cost = graph.get_weight(i, j);
            if (cost != max_value) {
                var ed = new Edge(i, j, cost);
                min_heap.insert(ed);
            }
        }
    }

    var count = 1;
    while (count < node_num) {
        var ed = min_heap.remove_min();
        var head_root = ufset.find(ed.head);
        var tail_root = ufset.find(ed.tail);
        if (head_root != tail_root) {
            ufset.union(head_root, tail_root);
            mst.push(ed);
            count++;
        } else {
            console.log("构成环路");
            console.log(ed);
        }

    }
    return mst;
};

var maps = [
    [0, 28, max_value, max_value, max_value, 10, max_value],
    [28, 0, 16, max_value, max_value, max_value, 14],
    [max_value, 16, 0, 12, max_value, max_value, max_value],
    [max_value, max_value, 12, 0, 22, max_value, 18],
    [max_value, max_value, max_value, 22, 0, 25, 24],
    [10, max_value, max_value, max_value, 25, 0, max_value],
    [max_value, 14, max_value, 18, 24, max_value, 0]
];
var graph = new Graph.Graph();
graph.init(maps);

var mst = kruskal(graph);
console.log(mst);

/*
构成环路
Edge { head: 3, tail: 4, cost: 22 }
[ Edge { head: 0, tail: 1, cost: 28 },
  Edge { head: 4, tail: 6, cost: 24 },
  Edge { head: 4, tail: 5, cost: 25 },
  Edge { head: 3, tail: 6, cost: 18 },
  Edge { head: 2, tail: 3, cost: 12 },
  Edge { head: 1, tail: 6, cost: 14 } ]

*/