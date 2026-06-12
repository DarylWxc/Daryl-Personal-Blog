---
title: CSS预处理器
date: 2021-04-26 09:10:45
tags:
 - CSS
categories: 页面样式
---
### 1. 是什么？
扩充了CSS语言，增加了变量、混合、函数等功能，让CSS更易维护、方便。
本质上预处理是CSS的超集，包含一套自己的语法，最后解析成CSS。
### 2. 有哪些？
## sass
最早最成熟的Css预处理器，全面兼容Css的scss。
后缀为.sass与.scss，可以严格按照sass的缩进方式省去大括号和分号。
## less
比如sass，可编程功能不够，优点是兼容CSS，影响了SASS演变到了Scss时代。
## stylus
Stylus是一个Css的预处理框架，2010年产生，来自Node.js社区，主要用来给Node项目进行预处理支持。
新型语言，可以创建健壮的、动态的、富有表现力的Css。
### 3. 区别
常用特性：
* 变量(variables)
@($)red:#c00;
strong{color:@red}
* 作用域(scope)
sass无全局变量
* 代码混合(mixins)
```
.alert {
  font-weight: 700;
}

.highlight(@color: red) {
  font-size: 1.2em;
  color: @color;
}

.heads-up { //引入
  .alert;
  .highlight(red);
}
```
* 嵌套(nested rules)
.a {
  &.b{ //&引用父级选择器

  }
}
* 代码模块化(Modules)
```
@import './common';
@import './github-markdown';
@import './mixin';
@import './variables';
```
