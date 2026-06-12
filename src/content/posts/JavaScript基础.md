---
title: JavaScript基础
date: 2021-02-26 15:17:21
tags:
 - JavaScript
categories: web前端
---
## 1. 原型链
每个函数都有prototype，指向了一个对象，该对象为实例的原型。
每个JS对象（除了null）都具有_proto_属性，指向该对象的原型。
每个原型都具有constructor属性，指向关联的构造函数。
Object.prototype._proto_为null代表该对象没有原型。
## 2. 继承
 - 原型链继承
```
function Parent () {
    this.name = 'kevin';
}

Parent.prototype.getName = function () {
    console.log(this.name);
}

function Child () {

}

Child.prototype = new Parent();

var child1 = new Child();

console.log(child1.getName()) // kevin

var child1 = new Child(); // 引用类型的属性被所有实例共享

child1.names.push('yayu'); 

console.log(child1.names); // ["kevin", "daisy", "yayu"]

var child2 = new Child(); // 创建child实例时无法向Parent传参

console.log(child2.names); // ["kevin", "daisy", "yayu"]
```
 - 借用构造函数（经典继承）
```
function Parent () {
    this.names = ['kevin', 'daisy'];
}

function Child () {
    Parent.call(this);
}

var child1 = new Child();

child1.names.push('yayu');

console.log(child1.names); // ["kevin", "daisy", "yayu"]

var child2 = new Child();

console.log(child2.names); // ["kevin", "daisy"]

function Parent (name) {
    this.name = name;
}

function Child (name) {
    Parent.call(this, name);
}

var child1 = new Child('kevin');

console.log(child1.name); // kevin

var child2 = new Child('daisy');

console.log(child2.name); // daisy
```
优点：
1.避免了引用类型的属性被所有实例共享
2.可以在Child中向Parent传参
缺点：
方法都在构造函数中定义，每次创建实例都会创建一遍方法。
 - 组合继承
原型链继承和经典继承合并。
```
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child (name, age) {

    Parent.call(this, name);
    
    this.age = age;

}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

var child1 = new Child('kevin', '18');

child1.colors.push('black');

console.log(child1.name); // kevin
console.log(child1.age); // 18
console.log(child1.colors); // ["red", "blue", "green", "black"]

var child2 = new Child('daisy', '20');

console.log(child2.name); // daisy
console.log(child2.age); // 20
console.log(child2.colors); // ["red", "blue", "green"]
```
融合原型链和构造函数的优点，最常用的继承模式。
 - 原型式继承
```
function createObj(o) {
    function F(){}
    F.prototype = o;
    return new F();
}
```
ES5 Object.create的模拟实现，将传入的对象作为创建的对象的原型。
缺点：
包含引用类型的属性值始终会共享相应的值，与原型链继承一样。
 - 寄生式继承
创建一个仅用与封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。
```
function createObj (o) {
    var clone = Object.create(o);
    clone.sayName = function () {
        console.log('hi');
    }
    return clone;
}
```
缺点：跟借用构造函数模式一样，每次创建对象都会创建一遍方法。
 - 寄生组合式继承
```
function Child (name, age) {
    Parent.call(this, name);
    this.age = age;
}

// 关键的三步
var F = function () {};

F.prototype = Parent.prototype;

Child.prototype = new F();


var child1 = new Child('kevin', '18');

console.log(child1);
//封装
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

function prototype(child, parent) {
    var prototype = object(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
}

// 当我们使用的时候：
prototype(Child, Parent);
```
普遍认为是最理想的继承范式。
## 3. 作用域
对于每个执行上下文，都有三个重要属性：
 - 变量对象（Variable）
 - 作用域链（Scope）
 - this
