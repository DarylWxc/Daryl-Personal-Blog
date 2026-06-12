---
title: JavaScript之常用设计模式
date: 2022-01-11 15:10:23
tags:
 - javaScript
 - 设计模式
categories: javaScript设计模式
---
### 1. 适配器模式
## 1.1 适配器的意义
比作一个插头，与一个接口不兼容，但是接上了适配器，就可以通过适配器的另一端去与接口适配上了。相同的也有USB转接口、电源适配器、港式插头转换器等。
## 1.1 适配器的应用
适配器只有在接口无法正常工作的时候能用上。
实例场景：
```
var renderMap = function( map ){
    if ( map.show instanceof Function ){ 
       map.show();  //渲染定图的接口方法为show
    } 
};
var googleMap = { 
   show: function(){ //谷歌地图方法为show
     console.log( '开始渲染谷歌地图' ); 
 } 
 }; 
var baiduMap = { 
   display: function(){ //百度地图方法为display
     console.log( '开始渲染百度地图' ); 
   } 
 };

var baiduMapAdapter = {//通过百度适配器来使百度地图也能调用接口
   show: function(){ 
      return baiduMap.display();
   }
}；

renderMap( baiduMapAdapter ); // 百度地图调用接口
```
就是经过适配器后可以转换接口对接方式。
## 1.3 小结
适配器模式是一对相对简单的模式。装饰者模式、代理模式和外观模式都属于“包装模式”，都是由一个对象包装另一个对象。区别它们的关键仍然是模式的意图。
- 适配器模式主要解决两个已有接口直接不适配的问题，不考虑接口的实现和将来的演化。不需要改变已有接口，只需要使它们协同作用。
- 装饰者模式和代理模式也不会改变接口，但装饰者模式作用是为了给对象增加功能。适配器通常只包装一次。代理模式是为了控制对对象的访问，也只包装一次。
- 外观模式的作用和适配器相似，但外观模式最显著的特点是定义了一个新的接口。

---
### 2. 策略模式
## 2.1 策略模式的意义
从A到B有多种不同的方案可以选择，这些方案可以随意互相替换，就是策略模式。
## 2.2 策略模式的应用
```
//使用策略模式前的代码
var calculateBonus = function( performanceLevel, salary ){ 
 if ( performanceLevel === 'S' ){ 
    return salary * 4; 
 } 
 if ( performanceLevel === 'A' ){ 
    return salary * 3; 
 } 
 if ( performanceLevel === 'B' ){ 
    return salary * 2; 
 } 
};
//策略模式重构后的代码
var strategies = { //将各个策略封装起来
 "S": function( salary ){ 
    return salary * 4; 
 }, 
 "A": function( salary ){ 
    return salary * 3; 
 }, 
 "B": function( salary ){ 
    return salary * 2; 
 } 
};
var calculateBonus = function( level, salary ){ //使他们可以相互替换
 return strategies[ level ]( salary ); 
};
console.log( calculateBonus( 'S', 20000 ) ); // 输出：80000 
console.log( calculateBonus( 'A', 10000 ) ); // 输出：30000
```
## 2.3 多态在策略模式中的体现
通过策略模式重构后，消除了条件分支语句。跟计算有关的逻辑不放在Context中，分部在各个策略对象中。Context并没有计算奖金的能力，而是把这个职责委托给了某个策略对象。每个策略对象已经被各自封装在对象内部，这是对象多态性的体系，也是相互替换的目的。

## 2.4 使用策略模式实现缓动动画
通过将对象的动作都保存起来作为属性，然后通过定时器去分别调用不同的动作，形成一个缓动的效果，可以让对象动起来。

## 2.5 表单校验
使用策略模式进行表单校验
```
//定制校验策略
var strategies = { 
 isNonEmpty: function( value, errorMsg ){ // 不为空
    if ( value === '' ){ 
       return errorMsg ; 
    } 
 }, 
 minLength: function( value, length, errorMsg ){ // 限制最小长度
    if ( value.length < length ){ 
       return errorMsg;
    } 
 }, 
 isMobile: function( value, errorMsg ){ // 手机号码格式
    if ( !/(^1[3|5|8][0-9]{9}$)/.test( value ) ){ 
       return errorMsg; 
    } 
 } 
};
//实现校验类，Validator作为Context，负责接收用户请求然后委托给策略对象
var validataFunc = function(){ 
 var validator = new Validator(); // 创建一个 validator 对象
 /***************添加一些校验规则****************/ 
   validator.add( registerForm.userName, 'isNonEmpty', '用户名不能为空' ); 
   validator.add( registerForm.password, 'minLength:6', '密码长度不能少于 6 位' ); 
   validator.add( registerForm.phoneNumber, 'isMobile', '手机号码格式不正确' ); 
   var errorMsg = validator.start(); // 获得校验结果
   return errorMsg; // 返回校验结果
} 
 var registerForm = document.getElementById( 'registerForm' ); 
    registerForm.onsubmit = function(){ 
       var errorMsg = validataFunc(); // 如果 errorMsg 有确切的返回值，说明未通过校验
       if ( errorMsg ){ 
       alert ( errorMsg ); 
       return false; // 阻止表单提交
    } 
};
//实现Validator类的功能
var Validator = function(){ 
   this.cache = []; // 保存校验规则
}; 
Validator.prototype.add = function( dom, rule, errorMsg ){ 
   var ary = rule.split( ':' ); // 把 strategy 和参数分开
   this.cache.push(function(){ // 把校验的步骤用空函数包装起来，并且放入 cache 
      var strategy = ary.shift(); // 用户挑选的 strategy 
      ary.unshift( dom.value ); // 把 input 的 value 添加进参数列表
      ary.push( errorMsg ); // 把 errorMsg 添加进参数列表
      return strategies[ strategy ].apply( dom, ary ); 
 }); 
}; 
Validator.prototype.start = function(){ 
    for ( var i = 0, validatorFunc; validatorFunc = this.cache[ i++ ]; ){ 
       var msg = validatorFunc(); // 开始校验，并取得校验后的返回信息
       if ( msg ){ // 如果有确切的返回值，说明校验没有通过
          return msg; 
       } 
    } 
};
```
## 2.6 策略模式的优缺点
- 利用组合、委托和多态等技术思想，可以有效地避免多重条件选择语句。
- 提供了对开放-封闭原则的完美支持，将策略封装在独立的对象中，易于切换，理解，扩展
- 可以复用在系统的其他地方，从而避免许多重复的复制粘贴工作
- 利用组合和委托来让context拥有执行算法的能力，也是继承的一种轻便替代方案

## 2.7 小结
策略类一般被函数所替代，策略模式让我们明白使用函数的好处。

---
### 3. 状态模式
