---
title: JavaScript之深入闭包
date: 2022-02-18 19:20:00
tags:
 - JavaScript
categories: web前端
---
### 1. 什么是闭包
闭包指那些能够访问自由变量的函数。
自由变量：指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。

### 2. 分析闭包
在闭包中，函数上下文维护了一个作用域链：
```
funcContext = {
   Scope:[AO,checkscopeContext.AO,globalContext.VO]
}
```
闭包通过这个维护的作用域链可以访问到维护变量的活动对象中的值。

### 3. 闭包题目
常见闭包题目：循环打印

