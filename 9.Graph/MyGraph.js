/**
 * 圖
 * 圖的基本概念等知識，可參看“images/圖”中
 */

const Queue = require("../2.Queue/MyQueue")
var max_value = 9999;

//邻接矩阵存储图的一般类定义
function MyGraph() {
    var maps = [];
    var node_num = 0;
    var edge_num = 0;

    this.init = function(input_maps) {
        maps = input_maps;
        node_num = this.get_node_num();
        edge_num = this.get_edge_num();
    };
    //獲得頂點的個數
    this.get_node_num = function() {
        if (node_num != 0) {
            return node_num;
        }
        return maps.length;
    }

    //獲得邊的個數
    this.get_edge_num = function() {
        if (edge_num != 0) {
            return edge_num;
        }
        var count = 0;
        for (var i = 0; i < node_num; i++) {
            for (var j = i + 1; j < node_num; j++) {
                if (maps[i][j] > 0 && maps[i][j] < max_value) {
                    count++;
                }
            }
        }
        return count;
    };
    //獲得邊的權重
    this.get_weight = function(u, v) {
        return maps[u][v];
    };

    /**
     * 
     * 图的遍历
     * 
     *   圖查看“遍歷的圖示例.jpg”
     * 
     *   图的遍历有两种方法，一种是深度优先遍历，另一种是广度优先遍历，其实在学习树的时候，就已经接触过这两种遍历方法，
     * 二叉搜索树的搜索过程，就是深度优先遍历，而分层打印二叉树则是广度优先遍历。为了讲述这两种遍历方法，先给出用邻接矩阵存储图的一般类定义
     *
     * 深度优先遍历
     * 不同于树的遍历，图中各点有可能互相连通，为了不重复遍历，必须对已经遍历过的点进行标识，
     * 示例中使用数组visited[i]=1标识i已经遍历过。
     * 
     * 树的遍历默认从root根节点开始，而图不存在根节点的概念，
     * 因此在遍历时，要指定起始顶点v，先找出v所能连接的所有顶点，遍历这些顶点，并对这些顶点做同v一样的操作。
     * 
     */
    var graph_dfs = function(v, visited, component) {
        visited[v] = 1; //標示v已經訪問過
        console.log(v);
        component.push(v);
        var row = maps[v];
        for (var i = 0; i < row.length; i++) {
            if (row[i] < max_value && visited[i] == 0) {
                //v與i是連通的，且i還沒有被遍歷過
                graph_dfs(i, visited, component);
            }
        };
    };
    //從頂點v開始深度優先遍歷圖
    this.dfs = function(v) {
        var visited = new Array(node_num);
        var component = []; //存儲連通分量
        for (var i = 0; i < node_num; i++) {
            visited[i] = 0;
        }
        graph_dfs(v, visited, component);
        return component;
    }

    /**
     * 广度优先遍历
     * 同样使用数组visited[i]=1标识i已经遍历过，和树的分层打印节点一样，
     * 需要借助队列，将顶点v所能连通的其他顶点放入到队列中，而后出队列，对这个刚刚对队列的顶点做和v相同的操作
     */
    var graph_bfs = function(v, visited, component) {
        var queue = new Queue.Queue();
        queue.enqueue(v);
        visited[v] = 1; //表示v已经访问过
        console.log(v);
        component.push(v);
        while (!queue.isEmpty()) {
            var visited_v = queue.dequeue();
            var row = maps[visited_v];
            for (var i = 0; i < row.length; i++) {
                if (row[i] < max_value && visited[i] == 0) {
                    // v 与i 是连通的,且i还没有被遍历过
                    queue.enqueue(i);
                    visited[i] = 1; //表示v已经访问过
                    console.log(i);
                    component.push(i);
                }
            }
        }
    };

    this.bfs = function(v) {
        var visited = new Array(node_num);
        var component = [];
        for (var i = 0; i < node_num; i++) {
            visited[i] = 0;
        }
        graph_bfs(v, visited, component);
        return component;
    };

    /**
     * 
     * 獲取連通分量
     *  圖參看“非連通的圖示例”
     * 
     * 一个图可以有多个互不连通的子图，也就存在多个连通分量，
     * 比如从1开始遍历图，会得到一个连通分量，而从7开始，会得到一个连通分量，
     * 那么具体从哪个开始呢，你是无法确定的，因此图的存储结构里并没有标识有几个连通分量以及各个连通分量里的顶点集合。
     * 
     * 因此，要对所有的顶点进行检测，如果已经被访问过，那么这个点一定会落在图中已经求得的连通分量上，
     * 否则，从该顶点触发遍历图，就可以得到另一个连通分量
     * 
     */
    this.components = function() {
        var visited = new Array(node_num);
        var component_list = [];
        for (var i = 0; i < node_num; i++) {
            visited[i] = 0;
        }

        for (var i = 0; i < node_num; i++) {
            if (visited[i] == 0) {
                var component = [];
                graph_bfs(i, visited, component)
                component_list.push(component);
            }
        }
        return component_list;
    };

}

exports.Graph = MyGraph;