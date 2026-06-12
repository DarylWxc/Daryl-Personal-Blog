---
title: CSS性能优化
date: 2021-04-19 08:38:19
tags:
 - CSS
categories: 性能优化
---
### 1. 实现方式
 - 内联首屏关键CSS
 - 异步加载CSS
 - 资源压缩
 - 合理使用选择器
 - 减少使用昂贵的属性
 - 不要使用@import
---
### 2. 细节
* 内联首屏关键CSS
内联的CSS代码渲染提前，较大的CSS代码不合适，会阻塞，无缓存。
关键CSS代码采用内联，其余代码采用外部引用。
* 异步加载CSS
使用JavaScript将link标签插到head标签最后，
```
const myCSS = document.createElement("link");
myCSS.rel = "stylesheet";
myCSS.href = "mystyles.css";
document.head.insertBefore(myCSS,document.head.childNodes[document.head.childNodes.length-1].nextSibling);
```
设置link标签media属性为noexis，浏览器会认为当前样式表不适用当前类型，在不阻塞页面渲染的情况下再进行下载。加载完后将media的值设为screen或all。
```
<link rel="stylesheet" href="mystyles.css" media="noexist" onload="this.media='all'">
```
通过rel属性将link元素标记为alternate可选样式表，也能实现浏览器异步加载。加载完成后将rel设回stylesheet。
```
<link rel="alternate stylesheet" href="mystyle.css" onload="this.rel='stylesheet'">
```
* 资源压缩
利用webpack、gulp/grunt、rollup等模块化工具，将CSS代码进行压缩，使文件变小，大大降低了浏览器的加载时间。
* 合理使用选择器
css匹配的规则是从右往左开始匹配，例如#Markdown .content h3
先找h3 然后去除祖先不是.content的元素 最后去除组件不是#markdown的元素
遵循以下原则
1. 不要使用嵌套使用过多复杂选择器，最好不要三层以上
2. 使用id选择器就没必要再进行嵌套
3. 通配符和属性选择器效率最低，避免使用
* 减少使用昂贵的属性
页面发生重绘的时候，昂贵属性如box-shadow/border-radius/filter/透明度/:nth-child等，会降低浏览器的渲染性能
* 不要使用@import
import会影响并行下载，如果使用，需要先把文件下载，解析后才执行。
假设css文件中import，会下载两层CSS。
* 其他
1. 减少重排操作，以及避免不必要的重绘
2. 了解哪些属性可以继承而来，避免重复编写
3. cssSprite，合成所有icon图片，用宽高加上background-position的背景图方式显现出我们要的icon图，减少http请求
4. 把小的icon图片转成base64编码
5. CSS3动画或者过渡尽量使用transform或opacity来实现动画，不要使用left和top属性
---
### 3. 总结
主要从选择器嵌套、属性特性、减少http这三面考虑，同时注意css代码的加载顺序。
