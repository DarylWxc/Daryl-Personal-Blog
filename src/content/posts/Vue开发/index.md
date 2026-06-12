---
title: Vue开发
date: 2020-05-26 14:50
tags:
 - 前端框架
categories: Web前端
---
This is my vue develop exprience~
---
## 2020/5/7 16:02 Write

过往项目经验总结

关键词：Vue，CSS，SVN，WebPack，IconFont，Flex，Jeecg，Iview，ElementUI

```bash
使用Vue开发页面，环境配置，导入包，Package，使用IView组件进行页面开发。
（使用开源组件一定需要查看开发文档！！！！！！）
CSS排版布局，flex学习并使用，各种定位的深入了解。
router路由在Vue当中的使用，熟练使用组件进行开发。
熟练使用SVN进行提交和更新代码，提交需要带钩子，如果本地有更改过的文件，在更新时需要将有改动的文件删除再更新，否则会出现乱码
父子组件间的传值通信，Props的使用，对话框的熟练使用。
分析需求并设计页面，使用Axure进行页面的设计，使用开源的移动端组件和阿里的IconFont，必要时可以自行设计组件。
熟悉WebPack框架和Cli脚手架。
```
---

```bash
使用ant-design-jeecg-vue进行开发，代码自动生成。文档链接：[jeecg开发文档]("http://doc.jeecg.com/1273969")
该框架生成的代码由ElementUI组件组成。
考虑页面的逻辑和合理性。
弹框嵌套，需要注意层级。
```

---


## 2020/5/7 10:33 Write

使用Vue进行对应页面开发

```bash
使用elementUI进行页面的开发，使用Upload上传文件，自带判断文件后缀。
使用POST方法，带FormData参数，使用Append添加序列，需要New一个FormData对象，然后进行传参。
使用Dialog组件，显示设备详情，点击跳出，准备参析路由。
GET方法带的参数只有Params对象。跟在URL后面。
POST和GET不同：//都为TCP链接，并无差别。
参数格式不同以外，参数的大小也不同。因为服务器的处理方式不同，不一定能接受到数据（request body的数据）。
由于HTTP的规定和浏览器/服务器的限制，应用过程体型出不同。
GET产生一个TCP数据包，POST产生两个TCP数据包。
GET，header和data一起发过去，响应200。（返回数据）
POST，先发送header，服务器响应continue，再发送data，响应200。（ 返回数据）
```

---

## 2020/5/7 15:53 Write

使用Element组件遇到的问题~

```bash
使用elementUI的UpLoad组件上传xls文件，需要注意文件格式和文件获取
组件自带上传，可以设置header和数据的name，需要注意Token或者Cookie
组件获取文件的方式   this.$refs.{upload}（这是关联upload组件的ref名称）.$data.uploadFiles
注意dialog组件的visible显示值设置
详细查看开发文档！！！！！必要时进行测试获取信息！！
```

---

## 2020/5/8 9:38 Write

使用SVN合并代码，并开发模式遇到问题

```bash
将文件checkout在其他文件夹里，然后修改原代码文件。
多注意NetWork中请求的格式，请求的参数格式！！！！
其中GET方式的URL会随参数改变，POST方式不会。
使用POSTMan测试。
接口文档管理有使用到SWAGGER和小幺鸡~
```

---

## 2020/5/9 9:53 Write

总结工作经验，编写简历

---

```bash
Vue的两种路由模式：Hash和History模式
hash：默认模式
常用NewURL和OldURL来改变链接，动态页面数据。hash值发生变化的时候，会触发hashchange这个时间，通过该事件监听hashchange来实现更新页面部分内容。
History模式：
切换历史状态，back，forward，go三个方法，刷新页面会请求服务器。History模式需要避免刷新。刷新时如果没有相应的响应或者资源，会刷新出404。
```
---

