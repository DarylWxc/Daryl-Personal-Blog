---
title: Vue-mixin
date: 2021-02-25 15:05:59
tags:
 - 前端框架
 - Vue
categories: web前端
---
### 1. mixin是什么？
Mixin是一种类，提供方法实现。通常作为功能模块使用，在需要该功能时“混入”，有利于代码复用，避免多继承的复杂。本质是一个JS对象，包含组件的任意功能，将功能传入mixins中就可以使用，可以局部混入，可以全局混入（不推荐！）。
### 2. 如何使用？
局部混入：
```bash
var myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}
// 组件通过mixins属性调用mixin对象
Vue.component('componentA',{
  mixins: [myMixin]
})
// 使用该组件时，会混合mixin里的方法，自动执行钩子函数。也可以调用mixin里的data值
```
全局混入：
```bash
Vue.mixin({
  created: function () {
      console.log("全局混入")
    }
})
// 全局混入需要特别注意，会影响到每个组件。
```
当组件存在于mixin对象相同的选项时，合并时会覆盖mixin的选项。
生命周期钩子相同时，会合并成一个数组，先执行mixin的钩子。
### 3. 使用场景
相似或相同的代码，功能相对独立。
```bash
const toggle = { // 编写mixin
  data() {
    return {
      isShowing: false
    }
  },
  methods: {
    toggleShow() {
      this.isShowing = !this.isShowing;
    }
  }
}

const Modal = {  // 使用时引入
  template: '#modal',
  mixins: [toggle]
};
```
### 4. 小结
·替换型策略有props、methods、inject、computed，新参数替换旧
·合并型策略是data，通过set方法进行合并和重新赋值
·队列型策略有生命周期和watch，原理是将函数存入一个数组，然后正序遍历依次执行
·叠加型有component、directives、filters，通过原型链进行层层叠加