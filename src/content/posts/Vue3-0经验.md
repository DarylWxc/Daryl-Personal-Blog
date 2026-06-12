---
title: Vue3.0经验
date: 2020-07-10 17:12:58
tags:
 - 前端框架
categories: Web前端
---
## 先安装cli脚手架，命令如下：
```bash
npm install -g @vue/cli
$vue -V //使用命令查看cli版本
@vue/cli 4.3.1 //当前cli版本
```
## 初始化Vue项目，命令如下：
```bash
vue create "项目名称" //创建项目
>Manully select features //手动选择
Babel,Router,Vuex,CSS Pre-processors,Linter / Formatter //选择这些模块
```
剩下的直接回车

## 升级项目，命令如下：
```bash
cd "项目"
vue add vue-next //安装
```
该命令会完成：
·安装Vue3.0依赖
·更新Vue3.0 webpack loader配置，使其能够支持 .vue文件构建（重要）
·创建Vue3.0 的模板代码
·自动升级Vue Router
·自动生成Vue Router和Vuex模板代码

## 启动项目
基于ReadMe.md，其中的命令启动项目。

## 项目过程问题
使用composition API的provide和inject实现组件间传值
注意！！provide和inject只能在setup（）函数中使用
```bash
import {provide} from 'vue' //引入provide
provide("data","send") //父组件传值
let send = inject("data") //子组件接收
return {
  send //返回使用
}
```

### Vue3.0新特性
Vue3.0的设计目标是更快，更小，并更好的支持TypeScript
新特性包括
```bash
composition
Multiple root elements
Suspense
Multiple V-models
Reactivity
Teleport
Transition
Remove Filter
App configuration
```

## 1、Composition API
Vue3.0中模板带有setup（）函数，用于处理数据，需要使用ref函数声明数据（也可以直接声明函数），return返回在模板中使用。
```bash
import {ref} from 'vue'
export default{
   setup() {
      const count = ref(0)
      const inc = () =>{
          count.value++
      }
      return { 
          count,
          inc
      }
   }
}
```
composition主要有两大好处：
1.清晰的代码结构2.消除重复逻辑
小结：composition API主要针对闭包的应用，通过其他函数中声明值，并使用watch函数监视，在需要的组件引入，达到代码复用。

## 2、Multiple root elements
Vue2.0中template的根元素只能取一个，要用div包含。
Vue3.0中取消了这一限制：
在template中使用任意数量的标签

## 3、Suspense
Suspense使用与前后端数据交互时，提供默认内容加载，当数据返回时配合使用v-if来控制数据显示。
Suspense简化了这个过程：它提供了default和fallback状态：
```bash
<Suspense>
    <template #default>
      <div v-for="item in articleList" :key="item.id">
        <article>
          <h2>{{ item.title }}</h2>
          <p>{{ item.body }}</p>
        </article>
      </div>
    </template>
    <template #fallback>
      Articles loading...
    </template>
</Suspense>
```
## 4、Multiple v-models
一个表单可以绑定多个V-model
```bash
<Form>
    v-model:name="name"
    v-model:age = "age"
</Form>
```
## 5、Reactivity
3.0响应式系统全部用Typescript重构，利用代理（Proxy）和反射（Reflect）来替换Vue2.0的Object.defineProperty
耦合度降低，分类清晰。
支出通过修改数组下标的时候进行响应。
## 6、Portals