```bash
同事开发地图，使用蜂鸟地图插件。经过询问得知，正在研究。
```
---
```bash
回温Vue文档。查看生命周期。
beforeCreate()->created()->beforeMount()->mounted()->beforeUpdate()->updated()->beforeDestroy()->destoryed()//函数调用顺序，中间各有过程
周期如下图
```
![vue](vue.png)
```bash
在使用ElementUI的Upload上传文件时，action的动态响应是在上传后执行的，所以需要给上传方法设置延时器，并且用到this上下文的时候，需要将this传到该函数内使用，否则会报错。
上传可以设置header的值，在初始化的时候获取token：this.header = {token:`${this.$cookie.get('token')}`}
设置的header是一个对象，给header的token属性赋值，要求上传成功后自动关闭对话框，然后清除选择文件数据：this.$refs.upload.clearFiles();
需要考虑功能全面，合理
```
---
```bash
vue中数据异步渲染，数据响应式为Vue 的重要核心，在数据变更后，可能DOM还未更新，所以可以调用nextTick（callback）函数，这样回调函数将在DOM更新完后被调用。并且this会绑定到当前的vue实例上。
同域：域名、端口、协议均相同，缺一不可。
跨域：浏览器从一个域名的网页去请求另一个域名的资源时，不同域，就是跨域。//可能会被另一个域保存Cookie或session用来对同域网站发起非法操作，为CSRF攻击，盗用身份。
解决方法：JSONP，CORS。//https://www.jianshu.com/p/f880878c1398(参考)
使用FileZilla Client进行网页部署，连接到服务器，将右边框内dist文件删除，从左边框内选择本体文件，然后右键上传。
```
---

Vue加载本地图片失败，无法使用相对路径。
//使用绝对路径 :src="'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'"
//使用require :src="require('@/assets/images/icon/file/jpg.png')"
//使用import   import jpg from '@/assets/images/icon/file/jpg.png'
Vue使用vue-awesome
//执行指令 npm install vue-awesome
//在main.js文件下 import 'vue-awesome' || import Icon from 'vue-awesome/components/Icon'
//Vue.component('icon',Icon)  然后正常使用  <icon name=”beer”></icon>
Vue使用Iconfont
//选择Icon加入购物车，并且下载源码
//执行命令npm install css-loader -D(否则会报错）
//在main.js文件中引入 import '@/assets/Iconfont/iconfont.css'!!!!!注意这里使用@，绝对路径
//直接使用<i class="iconfont icon-MV" style="color: white"></i>  在iconfont.json文件中查看各个icon的fontclass
Vue行内写hover样式
//onmouseover="this.style.color='#57EDED'"!!由于无法实现hover，使用js事件实现，并且在参数边要加引号''
//改变光标形状为小手:cursor='pointer'
Vue点击跳转链接
//如果不写协议，会自动在链接前加上localhost:8080(相当于一个相对路径)
CSS3 animaiton 实现图片旋转
//animation: 15s linear 0s normal none infinite rotate;
//animation-play-state: running;
Vue导入本地音频文件
//文件放入static文件里，无需改变任何Webpack配置，直接引入
//引入写法：mp3Url:"static/attack音D.mp3"
Vue js将小数转为整数值
//toFixed(2) 后面的数值代表保留两位小数
Vue 将字符串转化为数值
//parseInt(str) 如果是浮点数，将Int改成float即可
Vue 实现进度条
// element UI 放置 el-progress   :percentage="mp3width" 设置percentage为数值变量
// 实现函数LoadProgress 通过setInterval改变mp3width的值（浮点数）
//使用el-slide,可以实现点击和拖拽
//需要注意函数运行速度，存在未取到值而后直接进行计算
Vue注意事项
//开发到后发现，需要通过数据关联来通过子组件控制父组件。
//还有一些加载速度，值得优化和注意。
Vue遇到组件通信问题
//尽量减少组件层数，如果在同一层父组件时，子组件可以一起和父组件通信，获得数据共享。

---

深入响应式原理，vue的核心。
当一个对象在实例化中的data选项，Vue将遍历此对象所有的property，转为getter和setter。
每个组件实例都对应有一个watcher实例，在渲染过程中把数据property记录为依赖，之后当setter触发时，会通知watcher，使关联的组件重新渲染。
注意：当数据在data选项外时，为非响应式！！！
数组的长度和直接利用索引直接设置的数据都不是响应性的，这时可以使用set方法，使用index和数组的子项更新数据。
vue提前声明所有的响应式property。
Vue在更新DOM时是异步执行的，侦听到数据变化时，将开启一个队列，缓冲在同一事件循环中发生的所有数据变更。
使用原生html，js，css开发文书模板。
body{padding:0px;margin:0px} //适应浏览器，无白边
使用占位符，空格（&nbsp），后用正则表达式替换。
text-align:justify;// 文字两端对齐
margin:0 auto;// 左右对齐
white-space:normal// 文字换行,元素空白处理
div的使用和flex的合理使用
---

