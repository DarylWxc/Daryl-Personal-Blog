---
title: CSS隐藏元素
date: 2021-04-02 10:06:33
tags:
 - CSS
categories: 页面样式
---
### 1. CSS隐藏方法
 - display:none
 - visibility:hidden
 - opacity:0
 - 设置height、width模型属性为0
 - position:absolute
 - clip-path
---
### 2. display:none
最为常用的方法 .hide{ display:none }
元素会彻底消失，本身空间会被其他元素占有，导致重排和重绘。
消失后，绑定的事件不会触发，也不会有过渡效果。
特点：元素不可见，不占据空间，无法响应点击事件。
### 3. visibility:hidden
也是常见的隐藏元素的方法
仅仅隐藏，DOM依然存在，处于不可见的状态。
不会触发重排，但是会触发重绘。
特点：元素不可见，占据页面空间，无法响应点击事件。
### 4. opacity:0
opacity表示元素的透明度，设置为0后，元素为隐藏状态。
不会引发重排，一般情况下也会引发重绘。
自身事件会触发，但被其遮挡的元素无法触发事件。
子元素无法设置opacity来达到显示的效果。
特点：改变元素透明度，元素不可见，占据页面空间，可以响应点击事件。
### 5. height,width属性为0
.hiddenBox{margin:0;border:0;padding:0;height:0;width:0;overflow:hidden}
特点：元素不可见，不占据页面空间，无法响应点击事件
### 6. postion:absolute
将元素移除可视区域
.hidden{position: absolute;top:-9999px;left:-9999px}
特点：元素不可见，不影响页面布局
### 7. clip-path
通过裁剪的形式
.hide{clip-path: polygon(0px 0px,0px 0px,0px 0px,0px 0px)}
特点：元素不可见，占据页面空间，无法响应点击事件
### 8. 小结
最常用的还是display:none,visubility:hidden