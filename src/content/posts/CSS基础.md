---
title: CSS基础
date: 2021-03-15 10:26:23
tags:
 - CSS
 - 响应式布局
categories: 页面样式
---
### 1. 盒模型？
盒模型：框模型，包含content(内容)、padding(内边距)、border(边框)、margin(外边距)。
## 1. IE模型和标准模型的区别？
IE模型：width=content+padding，height=content+padding
标准模型：width=content，height=content
## 2. CSS设置方式
可通过CSS3新增的属性box-sizing设置盒模型的模式，content-box(标准模型)，IE模型(border-box)。
## 3. JavaScript设置盒模型的宽高
1.dom.style.width/height //只能取到行内样式的宽和高，style标签中的link外链取不到。
2.dom.currentStyle.width/height //取到的是最终渲染后的宽高，只IE支持
3.window.getComputedStyle(dom).width/height //同(2)，IE9以上支持，其他浏览器支持
4.dom.getBoundingClientRect().width/height //同(3)，还可取到对于视窗的上下左右的距离
## 4. 外边距重叠
当两个垂直外边距相遇时，会形成外边距，合并后的外边距高度等于两个发生合并的外边距的高度中的较大者。普通文档流才会发生，行内框，浮动框和绝对定位之间的外边距不会合并。
## 5. BFC
BFC：块级格式化上下文
 - BFC元素垂直方向的边距会发生重叠。属于不同BFC外边距不会发生重叠。
 - BFC的区域不会与浮动元素的布局重叠。
 - BFC元素是一个独立的容器，外面的元素不会影响里面的元素。里面的元素也不会影响外面的元素。
 - 计算BFC高度的时候，浮动元素也会参与计算（清楚浮动）。
## 6. 触发条件
 - overflow部位visible；
 - float的值不为none；
 - position的值不为static或relative；
 - display属性为inline-block，table，table-cell，table-caption，flex，inline-flex
