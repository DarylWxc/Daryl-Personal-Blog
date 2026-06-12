---
title: 虚拟DOM渲染原理
date: 2021-12-28 15:39:13
tags:
 - 前端框架
 - Vue
categories: Web前端
---
### 1.组件挂载入口
通过compile转化成render之后，调用mountComponent核心方法进行组件实例的挂载。该函数与生命周期相关，位于beforeMount和mounted生命周期钩子之间。
### 2.核心方法mountComponent
```
export function mountComponent(vm, el) {
  // 上一步模板编译解析生成了render函数
  // 下一步就是执行vm._render()方法 调用生成的render函数 生成虚拟dom
  // 最后使用vm._update()方法把虚拟dom渲染到页面

  // 真实的el选项赋值给实例的$el属性 为之后虚拟dom产生的新的dom替换老的dom做铺垫
  vm.$el = el;
  //   _update和._render方法都是挂载在Vue原型的方法  类似_init
  vm._update(vm._render());
}
```
核心方法mountComponent中主要调用vm._render和vm._updatte函数进行实例挂载
### 3.render函数转化成虚拟DOM核心方法_render
通过解构获取生成的render方法，然后call改变this生成vnode。定义_c，_v，_s三个方法，用于创建虚拟DOM，创建虚拟DOM文本，给对象JSON字符串转化。
```
Vue.prototype._c = function (...args) {
    // 创建虚拟dom元素
    return createElement(...args);
  };

  Vue.prototype._v = function (text) {
    // 创建虚拟dom文本
    return createTextNode(text);
  };
  Vue.prototype._s = function (val) {
    // 如果模板里面的是一个对象  需要JSON.stringify
    return val == null
      ? ""
      : typeof val === "object"
      ? JSON.stringify(val)
      : val;
  };
```
虚拟DOM和文本虚拟DOM的函数中通过tag，data，key，children，text属性，调用createElement，createTextNode生成虚拟DOM返回。
### 4.虚拟DOM转化成真实DOM核心方法_update
在生成虚拟DOM后返回的Vnode作为参数传入_update函数进行转化，通过调用patch
```
Vue.prototype._update = function (vnode) {
    const vm = this;
    // patch是渲染vnode为真实dom核心
    patch(vm.$el, vnode);
  };
```
在patch函数中调用createElm将虚拟DOM转换成真实DOM，其中通过将el属性指向真实DOM，解析虚拟DOM属性(调用updateProperties给style和props属性进行设置)，将子节点递归插入到父节点里面，也是调用createElement函和createTextNode函数进行生成，然后赋值到vnode的el属性里返回
### 5._render和_update原型方法的混入
```
initMixin(Vue);

// 混入_render
renderMixin(Vue);
// 混入_update
lifecycleMixin(Vue);
export default Vue;
```
将定义在原型的方法引入到Vue主文件入口，这样实例化实例的时候可以调用该方法
### 6.小结
在initMixin函数中调用mount函数挂载组件，将模板转换成render函数，然后通过update函数将render生成的Vnode节点进行patch映射
在渲染完模板后，还会渲染混入的模板，lifecycleMixin,renderMixin，加载的方式与渲染真实模板一样



