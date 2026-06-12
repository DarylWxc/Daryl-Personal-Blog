---
title: Vue计算属性原理
date: 2022-01-04 12:00:35
tags:
 - 前端框架
 - Vue
categories: Web前端
---
### 1.计算属性的初始化
```
function initComputed(vm) {
  const computed = vm.$options.computed;

  const watchers = (vm._computedWatchers = {}); //用来存放计算watcher

  for (let k in computed) {
    const userDef = computed[k]; //获取用户定义的计算属性
    const getter = typeof userDef === "function" ? userDef : userDef.get; //创建计算属性watcher使用
    // 创建计算watcher  lazy设置为true
    watchers[k] = new Watcher(vm, getter, () => {}, { lazy: true });
    defineComputed(vm, k, userDef);
  }
}
```
computed可以为函数也可以为对象，将lazy设置为true传给构造函数Watcher创建计算属性Watcher

---
### 2.对计算属性进行属性劫持
```
// 定义普通对象用来劫持计算属性
const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: () => {},
  set: () => {},
};

// 重新定义计算属性  对get和set劫持
function defineComputed(target, key, userDef) {
  if (typeof userDef === "function") {
    // 如果是一个函数  需要手动赋值到get上
    sharedPropertyDefinition.get = createComputedGetter(key);
  } else {
    sharedPropertyDefinition.get = createComputedGetter(key);
    sharedPropertyDefinition.set = userDef.set;
  }
  //   利用Object.defineProperty来对计算属性的get和set进行劫持
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

// 重写计算属性的get方法 来判断是否需要进行重新计算
function createComputedGetter(key) {
  return function () {
    const watcher = this._computedWatchers[key]; //获取对应的计算属性watcher
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate(); //计算属性取值的时候 如果是脏的  需要重新求值
      }
      return watcher.value;
    }
  };
}
```
defineComputed方法用于重新定义计算属性，主要是劫持get方法，需要根据依赖值是否发生变化来判断计算属性是否需要计算
createComputedGetter方法是判断计算属性依赖的值是否变化的核心，根据watcher添加dirty标志位，标志为true代表需要重新计算

---
### 3.Watcher改造
```
this.lazy = options.lazy; //标识计算属性watcher
this.dirty = this.lazy; //dirty可变  表示计算watcher是否需要重新计算 默认值是true
this.value = this.lazy ? undefined : this.get();
get() {
    pushTarget(this); // 在调用方法之前先把当前watcher实例推到全局Dep.target上
    const res = this.getter.call(this.vm); //计算属性在这里执行用户定义的get函数 访问计算属性的依赖项 从而把自身计算Watcher添加到依赖项dep里面收集起来
    popTarget(); // 在调用方法之后把当前watcher实例从全局Dep.target移除
    return res;
  }
update() {
    // 计算属性依赖的值发生变化 只需要把dirty置为true  下次访问到了重新计算
    if (this.lazy) {
      this.dirty = true;
    } else {
      // 每次watcher进行更新的时候  可以让他们先缓存起来  之后再一起调用
      // 异步队列机制
      queueWatcher(this);
    }
  }
  //   计算属性重新进行计算 并且计算完成把dirty置为false
  evaluate() {
    this.value = this.get();
    this.dirty = false;
  }
  depend() {
    // 计算属性的watcher存储了依赖项的dep
    let i = this.deps.length;
    while (i--) {
      this.deps[i].depend(); //调用依赖项的dep去收集渲染watcher
    }
  }
```
根据lazy属性判断是否computed，不是的话不去调用get进行依赖收集，computed的缓存通过update，在改变dirty状态后，下次访问计算属性才会重新计算，新增了evaluate方法用于重新计算，新增depend方法，让计算属性依赖值收集外层watcher

---
### 4.外层watcher的依赖收集
```
function createComputedGetter(key) {
 if (Dep.target) {
   watcher.depend()
 }
}
// 默认Dep.target为null
Dep.target = null;
// 栈结构用来存watcher
const targetStack = [];

export function pushTarget(watcher) {
  targetStack.push(watcher);
  Dep.target = watcher; // Dep.target指向当前watcher
}
export function popTarget() {
  targetStack.pop(); // 当前watcher出栈 拿到上一个watcher
  Dep.target = targetStack[targetStack.length - 1];
}
```
在出入栈之后，计算属性会重新计算，然后将target更新，当外层的watcher更新target后，使用depend方法收集一遍外层的依赖，然后就可以计算并刷新视图。

---
### 5.小结
先通过设置对象get和set属性，进行一个劫持，然后改写watcher，根据dirty判断是否重新计算，调用depend收集外层渲染watcher的依赖，将watcher的dirty标识为true后，下次访问就重新计算属性，然后通过depend方法让计算属性依赖值收集外层watcher依赖，达到视图渲染效果。
