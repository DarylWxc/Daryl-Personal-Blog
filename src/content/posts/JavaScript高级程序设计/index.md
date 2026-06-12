---
title: JavaScript高级程序设计
date: 2020-11-23 09:43:04
tags:
 - javaScript
categories: javaScript高级程序设计
---
# 1.1 历史回顾
网站数据量大，复杂。需要JS来解决，优化。
# 1.2 JS实现
JS = ECMAScript（核心） + DOM（文档对象模型） + BOM（浏览器对象模型）
## 1.2.1（ECMAScript）
ES：网页提供ES的基准实现和与环境自身交互必须的扩展。
ES包括：语法、类型、语句、关键字、保留字、操作符、全局对象。
大部分浏览器兼容ES6。
## 1.2.2 DOM
文档对象模型：是一个应用编程接口（API），用于在HTML中使用扩展的XML。DOM将整个页面抽象为一组分层节点。F12中常见的文档树。
![文档树](文档树.png)
DOM通过创建表示文档的树，让开发者可以更好地控制网页的内容和结构。使用DOM的API，可以轻松删除，添加，替换，修改节点。
DOM视图：描述追踪文档不同视图的接口。
DOM事件：描述事件及事件处理的接口。
DOM样式：描述处理元素CSS样式的接口。
DOM遍历的范围：描述遍历和操作DOM数的接口。
其他DOM：可伸缩矢量图（SVG），数学标记语言（MathML），同步多媒体集成语言（SMIL）
DOM有不同level（版本）:目前到了level3
## 1.2.3 BOM
浏览器对象模型：用于支持访问和操作浏览器的窗口。使用BOM，可以操控浏览器显示页面之外的部分，BOM针对浏览器窗口和子窗口。拓展：
弹出新浏览器窗口的能力；
移动、缩放和关闭浏览器窗口的能力；
navigator对象，提供关于浏览器的详尽信息；
location对象，提供浏览器加载页面的详尽信息；
screen对象，提供关于用户屏幕分辨率的详尽信息；
performance对象，提供浏览器内存占用、导航行为和时间统计的详尽信息；
对cookie的支持；
其他自定义对象，XMLHttp，ActiveXObject；
# 1.3 JavaScript版本
# 1.4 小结
JS是一门用来与网页交互的脚本语言，包含以下三个组成部分。
ES：有ECMA-262定义并提供核心功能。
文档对象模型（DOM）:提供与网页内容交互的方法和接口。
浏览器对象模型（BOM）：提供与浏览器交互的方法和接口。
JS这三个部门得到了五大Web浏览器不同程度的支持。所有浏览器基本上对ES5提供了完善的支持，ES6最佳。
---
# 2.1 script元素
将Js插入HTML的主要方法是使用script元素。有下列8个属性：
1.async：可选，表示立即开始下载脚本，但不能阻止其他页面动作，比如下载资源或等待其他脚本加载，只对外部脚本文件有效。
2.charset：可选，使用src属性指定的代码字符集。很少用。
3.crossorigin：可选，配置相关请求的CORS（跨源资源共享）设置。默认不使用CORS。
defer：可选，表示脚本可以延迟到文档完全被解析和显示之后再执行，只对外部脚本文件有效。
integrity：可选，允许比对接收到的资源和指定的加密签名以验证子资源完整性。
language：废弃。
src：可选，表示包含要执行的代码的外部文件。（引入外部JS文件）
type：可选，代替language，表示代码块中脚本语言的内容类型（MIME类型）。按照惯例这个值始终都是“text/JavaScript”，MIME类型通常都是“application/x-javascript”，如果这个值是module，则代码会被当成ES6模块，而且只有这时候代码中才能出现import和export关键字。
## 2.1.1 标签位置
```
<head>
<script src='example1.js'></script>
</head>
```
上述是把文件放在head里，不过这种写法以为着必须把所有JS代码都下载、解析和解释完成后，才能开始渲染页面，可能会导致页面渲染的明显延迟，所以通常把文件引用放在body元素中的页面内容后面。
```
<body>
<script src='example2.js'></script>
</body>
```
## 2.1.2 推迟执行脚本
可用defer属性，可用推迟脚本执行。
```
<script defer src='example1.js'></script>
```
## 2.1.3 异步执行脚本
```
<script async src='example1.js'></script>
```
## 2.1.4 动态加载脚本
JS可用使用DOM API ，通过向DOM中动态添加Script元素同样可用加载指定的脚本，只要创建一个Script元素并将其添加到DOM即可。如下：
let script = document.createElement('script');
script.src = 'gibbersh.js'
document.head.appendChild(script);
这个请求是异步的，不是所有浏览器都支持async属性，因此，如果要统一动态脚本的加载行为，可以明确将其设置为同步加载。
添加：script.async = false;
以这种方式获取的资源对浏览器预加载器是不可见的。这会严重影响它们在资源获取队列中的优先级。这种可能会严重影响性能。要想让预加载器知道这些动态请求文件的存在，可以在文档头部显示声明它们：
```
<link rel="preload" href="gibberish.js">
```
## 2.1.5 XMHTL中的变化
XHTML：可扩展超文本标记语言，是将HTML作为XML的应用重新包装的结果。在XHTML中使用JS必须制定type属性且值为text/javascript。
XHTML比较少见。
## 2.1.6 废弃的语法
个别废弃的语法，可不看。
# 2.2 行内代码与外部文件
最佳实践是尽可能将JS代码放在外部文件中。推荐原因如下：
可维护性：JS代码分散到很多HTML页面，会导致维护困难。而用一个目录保存所有JavaScript文件，则更容易维护，这样开发者就可以独立于使用它们的HTML页面来编辑代码。
缓存：浏览器会根据特定的设置缓存所有外部链接的JS文件，这意味着若干两个页面都用到同一个文件，则该文件只需下载一次。这最终意味着页面加载更快。
适应未来：通过把JS放到外部文件中，就不比考虑用XHTML的或注释黑科技。包含外部JS文件的语法在HTML和XHTML是一样的。
在配置浏览器请求外部文件时，要重点考虑的一点是它们会占用多少带宽。在SPDY/HTTP2中，预请求的消耗已显著降低，以轻量、独立JS组件形式向客户端送达脚本更具优势。
在初次请求时，如果浏览器支持SPDY/HTTP2，就可以从同一个地方取得一批文件，并将他们逐个放到浏览器缓存中。从浏览器角度看，通过SPDY/HTTP2获取所有这些独立的资源与获取一个大JS文件的 延迟差不多。
在第二个页面请求时，由于你已经把应用程序切割成了轻量可缓存的文件，第二个页面也依赖的某些组件此时已经存在于浏览器缓存中了。
# 2.3 文档模式
最初有两种模式：混杂模式，标准模式。
第三种模式：准标准模式。
# 2.4 noscript元素
针对不支持JS的浏览器而出的元素。以下两种情况，浏览器将显示包含在noscript中的内容：
浏览器不支持脚本；
浏览器对脚本的支持被关闭；
```
 <noscript> 
 <p>This page requires a JavaScript-enabled browser.</p> 
 </noscript>
```
# 2.5 小结
JS通过script元素插入到HTML页面中。这个元素可以用于把JS代码嵌入到HTML页面汇总，跟其他标记混合在一起，也可以用与引入保存在外部文件中的JS。本章的重点如下：
1.要包含外部JS文件，必须将src属性设置为要包含文件的URL。文件可以跟网页在同一台服务器上，也可以位于完全不同的域。
2.所有script元素会依照它们在网页中出现的次序被解释。在不使用defer和async属性的情况下，包含在script元素中的代码必须严格按次序解释。
3.对不推迟执行的脚本，浏览器必须解释完位于script元素中的代码，然后才能继续渲染页面的剩余部分。为此，通常把script元素放到页面末尾，介于主内容之后及body标签之前。
4.可以使用defer推迟到文档渲染完毕后再执行。推迟的脚本原则上按照它们被列出的次序执行。
5.可以使用async属性表示脚本不需要等待其他脚本，同时也不阻塞文档渲染，即异步加载。异步脚本不能保证按照它们在页面中出现的次序执行。
6.通过使用noscript元素，可以指定在浏览器不支持脚本时显示的内容。如果浏览器支持并启用脚本，则noscript元素中的任何内容都不会被渲染。
# 3.1 语法
## 3.1.1 区别大小写
ECMA中一切都区分大小写。无论是变量、函数名还是操作符，都区分大小写。
typeof不能作为函数名，因为它是一个关键字。但Typeof可以用。
## 3.1.2 标识符
变量、函数、属性或函数参数的名称。可以由一个或多个下列字符组成：
第一个字符必须是一个字母、下划线（_）或美元符号（$）;
剩下的其他字符可以是字母、下划线、美元符号或数字。
一般使用驼峰大小写形式。
## 3.1.3 注释
## 3.1.4 严格模式
"use strict" //脚本开头加上这一行
也可以在指定函数内加上开头。所有现代浏览器都支持严格模式。
## 3.1.5 语句
结尾建议加分号，建议语句块加{}
## 3.2 关键字与保留字
ES6的关键字有：
break 	do 	in 	typeof 
case 	else 	instanceof 	var 
catch 	export 	new 	void 
class 	extends 	return 	while 
const 	finally 	super 	with 
continue   for 	switch 	yield 
debugger function    this 
default 	if 	throw 
delete 	import 	try
ES6将来保留词汇：
始终保留：
enum
严格模式下保留：
implements 	package 	public 
interface	 protected 	static 
let 	private
模块代码中保留：
await
这些词汇不能作标识符，但可以坐对象的属性名，推荐不用作属性名。
# 3.3 变量
ECMA变量是松散类型的，变量可以用于保存任何类型的数据。每个变量不过是一个用于保存任意值的命名占位符。有3个关键字可以声明变量：var,const,let
var:声明完后可以赋值，但未标识类型。//声明提升
//var message = "hi"; 
//message = 100; // 合法，但不推荐。
//作用域在声明的环境下的函数作用域，例在函数内定义，调用完函数随即被销毁。
//在函数内定义时省略var操作符，可以创建一个全局变量。不推荐这么做。
let:块作用域，同一个块内不能重复声明。变量在作用域中无声明提升。
//有暂时性死区。
//无法全局声明，声明的变量不会成为window对象的属性。
//ES6不能依赖条件声明模式
const:与let基本相同，区别是声明变量时必须同时初始化变量，且无法修改const声明的变量。
## 3.3.4 声明风格及最佳实践
1.不使用var
2.const优先，let次之
# 3.4 数据类型
ES6有6种简单的数据类型（原始类型）：undefined,null,boolean,number,String,Symbol。Symbol是ES6新增的。还有一种复杂的数据类型叫Object（对象）。Object是一种无序名值对的集合。
## 3.4.1 typeof操作符
不需要参数（但可以使用参数），严格来说，函数也是对象，并不代表一种数据类型。可是函数也有自己特殊的属性。可以用typeof区分。
## 3.4.2 Undefined类型
变量未初始化即是Undefined，相当于给变量赋值了Undefined。
建议在声明时初始化，出现undefined可以更好辨别。
## 3.4.4 Null类型
Null类型同样只有一个值，即特殊值null。null值表示一个空对象指针，typeof null返回Object。
在定义将来要保存对象值的变量时，建议初始化为null。
## 3.4.4 Boolean类型
有两个字面值：true，false。
True和False是有效的标识符，不是布尔值。//区分大小写
使用Boolean()来转换类型
## 3.4.5 Number类型
1.浮点值
//小数点后面必须带数字，不然当整数处理。
2.值的范围
//Number.MIN_VALUE:5e-324
Number.MAX_VALUE:1.7976931348623157e+308
超出以上范围会表示为Infinity或-Infinity,该值无法用于计算。
可使用isFinite()函数进行判断
3.NaN
NaN表示"不是数值",用于表示本来要返回数值的操作失败了（不是抛出错误）。
例：0除任意数值
console.log(0/0) // NaN
console.log(5/0) //Infinity
console.log(5/-0)//-Infinity
任何涉及NaN的操作始终返回NaN，NaN不等于任何值。//(NaN == NaN)-->false
可用isNaN()函数判断是否不是数值
isNaN(NaN)//true
isNaN(10)//false
isNaN("10")//false,可转换为数值10
isNaN("blue")//true,无法转换为数值
isNaN(true)//false,可以转换为1
4.数值转换
有3个函数可以将非数值转换为数值：
Number(),parseInt(),parseFloat()
Number()是转型函数，可用于任何数据类型。后两个主要用于将字符串转为数值。
Number()有如下规则：
(true)->1,(false)->0,(null)->0,(undefined)->NaN,数值直接返回
如果字符串包含数值字符，包括数值字符前面带加号、减号的情况，则转换为一个十进制数值。
如果字符串包含有效的浮点值格式如“1.1”，则会转换为相应的浮点值（同样，忽略前面的0）。
如果字符串包含有效的十六进制格式如"0xf"，则会转换为与该十六进制值对应的十进制整数值。
如果是空字符串（不包含字符），则返回0。
如果字符串包含上述情况之外的其他字符，则返回NaN。
通常使用parseInt（）
## 3.4.6 String类型
字符串使用：双引号，单引号，反引号都合法，引号类型前后必须一致。
1.字面量：
\n  换行
\t   制表
\b  退格
\r   回车
\f   换页等
2.特点
不可变，一旦创建，值不能变。要修改某个变量的字符串值，必须先销毁原始的字符串，然后将包含新值的另一个字符串保存到该变量。
3.转换为字符串
toString()//函数
还可以传入参数输出不同进制
let num = 10;
num.toString() // "10"
num.toString(2) // "1010"
num.toString(8) // "12"
4.模板字面量
可以使用换行字符，可以跨行定义字符串。
使用反引号会保持引号内部的空格，字面量，length会增加。
5.字符串插值
可以在定义中插入一个或多个值。
通过反引号中使用 ${}插入，插入的值都会通过toString转换为字符串
插值表达式中可以调用函数和方法：
foo = {toString:() => 'Wrold'};`hello,${foo}` // hello world
capitalize(word) =>return `${word[0].toUpperCase()}`   // `${capitalize('hello')}`//->Hello
6.模板字面量标签函数
支持定义标签函数，通过标签函数可以自定义插值行为。
7.原始字符串
Unicode字符
使用String.raw获取原始字符串
'\u00A9' // 版权符号
String.raw`\u00A9`// \u00A9
## 3.4.7 Symbol类型
Symbol是ES6新增的，且实例是唯一，不可变的。用于创建唯一记号，进而用作非字符串形式的对象属性。
1.基本用法
let sym = Symbol(); type of sym//symbol
也可以传入字符串参数作为对symbol的描述，可通过这个字符串来调试代码。但这个字符串参数与符号定义或标识无关。
符号无法与new关键字一起作为构造函数使用。
可以使用符号包装对象，借用Object函数()函数：
let mySymbol = Symbol();
let myWrappedSymbol = Object (mySymbol);
console.log(typeof myWrappedSymbol); // "object"
2.使用全局符号注册表
如果运行时的不同部分需要共享和 重用符号实例，那么可以用一个字符串作为键，在全局符号注册表中创建并重用符号。
需要使用Symbol.for()方法。
## 3.4.8 Object类型
对象其实就是一组数据和功能的集合。可以通过new来创建实例对象。
每个对象都有如下属性和方法：
constructor：用于创建当前对象的函数，构造函数。
hasOwnProperty(propertyName)：用于判断当前对象实例上是否存在给定的属性。
isPrototypeOf(object)：用于判断当前对象是否为另一个对象的原型。
propertyIsEnumerable(propertyName):用于判断给定的属性是否可以使用。
toLacaleString():返回对象的字符串表示,反映对象所在本地化执行环境。
toString():返回对象的字符串表示。
valueOf():返回对象对应的字符串、数值或布尔值表示。
# 3.5 操作符
## 3.5.1 一元操作符
只操作一个值的操作符叫一元操作符。
++,--;  //操作中会自行转换类型,(递增和递减)
+,-//一元加减符，可以用于运算和转换
## 3.5.2 位操作符
...
## 3.5.3 布尔操作符
逻辑非，逻辑与逻辑或
1.逻辑非 ：！（感叹号）
!false // true
!"blue" //false
!0 //true
!NaN //true
!"" //true
!12345 //false
也可以用两个感叹号:!!,相当于调用了转型函数Boolean()。第一个返回布尔值，第二个对该布尔值取反。
相当于如上例子，布尔值取反。
2.逻辑与
由&&表示 // true && true为true  其余都为false
3.逻辑或
由||表示 //有一个是true为true，false || false为false
## 3.5.4 乘性操作符
乘法(*)，除法(/)，取模(%)。
乘法(*):都为数值则计算，有一项为NaN则返回NaN，如果是Infinity*0=NaN,Infinity*(-/+)num=(-)Infinity，Infinity*Infinity=Infinity,如果不是数值会转换后再近些操作。
除法(/):
0 / 0 = NaN,Infinity / Infinity = NaN,-(number)/0 = (-)Infinity,Infinity / (-)Number = (-)Infinity
取模(%):类似除
## 3.5.5 指数操作符
ES7新增的操作符 (**)//Math.pow(3,2) == 3 ** 2 == 9
squared ** = 2 //9
## 3.5.6 加性操作符
（+），（-）
## 3.5.7 关系操作符
（<）,（>）,（<=），（>=）
## 3.5.8 相等操作符
（==），（!=），（===）,（!==）
## 3.5.9 条件操作符
（?）// let max = （num1 > num2）? num1 : num2
## 3.5.10 赋值操作符
（=），（*=），（/=），（%=），（+=）,（-=）,（<<=）,（>>=）,（>>>=）
# 3.6 语句
## 3.6.1 if语句
...
## 3.6.2 do-while语句
do {***} while(expression);
## 3.6.3 while语句
let i = 0;
while(i < 10) { i += 2};
## 3.6.4 for语句
for(initialization;expression;post-loop-expression) statement
## 3.6.5 for-in语句
for(property in expression) statement
for(const propName in window) {document.write(propName)}//例子
## 3.6.6 for-of语句
for(property of expression) statement
for(const el of [2,4,6,8]){document.write(el)}//例子
## 3.6.7 标签语句
label:statement
start: for(let i = 0;i < count;i++){console.log(i)}//start是一个标签，可在后面通过break，continue语句引用。
## 3.6.8 break和continue语句
break用于立即退出循环,强行执行循环后的下一条语句。
continue语句用于立即退出循环，但会从循环顶部开始执行。
## 3.6.9 with语句
with(expression) statement;
let qs = location.search.substring(1);
let hostName = location.hostname;
let url = location.href;
with(location){
let qs = search.substring(1);
let hostName = hostname;
let url = href;
}
严格模式不允许使用
## 3.6.10 switch语句
switch(expression){
  case value1:
    statament
    break;
  case value2:
    statement
    break;
  ...
  default:
    statement
}
//switch不会强制转换数据类型
## 3.7 函数
function Name(arg0,arg1){ statements}
遇到return语句函数就会立即停止执行并退出。
函数不能以eval，arguments作为名称；
函数的参数不能叫eval，arguments；
两个命名参数不能拥有同一个名称。
## 3.8 小结
ES中基本数据类型包括：undefined,Null,Boolean,Number,String,Symbol
不需要指定函数的返回值，因为任何函数可以在任何时候返回任何值。//声明方式
不指定返回值的函数实际上会返回特殊值undefined。
# 4 变量、作用域与内存
## 4.1 原始值与引用值
变量有两种不同的类型：原始值和引用值。原始值就是最简单的数据，引用值则是由多个值构成的对象。
原始值的变量是按值访问的，引用值是保存在内存中的对象，操作对象时，操作的是对该对象的引用而非实际的对象本身。
### 4.1.1 动态属性
引用值可以随时添加、修改和删除其属性和方法。
只有引用值可以动态添加后面可以使用的属性。
原始类型的初始化可以只使用原始字面量形式。如果使用new则创建Object类型的实例。
let name1 = "wxc";//typeof name1 == string
let name2 = new String("Matt");//typeof name2 == object
### 4.1.2 复制值
原始值的变量复制会创建新变量。//let name1 = "wxc";let name2 = name1;
引用值的变量复制的是一个指针，两个变量指向同一个对象，一改则都改。
### 4.1.3 传递参数
函数的参数都是按值传递的，传递时，值会被复制到一个局部变量。
按引用传递参数时，值在内存中的位置会被保存在一个局部变量，对本地变量的修改会反映到函数外部。ES中函数的参数就是局部变量。
### 4.1.4确定类型
typeof对于原始值有用，但对引用值不大。
引用值判断可以用instanceof
person instanceof Object
colors instanceof Array
pattern instanceof RegExp
instanceof对于原始值始终返回false，原始值不是对象。
## 4.2 执行上下文与作用域
每个上下文都有一个关联的变量对象，这个上下文中定义的所有变量和函数都存在于这个对象上。
浏览器中，全局上下文为window对象。var定义的全局变量和函数都会成为window对象的属性和方法。使用let和const的顶级声明不会定义在全局上下文中，但在作用域链解析上效果是一样的。
每个函数也有自己的上下文，执行函数时，函数上下文被推倒一个上下文栈上，执行完后弹出。ES的执行流通过该上下文栈进行控制。
上下文中的代码在执行时，会创建变量对象的一个作用域链。这个作用域链决定了各级上下文中的代码在访问变量和函数时的顺序。正在执行的上下文的变量对象始终位于作用域链的最前端，如果上下文是函数，其活动对象用作变量对象。活动对象最初只有一个定义变量：arguments。作用域链的下一个变量对象来自上级包含上下文。全局上下文的变量对象始终是作用域链的最后一个变量对象。
局部作用域中定义的变量可用于在局部上下文中替换全局变量。
### 4.2.1 作用域链增强
代码执行到try/catch语句的catch块与with语句时，都会在作用域链前端添加一个变量对象。对with语句来说，会向作用域链前端添加指定的对象；对catch则会创建一个新的变量对象，这个变量对象会包含要抛出的错误对象的声明。
### 4.2.2 变量声明
1.使用var声明变量，变量会被自动添加到最接近的上下文，最接近的上下文大多是函数的局部上下文，如果未声明就被初始化了，就被添加到全局上下文。如果在函数内声明变量添加到全局上下文，函数退出后依然可以访问。
var声明会被拿到函数或全局作用域的顶部，位于作用域中所有代码之前。变量提升。
2.使用let声明的块级作用域声明
块级作用域由最近的{}界定。
3.使用const的常量声明
const声明的同时必须初始化为某个值。声明后不能重新赋新值。
作用域与let声明一样。
建议多使用const，除非需要一个会重新赋值的变量。可以防止重新赋值的BUG。
4.标识符查找
特定上下文读取或写入而引用一个标识符时，必须通过搜索确定这个标识符表示什么。搜索开始于作用域链前端，以给定的名称搜索对应的标识符。//其实就是调用变量
## 4.3 垃圾回收
JS使用垃圾回收，程序每隔一段就会自动运行。确定不会再使用的变量，释放内存。
### 4.3.1 标记清理
常用策略是标记清理。程序运行时，标记内存中存储的所有变量，将所有上下文中的变量，以及被在上下文中的变量引用的标记去掉。再加上标记代表待删除，随后做一次内存清理，销毁带标记的所有值并回收内存。
IE，Firefox，Opera，Chrome，Safari都在JS实习标记清理，频率有所差异。
### 4.3.2 引用计数
对每个值记录引用次数。声明变量并赋一个引用值时，这个值的引用数为1。 如果保存对该值引用的变量被其他值给覆盖了，引用数-1。引用数为0时回收内存。
### 4.3.3 性能
垃圾回收的时间调度很重要，变量太多会造成性能损失。JS引擎的垃圾回收程序被调优为动态改变分配变量、字面量或数组槽位等会触发垃圾回收的阈值。如果回收的内存不到已分配的15%，这些阈值会翻倍。如果一次回收的内存达到已分配的85%，则阈值重置为默认值。
### 4.3.4 内存管理
保证在执行代码时只保存必要的数据。不在必要则设置为null，从而释放其引用。这也可以叫作解除引用。局部变量在超出作用域会自动解除引用，所以该建议更适合全局变量和全局对象。
1.通过const和let声明提升性能
块作用域，能更早让垃圾回收程序介入。
2.隐藏类和删除操作
对象与隐藏类会被关联起来，用于跟踪他们的属性特征。共享相同隐藏类的对象性能会更好。
function Article(){this.title = 'go go go'}
let a1 = new Article();//隐藏类title
let a2 = new Article();//隐藏类title
a1.author = 'Jake'//对应多出author隐藏类，可能对性能产生明显影响。
function Article(author){this.title='go',this.author=author}
let a2 = new Article('wxc')//a2与a1相同，共享一个隐藏类。
delete a1.author//使用delete关键字会导致生成同样的隐藏类片段
a1.author = null; //保持共享，并达到垃圾回收的效果
3.内存泄漏
JS的内存泄漏大部分是不合理的引用导致的。
function(){name = 'Jake'}意外声明全局变量是最常见也最容易修复的内存泄漏问题。无关键字声明。
定时器也会导致内存泄漏，定时器的回调通过闭包引用了外部变量。
使用闭包容易造成内存泄漏，如下：
let outer = function() {let name = 'Jake';return function() {return name};};
调用outer()会导致内存泄漏。只要返回的函数存在就不能清理name，因为闭包一直在引用，加入name的内容很大，就是个大问题。
4.静态分配与对象池
不要动态创建矢量对象
在初始化的时候，创建一个对象池，管理一组可回收的对象。使用完后回归对象池。
## 4.4 小结
原始值大小固定，因此保存在栈内存上。
引用值是对象，存储在堆内存上。
任何变量都存在于某个作用域（上下文）中，这个作用域决定了变量的声明周期，以及它们可以访问代码的哪些部分。
全局上下文：window，浏览器。
函数上下文：声明函数的{}内
块级上下文：最近的{}内
JS有垃圾回收，垃圾回收的方法有：引用计数，标记清理。主流为标记清理。
接触变量引用一般直接给变量赋值为null。
# 5.基本引用类型
引用值是某个特定引用类型的实例。
对象被认为是某个特定引用类型的实例。新对象通过使用new操作符跟一个构造函数来创建。
函数也是一种引用类型。
## 5.1 Date
日期对象//let now = new Date();
可用Date.parse()转换成日期对象//let someDate = new Date(Date.parse("May 23,2019"));如果字符串不表示日期，会返回NaN。
let allFives = new Date(Date.UTC(2005,4,5,17,55,55));//GMT时间——Date.UTC方法
ES提供了Date.now()方法，返回表示方法执行时日期。
let start = Date.now();//当前时间
### 5.1.1 继承的方法
let date = new Date(2021,1,20);
toLocaleString()//-->2021/2/20 上午12:00:00
toString()//-->Sat Feb 20 2021 00:00:00 GMT+0800
valueOf()//-->1613750400000
### 5.1.2 日期格式化方法
Date格式化日期的方法：
toDateString()//显示日期中的周几，月，日，年
toTimeString()//显示日期中的时分秒和时区
toLocaleDateString()//显示日期中的周几 月 日 年
toLocaleTimeString()//显示日期中的时 分 秒
toUTCString()//显示完整的UTC日期
### 5.1.3 日期/时间组件方法
主要应用：
getTime()//返回日期的毫秒表示，与valueOf相同
setTime(milliseconds)//设置日期的毫秒表示，从而修改整个日期
getFullYear()//返回四位年数
getMonth()//返回日期的月
getDate()//返回日期的日
getDay()//返回日期中表示周几的数值
getHours()//返回日期中的时
getMinutes()//返回日期中的分
getSeconds()//返回日期中的秒
## 5.2 RegExp
ES通过RegExp类型支持正则表达式。
let expression = /pattern/flags;
匹配模式的标记：
1.g:全局模式，表示查找字符串的全部内容，而不是找到第一个匹配的内容就结束。
2.i:不区分大小写，表示查找匹配时忽略pattern和字符串的大小写。
3.m:多行模式，表示查找到一行文本末尾时会继续查找。
4.y:粘附模式，表示只查找从lastIndex开始及之后的字符串。
5.u:Unicode模式，启用Unicode匹配。
6.s：dotAll模式，表示元字符匹配任何字符。(包括\n或\r)。
使用不同模式和标记可以创建出各种正则表达式，比如：
//匹配字符串中的所有"at"
let pattern1 = /at/g;
//匹配第一个"bat"或"cat" 忽略大小写
let pattern2 = /[bc]at/i
//匹配所有以"at"结尾的三字符组合，忽略大小写
let pattern3 = /.at/gi
元字符在模式中必须转义：
( ，[， {，\，^，$，|，)，]，}，？，*，+，- //这些符号前面需要\来转义
//匹配第一个"bat"或"cat"，忽略大小写
let pattern1 = /[bc]at/i;
//匹配第一个"[bc]at"，忽略大小写
let pattern2 = /\[bc\]at/i;
//匹配所有以"at"结尾的三字符组合，忽略大小写
let pattern3 = /.at/gi;
//匹配所有".at"，忽略大小写
let pattern4 = /\.at/gi;
也可使用RegExp构造函数来创建：
let pattern1 = /[bc]at/i   ==   new RegExp("[bc]at","i");
也可以使用实例，选择性修改标记
const re1 = /cat/g;
const re2 = new RegExp(re1);
const re3 = new RegExp(re1,"i");
### 5.2.1 RegExp实例属性
global:布尔值，表示是否设置了g标记。
ignoreCase:布尔值，表示是否设置了i标记。
unicode:布尔值，表示是否设置了u标记。
sticky:布尔值，表示是否设置了y标记。
lastIndex:整数，表示在源字符串中下一次搜索的开始位置，始终从0开始。
multiline:布尔值，表示是否设置了m标记。
dotAll:布尔值，表示是否设置了s标记。
source:正则表达式的字面量字符串，没有开头和结尾的斜杠。
flags:正则表达式的标记字符串。始终以字面量而非传入构造函数的字符串模式形式返回。
### 5.2.2 RegExp实例方法
exec()函数：
let text = 'cat, bat, sat, fat';
  let pattern = /.at/gi;
  let matchs = pattern.exec(text);
  console.log(matchs);//cat