使用远程桌面连接部署，Windows+r运行 mstsc
输入用户名和密码，连接
然后将本地的文件复制并粘贴部署到连接的服务器上

---

## 开源项目Vue-element-admin
权限验证：根据用户登录的role去判断角色请求路由表，动态生成可访问页面。路由挂载。
指令权限：通过封装方法，判断角色权限，类似于V-if，不同角色能看到的操作不同。
spa(single page web application 单页面开发)//科普
路由：分动态和静态路由，主要需要注意引入和使用到的地方，需要快速定位代码中使用路由的位置，研究动态路由的实现。
在文件夹中选择find in path 在所有文件中查询使用的地方
将router的path改为“/”为默认跳转的第一页面
vue有三类路由钩子
1.全局钩子  调用router.beforeEach和.afterEach函数 其中next，to中如果带参数，会导致回调，要避免死循环。
2.某个路由的钩子
3.组件内钩子
Vuex使用和了解
```bash
//State
computed: {
    count () {
      return this.$store.state.count//一般如此调用store的数据
    }，
...mapState({ //或者通过mapState函数，批量获取
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
  }
//Getter
 getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)//返回处理过的数据
       return this.$store.getters.doneTodosCount//直接返回函数运行后返回的对象
    }
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device
}
computed: { //依旧在computed辅助函数里调用，mapGetters函数
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
//mutation 相当于函数，用于改变state的值
store.commit('increment')//调用mutation handler方式
// ...
mutations: {//mutation函数，限制函数同步执行
  increment (state, n) {//可以传值
    state.count += n
  }
}
store.commit('increment', 10)//传入值10
mutations: {
  increment (state, payload) { //一般是传入一个对象
    state.count += payload.amount
  }
}
const mutations = {
  SET_TOKEN: (state, token) => { //使用常量来定义函数名
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {//同上
    state.introduction = introduction
  }
}
commit('SET_ROLES', roles)//调用时
commit('SET_NAME', name)
//action 类似于mutation，可以在其中调用mutation，可以内部执行异步操作
actions: { //action函数接受一个与store实例具有相同方法和属性的context对象，可以通过该对象获取state和gettersstore.dispatch('increment')
  increment ({ commit }) {
    commit('increment')
  }
}
store.dispatch('increment')//action函数通过dispatch方法触发
//在action中有设计到登录操作，调用异步API和分发多重mutation
也可使用mapAction
//Module 用于将store分割成模块，每个模块拥有自己的state，mutation，action，getter，从上到下分割
在状态数较大时可以使用，避免臃肿。
设置Namespaced：true，使其成为带命名空间的模块，避免冲命名污染。
在全局命名空间内分发action或提交mutation，将root：true作为第三参数传给dispatch或commit，直接访问到root下的函数（数据）。
```
---
可以在assets文件中放置css文件，或者一些静态文件。在main.js引入，全局调用。
路由在跳转的时候可以传递参数，有三种方式：
方案1
```bash
this.$router.push({//使用方法
    path: `/describe/${id}`,
)}
{//对应配置的路由
  path:'/describe/:id',
  name: 'Describe',
  component: Describe
}
this.$route.params.id//调用方法
```
方案二
```bash
this.$router.push({//使用方法
    name: 'Describe',
    params: {
      id: id
   }
})
//路由正常配置
$route.params.id//调用方法
```
方案三
```bash
this.$router.push({//使用方法
  path: '/describe',
  query: {
    id: id
  }
})
$route.query.id//调用方法
```
---
项目菜单栏：通过多个组件组成，使用el-scrollbar组件（在element文档没有标注）
包裹el-menu，自定义sidebar-item组件使用v-for动态生成多个子项，通过v-if来判断子项显示模式，使用render函数返回item组件作为menuitem，使用link组件（通过：is来判断标签类型，v-bind绑定跳转链接）包裹item来作为跳转链接。
mixins混入的使用，其中有函数，数据，并且在每个组件混入的数据都是独立的。（主要作用：代码复用，减少冗余），其中在mixins里的函数命名必须带$_避免引入组件中函数名重复。
scss文件引入其他scss文件，可以调用类型，但无法调用里面的属性和mixins，在main.js引入就可以全局调用，包括引入文件中已经引入的文件。
Item组件使用render函数返回的原因（性能问题）
css3的使用，美化页面。
---
v-for的使用，需要一个参数（item,i）in（数组或对象）,可以生成多个。
布局注意，P标签自占高度，使用a标签，display：block，块级元素，就可以调整高度了。canvas的使用需要研究，图形实现的好方法。
安装prettier自动代码格式化。
通过ps打开图片获取颜色和像素。
---
Vue项目不同环境打包指令和配置
1.env.js文件中各自有
```bash
'use strict'
module.exports = {
 NODE_ENV: '"production（生产）"',//testing（测试）,development（开发）
 EVN_CONFIG:'"prod"',//test,dev
 API_ROOT:'"/apis/v1"'//api代理地址
}
```
2.还需修改package.json文件
```bash
"scripts": {
  "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
  "start": "npm run dev",
  "build": "node build/build.js",
  "build:test": "cross-env NODE_ENV=production env_config=test node build/build.js",
  "build:pre": "cross-env NODE_ENV=production env_config=pre node build/build.js",
  "build:prod": "cross-env NODE_ENV=production env_config=prod node build/build.js"
 }
```
3.修改config/index.js
```bash
build:{
  // Template for index.html
  // 添加test pre prod 三处环境的配制
  prodEnv: require('./prod.env'),
  preEnv: require('./pre.env'),
  testEnv: require('./test.env')
}
```
4.在webpackage.pro.conf.js中使用构建环境参数
```bash
// 个性env常量的定义
// const env = require('../config/prod.env')
const env = config.build[process.env.env_config+'Env']
```
5.build.js文件修改
```bash
'use strict'
require('./check-versions')()
// 注释掉的代码
// process.env.NODE_ENV = 'production'
const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')
// 修改spinner的定义
// const spinner = ora('building for production...')
var spinner = ora('building for ' + process.env.NODE_ENV + ' of ' + process.env.env_config+ ' mode...' )
spinner.start()
//更多的其它内容，不需要做任何调整的内容 ...
```
6.打包指令
npm run build:test//测试环境
npm run build:prod//生产环境
以此类推
---
异步加载：async,defer,动态创建script标签
异步任务：promise，async
---
8中数据类型分别是：
Number，String，Boolean，Null，undefined，object（data，function，array），symbol，bigInt
Null只有一个值，是null，不存在的对象。
Undefined只有一个值，是undefined，没有初始化，undefined是从null中派生出来的。
Undefined是没有定义的，null定义了但是为空。
基本类型的变量是存放在栈内存（stack）里的
基本类型的值是按值访问的
基本类型的值是不可变的
基本类型的比较是它们的值的比较
类型方法
运算符优先级[参考链接表](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)
---
柯里化：接受多个参数的函数变换成接受一个单一参数的函数，并且返回接受余下参数并且返回结果的新函数。
```bash
// 普通的add函数
function add(x, y) {
    return x + y
}

// Currying后
function curryingAdd(x) {
    return function (y) {
        return x + y
    }
}
```
---
数组常用方法（array）：
1.concat（arrA，arrB，...）//合并数组
2. arr.join（separator）//数组转字符串
3.arr.toString //无参数，转字符串
4.arr.toLocaleString//以逗号隔开输出
5.arr.slice（start，end）//截取数组
6.arr.splice（index，many，【item1】）//数组删除/添加
7.arr.unshift（x,y）//头部增加
8.arr.shitf（）//头部删除
9.arr.push(x,y)//尾部增加
10.arr.pop()//尾部删除
11.arr.sort(sortby) //按字符编码进行排序
12.arr.reverse（）//数组颠倒
13.arr.filter()//数组过滤
字符串常用方法（string）：
1.str.charAt(index)//返回指定位置的（字符）！！
2.str.indexOf(value,[index])//从index找，返回value第一次出现的下标
3.str.match（value）//存放匹配结果的数组
4.str.split(separator,[many])//数组在separator指定的边界处分割字符串
5.str.search(str)//第一个与str匹配的子串起始位置
6.str.slice(start,end)//按下标截取字符串
7.str.substr(start,[length])//返回从start开始的len个字符
8.str.substring（start,[stop]）//提取start到stop的字符串
9.str.concat(x,y,z)//连接字符串
10.str.replace(substr,replacement)//替换字符串中的部分
11.str.toLowerCase()//变小写
12.str.toUpperCase()//变大写
数组循环方法：
forEach(),for-of
---
引用类型：
Object，Array，RegExp，Date，Function
引用类型的值是保存在堆内存（heap）中的对象（object）
引用类型的值是按引用访问的
引用类型的值是可变的
引用类型的比较是引用的比较
---
深浅拷贝
浅拷贝为引用，深拷贝为创建一个相同的新对象。
---
异步和同步
1.同步任务在主线程上形成一个执行栈
2.主线程外还有一个任务队列
3.一旦“执行栈”里的任务执行完毕，系统会读取任务队列里的任务执行
4.主线程重复以上三个步骤
heap（堆）stack（栈）
任务队列中可以放置定时事件（setTimeout，setInterval）
定时器将事件插入任务队列，等执行栈执行完才能去执行指定的回调函数
---
使用setInterval()循环，在mounted函数中使用。
```bash
data:{timer:''}
this.timer = setInterval(()=>{此处写函数},3000)//1000为1s
beforeDestroy(){
  clearInterval(this.timer)//在页面销毁前关闭计时器
}
```
---
### 使用store
创建新文件timer.js用来设置计时器
在index.js主store中引入
```bash
import timer from './modules/timer'
const store = new Vuex.Store({
     modules:{
        timer
     }
})
export default store //暴露，可以外部引入
```
在js文件中，需要引入store ///import store from './store'
直接调用store即可// store.state.clock//store.commit('set_clock',1)
在组件当中调用//this.$store.dispatch对应action（异步）
//this.$store.state对应对象
//this.$store.commit对应mutation（同步）!!只有mutation可以改变状态
//this.$store.getters对应getter //挂载数据计算功能（里面可有数据计算函数）
---
路由监听：
permission文件当中使用的this.$router.beforeEach(to,from,next)=>{}是全局监听路由的方法
vue页面中有三种监听路由的方法：
```bash
1.watch:{
   $route:{
      handler(val,oldval){
        console.log(val);//新路由信息
        console.log(oldval);//老路由信息
      }
      deep:true//深度观察监听
   }
}
2.watch:{
  $route(to,from){
    console.log(from.path)//从哪来
    console.log(to.path)//到哪去
  }
}
3.methods:{
  getpath(){
    console.log(111)
  }
}
watch:{
   '$route':'getPath'
}
```
js数组对象为指针，修改需要深拷贝，否则会修改原数据
防抖：防止按钮多次点击
封装防抖函数：debounce.js
let timeout = null
function bounce(fn,wait) {
  if(timeout !== null) clearTimeout(timeout)
  timeout = setTimeout(fn,wait)
}
引入(import)并使用
bounce(()=>{function},1000)
数组深拷贝：
1.concat():
let copyArray = [].concat(array)
2.slice(idx1,idx2)
let copyArray = [].slice()//无参为拷贝数组
---
逻辑梳理，设计模式，需求合理，可维护性
在写api请求的时候，可以使用promise与async await同步操作
并且可以后续抓错处理

