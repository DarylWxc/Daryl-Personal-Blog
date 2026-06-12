---
title: Vue模板组件原理
date: 2022-01-04 09:01:43
tags:
 - 前端框架
 - Vue
categories: Web前端
---
```
// 全局组件
  Vue.component("parent-component", {
    template: `<div>我是全局组件</div>`,
  });
  // Vue实例化
  let vm = new Vue({
    el: "#app",
    data() {
      return {
        aa: 1,
      };
    },
    // render(h) {
    //   return h('div',{id:'a'},'hello')
    // },
    template: `<div id="a">
      hello 这是我自己写的Vue{{aa}}
      <parent-component><parent-component>
      <child-component></child-component>
      </div>`,
    // 局部组件
    components: {
      "child-component": {
        template: `<div>我是局部组件</div>`,
      },
    },
  });
```
---
### 1.全局组件注册
```
import initExtend from "./initExtend";
import initAssetRegisters from "./assets";
const ASSETS_TYPE = ["component", "directive", "filter"];
export function initGlobalApi(Vue) {
  Vue.options = {}; // 全局的组件 指令 过滤器
  ASSETS_TYPE.forEach((type) => {
    Vue.options[type + "s"] = {};
  });
  Vue.options._base = Vue; //_base指向Vue

  initExtend(Vue); // extend方法定义
  initAssetRegisters(Vue); //assets注册方法 包含组件 指令和过滤器
}
```
initGlobalApi方法主要用来注册Vue的全局方法，类似：Vue.Mixin,Vue.extend,Vue.component
```
const ASSETS_TYPE = ["component", "directive", "filter"];
export default function initAssetRegisters(Vue) {
  ASSETS_TYPE.forEach((type) => {
    Vue[type] = function (id, definition) {
      if (type === "component") {
        //   this指向Vue
        // 全局组件注册
        // 子组件可能也有extend方法  VueComponent.component方法
        definition = this.options._base.extend(definition);
      }
      this.options[type + "s"][id] = definition;
    };
  });
}
```
通过extend函数把传入的选项处理之后挂载到了Vue.options.components

---
### 2.Vue.extend定义
```
export default function initExtend(Vue) {
  let cid = 0; //组件的唯一标识
  // 创建子类继承Vue父类 便于属性扩展
  Vue.extend = function (extendOptions) {
    // 创建子类的构造函数 并且调用初始化方法
    const Sub = function VueComponent(options) {
      this._init(options); //调用Vue初始化方法
    };
    Sub.cid = cid++;
    Sub.prototype = Object.create(this.prototype); // 子类原型指向父类
    Sub.prototype.constructor = Sub; //constructor指向自己
    Sub.options = mergeOptions(this.options, extendOptions); //合并自己的options和父类的options
    return Sub;
  };
}
```
Vue.extend核心思路是使用原型继承的方法返回了Vue的子类，利用mergeOptions把传入的options和父类的options进行了合并

---
### 3.组件的合并策略
处理全局组件和局部组件的合并：
```
const ASSETS_TYPE = ["component", "directive", "filter"];
// 组件 指令 过滤器的合并策略
function mergeAssets(parentVal, childVal) {
  const res = Object.create(parentVal); //比如有同名的全局组件和自己定义的局部组件 那么parentVal代表全局组件 自己定义的组件是childVal  首先会查找自已局部组件有就用自己的  没有就从原型继承全局组件  res.__proto__===parentVal
  if (childVal) {
    for (let k in childVal) {
      res[k] = childVal[k];
    }
  }
  return res;
}

// 定义组件的合并策略
ASSETS_TYPE.forEach((type) => {
  strats[type + "s"] = mergeAssets;
});
```
---
### 4.创建组件Vnode
```
//先判断传入值是否为对象
//通过正则匹配标签名返回标签
import { isObject, isReservedTag } from "../util/index";
// 创建元素vnode 等于render函数里面的 h=>h(App)
export function createElement(vm, tag, data = {}, ...children) {
  let key = data.key;

  if (isReservedTag(tag)) {
    // 如果是普通标签
    return new Vnode(tag, data, key, children);
  } else {
    // 否则就是组件
    let Ctor = vm.$options.components[tag]; //获取组件的构造函数
    return createComponent(vm, tag, data, key, children, Ctor);
  }
}

function createComponent(vm, tag, data, key, children, Ctor) {
  if (isObject(Ctor)) {
    //   如果没有被改造成构造函数
    Ctor = vm.$options._base.extend(Ctor);
  }
  // 声明组件自己内部的生命周期
  data.hook = {
    // 组件创建过程的自身初始化方法
    init(vnode) {
      let child = (vnode.componentInstance = new Ctor({ _isComponent: true })); //实例化组件
      child.$mount(); //因为没有传入el属性  需要手动挂载 为了在组件实例上面增加$el方法可用于生成组件的真实渲染节点
    },
  };

  // 组件vnode  也叫占位符vnode  ==> $vnode
  return new Vnode(
    `vue-component-${Ctor.cid}-${tag}`,
    data,
    key,
    undefined,
    undefined,
    {
      Ctor,
      children,
    }
  );
}
```
改写createElement方法 对于非普通html标签，就生成组件Vnode，把Ctor和children作为Vnode最后一个参数componentOptions传入

---
### 5.渲染组件真实节点
```
// patch用来渲染和更新视图
export function patch(oldVnode, vnode) {
  if (!oldVnode) {
    // 组件的创建过程是没有el属性的
    return createElm(vnode);
  } else {
    //   非组件创建过程省略
  }
}

// 判断是否是组件Vnode
function createComponent(vnode) {
  // 初始化组件
  // 创建组件实例
  let i = vnode.data;
  //   下面这句话很关键 调用组件data.hook.init方法进行组件初始化过程 最终组件的vnode.componentInstance.$el就是组件渲染好的真实dom
  if ((i = i.hook) && (i = i.init)) {
    i(vnode);
  }
  // 如果组件实例化完毕有componentInstance属性 那证明是组件
  if (vnode.componentInstance) {
    return true;
  }
}

// 虚拟dom转成真实dom
function createElm(vnode) {
  const { tag, data, key, children, text } = vnode;
  //   判断虚拟dom 是元素节点还是文本节点
  if (typeof tag === "string") {
    if (createComponent(vnode)) {
      // 如果是组件 返回真实组件渲染的真实dom
      return vnode.componentInstance.$el;
    }
    //   虚拟dom的el属性指向真实dom 方便后续更新diff算法操作
    vnode.el = document.createElement(tag);
    // 解析虚拟dom属性
    updateProperties(vnode);
    // 如果有子节点就递归插入到父节点里面
    children.forEach((child) => {
      return vnode.el.appendChild(createElm(child));
    });
  } else {
    //   文本节点
    vnode.el = document.createTextNode(text);
  }
  return vnode.el;
}
```
如果属于组件Vnode 那么把渲染好的组件真实DOM 指向vnode的组件$el属性返回

---
### 6.小结
在构造函数中，initGlobal进行初始化，在全局初始化当中用extend函数结合原型链继承将子类的构造函数返回并init初始化。
通过mergeOptions将组件，指令，过滤器保存在options里面，然后调用extend把生成的组件构造函数挂载到Vue.options.component上，通过合并options实现原型继承返回，创建组件vnode与生命周期，然后调用生命周期并初始化，最后返回vnode.componentInstance.$el渲染完成的真实DOM。