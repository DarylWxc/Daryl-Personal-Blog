---
title: CSS样式
date: 2020-05-09 14:59:08
tags:
 - CSS
 - 响应式布局
categories: UI设计开发
---

页面UI设计与开发

---

## 2020/5/9 15:01 Write

关键词：UI

选择器优先权：important>内联>id>类|伪类|属性选择>伪元素|标签>通配符>继承

注意可继承属性和不可继承属性

```bash
cursor: 改变光标的形式
box-sizing：使Padding往内伸缩
outline：外边框
focus：获取焦点
font-size：0 （解决空格留白问题）
```

### 浮动的特点
元素浮动后会脱离文档流
浮动以后元素会一直向父元素的最上方移动
直到遇到父元素的边框或者其他的浮动元素，会停止移动
如果浮动元素的上边是一个块元素，则浮动元素不会覆盖块元素
浮动元素不会超过他上边的浮动的兄弟元素，最多一边齐
浮动元素不会覆盖文字，文字会自动环绕在浮动元素的周围，可以通过浮动来实现文字环绕的效果

### 元素浮动后的效果
块元素：块元素脱离文档流以后（不会独占一行，宽度高度会被内容撑开）
内联元素：脱离文档流后变成块元素

### 定位
relative:相对于自己（相对定位）
开启元素的相对定位后，如果不设置偏移量元素不会发生任何变化
相对定位元素对于自身在文档流中的位置来定位
相对定位的元素不会脱离文档流
相对定位不会改变元素的性质，块元素还是块元素
相对定位的元素会提升一个层级
使用top left right bottom偏移

absolute：相对于父标签
同相对定位
最近的开启了定位的祖先元素进行定位，如果所有的祖先元素没开启定位，则相对于浏览器窗口进行定位
绝对定位的元素会完全脱离文档流
绝对定位会改变元素的性质。内联变块，块的高度和宽度都被内容撑开，并且不独占一行
绝对定位会使元素提升一个层级


fixed：相对于浏览器窗口
特殊的绝对定位，相对于浏览器窗口定位
永远相对于浏览器窗口进行定位，不会随滚动条滚动



### 层级
定位元素>浮动元素>文档流中的元素
当元素开启了定位后，可以通过Z-index来设置层级
z-index值越高越优先显示
如果z-index值一样，或者都没有z-index则优先显示下边的元素
父元素永远不会盖住子元素


---
### flex布局：（flex）弹性伸缩盒展示，用于块级元素——（inline-flex）用于行内元素
优点：flex布局容易上手
缺点：浏览器兼容性比较差，只能兼容到ie9及以上
常用属性：
flex-direction ////控制主轴
justify-content//主轴上的子项对齐方式
align-items//侧轴上的对齐方式
flex-wrap///指定flex子项是否换行
align-content///适用于多行，
align-self////指定某个子项的对齐方式
---
### grid网格布局
优点：灵活的区域网格容器和网格项
缺点：兼容性不好
指定display：grid
行，列，单元格
repeat（重复属性），设置宽高（columns，rows）
fr（片段），minmax（设置最大最小值）,grid-row-gap（行间隔）
grid-colunm-gap（设置列间隔）,grid-auto-flow（自定义排序）
类flex布局的定位属性
---
### 浮动布局
优点：元素浮动可以设置宽高，可以文字环绕图片
缺点：元素浮动脱离文档流，容易造成父级元素高度塌陷
元素浮动后产生BFC，靠子元素撑开高度，且浮动不能单个浮动，要多个。
需要时还需清除浮动与闭合浮动
浮动大多数位置靠上，靠左，靠右
解决高度塌陷：
开启父元素的BFC（默认关闭）
在父元素最后添加一个DIV清除浮动
使用after伪类清除浮动
---
### border style
共八种样式：
dotted
dashed
solid
double
groove
ridge
inset
outset

