//使用數組編寫一個隊列
function MyQueue() {
    //存儲數據
    var items = [];
    //隊列的方法
    /**
     * enqueue：從隊列尾部添加一個元素；
     * dequeue：從隊列頭刪除一個元素；
     * head：返回頭元素；
     * size：返回隊列大小；
     * clear：清空隊列；
     * isEmpty：判斷隊列是否為空；
     * tail：返回隊列尾節點。
     */

    this.enqueue = function(item) {
        items.push(item);
    }
    this.dequeue = function() {
        //shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
        return items.shift();
    }
    this.head = function() {
        return items[0];
    }
    this.size = function() {
        return items.length;
    }
    this.clear = function() {
        items = [];
    }
    this.isEmpty = function() {
        return items.length === 0;
    }
    this.tail = function() {
        return items[items.length - 1];
    }
}

exports.Queue = MyQueue;