---
title: Vue响应式更新原理
date: 2021-12-28 20:12:16
tags:
 - 前端框架
 - Vue
categories: Web前端
---
### 1.定义Watcher
```
// 全局变量id  每次new Watcher都会自增
let id = 0;

export default class Watcher {
  constructor(vm, exprOrFn, cb, options) {
    this.vm = vm;
    this.exprOrFn = exprOrFn;
    this.cb = cb; //回调函数 比如在watcher更新之前可以执行beforeUpdate方法
    this.options = options; //额外的选项 true代表渲染watcher
    this.id = id++; // watcher的唯一标识
    // 如果表达式是一个函数
    if (typeof exprOrFn === "function") {
      this.getter = exprOrFn;
    }
    // 实例化就会默认调用get方法
    this.get();
  }
  get() {
    this.getter();
  }
}
```
Vue使用到了观察者模式，其中可以将Watcher当做观察者，当数据变动后，通知它执行某些方法，本质是一个构造函数，初始化的时候会去执行get

---
### 2.创建渲染Watcher
```
export function mountComponent(vm, el) {
  //   _update和._render方法都是挂载在Vue原型的方法  类似_init

  // 引入watcher的概念 这里注册一个渲染watcher 执行vm._update(vm._render())方法渲染视图

  let updateComponent = () => {
    console.log("刷新页面");
    vm._update(vm._render());
  };
  new Watcher(vm, updateComponent, null, true);
}
```
组件挂载方法内注册一个updateComponent方法用于更新渲染页面，初始化时也是调用_update映射vnode节点为真实DOM

---
### 3.定义Dep
```
// dep和watcher是多对多的关系

// 每个属性都有自己的dep

let id = 0; //dep实例的唯一标识
export default class Dep {
  constructor() {
    this.id = id++;
    this.subs = []; // 这个是存放watcher的容器
  }
}
// 默认Dep.target为null
Dep.target = null;
```
Dep也是一个构造函数，可以理解为被观察者，在subs里放watcher实例对象，当数据变动时，通知自身subs的watcher更新
Dep.target是一个全局watcher指向初始状态是null
---
### 4.对象的依赖收集
```
let dep = new Dep(); // 为每个属性实例化一个Dep
  Object.defineProperty(data, key, {
    get() {
      // 页面取值的时候 可以把watcher收集到dep里面--依赖收集
      if (Dep.target) {
        // 如果有watcher dep就会保存watcher 同时watcher也会保存dep
        dep.depend();
      }
      return value;
    },
    set(newValue) {
      if (newValue === value) return;
      // 如果赋值的新值也是一个对象  需要观测
      observe(newValue);
      value = newValue;
      dep.notify(); // 通知渲染watcher去更新--派发更新
    },
  });
```
在数据被访问时，会将watcher放到dep的subs数组里面，同时把dep实例对象也放到watcher里去，数据更新时则会通知watcher去更新，遍历subs存储的watcher

---
### 5.完善watcher
```
get() {
    pushTarget(this); // 在调用方法之前先把当前watcher实例推到全局Dep.target上
    this.getter(); //如果watcher是渲染watcher 那么就相当于执行  vm._update(vm._render()) 这个方法在render函数执行的时候会取值 从而实现依赖收集
    popTarget(); // 在调用方法之后把当前watcher实例从全局Dep.target移除
  }
  //   把dep放到deps里面 同时保证同一个dep只被保存到watcher一次  同样的  同一个watcher也只会保存在dep一次
  addDep(dep) {
    let id = dep.id;
    if (!this.depsId.has(id)) {
      this.depsId.add(id);
      this.deps.push(dep);
      //   直接调用dep的addSub方法  把自己--watcher实例添加到dep的subs容器里面
      dep.addSub(this);
    }
  }
  //   这里简单的就执行以下get方法  之后涉及到计算属性就不一样了
  update() {
    this.get();
  }
```
watcher在调用getter方法前后分别把自身赋值给Dep.target方便进行依赖收集update方法来更新

---
### 6.完善Dep
```
// dep和watcher是多对多的关系
// 每个属性都有自己的dep
let id = 0; //dep实例的唯一标识
export default class Dep {
  constructor() {
    this.id = id++;
    this.subs = []; // 这个是存放watcher的容器
  }
  depend() {
    //   如果当前存在watcher
    if (Dep.target) {
      Dep.target.addDep(this); // 把自身-dep实例存放在watcher里面
    }
  }
  notify() {
    //   依次执行subs里面的watcher更新方法
    this.subs.forEach((watcher) => watcher.update());
  }
  addSub(watcher) {
    //   把watcher加入到自身的subs容器
    this.subs.push(watcher);
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
定义相关的方法把收集依赖的同时把自身也放到watcher的deps容器里取

---
### 7.数组的依赖收集
```
// 递归收集数组依赖
function dependArray(value) {
  for (let e, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    // e.__ob__代表e已经被响应式观测了 但是没有收集依赖 所以把他们收集到自己的Observer实例的dep里面
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      // 如果数组里面还有数组  就递归去收集依赖
      dependArray(e);
    }
  }
}
```
当对象属性的值是一个数组，那么执行child.dep.depend()收集数组的依赖，如果数组里还包含数组需要递归遍历收集，只有访问数据触发了get才会去收集依赖，一开始只是递归对数据进行响应式处理无法收集依赖

---
### 8.数组的派发更新
```
methodsToPatch.forEach((method) => {
  arrayMethods[method] = function (...args) {
    //   这里保留原型方法的执行结果
    const result = arrayProto[method].apply(this, args);
    // 这句话是关键
    // this代表的就是数据本身 比如数据是{a:[1,2,3]} 那么我们使用a.push(4)  this就是a  ob就是a.__ob__ 这个属性代表的是该数据已经被响应式观察过了 __ob__对象指的就是Observer实例
    const ob = this.__ob__;
    let inserted;
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2);
      default:
        break;
    }
    if (inserted) ob.observeArray(inserted); // 对新增的每一项进行观测
    ob.dep.notify(); //数组派发更新 ob指的就是数组对应的Observer实例 我们在get的时候判断如果属性的值还是对象那么就在Observer实例的dep收集依赖 所以这里是一一对应的  可以直接更新
    return result;
  };
});
```
关键代码就是ob.dep.notify()
### 9.小结
在Vue实例初始化的时候，会初始化data，然后通过defineReactive对数据进行劫持的时候实例化Dep，然后创建挂载在Vue实例上的Watcher实例对象，在初次渲染编译模板时，通过触发get，收集依赖，创建watcher对象push到Dep中的subs内，然后遍历subs数组调用watcher内的get(updateComponent)进行派发更新数据。