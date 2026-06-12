---
title: CSS动画
date: 2021-04-14 14:32:51
tags:
 - CSS
categories: 页面样式
---
### 1. CSS动画
实现方式：
1.transition实现渐变动画
2.transform转变动画
3.animation实现自定义动画
---
### 2. transition
transition的属性：
1.property
填写需要变化的CSS属性
2.duration
完成过渡效果需要的时间单位
3.timing-function
完成效果的速度曲线
linear(匀速)，ease(从慢到快再到慢)，ease-in(慢慢变快)，ease-out(慢慢变慢)，ease-in-out(先变快在到慢)，cubic-bezier(定义自己的值)
4.delay
动画效果的延迟触发时间
---
### 3. transform
tranform有的属性
1.translate 位移
2.scale 缩放
3.rotate 旋转
4.skew 倾斜
一般配合transition使用，不支持inline元素
---
### 4. animation
animation自带属性：
1.animation-duration
指动画周期时间
2.animation-timing-function
指动画计时函数
3.animation-delay
延迟时间，默认为0
4.animation-iteration-count
播放次数
5.animation-fill-mode
填充模式，默认none
6.animation-play-state
播放状态
7.animation-name
@keyframes动画名称
8.animation-dirction
播放方向normal
### 5. 总结
transition(过渡)：用于设置元素的样式过渡，和animation有着类似的效果，但细节上有很大的不同
transform(变形):用于元素进行旋转、缩放、移动或倾斜，和设置样式的动画并没有什么关系，相当于color一样用来设置元素的“外表”
translate(移动)：只是transform的一个属性值，即移动
animation(动画):用于设置动画属性

