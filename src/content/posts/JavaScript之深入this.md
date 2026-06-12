---
title: JavaScript之深入this
date: 2022-02-18 17:46:50
tags:
 - JavaScript
categories: web前端
---
### 1. Reference
Reference是一个特殊类型，只存于规范里的抽象类型。它们是为了更好地描述语言的底层行为逻辑才存在的，但并不存在于实际的js代码中。
Reference有三个属性：
1. base
2. name
3. strict

有一个从Reference类型获取对应值的方法：GetValue。
```
var foo = 1;

var fooReference = {
    base: EnvironmentRecord,
    name: 'foo',
    strict: false
};

GetValue(fooReference) // 1;
```
### 2. 如何确定this的值
如果表达式返回的不是Reference类型，this值为undefined，非严格模式下为window(全局对象)。
如果表达式返回的是Reference类型，那么this值为表达式所代表的作用域。
