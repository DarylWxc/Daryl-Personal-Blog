---
title: JavaScript之深入执行上下文
date: 2022-02-18 18:17:54
tags:
 - JavaScript
categories: web前端
---
```demo
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();
```
执行过程如下：
1. 执行全局代码，创建全局执行上下文，全局上下文被压入执行上下文栈
2. 全局上下文初始化，初始化的同时，checkscope函数被创建，保存作用域链到函数的内部属性[[scope]]
3.  执行checkscope函数，创建checkscope函数执行上下文，checkscope函数执行上下文被压入执行上下文栈
4. checkscope函数执行上下文初始化：
 - 复制函数[[scope]]属性创建作用域链
 - 用arguments创建活动对象
 - 初始化活动对象，加入形参、函数声明、变量声明
 - 将活动对象压入checkscope作用域链顶端
5. 执行f函数，创建f函数执行上下文，f函数执行上下文被压入执行上下文栈
6. f函数执行上下文初始化，以下跟第4步相同
7. f函数执行，沿着作用域链查找scope值，返回scope
8. f函数执行完毕，f函数上下文从执行上下文栈中弹出
9. checkscope函数执行完毕，checkscope执行上下文从执行上下文栈中弹出