//设置了全局标记(g)，每次调用返回一个匹配的信息，如果没有设置全局标记，只会返回第一个匹配的信息。
//设置了g标记，每次调用exec()都会在字符中向前搜索下一个匹配项
let text = 'cat, bat, sat, fat';
  let pattern = /.at/gi;
  let matchs = pattern.exec(text);//cat
  let matchs = pattern.exec(text);//bat
  let matchs = pattern.exec(text);//sat
  console.log(matchs);
//设置了y标记，每次调用会在lastIndex的位置上寻找匹配项。y标记覆盖g标记。
test()函数：//用于判断是否存在实际内容中，常在if判断语句中
let text = "000-00-00 00";
let pattern = /\d{3}-\d{2}-\d(4)/;
if(pattern.test(text)) {console.log("The pattern was matched.")};
继承的方法toLocaleString()和toString()都返回字面量表示。
let pattern = new RegExp("\\[bc\\]at","gt");
console.log(pattern.toString());//  /\[bc\]at/gi
console.log(pattern.toLocaleString());//  /\[bc\]at/gi
### 5.2.3 RegExp构造函数属性
input：$_   //最后搜索的字符串
lastMatch：$&   //最后匹配的文本
lastParen：$+   //最后匹配的捕获组
leftContext：$`   //input字符串中出现在lastMatch前面的文本
rightContext：$'   //input字符串中出现在lastMatch后面的文本
let text = "this has been a short summer";
let pattern = /(.)hort/g; //()-->捕获组
if(pattern.test(text)) {
   console.log(RegExp.input); //this has been a short summer
   console.log(RegExp.leftContext); //this has been a
   console.log(RegExp.rightContext); //summer
   console.log(RegExp.lastMatch); //short
   console.log(RegExp.input); //s
}

if(pattern.test(text)) {
   console.log(RegExp.$_); //this has been a short summer
   console.log(RegExp["$`"]); //this has been a
   console.log(RegExp["$'"]); //summer
   console.log(RegExp["$&"]); //short
   console.log(RegExp["$+"]); //s
}
let pattern = /(..)or(.)/g;

