---
title: computed和watch
date: 2021-03-16 11:03:14
tags:
 - 前端框架
 - Vue
categories: Web前端
---
### 1. computed用法
类似于watch的计算属性，根据所依赖的数据动态设置新的计算结果。computed的值在getter执行后会被缓存。
应用场景：
 - 适用于一些重复使用数据或复杂及费时的运算。
 - 依赖于其他数据的数据
---
### 2. computed和methods的区别？
1.methods无响应式，不会动态更改
2.computed可以定义成函数，也可以定义成get/set
---
### 3. watch用法
对data里的数据监听回调。
应用场景：当data数据更新时需要操作或数据变化时执行异步，开销较大的操作时使用。
普通监听：watch内调用，根据newval和oldval执行函数
深度监听：有immediate属性，可立即执行方法，deep属性，针对对象属性的监听，性能开销较大
---
### 4. watch和computed的区别
相同：都是观察页面数据变化
不同：computed只有当依赖数据变化才会计算，当数据没有变化会读取缓存。watch每次都需要执行函数，无缓存，更适用于数据变化时的异步。
---
### 5. 原理及源码
在initState函数中，initComputed函数，判断是否有computed后执行，循环遍历computed，根据key实例化watcher，通过Object.defineProperty()函数来监听。回调时调用mount.call()，跟响应式原理一样。


