function MyStack() {
    //存儲數據
    var items = [];
    //棧的方法
    /**
     * 栈有以下几个方法：
     * push 添加一个元素到栈顶（向桶里放入一个羽毛球）
     * pop 弹出栈顶元素（从桶里拿出一个羽毛球）
     * top 返回栈顶元素，注意，不是弹出（看一眼桶里最顶端的羽毛球，但是不拿）
     * isEmpty 判断栈是否为空（看看羽毛球是不是都用完了）
     * size 返回栈里元素的个数（数一下桶里还有多少羽毛球）
     * clear 清空栈（把桶里的羽毛球都倒出来扔掉）
     */
    this.push = function(item) {
        items.push(item);
    }

    this.pop = function() {
        return items.pop();
    }

    this.top = function() {
        return items[items.length - 1];
    }

    this.isEmpty = function() {
        return items.length === 0;
    }

    this.size = function() {
        return items.length;
    }

    this.clear = function() {
        items = [];
    }
}

exports.Stack = MyStack;