if(pattern.test(text)) {
   console.log(RegExp.$1); // sh
   console.log(RegExp.$2);// t
}
### 5.2.4 模式局限
ES对正则表达式的支持还缺少一些高级特性。
## 5.3 原始值包装类型
ES提供了3种特殊类型的引用类型：Boolean,Number,String。
以读模式访问字符串时，后台执行：
（1）创建一个String类型的实例；// let s1 = "some text"
（2）调用实例上的特点方法；// let s2 = s1.substring(2);
（3）销毁实例；// s1 = null;
let value = "25";
let number = Number(value);   //转型函数
console.log(typeof number);   //"number"
let obj = new Number(value); // 构造函数
console.log(typeof obj); //"object"
变量obj保存一个Number实例。
### 5.3.1 Boolean
let falseObject = new Boolean(false);// typeof == object
let result = falseObject && true;
console.log(result); //true  
let falseValue = false;//typeof == boolean 强烈建议永远不要使用
result = falseValue && true;
console.log(result); //false
### 5.3.2 Number
方法：toFix()//let num = 10;num.toFixed(2);// "10.00"
方法：toExponential()//let num = 10;num.toExponential(1);//"1.0e+1"
方法：toPrecision()//let num = 99;
num.toPrecision(1)//"1e+2"
num.toPrecision(2)//"99"
num.toPrecision(3)//"99.0"
方法：isInterger()//辨别一个数值是否保存为整数。
Number.isInterger(1);// true
Number.isInterger(1.00)//true
Number.isInterger(1.01)//false
方法：isSafeInterger()判断数值范围
### 5.3.3 String
每个字符用16位表示，基于16位码元完成操作。//基本多语言平面。
normalize()方法：用于判断规范性。
concat()：拼接//用加法运算符也可
Value = "hello world";
slice()：
Value.slice(3)//"lo world";
Value.slice(3,7)//"lo w";
Value.slice(-3)//"rld" 等同于slice(8);(11-3)
Value.slice(3,-4)//"lo w" 等同于slice(3,7);(3+4)
substr()：
Value.substr(3)//"lo world";
Value.substr(3,7)//"lo worl";
Value.substr(-3)//"rld" 等同于substr(8);
Value.substr(3,-4)//""等同于substr(3,0);
substring()：
Value.substring(3)//"lo world";
Value.substring(3,7)//"lo w";
Value.substring(-3)//"hello world" 等同于substring(0)
Value.substring(3,-4)//"hel"等同于substring(0,3)
indexOf():
Value.indexOf("o");// 4
Value.indexOf("t")// -1
Value.indexOf("o",6)//7
lastIndexOf():
Value.lastIndexOf("o")//7
Value.lastIndexOf("t")//-1
Value.lastIndexOf("o",6)//4
message = "foobarbaz";
startWith():
message.startWith("foo");//true
message.startWith("bar");//false
endWith():
message.endWith("baz");//true
message.endWith("bar");//false
includes():
message.includes("bar");//true
message.includes("qux");//false
trim()://不影响原字符串，trimLeft(),trimRight()
let string = "   hello  world   ";
string.trim()//"hello  world"
repeat():
string = "abc";
string.repeat(2)//"abcabc";
padStart(),padEnd():
string = "foo"
string.padStart(6)//"   foo";len=6
string.padStart(9,".")//"......foo";len=9
string.padStart(8,"bar")//"barbafoo"len=8
string.padEnd(6)//"foo   ";
string.padEnd(9,".")//"foo......";
string.padEnd(8,"bar")//"foobarba";
迭代与解构
let message = "abc";
Iterator = message[Symbol.iterator]();
Iterator.next()//{value:"a",done:false}
Iterator.next()//{value:"b",done:false}
Iterator.next()//{value:"c",done:false}
Iterator.next()//{value:"undefined",done:true}
大小写转换
toLowerCase()//小写
toLocalLowerCase()//特定地区方法使用
toUpperCase()//大写
toLocalUpperCase()//特定地区方法使用
字符串模式匹配方法
match():与exec()方法一致
search():
let text = "cat, bat, sat, fat";
let pos = text.search(/at/);//1第一个位置为1
replace():
let res = text.replace("at","ond");//"cond, bat, sat, fat"
let res = text.replace(/at/g,"ond")//"cond, bond, sond, fond"
localeCompare():按字母表顺序比较返回值
## 5.4 单例内置对象
包括Global,Math
### 5.4.1 Global
全局作用域中定义的变量和函数都会成为Global对象的属性。
encodeURI(),encodeURIComponent()//编码统一资源标识符。
eval():
eval("console.log('hi')");///console.log("hi");
eval("function sayHi(){console.log('hi');}");///sayHi();
容易被XSS攻击。
对象属性：
undefined//特殊值
NaN//特殊值
Infinity//特殊值
Object//构造函数
Array//构造函数
Function//构造函数
....
window对象
window为Global对象的代理,全局变量和函数即为window的属性。
### 5.4.2 Math
Math对象属性：
E //自然对数的基数e的值
LN10 //10为底的自然对数
LN2 //2为底的自然对数
LOG2E //以2为底e的对数
LOG10E //以10为底e的对数
PI //π的值
SQRT1_2 //1/2的平方根
SQRT2 //2的平方根
Math方法：
min():取最小值//配合数组可以使用扩展操作符
max():取最大值//max = Math.max(...array);
ceil():向上取
Math.ceil(25.9);//26
Math.ceil(25.5);//26
Math.ceil(25.1);//26
round():四舍五入
console.log(Math.round(25.9)); // 26 
console.log(Math.round(25.5)); // 26 
console.log(Math.round(25.1)); // 25
fround():取单精度浮点值
console.log(Math.fround(0.4)); // 0.4000000059604645 
console.log(Math.fround(0.5)); // 0.5 
console.log(Math.fround(25.9)); // 25.899999618530273
floor():向下取
console.log(Math.floor(25.9)); // 25 
console.log(Math.floor(25.5)); // 25 
console.log(Math.floor(25.1)); // 25
random()://返回小数0~1内
加密提高不确定性：建议使用window.crypto.getRandomValues()。
abs()//绝对值
exp()//次幂
log()//自然对数
....
## 5.5 小结
对象为引用值，内置的引用类型可用于创建特定类型的对象。
RegExp是ES支持正则表达式的接口。
函数实际上是Function类型的实例，是对象。
# 6 集合引用类型
## 6.1 Object
let person = new Object();//构造函数
person.name = 'micheal';
let person = {name:'micheal'};//{}字面量表达式
person["name"]//micheal
person.name//micheal
## 6.2 Array
### 6.2.1 创建数组
let colors = new Array();//可以传值创建初始length的数组，也可以传数组值
let colors = ["red","blue"]//字面量表达式
from():
Array.from("Matt")//["M","a","t","t"]
适用于Map,Set,Array,iterator,arguments
of()://使用Array.prototype.slice.call(arguments)
Array.of(1,2,3,4)//[1,2,3,4]
Array.of(undefined)//[undefined]
### 6.2.2 数组空位
使用(,)创建数组空位
const options = [,,,,,]
options.length = 5
options //[,,,,,]
空值为undefined
options = [1,,,5];
options.map(()=>6)//[6,,,6]
options.join('-')//"1-----5"
### 6.2.3 数组索引
colors[0]-->第一个元素
给数组设置length会改变数组大小
### 6.2.4 检测数组
判断是否数组，使用instanceof
也可使用isArray()方法
### 6.2.5 迭代器方法
const a = ["a","b","c","d"];
keys()://返回数组索引的迭代器
const akeys = Array.from(a.keys()); // [0,1,2,3]
values()://返回数组元素的迭代器
const aValues = Array.from(a.Values());//["a","b","c","d"]
entries()://返回索引/值对的迭代器
const aEntries = Array.from(a.entries());//[[0,"a"],[1,"b"],[2,"c"],[3,"d"]]
for(const [idx,element] of a.entries()){
alert(idx);
alert(element);
}
//0
//a
//1
//b
//2
//c
//3
//d
### 6.2.6 复制和填充方法
copyWithin()//批量复制
fill()://填充
const a = [0,0,0,0,0];
zeros.fill(5)//[5,5,5,5,5];
zeros.fill(6,3)//[0,0,0,6,6]
zeros.fill(7,1,3)//[0,7,7,0,0]
索引过低，过高，反向都会被忽略
部门可用的索引，填充可用部分。
ints = [0,1,2,3,4,5,6,7,8,9];
ints.copyWithin(5) // [0,1,2,3,4,0,1,2,3,4];
ints.copyWithin(0,5)//[5,6,7,8,9,5,6,7,8,9];
ints.copyWithin(4,0,3)//[0,1,2,3,0,1,2,7,8,9];
ints.copyWithin(2,0,6)//[0,1,0,1,2,3,4,5,8,9];
### 6.2.7 转换方法
数组调用toString(),valueOf()方法相当于每个元素调用一次这个方法。
### 6.2.8 栈方法
push()//从最后推入数据
pop()//弹出最后一项并返回
### 6.2.9 队列方法
shift()://删除数组第一项并返回
push()://从最后推入数据
unshift()://从开头推入
### 6.2.10 排序方法
reverse()://反向排序
sort()://将元素转换成字符串比较
### 6.1.11 操作方法
concat():添加//直接使用会打平数组
slice():取值
splice()://可实现删除(两个参数)，插入(三个参数)，替换(三个参数)
### 6.2.12 搜索和位置方法
indexOf()//查找元素位置，返回
lastIndexOf()//查找元素位置，返回
includes()//返回布尔值，是否包含元素
find()//返回第一个匹配的元素
findIndex()//返回索引
### 6.2.13 迭代方法
every():元素都匹配才会返回true
filter():返回true的元素组成数组返回
forEach():运行函数，无返回值
map():调用结果构成数组返回
some():如果有一项返回true，则返回true
### 6.2.14 归并方法
reduce():从头遍历,构建一个返回值
reduceRight():从尾遍历,构建一个返回值
## 6.3 定型数组
### 6.3.1 历史
WebGL用到，3D技术。
定型数组
### 6.3.2 ArrayBuffer
构造函数，用于内存中分配特定数量的字节空间。
### 6.3.3 DataView
### 6.3.4 定型数组
## 6.4 Map
一种实现键值存储机制的集合类型。
### 6.4.1 基本API
const m2 = new Map([["key1","val1"]["key2","val2"]["key3","val3"]])
m1.size = 3
可使用has(),get()进行查询，delete(),clear()删除值。
### 6.4.2 顺序与迭代
提供迭代器(Iterator),通过entries()获取
可以通过遍历获取。
### 6.4.3 选择Object还是Map
1.内存占用
Map占用更小
2.插入性能
Map插入性能更好
3.查找速度
Object优于Map
4.删除性能
Map更快，涉及大量删除 Map最佳。
## 6.5 WeakMap
类似于Map，只能用对象作为键。
API与Map相同。
键不存在时，值会被垃圾回收。
无法迭代。
## 6.6 Set
### 6.6.1 基本API
与Map相似，size长度，has()查询，delete()和clear()删除元素。
add()添加元素。
### 6.6.2 顺序与迭代
可通过values()与keys()获取迭代器
可以使用遍历方法迭代。
## 6.7 WeakSet
与WeakMap类型
## 6.8 迭代与扩展操作
支持for-of循环
支持浅拷贝
let arr1 = [...arr2];
## 6.9 小结
JS的对象是引用值，可以通过几种内置引用类型创建特定类型的对象。
Object类型是一个基础类型，所有引用类型都继承了它的基本行为。
Array是一组有序的值，并提供了操作和转换值的能力。
定型数组包含一套不同的引用类型。
Date，日期类型。RegExp，正则表达式的接口。
ES6新增Map，WeakMap,Set,WeakSet。
# 7 迭代器与生成器
迭代即“重复”，“再来”。
## 7.1 理解迭代
JS中，计数循环就是一种最简单的迭代：for（）
可以指定顺序，次数，在一个有序集合上进行。
需知道如何使用数据结构，遍历顺序不是数据结构固有的。
## 7.2 迭代器模式
任何实现Iterable接口的数据结构都可以被实现Iterator接口的结构消费。
迭代器是按需创建的一次性对象。每个迭代器都会关联一个可迭代对象。
### 7.2.1 可迭代协议
实现了Iterable接口的内置类型：
1.字符串
2.数组
3.映射
4.集合
5.arguments对象
6.NodeList等DOM集合类型
接受可迭代对象的语言特性包括：
let arr = ["foo","bar","baz"];
1.for-of //for(let el of arr){el};
2.数组解构 //let [a,b,c] = arr;
3.扩展操作符 // let arr2 = [...arr];
4.Array.from() //let arr3 = Array.from(arr); 
5.创建集合 //let set = new Set(arr);
6.创建映射 //let pairs = arr.map((x,i)=>[x,i]);
7.promise.all()
8.promise.race()
9.yield*操作符
### 7.2.2 迭代器协议
let arr = ["a","b"];
console.log(arr[Symbol.iterator]); //f values(){[native code]};
let iter = arr[Symbol.iterator]();
console.log(iter);// ArrayIterator()
iter.next();//{done:false,value:"a"};
### 7.2.3 自定义迭代器
自定义迭代方法
### 7.2.4 提前终止迭代器
return {done:true};
或break
## 7.3 生成器
### 7.3.1 生成器基础
### 7.3.2 通过yield中断执行
### 7.3.3 生成器作为默认迭代器
### 7.3.4 提前终止生成器
## 7.4 小结
由任意对象实现的接口，支持连续获取对象产出的每一个值。使用symbol.iterator获取，并且通过一些方法调用，例next(),for-of。
# 8 对象、类与面向对象编程
无特定顺序的值。每个属性或方法都用名称标识。
## 8.1 理解对象
### 8.1.1 属性的类型
数据属性：
[[Configurable]]:表示属性是否可以通过delete删除并重定义，是否可修改特性，是否可以把它改为访问器属性。
[[Enumerable]]:表示属性是否可以通过for-in循环返回。
[[Writable]]:表示属性的值是否可以被修改。
[[Value]]:表示属性的值。
访问器属性：
[[Configurable]]:表示属性是否可以通过delete删除并重定义，是否可修改特性，是否可以把它改为访问器属性。
[[Enumerable]]:表示属性是否可以通过for-in循环返回。
[[Get]]:获取函数，读取属性调用。
[[Set]]:设置函数，写入属性时调用。
### 8.1.2 定义多个属性
let book = {};
Object.defineProperties(book,{year:{value:2017},edition:{value:1},year:{get(){return this.year;}}});
### 8.1.3 读取属性的特性
Object.getOwnPropertyDescriptor(object,'name');
descriptor = Object.getOwnPropertyDescriptor(book,"year");
Object.getOwnPropertyDescriptors(object);//获取所有
### 8.1.4 合并对象
Object.assgin();//浅拷贝,会覆盖重复的属性
result = Object.assign(object1,object2);
object === result
result = Object.assign(object1,object2,object3);
### 8.1.5 对象标识及相等判定
Object.is()//需要两个参数
Object.is(+0,-0)//false
### 8.1.6 增强的对象语法
let person = {name:name};  === let person = {name};//不建议
namekey = "name";let person = {[namekey]:'Matt'};//[]内可以使用表达式，属性可计算
let person = {[nameKey](name){console.log('name')}};//方法名兼容计算属性
### 8.1.7 对象解构
let person = {name:'matt',age:27}//不解构
let personName = person.name,personAge = person.age;//解构
let {name:personName,age:personAge} = person;
null和undefined不支持解构

