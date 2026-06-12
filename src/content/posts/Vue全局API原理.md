---
title: Vue全局API原理
date: 2022-01-04 22:42:44
tags:
 - 前端框架
 - Vue
categories: Web前端
---
### 1.Vue.util
```
Vue.util = {
  warn,
  extend,
  mergeOptions,
  defineReactive,
};
```
Vue.util是Vue内部的工具方法，不推荐业务组件去使用，因为可能随着版本发生变动，不开发第三方Vue插件会比较少用

---
### 2.Vue.set/Vue.delete
```
export function set(target: Array<any> | Object, key: any, val: any): any {
  // 如果是数组 直接调用我们重写的splice方法 可以刷新视图
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  // 如果是对象本身的属性，则直接添加即可
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }
  const ob = (target: any).__ob__;

  // 如果对象本身就不是响应式 不需要将其定义成响应式属性
  if (!ob) {
    target[key] = val;
    return val;
  }
  // 利用defineReactive   实际就是Object.defineProperty 将新增的属性定义成响应式的
  defineReactive(ob.value, key, val);
  ob.dep.notify(); // 通知视图更新
  return val;
}
```
```
export function del(target: Array<any> | Object, key: any) {
  // 如果是数组依旧调用splice方法
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return;
  }
  const ob = (target: any).__ob__;
  // 如果对象本身就没有这个属性 什么都不做
  if (!hasOwn(target, key)) {
    return;
  }
  // 直接使用delete  删除这个属性
  delete target[key];
  //   如果对象本身就不是响应式 直接返回
  if (!ob) {
    return;
  }
  ob.dep.notify(); //通知视图更新
}
```
该API在业务场经常使用与新增或删除响应式数据，由于Object.defineProperty对于数组和对象的响应式没有具体的劫持，所以通过该API操作会直接触发渲染

---
### 3.Vue.nextTick
该函数为异步更新的核心，通过将函数放入执行栈当中，再分别使用promise、mutationObserver、setImmediate和setTimeout来进行一个微任务后执行的异步机制，常用于要获取dom节点相关属性时

---
### 4.Vue.observable
```
Vue.observable = <T>(obj: T): T => {
  observe(obj);
  return obj;
};
```
核心方法就是调用observe方法将传入的数据变成响应式对象，用于制造全局变量在组件中共享数据

---
### 5.Vue.options
```
Vue.options = Object.create(null);
ASSET_TYPES.forEach((type) => {
  Vue.options[type + "s"] = Object.create(null);
});

// this is used to identify the "base" constructor to extend all plain-object
// components with in Weex's multi-instance scenarios.
Vue.options._base = Vue;

extend(Vue.options.components, builtInComponents); //内置组件
```
options是存放组件、指令和过滤器的容器，Vue.options._base指向Vue构造函数

---
### 6.Vue.use
```
Vue.use = function (plugin: Function | Object) {
  const installedPlugins =
    this._installedPlugins || (this._installedPlugins = []);
  if (installedPlugins.indexOf(plugin) > -1) {
    // 如果安装过这个插件直接返回
    return this;
  }

  const args = toArray(arguments, 1); // 获取参数
  args.unshift(this); //在参数中增加Vue构造函数

  if (typeof plugin.install === "function") {
    plugin.install.apply(plugin, args); // 执行install方法
  } else if (typeof plugin === "function") {
    plugin.apply(null, args); // 没有install方法直接把传入的插件执行
  }         
  // 记录安装的插件
  installedPlugins.push(plugin);
  return this;
};
```
主要用于插件的注册，调用插件的install方法，把自身Vue传到插件的install方法，可以避免第三方插件强依赖Vue

---
### 7.Vue.mixin
调用mergeOptions合并选项，然后合并字段。
全局混入方法，一般作用提取全局的公共方法和属性
---
### 8.Vue.extend
```
Vue.extend = function (extendOptions: Object): Function {
  const Sub = function VueComponent(options) {
    // 创建子类的构造函数 并且调用初始化方法
    this._init(options);
  };
  Sub.prototype = Object.create(Super.prototype); // 子类原型指向父类
  Sub.prototype.constructor = Sub; //constructor指向自己
  Sub.options = mergeOptions(
    //合并自己的options和父类的options
    Super.options,
    extendOptions
  );
  return Sub;
};
```
组件构造器Vue的组件创建，利用原型继承的方法创建继承自Vue的子类

---
### 9.组件、指令、过滤器
```
export function initAssetRegisters(Vue: GlobalAPI) {
  var ASSET_TYPES = ["component", "directive", "filter"];
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach((type) => {
    Vue[type] = function (
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      if (!definition) {
        return this.options[type + "s"][id];
      } else {
        if (type === "component" && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === "directive" && typeof definition === "function") {
          definition = { bind: definition, update: definition };
        }
        this.options[type + "s"][id] = definition; //把组件  指令  过滤器 放到Vue.options中
        return definition;
      }
    };
  });
}
```
定义component、directive、filter三大api并且格式化用户传入内容，最后把结果放到options中

---
### 10.小结
如上，都是在initGlobalAPI时将API挂载到Vue构造函数当中，可以在Vue全局中使用

