---
title: Vue异步更新原理
date: 2021-12-31 09:35:28
tags:
 - 前端框架
 - Vue
categories: Web前端
---
### 1.watcher更新的改写
```
export default class Watcher {
  update() {
    // 每次watcher进行更新的时候  是否可以让他们先缓存起来  之后再一起调用
    // 异步队列机制
    queueWatcher(this);
  }
  run() {
    // 真正的触发更新
    this.get();
  }
}
```
在update更新方法中加入异步队列的机制

---
### 2.queueWatcher实现队列机制
```
let queue = [];
let has = {};
function flushSchedulerQueue() {
  for (let index = 0; index < queue.length; index++) {
    //   调用watcher的run方法 执行真正的更新操作
    queue[index].run();
  }
  // 执行完之后清空队列
  queue = [];
  has = {};
}

// 实现异步队列机制
export function queueWatcher(watcher) {
  const id = watcher.id;
  //   watcher去重
  if (has[id] === undefined) {
    //  同步代码执行 把全部的watcher都放到队列里面去
    queue.push(watcher);
    has[id] = true;
    // 进行异步调用
    nextTick(flushSchedulerQueue);
  }
}
```
同步把watcher都放队列里面去，执行完队列的事件之后再清空队列，主要使用nextTick来执行watcher队列

---
### 3.nextTick实现原理
```
//通过MutationObserver监听DOM变化，异步方法
const observer = new MutationObserver(flushCallbacks);
const textNode = document.createTextNode(String(counter));
//通过promise
 const p = Promise.resolve();
  timerFunc = () => {
    p.then(flushCallbacks);
  };
//使用setImmediate
timerFunc = () => {
    setImmediate(flushCallbacks);
  };
//最后是setTimeout
timerFunc = () => {
    setTimeout(flushCallbacks, 0);
  };
```
微任务优先的方式调用异步方法执行nextTick包装的方法

---
### 4.$nextTick挂载原型
```
export function renderMixin(Vue) {
  // 挂载在原型的nextTick方法 可供用户手动调用
  Vue.prototype.$nextTick = nextTick;
}
```
最后把$nextTick挂载到Vue的原型
