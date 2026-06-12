---
title: JavaScript之深入继承
date: 2022-01-10 10:08:12
tags:
 - JavaScript
categories: web前端
---
### 1. 原型链继承
子类如果需要覆盖父类的方法，或者增加父类没有的方法，需要在原型赋值后，再添加到原型上。如果在赋值前重写方法会破坏(重写)之前的原型链。
原型链继承的问题：
- 原型链继承的对象，会在所有实例间共享，会多出一些不必要的属性，如果修改也会影响到其他实例
- 子例在实例化时不能给父类型的构造函数传参

---
### 2. 借用构造函数继承
在子类中调用父类构造函数。
```
function SuperType() { //相当于在子类中运行了父类的初始化代码，每个实例都有自己的属性
 this.colors = ["red", "blue", "green"]; 
} 
function SubType() { 
 // 继承 SuperType 
 SuperType.call(this); 
}
//也可以传入参数
function SuperType(name){ 
 this.name = name; 
} 
function SubType() { 
 // 继承 SuperType 并传参
 SuperType.call(this, "Nicholas"); 
 // 实例属性
 this.age = 29; 
}
```
借用构造函数的问题：
- 必须在构造函数中定义方法，函数不能重用
- 子类不能访问原型上定义的方法

---
### 3.组合继承
综合了原型链和构造函数继承，结合优点。
```
function SuperType(name){ 
 this.name = name; 
 this.colors = ["red", "blue", "green"]; 
} 
SuperType.prototype.sayName = function() { 
 console.log(this.name); 
}; 
function SubType(name, age){ 
 // 继承属性
 SuperType.call(this, name); 
 this.age = age; 
} 
// 继承方法
SubType.prototype = new SuperType(); 
SubType.prototype.sayAge = function() { 
 console.log(this.age); 
};
```
---
### 4. 原型式继承
```
function object(o) { //大致用代码解释
 function F() {} 
 F.prototype = o; 
 return new F(); 
}
```
传入一个对象，将对象赋值给这个构造函数的原型，然后返回实例。
ES5增加了一个方法Object.create()用于原型式继承的概念规范化。在只传一个参数时，方法效果与上述object函数相同。
有两个参数时，添加的属性会遮蔽原型对象上的同名属性：
```
let person = { 
 name: "Nicholas", 
 friends: ["Shelby", "Court", "Van"] 
}; 
let anotherPerson = Object.create(person, { 
 name: { 
 value: "Greg" 
 } 
}); 
console.log(anotherPerson.name); // "Greg"
```
原型式的继承缺点与原型链继承一样。

---
### 5. 寄生式继承
与原型式继承相似，创建一个实现继承的函数，以某种方式增强对象，然后返回对象
```
function createAnother(original){ 
 let clone = object(original); // 通过调用函数创建一个新对象
 clone.sayHi = function() { // 以某种方式增强这个对象
 console.log("hi"); 
 }; 
 return clone; // 返回这个对象
}
```
该继承方式具有父类的属性和方法，还能添加新方法和属性。该方法主要关注对象。有个问题是对象添加函数会导致函数难以重用，与构造函数模式类似。

---
### 6. 寄生式组合继承
```
function inheritPrototype(subType, superType) { 
 let prototype = object(superType.prototype); // 创建对象
 prototype.constructor = subType; // 增强对象 
 subType.prototype = prototype; // 赋值对象
}
```
寄生式组合继承主要是创建父类原型的一个副本，然后给返回的对象设置constructor属性，最后将创建的对象赋值给子类型的原型。
该继承方式好处：
- 只调用了一次构造函数
- 避免了子类上用不到的属性
- 效率更高
- 原型链有效
