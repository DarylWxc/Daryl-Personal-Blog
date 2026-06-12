---
title: JavaScript之执行上下文栈
date: 2022-02-18 16:42:36
tags:
 - JavaScript
categories: web前端
---
### 1. JavaScript可执行代码
JavaScript可执行代码有三种：
1. 全局代码
2. 函数代码
3. eval代码

### 2. 执行上下文栈
在js执行到一个函数的时候，就会进行执行上下文(execution context)的准备。
执行上下文栈(Execution context stack,ECS)用于管理执行上下文。
```ECS
ECStack = [globalContext] // 执行上下文栈的底部永远有个globalContext


function fun3() {
    console.log('fun3')
}

function fun2() {
    fun3();
}

function fun1() {
    fun2();
}

fun1();

↓

// fun1()
ECStack.push(<fun1> functionContext);

// fun1中调用了fun2，还要创建fun2的执行上下文
ECStack.push(<fun2> functionContext);

// fun2中调用了fun3！
ECStack.push(<fun3> functionContext);

// fun3执行完毕
ECStack.pop();

// fun2执行完毕
ECStack.pop();

// fun1执行完毕
ECStack.pop();

// javascript接着执行下面的代码，但是ECStack底层永远有个globalContext
```
每次在调用函数前，都会将函数执行需要的执行上下文入栈，在函数结束执行之后，会出栈。