---
title: CSS3特性
date: 2021-04-13 19:16:40
tags:
 - CSS
categories: 页面样式
---
### 1. 选择器
### 2. 边框
新增3个边框属性：
1.border-radius:创建圆角边框
2.box-shadow:为元素添加阴影
3.border-image:使用图片来绘制边框
### 3. 背景
1.background-clip:确定背景画区
2.background-origin:设置对齐方式
3.background-break:设置盒子绘制
### 4. 文字
1.word-wrap:normal(换行) break-all(单词内换行)
2.text-overflow:clip(修剪文本) ellipsis(显示省略符代替遮盖文本)
3.text-shadow:设置文本阴影
4.text-decoration:设置深层渲染
### 5. 颜色
rgba：rgb为颜色值，a为透明度
hala：h为色相，s为饱和度，1为亮度，a为透明度
### 6. transition 过渡
```
transition： CSS属性，花费时间，效果曲线(默认ease)，延迟时间(默认0)
transition-property: width; 
transition-duration: 1s;
transition-timing-function: linear;
transition-delay: 2s;
```
### 7. transform 转换
```
transform: translate(120px, 50%)：位移
transform: scale(2, 0.5)：缩放
transform: rotate(0.5turn)：旋转
transform: skew(30deg, 20deg)：倾斜
```
### 8. animation 动画
```
animation-name：动画名称
animation-duration：动画持续时间
animation-timing-function：动画时间函数
animation-delay：动画延迟时间
animation-iteration-count：动画执行次数，可以设置为一个整数，也可以设置为infinite，意思是无限循环
animation-direction：动画执行方向
animation-paly-state：动画播放状态
animation-fill-mode：动画填充模式
```
### 9. 渐变
```
background-image: linear-gradient(direction, color-stop1, color-stop2, ...); // 线性渐变
linear-gradient(0deg, red, green); // 径向渐变
```
### 10. 其他
flex布局，grid布局，多列布局，媒体查询，混合模式等。。。