当子元素浮动不会影响父元素时，可以给父元素触发BFC。
---
### 2. CSS选择器
选择器类型：
 - 简单选择器：通过元素类型(元素名)、class(.)或id(#)匹配一个或多个元素
 - 属性选择器：通过属性/属性值匹配一个或多个元素
 - 伪类：匹配处于确定状态的一个或多个元素，比如被鼠标指针悬停的元素，或当前被选中或未选中的复选框，或元素是DOM树中一父节点的第一个子节点(:)
 - 伪元素：匹配处于相关的确定位置的一个或多个元素(::)
 - 组合器：不仅是选择器本身，还以有效的方式组合老两个或更多的选择器用于非常特定的选择的方法。(嵌套)
 - 多用选择器：以逗号分隔开的多个选择器放在一个CSS规则下面
---
### 3. BFC
块级格式化上下文，独立的容器，不影响外面的布局。
触发条件：
 - body根元素
 - 浮动元素
 - 绝对定位元素
 - display(inline-block、table-cells、flex)
 - overflow(hidden、auto、scroll)
特性：
 - 在同一个BFC中，外边距会发生折叠
 - BFC可以包含浮动的元素(清除浮动)
 - 可以阻止元素被浮动元素覆盖
---
### 4. position
 - 默认是static(静态定位)
 - 相对定位(relative)
 - 绝对定位(absolute)
 - 固定定位(fixed)
 - sticky(fixed和relative的混合)
元素根据z-index决定显示层级
---
### 4. flex布局
根据主轴和交叉轴进行排列
align-items(交叉轴方向)：对齐方式
justify-content(主轴方向)：对齐方式
---
### 5. CSS优先级
根据权重决定
 - 行内样式+1000
 - id选择器+100
 - 属性,class选择器,伪类+10
 - 元素选择器,伪元素+1
 - 通配符+0
 - !important提升样式优先级(最高)，最好不用
css样式单线程，依次从上向下加载，优先级和加载顺序有关
!important>行内>内联and外联
权重相等时，靠近目标的优先
总结：
 - !important > id > class > tag
 - !important可以提升，不建议使用，会影响子属性
 - 同样的!important，按权重决定
 - 同一个CSS样式写两次，前面会被覆盖
 - 样式指向同一元素，权重规则生效，权重大的被应用
 - 样式指向同一元素，权重规则生效，权重相同，就近原则，后面的样式应用
 - 样式不指向同一元素，权重失效，就近原则，离目标近的样式应用
---
### 6. 双飞翼/圣杯布局
## 6.1 圣杯
1.给left、middle、right设置float:left，脱离文档流
2.给container设置overflow:hidden，形成BFC撑开文档
3.left，right设置上各自的宽度
4.middle设置width:100%
5.给left,middle,right设置positon:relative
6.left设置left:-leftWidth,right设置right:-rightWidth
7.container设置padding:0,rightWidth,0,leftWidth
```
.left middle right {position:relative;float:left;word-break:break-all}
.left{margin-left:-100%;left:-200px;width:200px;}
.right{margin-left:-220px;right:-220px;width:220px;}
.middle{width:100%}
```
## 6.2 双飞翼布局
1.middle增加inner
2.给left,middle,right设置float:left脱离文档流
3.container加上overflow:hidden,触发BFC
4.left,right设置宽度
5.middle设置width:100%
6.left设置margin-left:-100%,right设置right:-rightWidth;
7.container设置padding:0,rightWidth,0,leftWidth;
```
.left middle right {float:left;word-break:break-all}
.left{margin-left:-100%;width:200px}
.right{margin-left:-220px;width:220px;}
.middle{width:100%;height:100%}
```
由于双飞翼布局会压缩中间部分的宽度，所以需要设置min-width>LeftWidth+RightWidth
---
### 7. CSS3新特性
## 7.1 过渡
transition: CSS属性，花费时间，效果曲线(默认ease)，延迟时间(默认0)
transition:width,.5s,ease,.2s
## 7.2 动画
animation:动画名称，花费时间，运动曲线，动画延迟，播放次数，是否反向动画，是否暂停动画
animation:logo2-line 2s linear;
## 7.3 形状转换
tranform:适用于2D或3D转换的元素
transform:rotate(30deg);
## 7.4 选择器
[CSS选择器参考手册](https://www.w3school.com.cn/cssref/css_selectors.asp)
## 7.5 阴影
box-shadow:水平阴影位置 垂直阴影位置 模糊距离 阴影大小 阴影颜色等
box-shadow:10px 10px 5px #888888
## 7.6 边框
border-image:..//边框图
border-radius:..//边框圆角
## 7.7 背景
background-clip:padding-box;//content-box
## 7.8 反射
-webkit-box-reflect:方向[above-上|below-下|right-右|left-左]
## 7.9 文字
单行文本溢出：
```
text-overflow:显示省略号 clip(溢出裁剪) ellipsis(溢出显示省略)
white-space:不能换行
overflow:隐藏超出内容
```
多行文本溢出：
伪元素+定位：基于高于截断
```
position:relative;
overflow:hidden;
position:absolute;省略号定位
line-height:20px//结合元素高度
height:40px//元素高度
::after{} //设置省略号样式
```
兼容性较好
纯CSS实现：基于行数截断
```
-webkit-line-clamp:2//限制行数
display:-webkit-box//作为弹性盒子模型显示
-webkit-box-orient:vertical//排列方式
overflow:hidden//溢出隐藏
text-overflow:ellipsis//省略号
```
如果为英文或数字，需添加word-wrap:break-word
---
### 8. CSS画三角
```
.border {
    width: 0;
    height: 0;
    border-style:solid;
    border-width: 0 50px 50px;
    border-color: transparent transparent #d9534f;
} //利用边框

.box {   //直角三角形
    /* 内部大小 */
    width: 0px;
    height: 0px;
    /* 边框大小 只设置两条边*/
    border-top: #4285f4 solid;
    border-right: transparent solid;
    border-width: 85px; 
    /* 其他设置 */
    margin: 50px;
}
```



