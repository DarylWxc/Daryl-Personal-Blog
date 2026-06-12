---
title: Vuex原理
date: 2022-01-05 14:52:10
tags:
 - 前端框架
 - Vue
categories: Web前端
---
### 1.Vuex初始化
import Vuex的时候，引用的是一个对象，定义在index.js中，他同样存在一个install方法，install中通过混入一个beforeCreate钩子函数，将options.store保存在所有组件的$store中，这个options.store就是实例化的Store对象。所以我们可以通过this.$store访问到这个实例。

## 1.1 Store实例化
```
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... },
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```
store可以看作多个module子模块的整体(root module),module为一个类，module之间通过key建立父子关系，为树形结构，创建完module之后，需要对module进行安装。
```
const state = this._modules.root.state
installModule(this, state, [], this._modules.root)
//依次给module开辟空间，设置状态，注册mutation、action、getter，然后进行安装
```
在初始化时，为了响应module中的变化，会创建一个上下文环境，同样是通过Object.defineProperties去劫持Store中的属性，建立state和getters的联系，从而可以通知vm进行更新。
