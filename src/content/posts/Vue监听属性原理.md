---
title: Vue监听属性原理
date: 2022-01-04 11:20:42
tags:
 - 前端框架
 - Vue
categories: Web前端
---
### 1.监听属性的初始化
```
// 初始化watch
function initWatch(vm) {
  let watch = vm.$options.watch;
  for (let k in watch) {
    const handler = watch[k]; //用户自定义watch的写法可能是数组 对象 函数 字符串
    if (Array.isArray(handler)) {
      // 如果是数组就遍历进行创建
      handler.forEach((handle) => {
        createWatcher(vm, k, handle);
      });
    } else {
      createWatcher(vm, k, handler);
    }
  }
}
// 创建watcher的核心
function createWatcher(vm, exprOrFn, handler, options = {}) {
  if (typeof handler === "object") {
    options = handler; //保存用户传入的对象
    handler = handler.handler; //这个代表真正用户传入的函数
  }
  if (typeof handler === "string") {
    //   代表传入的是定义好的methods方法
    handler = vm[handler];
  }
  //   调用vm.$watch创建用户watcher
  return vm.$watch(exprOrFn, handler, options);
}
```
初始化watch时对options上的watch属性进行处理，如果是数组则遍历处理调用createWatcher函数，最后调用$watch创建用户watcher

---
### 2.$watch
```
import Watcher from "./observer/watcher";
Vue.prototype.$watch = function (exprOrFn, cb, options) {
  const vm = this;
  //  user: true 这里表示是一个用户watcher
  let watcher = new Watcher(vm, exprOrFn, cb, { ...options, user: true });
  // 如果有immediate属性 代表需要立即执行回调
  if (options.immediate) {
    cb(); //如果立刻执行
  }
};
```
创建自定义watch的核心方法，把用户定义的options和user:true传给构造函数watcher

---
### 3.Watcher改造
```
 this.user = options.user; //标识用户watcher
if (typeof exprOrFn === "function") {
      this.getter = exprOrFn;
    } else {
      this.getter = function () {
        //用户watcher传过来的可能是一个字符串   类似a.a.a.a.b
        let path = exprOrFn.split(".");
        let obj = vm;
        for (let i = 0; i < path.length; i++) {
          obj = obj[path[i]]; //vm.a.a.a.a.b
        }
        return obj;
      };
    }
    // 实例化就进行一次取值操作 进行依赖收集过程
    this.value = this.get();
  }
run() {
    const newVal = this.get(); //新值
    const oldVal = this.value; //老值
    this.value = newVal; //现在的新值将成为下一次变化的老值
    if (this.user) {
      // 如果两次的值不相同  或者值是引用类型 因为引用类型新老值是相等的 他们是指向同一引用地址
      if (newVal !== oldVal || isObject(newVal)) {
        this.cb.call(this.vm, newVal, oldVal);
      }
    } else {
      // 渲染watcher
      this.cb.call(this.vm);
    }
  }
```
为了兼容watch的写法，会将传入的字符串转成Vue实例对应的值，调用get方法保存一次旧值。
run方法中，当判断为用户watcher，那么执行用户传入的回调函数cb，并把新旧值传入。
---
### 4.小结
借助watcher实现。初始化响应式时，会调用createWatcher创建用户watcher，其中会将传入的handler存为watcher的cb函数，渲染更新时，会调用一次get获取旧值，执行用户watcher的run函数，判断为用户watcher时执行cb函数并将新值和旧值传入。