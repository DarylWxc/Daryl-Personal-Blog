---
title: vue模板编译原理
date: 2021-12-28 11:52:37
tags:
 - 前端框架
 - Vue
categories: Web前端
---
### 1.模板编译入口
在初始化时，传入的options参数中有el属性，则进行模板渲染。其中主要的渲染函数为$mount()。//将模板挂载在HTML上
进行render判断，template判断，什么情况下，最终都是将模板转换为render函数进行渲染。
```
// 如果有el属性 进行模板渲染
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
if (!options.render) {
      // 如果存在template属性
      let template = options.template;

      if (!template && el) {
        // 如果不存在render和template 但是存在el属性 直接将模板赋值到el所在的外层html结构（就是el本身 并不是父元素）
        template = el.outerHTML;
      }

      // 最终需要把tempalte模板转化成render函数
      if (template) {
        const render = compileToFunctions(template);
        options.render = render;
      }
    }
```
---
### 2.核心方法compileToFunctions
```
let ast = parse(template); //将html代码转成ast树
let code = generate(ast); //通过ast代码生成render函数
  //   使用with语法改变作用域为this  之后调用render函数可以使用call改变this 方便code里面的变量取值
  let renderFn = new Function(`with(this){return ${code}}`);
  return renderFn
```
主要是通过该方法，生成ast树，根据ast树生成render函数返回

---
### 3.解析html并生成ast
使用正则表达式匹配开始和结束标签和文本解析并生成ast //通过栈来存放匹配到的标签，然后逐一处理，最后生成
### 4.根据ast重新生成代码
拿到生成好的 ast 之后 需要把 ast 转化成类似_c('div',{id:"app"},_c('div',undefined,_v("hello"+_s(name)),_c('span',undefined,_v("world"))))这样的字符串 //其中也会处理指令之类的字符
### 5.code字符串生成render函数
```
export function compileToFunctions(template) {
  let code = generate(ast);
  // 使用with语法改变作用域为this  之后调用render函数可以使用call改变this 方便code里面的变量取值 比如 name值就变成了this.name
  let renderFn = new Function(`with(this){return ${code}}`);
  return renderFn;
}
```
---
### 6.小结
在Vue构造函数当中定义，初始化时调用挂载在Vue原型上的mount函数，其中核心函数是compileToFunction函数，先将template模板解析成AST树，再将AST树转化成render函数，最后根据render函数递归创建节点。

