Stack = require('./MyStack.js')

/**
 * 檢驗字符串中合法括號
 * 
 * 問題描述：
 * 下面的字符串中包含小括号，请编写一个函数判断字符串中的括号是否合法，所谓合法，就是括号成对出现
 *   sdf(ds(ew(we)rw)rwqq)qwewe   合法
 *   (sd(qwqw)sd(sd))             合法
 *   ()()sd()(sd()fw))(           不合法
 * 
 * 思路分析：
 * 我们可以使用for循环遍历字符串的每一个字符，对每个字符做如下的操作：
 * 遇到左括号，就把左括号压如栈中，遇到右括号，判断栈是否为空，
 *      为空说明没有左括号与之对应，缺少左括号，字符串括号不合法，如果栈不为空，则把栈顶元素移除，这对括号抵消掉了
 * 当for循环结束之后，如果栈是空的，就说明所有的左右括号都抵消掉了，如果栈里还有元素，则说明缺少右括号，字符串括号不合法。
 * 
 */

function is_leagl_brackets(string) {
    var stack = new Stack.Stack();

    for (var i = 0; i < string.length; i++) {
        //將字符串逐字放到數組中去
        var item = string[i];
        if (item == "(") {
            stack.push(item);
        } else if (item == ")") {
            if (stack.isEmpty()) {
                return false;
            } else {
                stack.pop();
            }
        }
    }
    return stack.size() === 0;
}


console.log(is_leagl_brackets("()()))")); //false
console.log(is_leagl_brackets("sdf(ds(ew(we)rw)rwqq)qwewe")); //true
console.log(is_leagl_brackets("()()sd()(sd()fw))(")); //false

console.log("=========================================================================");
/**
 * 逆波兰表达式
 * 
 * 問題描述
 * 请编写函数calc_exp(exp) 实现逆波兰表达式计算，exp的类型是数组
 * 逆波兰表达式，也叫后缀表达式，它将复杂表达式转换为可以依靠简单的操作得到计算结果的表达式，例如 (a+b)*(c+d)转换为ab+cd+*。
 * 
 * 思路分析
 * 使用for循环遍历数组，对每一个元素做如下操作：
 *      如果元素不是 + - * / 中的某一个，就压入栈中
 *      如果元素是 + - * / 中的某一个，则从栈里连续弹出两个元素，并对这两个元素进行计算，将计算结果压入栈中
 *      for循环结束之后，栈里只有一个元素，这个元素就是整个表达式的计算结果
 */

function calc_exp(exp) {
    var stack = new Stack.Stack();

    for (var i = 0; i < exp.length; i++) {

        var item = exp[i];
        if (["+", "-", "*", "/"].indexOf(item) < 0) {
            stack.push(item);

        } else {
            var val1 = stack.pop();
            var val2 = stack.pop();
            var exp_str = val2 + item + val1;
            //eval(string) 函数可计算某个字符串，并执行其中的的 JavaScript 代码。
            var res = parseInt(eval(exp_str));
            stack.push(res.toString());
        }
    }
    return stack.pop()
}

var exp_1 = ["4", "13", "5", "/", "+"];
var exp_2 = ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"];

console.log(calc_exp(exp_1)); //6
console.log(calc_exp(exp_2)); //22
console.log("=========================================================================");
/**
 * 給stack添加一個min方法
 * 
 * 問題描述：
 * 实现一个栈，除了常见的push，pop方法以外，提供一个min方法，返回栈里最小的元素，且时间复杂度为o(1)
 * 
 * 思路分析
 * 使用两个栈来存储数据，其中一个命名为data_stack,专门用来存储数据，
 * 另一个命名为min_stack，专门用来存储栈里最小的数据。
 * 
 * 我们要实现的是一个栈，除了常规的方法，还要有一个min方法，
 * data_stack就是专门为常规方法而存在的，min_stack就是为了这个min方法而存在的。
 * data_stack，它就是一个普通的栈，min_stack，它要存储栈里的最小值，分開來，不要混在一起想
 * 
 * min_stack先考虑边界情况，
 * 如果min_stack为空，这个时候，如果push进来一个数据，那这个数据一定是最小的，所以此时，直接放入min_stack即可。
 * 如果min_stack不为空，这个时候它的栈顶不正是栈的最小元素么，如果push进来的元素比栈顶元素还小，放入min_stack就好了，
 * 这样，min_stack的栈顶始终都是栈里的最小值。
 * 
 */

