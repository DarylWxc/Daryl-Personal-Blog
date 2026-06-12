---
title: JavaScript之深入Map
date: 2022-03-01 20:58:58
tags:
 - JavaScript
categories: web前端
---
# Map
Map是一种ES6的新增集合类型，带来了真正的键/值存储机制。
---
## Map的API
```javascript
//使用new和Map构造函数可以创建一个空映射
const m = new Map();
//与Set相似，可以插入一个可迭代对象，需要包含键值/对数组
const m1 = new Map({
   ["key1","val1"],
   ["key2","val2"],
   ["key3","val3"]
}) //m1.size = 3
//也可以使用迭代器初始化
const m2 = new Map({
   [Symbol.iterator] : function *() {
      yield ["key1","val1"],
      yield ["key2","val2"],
      yield ["key3","val3"]
   }
})
//映射期待的键/值对，无论是否提供
const m3 = new Map([[]]);
m3.has(undefined) //true
m3.get(undefined) //undefined
//使用set添加键/值对，get和has进行查询，size为数量，delete和clear删除
const m = new Map();
m.set("a","you"); //返回映射实例
m.has("a") // true
m.get("a") // "you"
m.size // 2
m.delete("a");
m.clear();
//Map可以使用任何JavaScript数据类型作为键
```
---
## Map的特性
Map实例会维护键值对的插入顺序，可以根据插入顺序执行迭代操作。
映射实例可以提供一个迭代器，可以通过entries方法或for...of遍历取得迭代器
```javascript
const m = new Map({
   ["key1","val1"],
   ["key2","val2"],
   ["key3","val3"]
})
m.entries === m[Symbol.iterator] //true
for (let pair of m.entries()){
   ["key1","val1"],
   ["key2","val2"],
   ["key3","val3"]
}
//也可以通过forEach与回调去迭代
m.forEach(val,key) => {console.log(${key},${val})}
keys()和values()分别返回以插入顺序生成键和值的迭代器
```
---
## Map与Object的差异
1. 内存占用
Map给定固定大小的内存比Object多存储50%的键/值对。
2. 插入性能
两边消耗差不多，Map的插入相对稍微快些，如果大量插入，Map更好。
3. 查找速度
少量键值对的情况下Object速度更快，涉及大量查找操作，选Object更好。因为把Object当成数组使用的情况下，浏览器引擎可以进行优化，在内存中使用更高效的布局
4. 删除性能
Map的delete比插入和查找更快。涉及大量删除操作，选Map。
---
## WeakMap
与weakSet相同，垃圾回收对弱映射键的回收。
弱映射的键只能是Object或者继承自Object的类型，使用其他会报错。
weakMap中的弱映射不属于正式的引用，不会阻止垃圾回收。
且与WeakSet一样不可被迭代。
```WeakMap
//与WeakSet基本一致，初始化只能全无或全有
//初始化后用set添加键值对，get，has查询，delete删除
```
---
## WeakMap的应用
1.私有变量
```javascript
const wm = new WeakMap();

class User {
   constructor(id) {
      this.idProperty = Symbol('id');
      this.setId(id);
   }
   setPrivate(property,value){
      const privateMembers = wm.get(this) || {};
      privateMembers[property] = value;
      wm.set(this,privateMembers);
   }
   setId(id) {
      this.setPrivate(this.idProperty,id);
   }
   getId(){
      return this.getPrivate(this.idProperty);
   }
}
const user = new User(123);
user.getId(); //123
user.setId(456);
user.getId();//456
//并不是真正私有的
```
2.保存DOM节点元素
与WeakSet一致，不容易造成内存泄漏。