let person = {job:{title:'Software engineer'}};//嵌套解构
let personCopy={};
let({job:personCopy.job}=person);

前面的解构出错，后面的解构会失败。

let person = {name:'matt',age:27}; function printPerson(foo,{name,age},bar)//参数解构，调用时传入对象
## 8.2 创建对象
### 8.2.1 概述
与类不同，对象的巧妙运行可以实现与类相同的行为。
### 8.2.2 工厂模式
设计模式之一
function createPerson(name,age,job){
   let o = new Object();
   o.name = name;
   o.age = age;
   o.job = job;
   o.sayName = function(){
       console.log(this.name);
   };
   return o;
}
解决创建多个类似对象的问题，但无解决对象标识问题（对象类型）。
### 8.2.3 构造函数模式
function Person(name,age,job){
   this.name = name;
   this.age = age;
   this.job = job;
   this.sayName = function(){
      console.log(this.name);
   }
}
与工厂模式类似,无return，无显式创建对象。
构造函数不一定写成函数声明的形式。赋值给变量的函数表达式也可。
let person = function(){};
let person1 = new person(...);
let person2 = new person(...);
person1 instanceof Object//true
person1 instanceof person//true
person2一样
构造函数也可以直接调用
person(...);window.sayName();//添加到了window
let o = new Object();
Person.call(o,"wxc",25);o.sayName()//wxc 在另一个对象的作用域中调用
在构造函数内定义的函数实例化后相同名称确不相等，是两个不同的函数。
可以在外部定义函数，在内部赋值解决这个问题。
### 8.2.4 原型模式
prototype,这个属性为一个对象。包含由特定引用类型的实例共享的属性和方法。实际上是构造函数创建的原型。
在原型上定义的值可以共享。
Chrome暴露了_proto_属性，可通过这个属性访问对象的原型。prototype属性为对象。
原型链会终止与Object的原型链。
person.prototype._proto_._proto_ === null//true
构造函数、原型对象和实例，三个完全不同的对象。
实例通过_proto_链接到原型对象，实际指向[[Prototype]]
构造函数通过prototype属性链接到原型对象。
同一个构造函数创建的两个实例，共享一个原型对象。
isPrototypeOf()//用于判断实例原型对象与构造函数的原型相同否
getPrototypeOf()//用于获取[[prototype]]原型对象
setPrototypeOf()//用于给[[prototype]]对象写入新值,该方法调用可能会严重导致性能下降。
create()//用于创建新对象指定原型
访问对象属性时，如果未在对象实例本身找到则会沿着指针进入原型对象，在原型对象上查找。无法通过实例重写这些值，如果创建于原型对象中同名的属性，会在实例上创建这个属性，遮蔽原型对象上的属性，只有delete后才能继续搜索原型对象的该属性。
hasOwnProperty()//用于判断属性在实例或原型上
可以通过for-in判断通过对象能否访问到一个属性//"name" in person(true)
getOwnPropertyNames()//...按顺序进行枚举
### 8.2.5 对象迭代
Object.values()//以数组的形式输出值
Object.entries()//以数组的形式输出键值和值
非字符串的属性会被转换为字符串输出，符号属性会被忽略。
重写了prototype的函数原型不默认指向constructor
ES语法需要使用defineProperty()来恢复constructor属性。
实例只有指向原型的指针，没有指向构造函数的指针。
## 8.3 继承
ES中只支持实现继承。
### 8.3.1 原型链
通过原型继承多个引用类型的属性和方法。原型链为ES主要继承方式。
将A函数原型赋值为B函数的实例，A函数的实例可以通过原型访问到B函数实例的属性和方法。实际A函数可以通过原型与B函数的原型挂钩。在搜索属性时，会通过原型链访问到原型的原型，直到末端。
所有引用类型都继承自Object，任何函数的默认原型都是一个Object的实例，也是为什么自定义类型能够继承toString(),valueOf()方法的原因。调用toString()时，实际在调用Object.prototype上的方法。
通过instanceof返回原型与构造函数的原型关系。
通过isPrototypeOf返回原型链中是否含有这个原型。
添加属性或覆盖属性时需要在原型赋值后添加到原型上。
通过prototype字面量直接修改原型，会破坏之前的原型链。
原型链的问题：
1.使用原型实现继承后，函数原型对象的所有属性都会被函数实例共享。
2.子类型在实例化时不能给父类型的构造函数传参。
### 8.3.2 盗用构造函数
通过call，apply来调用执行函数的构造函数，从而得到构造函数的属性和方法。
可以通过apply,call来向父类构造函数传值。
缺点：必须在构造函数中定义方法，函数无法重用。且子类无法访问父类原型的方法。（原型不是父类的实例对象）
### 8.3.3 组合继承
综合原型链和盗用构造函数，集中了优点。
利用call实现传值改变继承的值，并且属性不共用。
### 8.3.4 原型式继承
实例一个对象作原型，使用Object.create()。
### 8.3.5 寄生式继承
创建一个对象，给对象添加属性和值，返回这个对象。
### 8.3.6 寄生式组合继承
会调用两次构造函数。
## 8.4 类
### 8.4.1 类定义
class Person{} // 类声明
class Animal = class {} // 类表达式
类定义无法声明提升，类受块作用域限制。
class Foo{ 
constructor(){} //构造函数
get myBaz(){} //有获取函数
static myQue(){} // 有静态方法
}
外部无法访问类名(标识符)
### 8.4.2 类构造函数
new实例化步骤：
1.在内存中创建一个新对象
2.这个对象内部的[[Prototype]]指针被赋值为构造函数的prototype属性
3.构造函数内部的this被赋值为这个新对象
4.执行构造函数内部的代码
5.如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象
调用类构造函数一定需要带new，可以类当成特殊函数。
类有prototype属性，typeof判断为function，原型也有一个constructor指向自身，也可以用instanceof检查是否存在于实例的原型链中。
但是类构造函数无法当做普通构造函数来使用。
### 8.4.3 实例-原型和类成员
每个实例都对应唯一的成员对象，所有成员都不会在原型上共享。
类块中定义的方法作为原型方法，可以再实例间共享方法。
类也支持访问器，可以访问和获取类的属性。
静态类方法非常适合作为实例工厂。
类里支持定义迭代器和生成器方法。
### 8.4.4 继承
ES6中类支持单继承，使用extends继承构造函数(在原型链中)和原型。
子类可以通过super访问原型，super只能在子类中使用。仅限于构造函数，实例方法和静态方法内部。
类构造函数和静态方法添加了内部特性[[HomeObject]]，为一个指针，指向定义该方法的原型。
在类构造函数中，不能在调用super之前引用this。
在子类中定义了构造函数，则必须调用super或返回一个对象。
有一种类为抽象基类，可以被继承，但自身无法实例化。
P262
# 9. 代理与反射
## 9.1 代理基础
### 9.1.1 创建空代理
使用Proxy构造函数创建代理。该函数接收两个参数：目标对象和处理程序对象。
代理对象与目标对象访问相同属性，赋值，但无原型。
可用===来区别代理和目标。
### 9.1.2 定义捕获器
使用代理的主要目的是可以定义捕获器。捕获器类似异步交互，在通过代理对象执行操作时，会触发捕获器(函数)的程序，捕获器会拦截方法。
### 9.1.3 捕获器参数和反射API
每个捕获器都有三个参数分别为目标对象，查询属性，代理对象。
可以捕获的方法都有对应的反射API(Reflect)，可以通过Reflect反射到目标对象上，通过该API访问目标对象的属性或函数。
### 9.1.4 捕获器不变式
### 9.1.5 可撤销代理
### 9.1.6 使用反射API
### 9.1.7 代理另一个代理
### 9.1.8 代理的问题与不足
## 9.2 代理捕获器与反射方法
## 9.3 代理模式
## 9.4 小结
# 10. 函数
把函数名想象成指针，指向函数对象的指针。
## 10.1 箭头函数
没有参数或多个参数需要括号，一个参数可以不用括号。
无大括号，函数只能有一行代码，并且会隐式返回这行代码的值。
箭头函数不能使用argument、super、new.target，也不能作构造函数，且没有原型。
## 10.2 函数名
由于函数名是指针，所以一个函数可能有多个名称。
函数没有名称的话，他的名称为空字符串。
如果是获取函数，设置函数，或使用bind()实例化，那么名称前会加前缀。
## 10.3 理解参数
参数内部表现为一个数组，可以再函数内部访问arguments对象，获取参数值。
arguments是一个类数组对象，但不是Array的实例。
arguments可以跟命名参数一起用，如果改了有传值的参数对应的arguments，也会更改对应的命名参数。
箭头函数可以包装在普通函数中，提供arguments。
## 10.4 没有重载
同名函数，后面会覆盖前面的。
## 10.5 默认参数值
```
func name(name = 'Henry',numerals= name){return `${name}`};
```
//如上写不传第一个参数会报错
## 10.6 参数扩展与收集
扩展运算符可以用于参数内，且扩展的参数数组不能放第一位。
使用扩展运算符不影响arguments对象。
## 10.7 函数声明与函数表达式
函数声明会有函数提升，函数表达式不会提升。
## 10.8 把函数作为值
可以用做参数传入回调。
callSomeFunction(func,arguments)//默认调用func，arguments为调用的参数
## 10.9 函数内部
arguments有一个callee属性，指向arguments对象所在函数的指针。
```
function factorial(num){
if(num <= 1){
    return 1
 } else {
    return num*arguments.callee(num-1) //函数阶乘
 }
}
```
在标准函数中，this为调用该函数的上下文对象。
在箭头函数中，this为定义箭头函数的上下文。
caller为调用当前函数的函数。
new.target在当函数被当做构造函数调用时，它指向被调用的构造函数。
## 10.10 函数属性与方法
length为函数命名参数的个数，prototype为原型。
toString，valueOf，apply，call都在prototype里。
## 10.11 函数表达式
函数声明可以提升，表达式可以用于判断声明。
## 10.12 递归
一个函数通过名称调用自己
## 10.13 尾调用优化
func1(){return func2};嵌套函数下的栈优化。
在递归下优化较为明显。
## 10.14 闭包
引用了另一个函数作用域中变量的函数为闭包。通常在嵌套函数中。
闭包引用的活动对象会保存在内存中，知道函数销毁后才会被销毁。
引用闭包要注意内存泄漏。
内部函数无法直接访问this和arguments，可以将this赋值给that，保存到闭包中，用that访问。
每次函数的调用都会自动创建两个特殊变量，this和arguments。
## 10.15 立即调用的函数表达式
IIFE，立即调用的函数表达式，表达式内部相当于一个块级作用域。
可以用来锁定参数值。
## 10.16 私有变量
定义在函数或块中的变量，都可以认为是私有的。
通过闭包可以访问函数中的私有变量。称为特权方法(共有方法)。
特权方法可以再构造函数中实现(该方法为闭包)。或者在方法中定义函数，访问私有变量，形成闭包。使用构造函数模式的缺点是每个实例都会重新创建一遍新方法。
模块模式：单例对象需初始化，并且需要访问私有变量。
或者将能访问内部私有对象和方法赋值给一个对象，然后返回这个对象。
## 10.17 小结
* 立即调用的函数表达式如果不在包含作用域中将返回值赋给一个变量，其包含的所有变量都会被销毁。
* 可以通过闭包访问位于包含作用域中定义的变量
* 闭包作用域链中包含自己的一个变量对象，然后是包含函数的变量对象，直到全局上下文的变量对象
# 11. 期约与异步函数
## 11.1 异步编程
### 11.1.1 同步与异步
同步对应内存中顺序执行的处理器指令。
异步类似系统中断，当前进程外部的实体可以触发代码执行。在进程等待长时间操作的时候进行其他程序的执行。
### 11.1.2 以往的异步编程
回调嵌套
给异步操作提供回调函数(包括失败回调和成功回调)
嵌套异步回调，反值依赖另一个异步返回值，情况复杂。
## 11.2 期约
### 11.2.1 Promises/A+规范
ES6版本的Promise规范
### 11.2.2 期约基础
用new初始化，创建时传入执行器函数作为参数。
期约有三种状态：
* 待定(pending)
* 兑现(fulfilled,resolved)
* 拒绝(rejected)
待定为最初状态，变成兑现和拒绝后都不可逆。期约的状态是私有的，无法通过JS检测到。
只要状态从待定切换，总会有一个私有的内部值。兑现则为值，拒绝则为理由。默认为undefined，达到落定状态都会收到该值。
期约通过resolve()和reject()转换状态，reject()会抛出错误。
避免期约卡在待定状态，可以添加一个定时退出功能。如setTimeout设置回调。
Promise.resolve()可以实例化一个解决的期约。也可以把任何值都转换为一个期约。只转换传入的第一个参数，其他会被忽略。且这个函数会保留传入的期约的状态。
Promise.reject()可以实例化一个拒绝的期约并抛出一个异步错误(这个错误无法用try/catch获取，只能通过拒绝处理程序捕获)。reject与resolve不同，如果给他传一个期约对象，这个期约会成为它拒绝的理由。
与期约交互只能使用异步结构(期约的方法)。
### 11.2.3 期约的实例方法
ES的异步结构中，任何对象都有一个then()方法，实现了Thenable接口。
* Promise.prototype.then()，
最多接收两个参数，onResolved，onRejected两个处理程序，并且传给then的非函数类型的参数会被忽略。
Promise.prototype.then返回一个新的期约实例，所以传入时onResolve/Reject时如果不需要，得传null，避免创建多余的对象。
onResolve：如果没有显示的返回语句，then会默认返回undefined。如果有显示的返回值，则Promise.resolve会包装这个值。抛出异常会返回拒绝的期约。
onReject：也会用Promise.resolve包装，与onResolve一样。
* Promise.prototype.catch()
用于给期约添加拒绝处理程序，只接收一个参数：onRejected处理程序。相当于调用Promise.prototype.then(null,onRejected)
* Promise.prototype/finally()
用于给期约添加onFinally处理程序，这个处理程序在状态改变时都会执行，可以避免onResolve/Reject出现冗余代码。但没办法知道状态，主要用于添加清理代码。这个方法返回一个新的实例期约，但这个期约为父期约的传递(父期约的状态与值)，如果传入一个期约，保留传入的期约。
Promise.then()会在同步代码后执行。为非重入方法，都是异步执行。
处理程序的执行顺序按添加他们的顺序。
拒绝与错误处理都会返回一个错误对象。且有一个副作用，异步抛出错误，并不会阻塞同步程序。错误只能通过onRejected获取。
### 11.2.4 期约连锁与期约合成
连串处理程序为期约连锁。
可以定义一个函数返回期约然后在then中调用。可以将异步串行化。
Promise.all()和Promise.race()可以将期约实例组合成一个期约的静态方法。
* Promise.all()
该方法会在一组期约全部解决之后再解决。这个静态方法接收一个可迭代对象，返回一个新期约。必须要传参，如果有一个拒绝，则合成的期约拒绝。如果有一个期约待定，那么合成的期约也会待定。一次拒绝会直接导致最终期约拒绝。拒绝理由为第一次拒绝的期约的理由。但其他拒绝也会处理。
* Promise.race()
该方法返回一个包装期约，是一组集合中最先解决或拒绝的期约的镜像。接收一个可迭代对象，也返回一个新期约。其余与all()相同。
### 11.2.5 期约扩展
可以运用一个类添加方法取消期约。
扩展Promise类，添加notify()方法提醒进度。
## 11.3 异步函数
async/await(ES8)
## 11.3.1 异步函数
* async
async用于声明异步函数，可以用在函数声明、函数表达式、箭头函数和方法上。如果异步函数使用return返回了值，则会被Promise.resolve()包装成一个期约对象。
如果异步函数中抛出错误会返回错误的期约，但期约不会被异步函数捕获。
* await
await用于暂停异步函数代码的执行，如果等待一个值，那么该值为已经解决的期约。等待错误，会返回拒绝的期约。await必须在异步函数中使用。
### 11.3.2 停止和恢复执行
只要使用await则会触发异步求值，如果后面是一个期约，则比直接可用的值排后。
### 11.3.3 异步函数策略
可以使用异步函数实现sleep
async function sleep(delay){return new Promise((resolve) => setTimeout(resolve,delay));}
await sleep(1500)
平行执行，一起初始化，然后依次执行。
使用await实现串行执行期约。
await相对setTimeout有一定的性能提升
## 11.4 小结
期约与异步函数都是非常重要的工具。
期约可以被序列化、连锁使用、符合、扩展和重组。
### 12. BOM
浏览器对象模型(BOM,Browser Object Model)
## 12.1 window对象
BOM的核心是window对象，表示浏览器的实例。window对象在浏览器中有两重身份，一个是ES的Global对象，一个就是浏览器窗口的JS接口。
### 12.1.1 Global作用域
window对象被复用为ES的Global对象，var声明的所有全局变量和函数都会变成window对象的属性和方法。let和const声明则不会把变量添加给全局对象。
### 12.1.2 窗口关系
top对象指最上层窗口，parent对象指向当前窗口的父窗口。如果当前窗口为最上层窗口，top=parent。最上层的window如果不是通过window.open()打开，那么name属性不会包含值。self始终指向window。
* window.parent
* window.top
* window.self
* window.parent.parent
### 12.1.3 窗口位置与像素比
* window.screenLeft:窗口相对于屏幕左侧的位置，返回CSS像素值
* window.screenTop:窗口相对于屏幕顶部的位置，返回CSS像素值
* window.moveTo():窗口上移
* window.moveBy():窗口相对当前位置在两个方向上移动的像素数
像素比：不同像素密度的屏幕下会有不同的缩放系数。
* window.devicePixeRatio:物理像素与CSS像素直接的转换比率，实际上与每英寸像素数(DPI)是对应的，物理像素与逻辑像素直接的缩放系数
### 12.1.4 窗口大小
* window.innerWidth:窗口页面视口宽度
* window.innerHeight:窗口页面视口高度
* window.outerWidth:浏览器自身宽度
* window.outerHeight:浏览器自身高度
缩放窗口的方法只能应用到最上层window对象
* window.resizeTo(100,100):缩放到100x100
* window.resizeBy(100,50):缩放到200x150
### 12.1.5 视口位置
* window.pageXoffset:相对视口滚动距离
* window.scrollX:相对视口滚动距离
* window.pageYoffset:相对视口滚动距离
* window.scrollY:相对视口滚动距离
* window.scrollBy(0,100):相对于视口向下滚动100像素
* window.scrollTo(100,100):滚动到距离屏幕左边及顶边各100像素的位置
并且可以通过设置behavior属性决定正常滚动和平滑滚动window.scrollTo({left:100,top:100,behavior:'smooth'});
### 12.1.6 导航与打开新窗口
window.open():用于导航到指定URL，也可打开新窗口，该方法有四个参数：
* URL
* 目标窗口：可以为字符串，也可以为_self,_parent,_top,_blank
* 特性字符串:fullscreen(最大化否),height(高度),left(x轴左边>=0),location(是否显示地址栏),Menubar(是否显示菜单栏),resizable(可否拖动改变窗口大小),scrollbars(内容过长是否可滚动),status(显示状态栏否),toolbar(显示工具栏否),top(y轴坐标>=0),width(宽度)
* 在历史记录中是否代替当前加载页
open出的窗口，与window对象一样，可以使用该对象操作。并且有close()方法用于关闭新打开的窗口。
由于安全的限制，可能没法在网页中调用window.open()
所有浏览器都有屏蔽弹窗的程序，window.open()如果为null，就可以知道是否被屏蔽了。还需要使用try/catch包装起来。
### 12.1.7 定时器
setTimeout,setInterval。
### 12.1.8 系统对话框
调用alert(),confirm(),prompt()可以浏览器调用系统对话框向用户显示消息，这些对话框与网页无关。
alert只能看，confirm有取消和确认，prompt有输入框。
window.print()//显示打印对话框，window.find()//显示查找对话框。
## 12.2 location对象
location提供了当前窗口中加载文档的信息，以及通常的导航功能。
它既是window的属性，也是document的属性。
* location.hash //URL散列值
* location.host //服务器名及端口号
* location.hostname //服务器名
* location.href //当前加载页面的完整URL
* location.pathname //URL中的路径和文件名
* location.port //请求的端口
* location.protocol //页面使用的协议
* location.search //URL的查询字符串
* location.usename //域名前指定的用户名
* location.password //域名前指定的密码
* location.origin // URL的源地址，只读
### 12.2.1 查询字符串

