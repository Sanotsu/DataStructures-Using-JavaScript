Queue = require('./MyQueue.js')
Stack = require('../1.Stack/MyStack')

/**
 * 約瑟夫環
 * 
 * 問題描述：
 *  有一個數組a[100]存放0～99，要求每隔兩個數刪掉一個數，到末尾時循環到開頭繼續進行，求最後一個被刪除的數
 * 
 * 思路分析：
 * 使用index變量從0開始計算
 * 從隊列頭部刪除一個元素index+1
 * 如果index%3==0，說明這個元素是需要刪除的，使用while循環，循環終止的條件是隊列中只有1個元素，
 */

function del_ring(arr_list) {
    //把數組放到隊列中
    var queue = new Queue.Queue();
    for (var i = 0; i < arr_list.length; i++) {
        queue.enqueue(arr_list[i]);
    }
    var index = 0;
    while (queue.size() != 1) {
        //從隊列中取出一個元素，用於判斷是否需要刪除
        var item = queue.dequeue();
        index += 1;
        //每隔兩個就要刪除一個，不被刪除的就放到隊列尾部
        if (index % 3 !== 0) {
            queue.enqueue(item);
        }
    }
    return queue.head();
}


// 准备好数据
var arr_list = [];
for (var i = 0; i < 100; i++) {
    arr_list.push(i);
}
console.log(del_ring(arr_list));
console.log("=========================================================================");

/**
 * 斐波那契數列
 * 
 * 描述：使用队列计算斐波那契数列的第n项
 * 
 * 先将两个1 添加到队列中，之后使用while循环，用index计数，循环终止的条件是index < n -2
    使用dequeue方法从队列头部删除一个元素，该元素为del_item
    使用head方法获得队列头部的元素，该元素为 head_item
    del_item + head_item = next_item,将next_item放入队列，注意，只能从尾部添加元素index+1
    当循环结束时，队列里面有两个元素，先用dequeue 删除头部元素，剩下的那个元素就是我们想要的答案
 * 
 */
function fibonacci(n) {
    queue = new Queue.Queue();
    var index = 0;
    queue.enqueue(1);
    queue.enqueue(1);

    while (index < n - 2) {
        //出隊列一個元素
        var del_item = queue.dequeue();
        //取出隊列頭部元素
        let head_item = queue.head();
        let next_item = del_item + head_item;
        //將計算結果放到隊列
        queue.enqueue(next_item);
        index += 1;
    }
    queue.dequeue();
    return queue.head();
}

console.log(fibonacci(5));
console.log("=========================================================================");

/**
 * 用两个队列实现一个栈
 * 
 * 兩個隊列queue_1,queue_2,
 * push:如果兩個隊列都為空，默認向queue_1添加數據，如果有一個不為空，則向這個部位空的隊列添加
 * top:兩個隊列或者都為空，或者一個不為空，只需返回不為空的隊列的尾部元素即可
 * pop:每做一次pop，將不為空的隊列的元素依次刪除並放到另一個隊列，直到遇到隊列中只剩下一個元素，刪除這個元素
 * 
 * 额外的两个变量，data_queue和empty_queue，
 * data_queue始终指向那个不为空的队列，empty_queue始终指向那个为空的队列。
 */

function QueueStack() {
    var queue_1 = new Queue.Queue();
    var queue_2 = new Queue.Queue();
    var data_queue = null; //放數據的隊列
    var empty_queue = null; //空隊列，備用

    //確認哪一個隊列存放數據，那個隊列做備份空隊列
    var init_queue = function() {
        if (queue_1.isEmpty() && queue_2.isEmpty()) {
            data_queue = queue_1;
            empty_queue = queue_2;
        } else if (queue_1.isEmpty()) {
            data_queue = queue_2;
            empty_queue = queue_1;
        } else {
            data_queue = queue_1;
            empty_queue = queue_2;
        }
    }

    //push方法
    this.push = function(item) {
        init_queue();
        data_queue.enqueue(item);
    }
    this.top = function() {
        init_queue();
        return data_queue.tail();
    }
    this.pop = function() {
        init_queue();
        while (data_queue.size() > 1) {
            empty_queue.enqueue(data_queue.dequeue());
        }
        return data_queue.dequeue();
    }
}

var q_stack = new QueueStack();
q_stack.push(1);
q_stack.push(2);
q_stack.push(4);
console.log(q_stack.top()); // 栈顶是 4
console.log(q_stack.pop()); // 移除 4
console.log(q_stack.top()); // 栈顶变成 2
console.log(q_stack.pop()); // 移除 2
console.log(q_stack.pop()); // 移除 1

console.log("=========================================================================");