全局作用域：
window对象的上下文
块级作用域：
用let声明的代码块{}内
函数作用域：
函数上下文的作用域{}内
作用域链：
不断向上访问，直到全局作用域
## 4. 闭包
理解：引用另一个函数作用域中变量的函数。
闭包可以传入this对象作为参数，通过该对象访问this上下文的值。
由于闭包会保留他们包含函数的作用域，所以使用闭包要注意，内存的回收。
## 5. 变量提升
var声明的变量和方法，都会提升到全局对象上。
全局对象就是由Object构造函数实例化的一个对象。
函数上下文的变量对象初始化只包括Arguments对象
在进入执行上下文时会给变量对象添加形参(arguments)、函数声明(func)、变量声明(var)等初始化的属性值
在代码执行阶段，会再次修改变量对象的属性值
进入执行上下文中，首先会处理函数声明，其次处理变量声明，如果变量名称跟已声明的元素相同，则声明不会干扰已经存在的这类属性。
## 6. this的指向
执行上下文都有this属性
标准函数中，this引用的是把函数当成方法调用的上下值。
箭头函数会保留定义它时的上下文
## 7. 立即执行函数
调用需要在后面添加()，也需要在前面将函数用()包裹。
后面的()可以用来传值，立即执行会保存闭包的状态。
前面的()包裹函数则被解析成表达式，匿名函数后面的()被用于调用，将前面的函数当成声明。
IIFE（立即自执行）
模块模式：
```
var counter = (function(){
    var i = 0;
    return {
        get: function(){
            return i;
        },
        set: function(val){
            i = val;
        },
        increment: function(){
            return ++i;
        }
    }
    }());
    counter.get();//0
    counter.set(3);
    counter.increment();//4
    counter.increment();//5

    conuter.i;//undefined (`i` is not a property of the returned object)
    i;//ReferenceError: i is not defined (it only exists inside the closure)
```
最小化了全局变量的污染，创造了使用变量。
## 8. instanceof原理
typeof也可用于判断object类型，但判断null会显示object。(typeof用于判断基本数据类型，包括symbol都是没问题的，避免null)
instanceof用于判断object类型，判断null时会报错，显示null不是object。
也可使用Object.prototype.toString来判断一个变量的类型（比较准确）。
原理：
根据原型链判断，遍历原型链查找相同的类型。
一边查找函数的原型，一边查找实例的原型。
总结：准确判断对象实例类型，可以使用Object.prototype.toString.call，
typeof只适合判断基本数据类型，instanceof判断null为Object。
## 9. bind的实现
bind()方法会创建一个新的函数，当这个新函数被调用时，bind()的第一个参数将作为它运行时的this，之后的一序列参数将会在传递的实参前传入作为它的参数。
bind特点：
 - 返回一个函数
 - 可以传入参数
当bind返回的函数作为构造函数时，bind指定的this会失效，但参数生效。
```
Function.prototype.bind2 = function (context) {

    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {};

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}
```
## 10. apply和call
共同点：
 - 改变上下文tihs
 - 必须是函数调用
区别：
 - call传入多个参数
 - apply传入参数数组或类数组(具有length和for遍历)
call使用场景：
1.继承对象
2.借用方法
apply使用场景：
1.Math.max
2.两个数组合并
3.实现bind
## 11. 柯里化
定义：将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。
用途：参数复用，降低通用性，提高适用性。
实现：
```
var curry = function (fn) {
    var args = [].slice.call(arguments, 1);
    return function() {
        var newArgs = args.concat([].slice.call(arguments));
        return fn.apply(this, newArgs);
    };
};
```
本质上是用函数包裹原函数，给原函数传入之前的参数，当执行func()()时，执行包裹函数，返回原函数，调用sub_curry再包裹原函数，然后将新的参数混合旧的参数再传入原函数，知道函数参数的书目达到要求为止。
## 12. v8垃圾回收机制
1.为什么要垃圾回收？
避免内存泄漏，性能下降
2.V8引擎内存限制
64位系统，1.4G
32位系统，0.7G
由于JS单线程机制，垃圾回收会影响程序执行。为了减少对应用的性能影响，V8直接限制内存大小。
3.V8的垃圾回收策略
分代式垃圾回收机制，根据存活时间将内存的垃圾回收进行不同的分代，然后对不同的分代采用不同的垃圾回收算法。
V8有如下内存结构：
 - 新生代：一般分配内存，一般用于垃圾回收时保存保留对象
 - 老生代：新生代对象一段时候后转移的地方
 - 大对象区：存放体积较大的对象，垃圾回收不会移动该区
 - 代码区：代码对象，会被分配在这里，唯一拥有执行权限的内存区域
 - map区：存放cell和map，区域存放相同大小
新生代回收算法：
Scavenge算法：Cheney算法，二分空间From和To，先From，回收时复制到To，然后将To变成From，From清空变为To。
对象晋升：
多次存活后转到老生代的对象，过程称为对象晋升。
条件：
 - 经过过一次Scavenge算法
 - To空间的内存占比超过25%
老生代回收算法：
采用Mark-Sweep标记清除和Mark-Compact标记清理算法
引用计数，如果对象没有被指针引用，则被视为垃圾回收。
4. 避免内存泄漏
 - 尽可能减少全局变量
 - 手动清除计时器
 - 少用闭包
 - 清除DOM引用
 - 弱引用
5. 总结
新生代，老生代，算法，垃圾回收机制，避免内存泄漏。
## 13. 浮点数精度
## 14. new操作符
## 15. 事件循环机制
## 16. promise原理
## 17. generator原理