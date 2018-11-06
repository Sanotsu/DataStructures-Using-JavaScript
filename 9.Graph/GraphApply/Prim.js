/**
 * prim（普里姆）算法
 * 
 * prim（普里姆）算法要求指定一个顶点v，从这个顶点开始构建最小生成树。
 * 
 * 与kruskal算法类似，也需要一个最小堆存储边，存储图的边，顶点v是第一个加入到最小生成树顶点集合的顶点，记做b_mst[v]=1。
 * 
 * 用数组b_mst[i]=1 表示顶点i在最小生成树顶点集合中，每次选出一个端点在生成树中，
 * 而另一个端点不在生成树的权值最小的边(u，v)，而它恰好是堆顶的边，将其从最小堆中删除，
 * 并加入到生成树中，然后将新出现的所有一个端点在生成树中，
 * 另一个端点不在生成树中的边加入到最小堆中，如此重复，直到找到n-1条边。
 * 
 * 为什么这样就能创建最小生成树呢？以顶点1为例，以顶点1为基础，扩充创建最小生成树时，
 * 选取(1,6)的代价是最小的，以此为基础，继续扩充创建，选取(1,2)这条边的代价是最小的，
 * 以此类推，每一步都是代价最小的，那么最终必然生成一棵最小生成树。
 * 
 * 假设在选取了(1,6)之后，不选取(1,2)，而是选取了(6,3)，虽然(6,3)的权重更大，
 * 但是是否存在一种可能，虽然这一步权重大了，但由于路径变化，导致后面的可以选取到权重比(1,2)更小的边，
 * 从而使得可以生成一棵更小的生成树？答案是不可能，因为顶点2终究是要被加入到最小生成树中，
 * 既然用(1,2)，就只能用（2，3）这条边，可是这样一来，(2,3)的权重加上（6，3）的权重必然会大于（1，2）的权重加上(2,3)的权重，
 * 明显不如用(1,2),(2,3)两条边。
 * 
 * prim創建最新生成樹的過程參見“prim創建最新生成樹的過程.jpg”
 */

const MinHeap = require("../../6.Heap/MyMinHeap");
const Graph = require("../MyGraph");
var max_value = 9999;

var Edge = function(head, tail, cost) {
    this.head = head;
    this.tail = tail;
    this.cost = cost;
};

// 从顶点v开始构建最小生成树
function prim(graph, v) {
    var mst = [];
    var node_num = graph.get_node_num();
    var edge_num = graph.get_edge_num();
    var b_mst = new Array(node_num);
    // b_mst标识哪些点已经
    for (var i = 0; i < node_num; i++) {
        b_mst[i] = 0;
    }
    b_mst[v] = 1;
    var count = 1;
    var start_v = v;
    var min_heap = new MinHeap.MinHeap(edge_num);

    while (count < node_num) {
        // 先找到所有start_v 能够到达的顶点
        for (var i = 0; i < node_num; i++) {
            if (b_mst[i] == 0) {
                var cost = graph.get_weight(start_v, i);
                if (cost != max_value) {
                    var ed = new Edge(start_v, i, cost);
                    min_heap.insert(ed);
                }
            }
        }

        while (min_heap.size() != 0) {
            var ed = min_heap.remove_min();
            // ed.tail还没有加入到生成树的顶点集合中
            if (b_mst[ed.tail] == 0) {
                mst.push(ed);
                start_v = ed.tail; //新的起点
                b_mst[start_v] = 1;
                count++;
                break;
            }
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

var mst = prim(graph, 1);
console.log(mst);

/*
[ Edge { head: 1, tail: 0, cost: 28 },
  Edge { head: 1, tail: 6, cost: 14 },
  Edge { head: 0, tail: 5, cost: 10 },
  Edge { head: 6, tail: 4, cost: 24 },
  Edge { head: 4, tail: 3, cost: 22 },
  Edge { head: 3, tail: 2, cost: 12 } ]
*/