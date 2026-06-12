---
title: CSS视差滚动
date: 2021-04-21 08:53:23
tags:
 - CSS
categories: 页面样式
---
### 1. 视差滚动
指多层背景以不同的速度移动，形成立体的运动效果。
分三层：悬浮层、内容层、背景层
### 2. 实现方式
css实现：
* background-attachment
* transform：translate3D
## background-attachment
设置背景图像是否固定或者随着页面的其余部分滚动
* scroll：默认值，背景图像会随着页面其余部分的滚动而滚动
* fixed：当页面的其余部分滚动时，背景图像不会移动
* inherit：继承父元素background-attachment属性的值
```
div{
   height:100vh
   .a-img1{
      background-image:url(...);
      background-attachment: fixed;
      background-size: cover;
      background-position: center center;
   }
}
```
## transform:translate3D
perspective:css3属性，当元素涉及3d变换时，perspective可以定义我们眼睛看到的3d立体效果，即空间感。
```
<style>
    html {
        overflow: hidden;
        height: 100%
    }

    body {
        /* 视差元素的父级需要3D视角 */
        perspective: 1px;
        transform-style: preserve-3d; 
        height: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
    }
    #app{
        width: 100vw;
        height:200vh;
        background:skyblue;
        padding-top:100px;
    }
    .one{
        width:500px;
        height:200px;
        background:#409eff;
        transform: translateZ(0px);
        margin-bottom: 50px;
    }
    .two{
        width:500px;
        height:200px;
        background:#67c23a;
        transform: translateZ(-1px);
        margin-bottom: 150px;
    }
    .three{
        width:500px;
        height:200px;
        background:#e6a23c;
        transform: translateZ(-2px);
        margin-bottom: 150px;
    }
</style>
<div id="app">
    <div class="one">one</div>
    <div class="two">two</div>
    <div class="three">three</div>
</div>
```
* 容器设置transform-style: preserve-3d,perspective: xpx,那么处于这个容器的子元素就将位于3D空间中
* 子元素设置不同的transform：translateZ()，这个时候不同元素在3D Z轴方向距离屏幕(我们的眼睛)的距离也就不一样
* 滚动滚动条，由于子元素设置了不同的transform：translateZ()，那么他们滚动的上下距离translateY相对屏幕，也是不一样的，这就达到了滚动视差的效果

