---
title: BFC
date: 2021-04-06 15:11:18
tags:
 - CSS
categories: UI设计开发
---
### 1. BFC
BFC(Block Formatting Context)，即块级格式化上下文，有自己的渲染区域和渲染规则：
 - 内部的盒子会在垂直方向上一个接一个的放置
 - 对于同一个BFC的俩个相邻的盒子的margin会发生重叠，与方向无关
 - 每个元素的左外边距与包含块的左边界相接触（从左到右），即使元素浮动也是如此
 - BFC的区域不会与float的元素区域重叠
 - 计算BFC的高度时，浮动子元素也参与计算
 - BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然
 - BFC就是一个相对于外界独立的空间，内部的子元素不影响外部的元素
---
### 2. 触发条件
 - 根元素，HTML元素
 - 浮动元素(float)
 - overflow值不为visible
 - display值为inline-block(cell,caption,table,flex,grid),flex,grid,table
 - position值为absolute或fixed
---
### 3. 应用场景
 - 放置margin重叠(塌陷)
 - 清除内部浮动
 - 自适应多栏布局
---

