---
title: Vue的mixin原理
date: 2021-12-31 14:23:06
tags:
 - 前端框架
 - Vue
categories: Web前端
---
### 1.定义全局Mixin函数
```
import {mergeOptions} from '../util/index'
export default function initMixin(Vue){
  Vue.mixin = function (mixin) {
    //   合并对象
      this.options=mergeOptions(this.options,mixin)
  };
}
};

initMixin(Vue);//在Vue的入口文件引入initMixin方法
```
---
### 2.mergeOptions方法
```
//先定义生命周期，合并生命周期，然后为生命周期队列添加合并方法
//mixin核心方法
export function mergeOptions(parent, child) {
  const options = {};
  // 遍历父亲
  for (let k in parent) {
    mergeFiled(k);
  }
  // 父亲没有 儿子有
  for (let k in child) {
    if (!parent.hasOwnProperty(k)) {
      mergeFiled(k);
    }
  }

  //真正合并字段方法
  function mergeFiled(k) {
    if (strats[k]) {
      options[k] = strats[k](parent[k], child[k]);
    } else {
      // 默认策略
      options[k] = child[k] ? child[k] : parent[k];
    }
  }
  return options;
}
```
主要是遍历父亲和儿子的属性，进行合并，选项有自己的合并策略直接调用。
这里的生命周期的合并策略mergeHook明显把全部生命周期各自混入成了数组的形式依次调用

---
### 3.生命周期的调用
```
export function callHook(vm, hook) {
  // 依次执行生命周期对应的方法
  const handlers = vm.$options[hook];
  if (handlers) {
    for (let i = 0; i < handlers.length; i++) {
      handlers[i].call(vm); //生命周期里面的this指向当前实例
    }
  }
}
```
init初始化的时候调用mergeOptions来进行选项合并，然后在生命周期(在mountComponent方法)的地方运用callHook来执行用户传入的相关方法

---
### 4.小结
mixin混入主要是将混入的对象与options合并，在各自的生命周期中调用。