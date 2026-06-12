---
title: JS常见考点
date: 2021-04-20 08:33:24
tags:
 - 前端学习
 - 面试
categories: Web前端
---
### JS常见类型有哪些？
String,Number,symbol,boolean,bigint,null,undefined
### 大数相加、相乘算法题可以直接使用bigint，当然再加上字符串的处理会更好
### NaN如何判断
isNaN()
### JS类型如何判断
除null用typeof，instanceof判断对象，Object.prototype.toString.call
### instanceof原理
通过原型链查找该对象是否有与另一个对象相同的原型
### 手写instanceof
### 类型转换
[] == ![] //->true
![] -> false -> 0 
[].toString -> '' -> Number('') -> 0
### this指向问题
```
const a = {b:2,foo:function(){console.log(this.b)}}
function b(foo){foo()}
b(a.foo)
```
输出函数b
### 闭包
```
for(var i = 0;i < 6;i++) {
   setTimeout(() =>{
       console.log(i)
   }
}
```
立即执行函数，用let定义i，使用闭包
### new做了哪些事
实例了一个对象，然后创建this赋值。
### new返回不同的类型时会有什么表现
### 手写new的实现过程
### 什么是作用域
上下文中能访问到的属性，scope
### 什么是作用域链
每个上下文都有scope，串在一起为作用域链。可以遍历查找。
### 你理解的原型是什么？
类似于继承，拓展。相当于族谱，构造函数可以生小孩，proto为基因。
### JS如何实现继承
### 通过原型实现的继承和class有何区别
### 手写任意一种原型继承
### 使用all实现并行需求
### Promise all错误处理
### 手写all的实现
### 什么是事件循环
### JS的执行原理
### 哪些是微宏任务
### 定时器是准时的嘛
### 0.1 + 0.2  !== 0.3