js中Set类型的使用：
Set类型带有的函数
let num = new Set() //初始化  typeof num为object
num.add()// 添加元素的函数
num.size //set类型的长度
set类型无法添加重复的元素 //利用这点可以数组去重
let array = [...num] || num = new Set(array)//数组与set的转换
num.has() //Set类型用来判断一个值是否在set中
num.delete() //Set类型用来删除在set中的值
num.clear()//Set类型清空所有的值
Set类型的遍历方式
num.forEach(function(value){}) // forEach
for(val of num){} // for...of
js中的遍历函数：
Array.map(value,index,array){} //map函数，有元素值，元素下标，数组三个参数，针对每个元素处理，原数组不变，最后返回一个新数组
Array.forEach(value,index,array){}//forEach函数，参数如上，无返回值，原数组不变
Array.filter(value,index,array){}//filter函数,参数如上,针对每个元素，判断条件返回元素，返回新数组，原数组不变
Array.some(),Array.every()//对所有数组成员依次执行函数，返回布尔值,用作数组满足条件判断
Array.some(function callback(value,index,arr){})//调用filter的数组
Array.some()如果一个成员满足条件则返回true，Array.every()需要全部成员满足条件才返回true,原数组都不变
Array.reduce() //使用函数依次处理每个成员，最终返回一个值
reduce(callback(previousValue,currentValue,currentIndex,array){函数},initialValue)// previousValue:上一次遍历后提供的值，最开始为初始值:initialValue
遍历函数的区别与总结：
map()： 在处理函数中将返回值组成一个新的数组返回，原数组(arr)保持不变。
forEach()： 没有返回值，即使处理函数中设置了return也无效，原数组(arr)保持不变。
filter()： 判断处理函数中的返回值是否为true，将返回为true的数组元素(该元素为最原始的数组元素)组成一个新的数组返回，原数组(arr)保持不变。
some()与every()： 判断处理函数中的返回值是否为true，如果有一个成员返回值为true，则some()返回true；如果所有成员返回值都为true，则every()返回true，原数组(arr)保持不变。
reduce()： 返回值会被记住，并且在遍历下一个元素中可以被调用，最后返回单个结果值，原数组(arr)保持不变
设计模式对代码设计有着非常大的作用，尽快学习。
循环机制->同步异步->函数运行机制->执行栈宏任务(Macro)微任务(Micro)
宏任务：script(整体代码)，setTimeout,setInterval,I/O,UI交互事件，setImmediate(Node.js)
微任务：Promise,MutaionObserver,process.nextTick(Node.js)
---
父子组件传值
父向子传值：单向绑定，父传过来的值无法在子组件中更改。
1.v-bind props
{
fooA:Number //只接受数值类型的参数
fooB:[String,Number] //可以接受字符串和数值类型的参数
fooC:{type:String,required:true} //可以接受字符串的类型，参数必须传入
fooD:{type:Number,default:100} //接受数值类型的参数，默认值为100
fooE:{type:Object,default:()=>{return{message:''}};//当为对象类型时设置默认值必须使用函数返回
fooF:{validator:function(value){return value >= 0 && value <= 100;}}//使用一个自定义的验证器
fooG:{type:Array,default:function(){return[]}}// 当为数值类型设置默认值时必须使用数组返回
}
---
利用$refs
ref="home" //调用子组件函数获值
this.$refs.home.setMsg(this.mgs)//父
setMsg(val){this.msg = val}//子
---
子向父传值： v-on $emit
this.$emit("receive","value")//子组件
@receive="receive"
methods:{receive(val){}}
---
利用$parent
setMsg(){this.$parent.toValue(this.msg)} //子
toValue(val){this.msg = val} //父
---
爷传孙:props
:mgs="msg"//爷
v-bind="$attrs"//父
props:{mgs:String}//子
---
孙传爷
this.$emit("setVal",this.msg)//孙
v-on="$listeners"//父
@setVal="setVal" setVal(val){this.msg = val}
---
祖组件传后代组件:要求值必须为对象!!!
provide(){return {data:this.dataObj}}//与data同级,祖组件
inject:['data'],computed:{()=>{return'${this.data.msg}&{this.data.num}'}}
---
兄弟组件传值(store)
EventBus可用，调用完必须销毁，否则出bug。
---
apply:传入两个参数，一个参数数组，一个运行环境，默认Window。
call:传入多个参数，一个 运行环境，其他为参数。
bind:使用多加（），绑定上下文。
三个函数皆为改变上下文this的函数
多熟悉组件间通信，路由间通信。
### 持续进行编写和开发，经验保存
后续将CSDN博客中的经验总结并转移，并学习更多HEXO使用方式和编写方式