P367
# 14. DOM
## 14.1 节点层级
HTML节点为文档元素，是最外层的元素。所有元素都在这个元素之内。
### 14.1.1 Node类型
每个节点都有nodeType属性，表示该节点的类型。
节点类型看P402，共有12种。
nodeName和nodeValue保存着有关节点的信息。这两个属性的值取决于节点类型。nodeName始终等于元素的标签名。
文档中所有节点都与其他节点有关系，类家族关系。每个节点都有一个childNodes属性(并非都有子节点)，包含一个NodeList实例。NodeList是一个类数组对象，用于存储可以按位置存取的有序节点。NodeList是对DOM结构的查询。
访问nodeList的元素用中阔号或item()方法都可。(childNodes[0],.item(0))
NodeList可以被转成数组,let array = Array.prototype.slice.call(NodeList);
每个节点都有一个parentNode属性。previousSibling和nextSibling可以在这个列表的节点间导航。类似迭代器。
hasChildNodes()可以查询是否有子节点。
ownerDocument属性是指向整个文档节点的指针。
操纵节点：(1-4使用前必须获得父节点)
1.appendChild(),传入后成父节点的最后一个子节点
2.insertBefore(newNode,a),作为a之前的子节点之前插入
3.replaceChild(newNode,a),替换a节点插入
4.removeChild(node),删除节点
5.cloneNode(Boolean),是否深复制，返回一个孤儿节点，如果未指定父节点，可通过上述1-3方法添加到文档
6.normalize(),处理文档子树中的文本节点。检测这个节点的所有后代，搜索文本节点，空则删除，相邻则合并。
14.1.2 Document类型
document是HTMLDocument的实例，表示HTML页面，是window对象的属性。是一个全局对象。
访问子节点，DocumentType，Element，Processing-Instruction，Comment，documentElement(指向HTML)
document.title(标题)
document.URL(完整的URL)
document.domain(域名)只有域名可以设置,不同情况下可以设置
document.referrer(来源)
定位元素：
getElementById():传入元素ID，返回这个元素
getElementsByTagName():传入标签命，返回HTMLCollection对象，该对象类似NodeList，可用item()方法获取特定元素，也可以通过namedItem()获取某一项引用
getElementsByName(),返回给定name属性的元素
特殊集合：
document.anchors,文档中所有带name属性的a元素
document.forms->form元素
document.images->img元素
document.links->带href的元素的a元素
文档写入：
write(),writeIn(),open(),close()
### 14.1.3 Element类型
Element类型表示XML或HTML元素，对外暴露出访问元素标签命、子节点和属性的能力。所有HTML元素通过HTMLElement类型表示，都具有属性：
id:唯一标识符
title：额外信息
lang:元素内容的语言代码
dir：语言的书写方法
className：class属性
HTML元素对应类型见P415
属性获取：
getAttribute('class')
DOM返回的style和事件处理程序与getAttribute不同，一个可以修改，一个是字符串
属性设置：
setAttribute('class','111')有则覆盖，无则添加。
removeAttribute()用于删除属性
Element类型是唯一使用attributes属性的DOM节点类型。attributes包含NameNodeMap实例，类似NodeList的集合。
元素创建：
createElement()
### 14.1.4 Text类型
纯文本或转义后的HTML字符
appendData(text),添加文本text
deleteData(offset,count),从offset开始删除count个字符
insertData(offset,text),从offset插入text
replaceData(offset,count,text),替换文本
splitText(offset),拆分两个
substringData(offset,count)提取文本
创建文本节点:
document.createTextNode()
### 14.1.5 Comment类型
注释节点
### 14.1.6 CDATASection类型
### 14.1.7 DocumentType类型
### 14.1.8 DocumentFragment类型
### 14.1.9 Attr类型
## 14.2 DOM编程
# 14.2.1 动态脚本
var script = document.createElement("script");
通过script动态添加脚本
# 14.2.2 动态样式
let link = document.createElement("link");
如动态脚本
# 14.2.3 操作表格
P430 各种表格元素与表格API
# 14.2.4 使用NodeList
NodeList是实时的，每次使用都会搜索整个文档，最好缓存起来。
# 14.3 MutationObserver接口
用于监听DOM的修改实况，可以观察元素属性、子节点、文本。
P434
# 14.4 小结
DOM是中立的HTML和XML文档的API。
包含Node，Document，Element等类型的节点。
### 15. DOM扩展
## 15.1 Selectors API
根据CSS选择符匹配DOM元素。
querySelector(),querySelectorAll()。
matchs(),find()。
## 15.2 元素遍历
childElementCount:返回子元素数量
firstElementChild:指向第一个Element元素
lastElementChild:指向最后一个Element元素
previousElementSibling:指向前一个Element的同胞元素
nextElementSlbing:指向后一个Element的同胞元素
## 15.3 HTML5
### 15.3.1 CSS类拓展
getElementsByClassName():返回以调用它的对象为根元素的子树中所有匹配的元素。
classList属性：className，
add(),contains(),remove(),toggle()
### 15.3.2 焦点管理
document.activeElement:始终包含当前拥有焦点的DOM元素
document.hasFocus():文档是否拥有焦点
### 15.3.3 HTMLDocument扩展
document.readyState:有两个值，loading(文档正在加载)，complete(加载完成)
document.compatMode:检查页面当前渲染模式
document.head:指向文档的head元素
### 15.3.4 字符集属性
document.characterSet:文档实际使用的字符集
### 15.3.5 自定义数据属性
data-appId='123',data-~~~
自定义名称：可以通过dataset访问
### 15.3.6 插入标记
innerHTML属性：返回元素所有后代的HTML字符串
outerHTML:返回调用它的元素
insertAdjacentHTML,insertAdjacentText:插入标签
### 15.3.7 scrollIntoView()
滚动浏览器窗口或容器元素，参数如下：
alignToTop(),scrollIntoViewOptions(),根据值设置视图的展示方式
## 15.4 专有扩展
### 15.4.1 children属性
子节点：HTMLCollection
### 15.4.2 contains()方法
是否为该元素后代
### 15.4.3 插入标记
innerText属性,outerText属性:用于操作文本节点
### 15.4.4 滚动
scrollIntoViewIfNeeded()为HTMLElement类型:在元素不可见时将其滚动到窗口或包含窗口中
## 15.5 小结
HTML5为标准DOM做了大量扩展，后续还会继续。
# 16. DOM2和DOM3

