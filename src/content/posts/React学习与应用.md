---
title: React学习与应用
date: 2021-09-28 14:23:48
tags:
 - 前端开发
categories: 前端
---
### 1.项目搭建
## 1.1 脚手架搭建项目
npm正常拉框架
## 1.2 手动敲打Demo
书写声明不同方式的组件
function Name(props){ return 代码块}
class Name extends React.Component{ render (){ return (代码块)}}
可以在class内声明构造函数,construstor(props){super(props);this.state={}}
state必须为对象或Null
切有对应的声明周期钩子（类似vue）:
1.componentWillMount()挂载到DOM前调用，只调用一次
2.componentDidMount()挂载到DOM后调用，只调用一次
3.shouldComponentUpdate(nextProps)//用于重新render的情况，更新props
4.componentWillReceiveProps(nextProps)//用于将props转换成自己的state，此函数下调用setState不会引起二次渲染
5.componentWillUpdate(nextProps,nextState)//更新前调用
6.componentDidUpdate(prevProps,PrevState)//更新后调用
7.componentWillUnmount//组件卸载阶段，一个方法
## 1.3 单向数据流动
props赋值给state，state为组件独有状态。state可以继续向下传，作为props。
## 1.4 事件处理
在回调函数中使用this，需要通过bind函数绑定:
this.handle = this.handle.bind(this)//函数绑定到组件上
然后在组件中声明函数，通过this在html上绑定事件处理
函数未绑定，需要在DOM元素上通过调用箭头函数
传参需要直接调用函数并显示传参(e)=>this.methods(id,e)
this.methods.bind(this,id); 此时传入的参数为第二个参数
## 1.5 条件渲染
通过Boolean判断需要return什么组件，再创建一个组件用Boolean值判断来决定return的内容
## 1.6 列表循环
通过map函数 返回一个元素列表并return，每个元素需要分配一个key，用于标识有改动的元素。key值必须唯一。
## 1.7 状态提升
兄弟组件共用父组件的state变量，调用父组件的函数修改state值。
## 1.8 路由使用
## 1.8.1 路由配置
当前路由配置：使用Switch组件，通过Route标签定义路由，标签还有path属性和component属性，且需要exact属性(用于精准匹配)，跳转则通过props.history.push，传入path属性可进行跳转
优化点：可以将路由封装成一个组件，Switch标签包含，通过定义路由数组，使用map进行渲染。且当前还未使用嵌套路由，后续待跟进。
## 1.8.2 路由传参
组件中props有location属性包含state,query,都可用于传参，其中state刷新参数会保存，query刷新会重置参数。传递方式同Vue相同，通过props的history属性进行路由跳转与参数传递。
且location属性含有search为链接后缀，可使用QS库进行解析(npm install qs), QS.parse();
## 1.8.3  路由钩子函数
路由跳转前有一个钩子函数routerWillLeave，可用于拦截跳转(return false)，或跳转前提示用户(return Message)。需要在路由组件中使用。引入Lifecycle mixin来安装钩子。
路由还提供了两个钩子函数分别是onEnter(next,replace),onLeave()，分别在路由即将进入时调用和路由即将退出时调用。
## 1.9 react-redux使用
安装完redux react-redux后，进行开发。
### 1.9.1 store
可专门创建一个文件夹用于放总store合集，一个文件用于整合reducer，将其他reducer文件引入用combineReducers打包成一个总reducer，引入createStore创建后，通过Provider组件进行传递。
### 1.9.2 reducer
reducer用于初始化状态并且改变状态的值，在reducer里注册初始值然后设置action函数用于改变state的值，常用Switch语法，给action设置type属性与payload属性，type判断操作类型，payload为操作值。
### 1.9.3 使用方法
react redux版本@7.1以上新增了useSelector,useDispatch函数,通过useSelector可以获取state，在render前定义并且使用即可，通过useDispatch调用操作去改变state的值，可以实时渲染(函数式组件)。
//react redux#7.1版本以下
旧版本react redux使用connect函数，链接App组件进行绑定，让App组件下的子组件可以通过context上下文获取state，同样通过provider进行传递，但需要定义mapStateToProps和mapDispatchToProps分别用于获取state和改变state值(类组件)。
### 1.9.4 小结
值得一提的是，vuex与redux的思路都类似于将一个对象属性挂载在window对象上进行管理，如果有空余时间可以研究flux，可以自己开发一个store状态管理库
## 1.10 权限控制
### 1.10.1 页面权限
页面权限可以理解为路由权限。可以通过封装路由组件来控制菜单的展示，或者通过后台控制返回的数据，异步加载路由菜单，通过数据控制。
### 1.10.2 按钮权限
暂无

----
# 3.0 问题列表
1. 路由重定向redirect标签，导致路由刷新会重定向到首页，删除标签即可
2. 













