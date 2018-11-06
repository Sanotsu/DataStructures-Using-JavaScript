/**
 * 在一些应用问题中，你需要将n个不同的元素划分成多个不相交的集合
 * 并查集是一种非常简单但是非常有效的集合，它支持下面3种操作：
 *      union(root1, root2) 把集合root2合并入集合root1中，要求是root1和root2互不相交
 *      find(x) 搜索x所在的集合，返回该集合的名字
 *      初始化函数， 将s个元素初始化为s个只有一个元素的子集合
 * 
 * 如果集合中有n个元素，可以用一个0~n-1个整数来表示这些元素，这个整数就是集合名，
 * 并查集的典型实现是采用数组，并用树形结构来表示元素及其所属子集的关系，
 * 回想一下堆，堆就是用数组来表达树结构，并查集是相同的道理，数组元素的索引就是这些元素的编号。
 */

//類定義
function UFSets() {
    var parent = [];

    //初始化
    /**
     * 进行初始化的时候，数组里的每个元素都初始化为-1，这里有3个概念非常重要
     * 
     *  每个元素都是一个单独的集合，与其他集合互不相交
     *  对于初始化结束的并查集，每个元素是一个单独的集合，它的索引就是这个集合的集合名
     *  每个元素的值，就是其父节点所在的索引，由于刚刚初始化，每个元素的值都是-1，
     *      -1这个索引在数组中是不存在的，这恰好表明每个元素都没有父节点
  
     */
    this.init = function(size) {
        parent = new Array(size);
        for (var i = 0; i < size; i++) {
            parent[i] = -1;
        }
    };

    //find方法
    this.find = function(item) {
        while (parent[item] >= 0) {
            item = parent[item];
        }
        return item;
    };

    //合并两个不相交的集合，将root2合并到root1中，root1和root2是两个集合的集合名
    //必须强调一点，root1和root2是不相交的，这一点union方法自身没有做判断，需要在应用的时候自己去判断。
    this.union = function(root1, root2) {
        parent[root1] += parent[root2];
        parent[root2] = root1;
    }

    this.build_relation = function(i, j) {
        //建立朋友關系
        var root1 = this.find(i);
        var root2 = this.find(j);
        //不在同一個集合中，就合并到一起
        if (root1 != root2) {
            this.union(root1, root2);
        }
    };
    this.is_friend = function(i, j) {
        var root1 = this.find(i);
        var root2 = this.find(j);
        return root1 == root2;
    };
    this.get_friend_group_count = function() {
        var count = 0;
        for (var i = 0; i < parent.length; i++) {
            if (parent[i] < 0) {
                count++;
            }
        }
        return count;
    }
}

/**
 * 有一个集合{0,1,2,3,4,5,6,7,8,9},共有9个元素，分别代表了1个人的编号，他们中有些人是朋友，
 * 下面的数组表达了这些人的朋友关系

        var friends = [
            [0, 7],
            [1, 6],
            [4, 8],
            [8, 2],
            [9, 0],
            [3, 5],
            [1, 2]
        ];
        
* 约定朋友的朋友也是朋友，那么请问，在这个集合中，有几个朋友圈?同时请你提供一个is_friend(i, j)方法，
* 可以用来判断i和j是不是朋友关系。
*/

/**
 * 1.初始化並查集
 * 编号从0到9，那么我们初始化一个大小为10的数组，来表示这些元素集合
 * 2.合并子集
 * 合并子集的过程中，必须先找到合并元素所在的集合的名字，如果两个元素在同一个集合中，
 * 那么find函数返回的就是相同的集合名，此时，不需要进行合并操作。
 * 
 *      第1步， 合并0 和 7，合并之前，先要找到0个7各自所在集合的集合名find(0) = 0, find(7)= 7,
 *          不在同一个集合中，可以进行合并，union(0, 7)
 *          parent[0] += parent[7];parent[7] = 0;
 *      第2步,合并1和6，find(1) = 1, find(6) = 6,不在同一个集合中，union(1, 6)
 *          parent[1] += parent[6];parent[6] = 1;
 *      第3步，合并4 和 8 ，find(4) = 4, find(8)= 8，union(4, 8)
 *          parent[4] += parent[8];parent[8] = 4;
 *      第4步，合并8 和 2 ，find(8)= 4, find(2) = 2, union(4, 2)
 *          parent[4] += parent[2];parent[2] = 4;
 *      第5步，合并9和0， find(9) =9, find(0) = 0，union(9, 0)
 *          parent[9] += parent[0];parent[0] = 9;
 *      第6步， 合并3， 5 ，find(3) = 3, find(5) = 5, union(3,5)
 *          parent[3] += parent[5];parent[5] = 3;
 *      第7步，合并1，2, find(1) = 1,find(2) = 4, union(1, 4)
 *          parent[1] += parent[4];parent[4] = 1;
 * 3.合并後可參看圖片“朋友圈合并後結構.jpg”
 * 4.實現代碼，
 *      在上面的UFSet中添加this.build_relation，  this.is_friend，this.get_friend_group_count
 */

//測試

var friends = [
    [0, 7],
    [1, 6],
    [4, 8],
    [8, 2],
    [9, 0],
    [3, 5],
    [1, 2]
];

var ufset = new UFSets();
ufset.init(10);
for (var i = 0; i < friends.length; i++) {
    var item = friends[i];
    ufset.build_relation(item[0], item[1]);
}

console.log(ufset.get_friend_group_count()); //3

console.log(ufset.is_friend(2, 6)); //true
console.log(ufset.is_friend(6, 8)); //true
console.log(ufset.is_friend(4, 8)); //true
console.log(ufset.is_friend(9, 7)); //true
console.log(ufset.is_friend(2, 4)); //true
console.log(ufset.is_friend(2, 7)); //false