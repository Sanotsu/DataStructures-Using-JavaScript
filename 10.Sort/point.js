// 平面上有以下一组点

var points = [
    [1.24, 2.56],
    [2.47, 5.84],
    [6.27, 1.46],
    [9.32, 4.98],
    [5.21, 5.23],
    [4.23, 1.23],
    [6.29, 3.67],
    [4.23, 8.34],
    [3.21, 4.68],
    [2.61, 4.23],
    [4.78, 7.35],
    [8.34, 2.57],
    [7.32, 3.58],
    [0.32, 3.94]
];

/**
 * x，y坐标的范围是[0,10],现在请你设计一种数据结构，能够存储这些坐标点，
 * 并提供一个方法search(x, y, dis),传入一个(x,y)坐标，寻找这些点中与它的距离小于等于dis的点，计算连个坐标之间距离的函数已经给出
 * 
 * 思路分析
 * 这样一组数据，存储不是什么问题，哪怕直接使用数组也没问题，关键是要实现search方法，
 * 如果是使用数组存储，执行search方法时，就需要遍历数组中的每一个点进行计算，那么最终，可以得到想要的结果。
 * 
 * 但如果数据量数以万计，每一次执行search的时候，都需要遍历一遍数组，这样的查询效率是没有办法接受的，
 * 因此，必须用一种能提高搜索效率的数据结构来存储数据。
 * 
 * 我们采用二维数组map[i][j]来存储这些数据，map[i][j]=[]，存储的仍然是一个数组，
 * 根据这些点的x,y决定将其放入到哪个桶中，例如[7.32, 3.58]放入到map[7][3]中，这样，这些点就划分到了不同的桶中。
 * 
 * 在search的时候，首先根据传入的x,y坐标以及dis范围，确定要遍历的桶的范围，
 * 对于x坐标来说，需要遍历的范围是[x-dis, x+dis]，对于y坐标来说，需要遍历的范围是[y-dis,y+dis]，
 * 这样，就缩小了遍历的范围，而不需要像前面那样遍历整个数组，遍历这些桶内的坐标，计算距离，符合要求的点放入到数组中返回。
 * @param {*} x 
 * @param {*} y 
 */

var Point = function(x, y) {
    this.x = x;
    this.y = y;
};

function MyMap() {
    var map = [];
    for (var i = 0; i < 10; i++) {
        map.push(new Array(10));
    }

    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            map[i][j] = [];
        }
    }

    this.add_point = function(x, y) {
        var point = new Point(x, y);
        var index_1 = Math.floor(x);
        var index_2 = Math.floor(y);
        map[index_1][index_2].push(point);
    };

    var get_dis = function(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2));
    };

    var get_index = function(index) {
        if (index < 0) {
            return 0;
        }
        if (index >= 10) {
            return 9;
        }
        return index;
    };

    // 寻找距离(x,y)在dis以内的所有点
    this.search = function(x, y, dis) {
        var point_arr = []
            // 缩小计算范围
        var x_start = get_index(Math.floor(x - dis));
        var x_end = get_index(Math.floor(x + dis));
        var y_start = get_index(Math.floor(y - dis));
        var y_end = get_index(Math.floor((y + dis)));
        for (var i = x_start; i <= x_end; i++) {
            for (var j = y_start; j <= y_end; j++) {
                var points = map[i][j];
                for (var k = 0; k < points.length; k++) {
                    if (get_dis(x, y, points[k].x, points[k].y) <= dis) {
                        point_arr.push(points[k]);
                    }
                }
            }
        }

        return point_arr;
    }
};

var map = new MyMap();
for (var i = 0; i < points.length; i++) {
    map.add_point(points[i][0], points[i][1]);
}

var points = map.search(3, 3, 2);
for (var i = 0; i < points.length; i++) {
    console.log(points[i]);
}