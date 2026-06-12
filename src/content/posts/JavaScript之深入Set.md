---
title: JavaScript之深入Set
date: 2022-03-01 19:51:23
tags:
 - JavaScript
categories: web前端
---
### 1. Set是什么？
Set是ES6新增的一种新集合类型，非常像是加强的Map，因为大多数API和行为是共有的。

---
### 2. Set的基本API
```bash
///创建一个空集合
const m = new Set();

///初始化Set需要传入一个可迭代对象
const s1 = new Set([1,2,3]); //s1.size = 3

///使用自定义迭代器初始化集合
const s2 = new Set({
   [Symbol.iterator]: function*(){
      yield 1;
      yield 2;
      yield 3;
   }
})  //s2.size = 3

```
初始化完Set后
1.使用add()增加值  //add函数返回集合的实例
2.使用has()查询
3.通过size获得元素数量
4.使用delete()和clear()删除元素 //delete返回一个布尔值，表示是否存在要删除的值
---
### 3. Set的基本特性
与map类似，Set可以包含任何JS数据类型作为值
Set与独立的实例不冲突
```Set
const a = new Set();
const functional = function() {};
a.add(functional);
a.has(functional) // true
s.has(function(){}) //false

s.delete(functional) //true
s.delete(functional) //false
```
Set会维护值插入的一个顺序，因此支持按顺序迭代。
集合实例可以提供一个Iterator，以插入顺序生成集合内容。
```iterator
const s = new Set(['val1','val2','val3']);
s.values  ===  s.keys === s[Symbol.iterator] //true
for (let value of s.values()){}  ===  for(let value of s[Symbol.iterator])
//values()是默认迭代器，可以直接对集合实例使用扩展操作，把集合转换为数组
let array = [...s] //["val1","val2","val3"]
//集合可以使用forEach方法传入回调，依次迭代每个键值/对
```
---
### 4. WeakSet
WeakSet为弱集合，是Set的兄弟类型。weak描述的是JavaScript垃圾回收程序对待weakSet中值的方式
```WeakSet
//WeakSet中的值只能是Object或者继承自Object的类型，使用其他类型会报错
const val1 = {id:1},val2 = {id:2};
const ws = new WeakSet([val1,val2]);
const ws2 = new WeakSet([val1,"123"]) //Error,初始化需要全有或全无，一个无效值会导致报错
//将原始值包装成对象在用作值
const stringval = new String('val1');
const ws3 = new WeakSet([stringval]);
```
---
### 5. WeakSet的特性
weakSet中的值不属于正式的引用，不会阻止垃圾回收。
```featrue
const ws = new WeakSet();
ws.add({}); //这个对象值，会被当做垃圾回收，会变成一个空集合
//container对象维护一个对弱集合的引用，这个对象不会成为垃圾回收的目标
const container = { val : {}};
ws.add{container.val};
container.val = null;
//WeakSet不可以迭代
//WeakSet没有size属性
//弱引用的特性，保存DOM节点，不容易造成内存泄漏
```
---
### 6. 小结
ES6新增的Set和WeakSet，为组织应用程序数据和简化内存管理提供了新能力。
主要的应用是数组去重 //newArr = [...new Set(arr)];


