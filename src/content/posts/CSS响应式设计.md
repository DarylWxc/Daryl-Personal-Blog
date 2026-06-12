---
title: CSS响应式设计
date: 2021-04-16 09:23:45
tags:
 - CSS
 - 响应式布局
categories: 页面样式
---
### 1. 响应式是什么？
网络页面设计布局，页面的设计与开发应当根据用户行为及设备环境进行相应的响应和调整。
常见特点：
1.同时适配PC + 平板 + 手机等
2.标签导航在接近手持终端设备时改变为经典的抽屉式导航
3.网站的布局会根据视口来调整模块的大小和位置
---
### 2. 实现方式
基本原理是通过媒体查询检测不同的设备屏幕尺寸做处理，为了处理移动端，页面头部必须有meta声明viewport。
```
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no”>
```
1.width=device-width: 是自适应手机屏幕的尺寸宽度
2.maximum-scale:是缩放比例的最大值
3.inital-scale:是缩放的初始化
4.user-scalable:是用户的可以缩放的操作
实现响应式布局的方式有:
1.媒体查询
2.百分比
3.vw/vh
4.rem
---
### 3. 媒体查询
```
@media screen and (max-width: 1920px) { ... } // 针对不同类型定义不同样式
//375px-600px之间，设置字体大小为18px
@media screen (min-width: 375px) and (max-width: 600px) { 
  body {
    font-size: 18px;
  }
}
```
---
### 4. 百分比
height，width属性的百分比依托与父标签的宽高，但是其他盒子属性则完全依赖父元素：
1.子元素的top..等如果设置百分比，则相对于直接非static定位的父元素的高度/宽度
2.子元素的padding如果设置百分比，不论是垂直方向或者水平方向，都相对于直接父元素的width，于父元素的height无关
3.子元素的margin如果设置成百分比，不论是垂直方向还是水平方向，都相对于父元素的width
4.border-radius不一样，设置百分比是相对于自身的宽度
百分比不建议使用实现响应式
---
### 5. vw/vh
与百分比相似，vw对应视口宽度1%，wh对应视口高度1%。
---
### 6. rem
相对于根元素html的font-size属性，默认情况下为16px，1rem=16px。
可以用媒体查询针对不同设备分辨率改变font-size的值。如下：
```
@media screen and (max-width: 414px) {
  html {
    font-size: 18px
  }
}

@media screen and (max-width: 375px) {
  html {
    font-size: 16px
  }
}

@media screen and (max-width: 320px) {
  html {
    font-size: 12px
  }
}
//监听窗口变化
//动态为根元素设置字体大小
function init () {
    // 获取屏幕宽度
    var width = document.documentElement.clientWidth
    // 设置根元素字体大小。此时为宽的10等分
    document.documentElement.style.fontSize = width / 10 + 'px'
}

//首次加载应用，设置一次
init()
// 监听手机旋转的事件的时机，重新设置
window.addEventListener('orientationchange', init)
// 监听手机窗口变化，重新设置
window.addEventListener('resize', init)
```
---
### 7. 小结
实现思考：
1.弹性盒子和媒体查询
2.百分比布局，媒体查询限制元素尺寸
3.使用相对单位使得内容自适应调节
4.选择断点，针对不同断点实现不同布局和内容展示
---
### 8. 优劣
优点：
1.面对不用分辨率设备灵活性强
2.能够快捷解决多设备显示适应问题
缺点：
1.仅适用布局、信息、框架并不复杂的部门类型网站
2.兼容各种设备工作量大，效率低下
3.代码累赘，会出现隐藏无用的元素，加载时间加长
4.其实这是一种折中性质的设计解决方案，多方面因素影响而达不到最佳效果
5.一定程度上改变了网站原有的布局结构，会出现用户混淆的情况