P460








# 24. 网络请求与远程资源
## 24.1 XMLHttpRequest对象
```
let xhr = new XMLHttpRequest();
```
### 24.1.1 使用XHR
```
xhr.open('get');//还有post等，做好请求的准备，跨域会报错
xhr.send(null);//接受一个参数，为发送的数据，如果不需则传null，不然报错
```
* responseText:响应体返回的文本
* responseXML:响应数据的XML DOM文档
* status:响应的HTTP状态
* statusText:状态描述
* readyState:当前请求/响应过程的进行阶段
1. 0:未初始化(Uninitialized),未调用open()
2. 1:已打开(Open),已调用open(),未调用send()
3. 2:已发送(Sent),已调用send(),尚未响应
4. 3:接收中(Reveiving),已经部分响应
5. 4:完成(Complete),所有响应，可以使用
取消请求可以用abort()方法
由于内存问题不推荐用XHR
### 24.1.2 HTTP头部
* Accept：浏览器可以处理的内容类型
* Accept-Charset：浏览器可以显示的字符集
* Accept-Encoding：浏览器可以处理的压缩编码类型
* Accept-Language：浏览器使用的语言
* Connection：浏览器与服务器的连接类型
* Cookie：页面中设置的Cookie
* Host：发送请求的页面所在的域
* Referer：发送请求的页面的URI
*User-Agent：浏览器的用户代理字符串
也可以使用setRequestHeader()方法，传头部字段名称和值，在open之后，send之前调用，可以添加头部内容
可以使用getResponseHeader()或getAllResponseHeaders()获取头部
### 24.1.3 GET请求
需要在Get请求的URL后面添加查询字符串参数。查询字符串必须正确编码后添加到URL后面，再传给open()方法。
所有名/值对必须以和号(&)分隔。//？name=value1&name2=value2
### 24.1.4 POST请求
post请求可以包含非常多的数据，应该在请求体中携带提交的数据。
### 24.1.5 XMLHttpRequest Level 2
新增了FormData类型，便于表单序列化。
```
let data = new FormData();
data.append("name","Nicholas");
let form = doucment.getElementbById("user-info");
new FormData(form);
```
timeout属性用于表示等待时间，可以设置，响应不成就中断请求。
可以调用ontimeout函数处理程序。
overrideMimeType()用于重写XHR响应的MIME类型。
```
xhr.overrideMimeType("text/xml")
```
## 24.2 进度事件
* loadstart：接收到响应的第一个字节时触发
* progress：接收响应期间反复触发
Mozilla在XHR对象上另一个创新是progress事件，接收三个参数：lengthComputable，position，totalSize。
```
xhr.onprogress = function(event){...}
```
* error：请求出错时触发
* abort：调用abort()终止连接时触发
* load：在成功接收完响应时触发
Firefox，Opera，Chrome，Safari都支持load事件
```
xhr.onload = function(){   //需要判断XHR状态
   if((xhr.status >= 200 && xhr.status < 300) || (xhr.status == 304)){
      ...
   }
}
```
* loadend：通信完成后，在error,abort,load后触发
## 24.3 跨源资源共享
其实就是跨域，CORS：使用自定义的HTTP头部允许浏览器和服务器互相了解，以确实请求或响应成功还是失败。
一般会有额外的头部叫origin，包含发送请求页面的源(协议，域名和端口)，以便服务器确定是否为其提供响应。
头部Access-Control-Allow-Origin包含相同的源或公开资源(*)。表明会响应请求的源。
浏览器可以通过XHR的open传入一个绝对URL来触发CORS，运行访问status和statusText属性，但不能使用setRequestHeader自定义头部，不能发送和接收cookie，getAllResponseHeaders方法返回空字符串。
### 24.3.1 预检请求
CORS通过预检请求验证，是否自定义头部，发送除getpost之外的方法。该请求使用OPTIONS方法发送并包含以下头部：
* Origin：与简单请求相同
* Access-Control-Request-Method：请求希望使用的方法
* Access-Control-Request-Headers：自定义头部列表
* Access-Control-Max-Age：缓存预检请求的秒数
### 24.3.2 凭据请求
默认下跨源请求不提供凭据(cookie、HTTP认证和客户端SSL证书)。可以通过将withCredentials属性设置为true来表明请求会发送凭据。允许则头部包含：Access-Control-Allow-Credentials：true
## 24.4 替代性跨源技术
### 24.4.1 图片探测
用img标签跨域加载图片不受限制的方式，设置src后通过进度事件获取响应数据并执行程序。只能发送Get，无法获取服务器响应的内容。
信标(Beacon)也是该方式发送，利用标签发送数据，无需响应。
### 24.4.2 JSONP
与img相似，动态创建script元素并未src属性指定跨域URL实现的，响应后指定回调函数执行程序。
安全性低，不好确定请求状态。
## 24.5 Fetch API
Fetch是请求的优秀工具，可以应用在服务线程中，提供拦截，重定向和修改通过fetch()生成的请求接口。
### 24.5.1 基本用法
fetch只有一个必须的参数，'URL'。返回一个Promise。
P723