/**
 * 打印楊輝三角
 * 使用队列打印出杨辉三角的前n行，n >= 1
 * 
 * 计算的方式：f[i][j] = f[i-1][j-1] + f[i-1][j], i 代表行数，j代表一行的第几个数，如果j= 0 或者 j = i ,则 f[i][j] = 1。
 * 
 *  但是将计算所得放入到队列中时，队列中保存的是两行数据，一部分是第n-1行，另一部分是刚刚计算出来的第n行数据，
 * 需要有办法将这两行数据分割开。

    分开的方式有两种，一种是使用for循环进行控制，在输出第5行时，其实只有5个数据可以输出，那么就可以
使用for循环控制调用enqueue的次数，循环5次后，队列里存储的就是计算好的第6行的数据。
    第二种方法是每一行的数据后面多存储一个0，使用这个0来作为分界点，如果enqueue返回的是0，就说明这
一行已经全部输出，此时，将这个0追加到队列的末尾。
 * 
 */

function print_yanghui(n) {
    var queue = new Queue.Queue();
    queue.enqueue(1);

    //第一個for循環控制打幾層
    for (var i = 1; i <= n; i++) {
        var line = "";
        var pre = 0;
        //第二層for循環控制打印第i層
        for (var j = 0; j < i; j++) {
            var item = queue.dequeue();
            line += item + " ";
            //計算下一行的內容
            var value = item + pre;
            pre = item;
            queue.enqueue(value);
        }
        //每一層最後一個數字是1，上面的for循環沒有計算最後一個數
        queue.enqueue(1);
        console.log(line);
    }
}

function print_yanghui2(n) {
    var queue = new Queue.Queue();
    queue.enqueue(1);
    queue.enqueue(0);
    for (var i = 1; i <= n; i++) {
        var line = "";
        var pre = 0;
        while (true) {
            var item = queue.dequeue();
            //用一個0把每一行的數據分割開，遇到0不輸出
            if (item == 0) {
                queue.enqueue(1);
                queue.enqueue(0);
                break;
            } else {
                //計算下一行
                line += item + " ";
                var value = item + pre;
                pre = line;
                queue.enqueue(value);
            }
        }
        console.log(line);
    }
}

print_yanghui(6);

print_yanghui2(6);
console.log("=========================================================================");

/**
 * 用两个栈实现一个队列
 * 
 * 問題描述
 * 栈是先进后出，队列是先进先出，但可以用两个栈来模拟一个队列，请实现enqueue，dequeue， head这三个方法。
 * 
 * 思路分析
 * 如何实现enqueue方法，两个栈分别命名为stack_1,stack_2,面对这两个栈，似乎也只好选一个栈用来存储数据了，
 *      那就选stack_1来存储数据吧，看起来是一个无奈之举，但的确实现了enqueue方法。
 * 
 * 接下来考虑dequeue方法，队列的头，在stack_1的底部，栈是先进后出，目前取不到，可不还有stack_2么，
 * 把stack_1里的元素都倒入到stack_2中，这样，队列的头就变成了stack_2的栈顶，这样不就可以执行stack_2.pop()来删除了么。
 * 执行完pop后，需要把stack_2里的元素再倒回到stack_1么，不需要，现在队列的头正好是stack_2的栈顶，恰好可以操作，
 * 队列的dequeue方法借助栈的pop方法完成，队列的head方法借助栈的top方法完成。
 * 
 * 如果stack_2是空的怎么办？把stack_1里的元素都倒入到stack_2就可以了，
 *      这样，如果stack_1也是空的，说明队列就是空的，返回null就可以了。
 * 
 * enqueue始终都操作stack_1，dequeue和head方法始终都操作stack_2。
 */

function StackQueue() {
    var stack_1 = new Stack.Stack();
    var stack_2 = new Stack.Stack();

    //總是把數據放到stack_1中
    this.enqueue = function(item) {
        stack_1.push(item);
    }

    //獲得隊列的頭
    this.head = function(item) {
        //兩個棧都是空的
        if (stack_2.isEmpty() && stack_1.isEmpty()) {
            return null;
        }
        //如果stack_2是空的，那麼stack_1一定不為空，把stack_1的元素導入stack_2中
        if (stack_2.isEmpty()) {
            while (!stack_1.isEmpty()) {
                stack_2.push(stack_1.pop());
            }
        }
        return stack_2.top();
    }

    //出隊列
    this.dequeue = function() {
        //兩個棧都是空的
        if (stack_2.isEmpty() && stack_1.isEmpty()) {
            return null;
        }
        //入鍋stack_2是空的，那么stack_1一定不為空，把stack_1中元素倒入stack_2中
        if (stack_2.isEmpty()) {
            while (!stack_1.isEmpty()) {
                stack_2.push(stack_1.pop());
            }
        }
        return stack_2.pop();
    }
}
var sq = new StackQueue();
sq.enqueue(1);
sq.enqueue(4);
sq.enqueue(8);
console.log(sq.head()); //1
sq.dequeue();
sq.enqueue(9);
console.log(sq.head()); //4
sq.dequeue();
console.log(sq.head()); //8
console.log(sq.dequeue()); //8
console.log(sq.dequeue()); //9