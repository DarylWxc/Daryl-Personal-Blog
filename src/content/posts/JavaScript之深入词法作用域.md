---
title: JavaScript之深入词法作用域
date: 2022-02-18 16:29:39
tags:
 - JavaScript
categories: web前端
---
### 1. 什么是词法作用域？
JavaScript采用的是词法作用域(静态作用域)，函数的作用域在函数定义的时候就决定了。
```lexicalScoping
var value = 1;

function foo() {
    console.log(value);
}

function bar() {
    var value = 2;
    foo(); //调用该函数时，会根据书写的位置，查找上一层的代码(window)
}

bar(); // print 1
```
以上就是词法作用域(静态作用域)。

### 2. 静态作用域例子
```demo
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();  // print local scope


var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
checkscope()(); // print local scope
```
以上的例子均输出local scope，都是从函数定义位置作为作用域链的头部往上找。嵌套的函数f()定义在这个作用域链里，其中的变量scope一定是局部变量，不管何时何地执行函数f()，这种绑定在执行f()时依然有效。

