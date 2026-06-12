---
title: Vue的Diff算法原理
date: 2021-12-31 10:23:29
tags:
 - 前端框架
 - Vue
categories: Web前端
---
### 1.patch核心渲染方法改写
```
const isRealElement = oldVnode.nodeType;//oldVnode是真实DOM代表初次渲染
```
当oldNode为真实DOM即初次渲染，反之为虚拟DOM，更新过程需要使用diff算法，
算法中，判断新旧标签是否一致，同级比较，不一致则新替换旧。
如果旧节点为文本节点，直接替换标签文本内容。
如果不符合以上两种情况，直接把旧的虚拟DOM对应的真实DOM赋值给新的虚拟DOM的EL属性。其中包括子节点判断。
diff算法主要进行同级比较！
---
### 2.updateProperties更新属性
```
const newProps = vnode.data || {};//新的vnode属性
const el = vnode.el;//真实节点
for (const k in oldProps) { //新节点没有，则把老节点属性移除
    if (!newProps[k]) {
      el.removeAttribute(k);
    }
  }
//对style样式做特殊处理，如果没有，则style置空
 const newStyle = newProps.style || {};
  const oldStyle = oldProps.style || {};
  for (const key in oldStyle) {
    if (!newStyle[key]) {
      el.style[key] = "";
    }
  }
//遍历新的属性，进行增加操作
//分别给新节点的属性进行赋值
el.style[styleName] = newProps.style[styleName];
el.className = newProps.class;
el.setAttribute(key, newProps[key]);//给新节点添加属性
```
新老Vnode进行属性更新

---
### 3.updateChildren 更新子节点-diff核心方法
```
//先判断两个vnode的标签和key是否相同 如果相同 认为同一节点，直接复用
function isSameVnode(oldVnode, newVnode) {
  return oldVnode.tag === newVnode.tag && oldVnode.key === newVnode.key;
}
//diff算法核心 采用双指针的方式 对比新老vnode的儿子节点
//根据旧节点生成映射表，通过两个下标进行对比，当下标指到结束位置时结束循环
//通过判断新老节点头头 尾尾 头尾 尾头节点进行相应的移动指针或移动dom节点
//都不相等 直接暴力对比，利用key index的映射表来移动老的子节点到前面去或直接插入
//对老的子节点进行递归patch处理
//最后老的子节点有多的就删掉 新的子节点有多的就添加到相应的位置
```
---
### 4.改造原型渲染更新方法_update
```
export function lifecycleMixin(Vue) {
  // 把_update挂载在Vue的原型
  Vue.prototype._update = function (vnode) {
    const vm = this;
    const prevVnode = vm._vnode; // 保留上一次的vnode
    vm._vnode = vnode;
    if (!prevVnode) {
      // patch是渲染vnode为真实dom核心
      vm.$el = patch(vm.$el, vnode); // 初次渲染 vm._vnode肯定不存在 要通过虚拟节点 渲染出真实的dom 赋值给$el属性
    } else {
      vm.$el = patch(prevVnode, vnode); // 更新时把上次的vnode和这次更新的vnode穿进去 进行diff算法
    }
  };
}
```
---
### 5.小结
patch函数在update中调用，初次渲染直接渲染DOM节点，更新时启动diff算法进行节点同级对比，通过tag标签判断新旧标签是否一致，不一致直接替换节点，一致的话进行子节点新老节点的双指针对比，通过头头，尾尾，头尾，尾头的顺序进行对比，相同则复用，不同则进行DOM节点操作移动，如果都不相等则直接插入。对老节点进行递归patch处理，有多的老节点删除，新的子节点就添加到对应的位置。
update方法挂载在vue实例上，旧Node也保留在实例上，提供下次更新使用patch进行新老节点对比