function MinStack() {
    var data_stack = new Stack.Stack(); //常規的stack
    var min_stack = new Stack.Stack(); //專門存儲最小值

    this.push = function(item) {
        data_stack.push(item); //常規stack常規操作

        //如果min_stack為空，或者棧頂元素大於要存放的item，則這個item應該被存入min_stack
        if (min_stack.isEmpty() || min_stack.top() > item) {
            min_stack.push(item);
        } else {
            //min_stack中元素個數要與data_stack保持一致
            //所以如果item大於min_stack的棧頂元素，雖然不用存到min_stack，但是這樣個數會不一致，所以再存一次min_stack棧頂元素
            min_stack.push(min_stack.top());
        }
    }

    this.pop = function() {
        //兩者保持個數一致，但是min_stack專門存最小值的，所以要返回常規stack的棧頂
        min_stack.pop();
        return data_stack.pop();
    }

    this.min = function() {
        //當然是返回專門存最小值的min_stack的棧頂元素
        return min_stack.top();
    }
}

minStack = new MinStack();
minStack.push(3);
minStack.push(6);
minStack.push(8);
minStack.push(5);
minStack.push(2);
minStack.push(7);
console.log(minStack.min()); //2
console.log("=========================================================================");

/**
 * 使用栈，完成中序表达式转后续表达式
 * 
 * 思路分析
 * 輸入的是字符數組，類似  ['(', '1', '+', '(', '4', '+', '5', '+', '3', ')', '/', '4', '-', '3', ')', '+', '(', '6', '+', '8', ')', '*', '3']
 * 
 * 定义数组postfix_lst，用于存储后缀表达式，遍历中缀表达式，对每一个遍历到的元素做如处理:
 * 1、如果是数字,直接放入到postfix_lst中
 * 2、遇到左括号入栈
 * 3、遇到右括号,把栈顶元素弹出并放入到postfix_lst中,直到遇到左括号，最后弹出左括号
 * 4、遇到运算符,把栈顶的运算符弹出,直到栈顶的运算符优先级小于当前运算符， 
 *      把弹出的运算符加入到postfix_lst，当前的运算符入栈
 * 5、for循环结束后, 栈里可能还有元素,都弹出放入到postfix_lst中
 */

// 定义运算符的优先级
var priority_map = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2
};

function infix_exp_to_postfix_exp(exp) {
    var stack = new Stack.Stack();

    //聲明一個數組，用於存放後續表達式
    var postfix_list = []
    for (var i = 0; i < exp.length; i++) {
        var item = exp[i];

        //是數字，直接存入數組 
        //isNaN() 函数用于检查其参数是否是非数字值。 （是數字，返回false）
        //如果 x 是特殊的非数字值 NaN（或者能被转换为这样的值），返回的值就是 true。如果 x 是其他值,则返回 false。
        if (!isNaN(item)) {
            postfix_list.push(item);
        } else if (item === "(") { //遇到左括號，入棧
            stack.push(item);
        } else if (item === ")") { //遇到右括號，把棧頂元素放到數組，直到遇到左括號
            while (stack.top() != "(") {
                postfix_list.push(stack.pop());
            }

            //左括號出棧
            stack.pop();

        } else { //遇到運算符，把棧頂運算符彈出，直到棧頂運算符優先級小於當前運算符

            //如果棧不為空，且棧頂是+-*/，並且棧頂的運算符等級>當前運算符等級
            while (!stack.isEmpty() && ["+", "-", "*", "/"].indexOf(stack.top()) >= 0 && priority_map[stack.top()] >= priority_map[item]) {
                //把彈出的運算符放到數組
                postfix_list.push(stack.pop());
            }
            //當前運算符入棧
            stack.push(item);
        }
    }

    //for循環之後，棧裡面可能還有元素，都彈出來放到postfix_list中
    while (!stack.isEmpty()) {
        postfix_list.push(stack.pop());
    }

    return postfix_list;
}

//12+3
console.log(infix_exp_to_postfix_exp(["12", "+", "3"])); //[ '12', '3', '+' ]
// 2-3+2
console.log(infix_exp_to_postfix_exp(["2", "-", "3", "+", "2"])); //[ '2', '3', '-', '2', '+' ]
// (1+(4+5+3)-3)+(9+8)
var exp = ["(", "1", "+", "(", "4", "+", "5", "+", "3", ")", "-", "3", ")", "+", "(", "9", "+", "8", ")"];
console.log(infix_exp_to_postfix_exp(exp)); //[ '1', '4', '5', '+', '3', '+', '+', '3', '-', '9', '8', '+', '+' ]
// (1+(4+5+3)/4-3)+(6+8)*3
var exp1 = ['(', '1', '+', '(', '4', '+', '5', '+', '3', ')', '/', '4', '-', '3', ')', '+', '(', '6', '+', '8', ')', '*', '3']
console.log(infix_exp_to_postfix_exp(exp1))