### CSS3动画属性
通过hover改变属性样式，在主选择器中使用transition进行动画过渡。
包括宽度和背景颜色都可以。
2D转换有包括：
位移（translate）：顾名思义，在原有位置上移动
旋转（rotate）：在原有位置上旋转，类似网易云音乐的碟盘
变形：改变属性形状
缩放（scale）：在原有位置上进行放大或者缩小
也包括3D转换，属性使用不同。
浮动：浮动后与浮动同向的margin会偏移两倍，反方向margin解决。
浮动中间可以使用多一个div来隔开浮动的效果。
父浮动，子不变。
选择器的学习，需要深入。

### 触发BFC：块级格式化上下文
.body根元素
.浮动元素：float除none以外的值
.绝对定位元素：position（absolute，fixed）
.display为inline-block，table-cells，flex
.overflow除了visible以外的值（hidden，auto，scroll）
1.BFC可以容纳浮动元素
2.同一个BFC下外边距会发生折叠
3.BFC可以阻止元素被浮动元素覆盖
---
### 层叠上下文（可以设置z-index来决定层叠）
z-index仅在position定位和非static上起效果
层叠等级和层级上下文决定堆叠顺序
由html标签产生的根层叠上下文，决定权在z-index上
inline/inline-block元素的层叠顺序要高于block/float元素
层叠等级层叠顺序相同时，后面的覆盖前面的
---
### 边距折叠
相邻的非浮动元素发生折叠
折叠发生在垂直外边距上
折叠后取最大的那个margin值作为最终值
浮动元素不折叠
margin折叠只发生在块级元素上
浮动元素不与其他元素margin折叠
BFC不与它的子元素发生margin折叠
绝对定位，根元素不与任何margin折叠
---
### 浏览器渲染机制
1.HTML解析出DOM Tree
2.CSS解析出Style Rules
3.将二者关联生成Render Tree
4.Layout根据Render Tree计算每个节点的信息
5.Painting根据计算好的信息绘制整个页面
回流（Reflow）：浏览器根据各自样式来计算结果并将元素放到它该出现的位置
触发reflow：
1.当增加，删除，修改DOM节点时，或是插入动画的时候
2.当移动DOM的位置，或是插入动画的时候
3.当修改CSS样式的时候
4.当Resize窗口的时候，或是滚动的时候
5.当修改网页的默认字体时
重绘（Repaint）：盒子的各种属性确认后，浏览器按照各自的特性绘制。
触发Repaint：
1.DOM改动
2.CSS改动
回流必将引起重绘，重绘不一定会引起回流。
### 白屏

### FOUC（浏览器样式闪烁）
只有在IE浏览器下才会出现， 原因有：
1.使用import方法导入样式表
2.将样式表放在底部
3.有几个样式表，放在HTML结构的不同位置
解决方法：使用link标签将样式表放在head中

### 不同浏览器的默认样式
例如：ul自带margin16px
去除默认margin和padding
在选择器处
```bash
* {
 margin:0;
 padding:0;
}
```
### css3动画使用
```bash
<img class="goods animated">
.animated {
  animation-name:move;//移动:keyframes定义的动画
  animation-duation: 3s;//持续时间3s
  animation-timing-function: linear;//线性移动
  animation-iteration-count:infinite;//无限循环
}
@keyframes move{
  from{
    transform: translateX(0)//从0点位X轴方向
  }
  to{
    transform: translateX(300px)//正向移动300px
  }
}
```
---
css：calc（）计算样式
```bash
width: calc(100% - 80px);//普通计算
--widthA: 100px;
  --widthB: calc(var(--widthA) / 2);
  --widthC: calc(var(--widthB) / 2);
  width: var(--widthC); //变量计算
```
outline:外边框
---

relative定位参考链接：https://juejin.im/post/5afb7fc7518825426d2d4aff
absolute定位参考链接：https://juejin.im/post/5aed4d3951882567236ea42e
