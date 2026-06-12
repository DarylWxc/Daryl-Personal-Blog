---
title: ES6之迭代器
date: 2022-01-07 19:55:44
tags:
 - JavaScript
 - ES6
categories: Web前端
---
### 1. 迭代器是啥
迭代器(iterator)为可以对数组或集合进行遍历的工具。只有实现了迭代器工厂函数的数据类型才能使用Iterable接口：
- 字符串(StringIterator)
- 数组(ArrayIterator)
- 映射(MapIterator)
- 集合(SetIterator)
- arguments对象(ArrayIterator)
- NodeList等DOM集合类型(ArrayIterator)

并且迭代器与可迭代对象的属性是同步的，如果可迭代对象在迭代期间被修改了，那么迭代器会反映相应的变化。迭代器维护着一个可迭代对象的引用，会阻止垃圾回收程序回收可迭代对象。

---
### 2. 自定义迭代器
```
class Counter { 
   constructor(limit) { 
      this.limit = limit; 
   } 
 [Symbol.iterator]() { 
    let count = 1, 
    limit = this.limit; 
    return { 
       next() { 
          if (count <= limit) { 
             return { done: false, value: count++ }; 
          } else { 
             return { done: true, value: undefined }; 
          } 
   } 
 }; 
 } 
} 
let counter = new Counter(3); 
for (let i of counter) { console.log(i); } 
// 1 
// 2 
// 3 
for (let i of counter) { console.log(i); } 
// 1 
// 2 
// 3
```
以上为闭包实现的自定义可迭代器，以这种方式创建的迭代器也实现了Iterable接口。Symbol.iterator属性引用的工厂函数会返回相同的迭代器

---
### 3. 提前终止迭代器
- for-of循环通过break、continue、return或throw提前退出
- 结构操作并未消费所有值

如果迭代器没有关闭，可以继续从上次离开的地方继续迭代。数组的迭代器不能关闭

---
### 4. 小结
迭代器是由任意对象实现的接口，支持连续获取对象产出的每个值。实现了Iterable接口的都有一个Symbol.iterator属性，引用默认迭代器，调用该函数会产生一个实现Iterator接口的对象。
迭代器必须通过next方法才能连续获取值，该方法返回一个IteratorObject，该对象包含done属性和value属性，done值表示是否还有值可以访问(true为迭代完成)，value为迭代器返回的当前值。