---
title: Webpack学习
date: 2022-01-08 16:02:50
tags:
 - 工程化
 - webpack
categories: Web前端
---
### 1. webpack
webpack：静态(static)模块(module)化打包(bundler)工具。主要打包资源输出到静态资源。脚手架的由来就是webpack。按需求编写loader和plugin。
webpack不会被vite取代，并且也在改进和进步。学好webpack，一样可以学好vite。
webpack可以将浏览器不认识的语法转译成浏览器可以运行的代码。
npm init初始化package.json文件，'script'中配置指令，可以局部执行。

## 1.2 webpack如何打包
- 根据命令或者配置文件找到入口文件；
- 从入口开始，会生成依赖关系图，该图会包含应用程序中所需的所有模块
- 然后遍历图结构，打包一个个模块(根据不同文件使用不同loader解析)

---
### 2. webpack核心配置
//'script'中的命令行
npx webpack --entry ./src/main.js --output-path ./build //指定入口和出口
命令配置可在[官方文档](https://webpack.docschina.org/api/cli/)的API命令行接口中查询
常规情况下会创建一个webpack配置文件进行统一配置。
```webpack
//文件名需要规范↓↓，或者使用--config指定文件路径
//webpack.config.js 
const path = require('path'); //引入path使用，配置绝对路径
const {CleanWebpackPlugin} = require('clean-webpack-plugin');//引入清除webpack包的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')//引入输出html插件
const {DefinePlugin} = require('webpack');//引入定义全局常量的插件
const CopyWebpackPlugin = require('CopyWebpackPlugin')//定义复制插件
module.exports = {
   entry:"./src/main.js" //配置入口文件
   context:path.resolve(__dirname,"../"),//绝对路径,指定基础目录入口
   output:{
      filename:"文件名" //配置输出文件名
      path:path.resolve(__direname,".build")//输出文件路径，该路径需要为绝对路径
      // src = "bundle.js" => "./bundle.js"
      publicPath:"./" //指定index.html文件中的js引入路径
   }
   //配置plugin
   plugins:[
      new CleanWebpackPlugin() //plugin其实是类，通过new创建
      new HtmlWebpackPlugin()//可以传入参数自定义生成html文件类型
      new DefinePlugin({
            BASE_URL:'"./"' //定义全局常量BASE_URL，语法取字符串内的值，所以需要引号包裹   
      })
      new CopyWebpackPlugin({ //将指定文件夹打包的时候复制输出
            patterns:[
                 {
                      from:"public", //public文件夹
                      globOptions:{ //需要忽略的属性
                          ignore:["**/index.html","**/.DS_Store"] //需要添加**
                      } 
                 }
            ]
      })
   ]
   //配置CSS-Loader，只负责解析CSS文件，插入页面需要style-loader
   //loader的解析顺序为右到左，下到上，所以css-loader置后
   module:{
      rules:[ //数组内放Rule对象
         {//如果在样式文件中@import其他文件，需要配置importLoader属性让他回头编译
            test: /.css/  //正则表达式-匹配资源
            use：[ //数组内放useEntry对象
              {loader:'style-loader'} //配置style-lodaer
              {lodaer:'css-loader',options:{}} //loader字符串，options为参数 
              {loader:'post-css'}//如果使用postcss，需要在css解析之前处理，配置置后
              //并且post-css需要传参，使用插件进行转译
            ]
         },
         {
            test:/\.less$/,
            use:["style-loader","css-loader","less-loader"]//添加规则配置less-loader
         }
      ]
   }
   //加载处理资源配置
   {
       test:/\.(jpg|png|jpeg|gif\svg)$/ , //处理各种图片格式
       use:[
          {loader:'file-loader'}
       ]
   }
   //加载字体文件
   {
      test:/\.ttf|eot|woff2?$/i,
      type:"asset/resouce",
      generator:{
         filename:"font/[name].[hash:6][ext]"
      }
   }
   //url-loader会默认把文件转成base64格式
   //webpack5可以直接使用asset module type替代各种loader
   //配置asset/resource
   {
      test:/\.(jpg|png|jpeg|gif\svg)$/,
      type:"asset/resource", //assetModule有好几种type，参考文档
      generator:{
         filename:"img/[name].[hash:6].[ext]"//assetModule输出文件格式与路径
      },
      parser:{
         dataUrlCondition:{
            maxSize:100 * 1024 //文件大小限制
         }
      }
   }
}

//通过配置告诉工具该适配哪些浏览器
//Browserslist编写规则
broswerlist:{ //caniuse网站中的数据
   > 1% //市场占有率  css,js要兼容市场占有率大于1%的浏览器
   last 2 versions //每个浏览器最后两个版本
   not dead//24个月内没有官方支持更新的浏览器为dead状态
}
//针对不同浏览器的兼容性处理也可以使用webpack处理

```

loader[配置文档](https://webpack.docschina.org/concepts/loaders/#using-loaders)查看
file-loader[配置文档查看](https://v4.webpack.js.org/loaders/file-loader/#getting-started)
mode不同值 会有不同表现，[参考文档](https://webpack.docschina.org/configuration/mode/)

---

### 3. 模块化原理
devtool:"eval" //默认为eval
devtool:"source-map"//改成source-map
查看devtool[文档配置](https://webpack.docschina.org/configuration/devtool/)
添加devtool属性控制打包完输出不同的代码
设置完devtool后打包输出的内容会变成易查看的内容

## 3.1 CommonJS模块化
通过一个加载函数，将引入的变量(函数)定义在缓存对象中，然后将缓存对象通过key，value的方式去返回。本质上类似于在引入的作用域中对函数和变量进行了一个解构赋值的定义效果，然后可以在该作用域内使用。
## 3.2 ES Module实现
同样通过一个加载函数，给缓存对象里定义了函数，然后通过Object.defineProperty给exports对象作了一层代理，代理去调用缓存对象里的函数。最后返回的是exports对象。
## 3.3 CommonJS加载ES Module
本质上通过Common(Modules)语法获取到exports对象(同上)。exports对象中映射了文件中定义的方法。
## 3.4 ES Module加载CommonJS
同上。
## 3.5 source-map
真实运行在浏览器上的代码，与我们的代码是有差异的。为了解决该问题，可以使用source-map来进行调试。source-map用于将打包后的代码映射到你的源代码上。
如何使用source-map：
- 根据源文件生成source-map文件，在webpack打包时通过配置生成
- 在转换后的代码，最后添加一个注释，指向sourcemap //通过注释指向打包前的源代码

source-map其实为一个对象，包含:
- version：版本
- source：源代码文件
- names：转化前变量和属性的名称
- mappings：用于还原源代码的信息
- file：输出文件
- sourcesContent：源代码
- sourceRoot：source相对的根目录

mode模式
- eval-source-map：生成的sourcemap以DataURL格式在eval函数后面
- inline-srouce-map：生成的sourcemap以DataURL添加到bundle文件后面
- cheap-source-map：没有生成列映射，会比较高效
- cheap-module-source-map：映射效果更好，不过需要babel的loader配合(更推荐)

可以根据不同环境执行不同mode

---
### 4. 深入babel解析
babel是一个工具链，主要用于旧浏览或者缓解中将ES5代码转换为向后兼容版本的JS代码，包括语法转换、源代码转换、Polyfill实现目标缓解缺少的功能等。
babel可以作为一个独立的工具使用。babel使用需要babel/core,babel/cli
## 4.1 babel的底层原理
工作流程：
- 解析阶段
- 转换阶段
- 生成阶段

原生代码通过词法分析，语法分析，解析为AST抽象语法树，然后遍历语法树，通过插件生成新的AST语法树，然后根据新AST语法树生成目标源代码。

## 4.2 babel配置
babel预设[文档查看](https://babeljs.io/docs/en/babel-preset-env)
react里jsx也是用babel转化的

```javascript
exclude: /node_modules/ ,//将node_modules排除在外
{
   loader:"babel-loader",
   options:{
     // plugins:[
         //"@babel/plugin-transform-arrow-function" //需要配合插件使用转化
      //]
      presets:[
         "@babel/preset-env" //babel也会默认根据browserlist规则去用插件默认转化，需要设置预设
      ]
   }
} 
```

babel有两种配置文件
babel.config.json(.js，.cjs，.mjs) //早期使用较多的配置方式，对于monorepos麻烦
babelrc.json(.babelrc，.js，.cjs，.mjs) //可以直接作用于Monorepos项目的子包，更推荐

## 4.3 polyfill
类似一个补丁，帮助我们使用更好使用js，如在浏览器中版本落后不支持，通过polyfill来打一个补丁，那么会包含特性了。更好解决兼容性。
现在可以使用 core-js regenerator-runtiome 去转化代码
```config
presets:[
   ["@babel/preset-env",{
      //false的话不用polyfill
      //usage:代码中需要哪些polyfill就引用相关api
      //entry：手动在入口文件导入core-js/regenerator-runtime
      useBuiltIns:usage //按需使用，需要注意版本！
      corejs:3 //使用3版本
      proposal:true //设置为true
   }]
]
plugins:[ //也可以使用plugins配置babel.config.js
   ["@babel/plugin-transform-runtime",{
      corejs:3
   }]
]
```
## 4.4 ESLint
相关安装和配置，过后在看。
prettierrc文件为ESLint的配置文件

## 4.5 Vue
可以用webpack解析Vue，需要vue-loader。

---
### 5.  DevServer和HMR(热更新)原理
[devserver文档](https://webpack.js.org/guides/development/#using-webpack-dev-server)查看
webpack可以通过watch监听代码的变化: --watch //指令中添加watch或改配置watch:true
webpack提供webpack-dev-server用于自动开启服务: server //指令中添加serve
webpack开启的serve会自动提供HMR功能。//服务启动在本地内存中
目前使用的memfs库进行内存开启服务，使用express开启了本地服务
webpack还提供了webpack-dev-middleware用于自定义使用不同服务(koa/expree等)
添加配置
```dev-server-config
derserver:{
   hot:true,
   hotOnly:true, //保留浏览器状态，不刷新浏览器
   host:''//设置主机地址，默认localhost(127.0.0.1)，如果是0.0.0.0，同网段下可以访问
   publicPath:"" //指定本地服务所在的文件夹，建议与output的publicPath同步
   contentBase:path.resolve(__dirname,"./abc")//服务中引入的其他文件的路径配置
   watchContentBase:true //监听引入的静态文件下的变化
   port:''//端口设置，默认8080
   open:true //自动打开浏览器,
   compress:true //针对不同文件压缩，性能优化之一
   proxy:{ //配置代理，解决跨域访问
      "/api":{ //类似nginx的反向代理
         target: "http://localhost:8888", //默认代理http，不接收https，https需要额外配置
         pathRewrite: {
            "^/api": ""重写path，将添加的api前缀处理
         }，
         secure:false//设置不检测http与https
         changeOrigin:true //改变源地址    
      }
   },
   historyApiFallBack:true //默认重定位回index.html，也可以通过对象配置重定位
}
//可以根据配置指定模块热更新
if(module.hot){
   module.hot.recept('./文件',()=>{
      console.log('更新');
   })
}
```
## 5.1 HMR原理
[HMR文档](https://webpack.js.org/guides/hot-module-replacement/)查看
Hot Module Replacement，模块热替换。在应用程序运行中更替某个模块，无需刷新整个页面。

添加了热更新后，控制台上有相关体现:
- Waiting for update signal from WDS...
- Hot Module Replacement enabled.

webpack会创建两个服务：提供静态资源的服务(express)和Socket服务(net.Socket)
浏览器访问本地的服务，会经过webpack compiler打包 然后到express server用HTTP请求发送到浏览器响应，HMR Server通过WebSocket建立一个长连接，然后监听文件变化，将更新通过Socket发送给浏览器进行响应。
## 5.2 Resolve模块解析
用于帮助webpack从每个require/import找到并引入项目中依赖的模块或第三方库，使用enhanced-resolve来解析文件路径
webpack可以解析三种路径：
- 绝对路径：不需要做额外解析
- 相对路径：根据定位上下文目录去拼接绝对路径
- 模块路径：默认是node_modules，但可以设置别名的方式来替换初始模块路径

Resolve可以做extensions和alias配置
```resolve-config
resolve:{//文件扩展名，webpack查找文件如果无拓展名会自动添加，按以下规则
   extensions:['.wasm','.mjs','.js','.json'] //默认只有这四个文件扩展名，可以自己添加
   alias:{ //文件别名，引入路径的配置
      '@':path.resolve(__dirname,"./src"),
      "page":path.resolve(__dirname,"./src/page")
   }
}
```
---
### 6. webpack性能优化
一般有不同开发环境的配置
- 生产环境： --config webpack.prod.js
- 开发环境：--config webpack.dev.js
- 公共环境：--config webpack.common.js

webpack有一个性能优化的点为代码分离，分离的方式有：
- 入口起点：使用entry配置手动分离代码
根据不同入口和output占位修改，将不同代码打包到不同bundle.js中
- 防止重复：使用entry dependencies或者SplitChunksPlugin去重和分离代码
在entry中将依赖提取，然后取出来单独打包或者使用splitChunks插件去将代码抽离
- 动态导入：通过模块的内联函数调用来分离代码
使用import语法来完成，目前比较推荐的方式，还有require.ensure(目前不推荐的方式)。与路由懒加载的情况一样。
// import foo =  () => import(/**魔法注释  **/,"./foo") //webpack可以读取魔法注释的内容来给文件命名，webpack也可以通过魔法注释加入prefetch，让资源在浏览器空闲时加载，使用preload会与父chunk并行加载，与prefetch不能同时使用。

## 6.1 CDN加速
CDN服务器需要购买。
- 将静态资源打包放到CDN服务器，用户的资源通过CDN服务器加载
使用CDN只需要修改一下output中的publicPath到你的CDN地址上就可以，这样打包输出的加载地址会访问CDN。这种情况比较少见。
- 一些第三方资源放到CDN服务上
配置externals属性，将一些额外的第三方库提取出来不做打包。手动在模板html文件中引入这些CDN地址即可。

## 6.2 shimming
shimming是使用providePlugin在全局中通过变量获取package，如果webpack看到该变量模块，就会在bundle中引入该模块。但是官方不推荐使用。
例：在文件中调用了axios，但未引入，打包后，bundle引入，所以可以调用。
## 6.3 DLL
动态链接库，软件在windows实现共享函数库的一种实现方式。webpack中有内置DLL功能，可以将不经常改变的代码抽成一个共享的库，库在编译后会引入到其他项目中。
但在webpack4之后，React和Vue脚手架都移除了DLL库。(由于webpack已经提供了足够的性能，所以不在去维护框架对DLL插件的适配)
## 6.4 Terser插件
Terser是用于压缩和碎化的工具集。早期是使用uglify-js，现在不维护了，并且不支持ES6。
webpack的minimizer属性包括tree-shaking都是使用Terser插件对项目代码进行处理。如果对默认插件不满意，也可以自行配置Terser处理项目配置。
[Terser配置文档](https://webpack.js.org/plugins/terser-webpack-plugin/)查看
## 6.5 css-minimizer-webpack-plugin
可以使用该插件对CSS进行压缩
## 6.6 Scope Hoisting
该功能会使作用域提升，让打包后的体积更小，性能更快。默认下webpack打包会有很多函数作用域，包裹IIFE，那么在运行这些函数时需要加载其他模块才能运行，这时Scope Hoisting将函数合并到一个模块中来运行，那么可以直接运行其他模块，不需要额外加载。
webpack已经内置了对应的模块，在production模式下，默认会启用，development模式下，需要自己来打开。
## 6.7 tree-shaking
将mode设置为development模式时webpack会自动集成tree-shaking。
副作用含义：指程序引入的模块除了导出成员的代码，还有一些模块内的其他代码生效。指不纯的模块产生的作用。
- usedExport
webpack会对比打包后的代码，并且添加注释:unused harmony export，通过注释告知terser在优化时可以删除这段代码，当我们设置usedExports为false则不删除mul函数，为true时，移除mul函数。usedExport实现tree-shaking是通过配合terser实现。
- sideEffects
由于个别模块存在副作用(模块会影响取值)，不能仅仅通过exports判断代码的意义，可以将sideEffects设置为false，webpack会检查是否有副作用，没有就会删除未用到的exports。但是要注意该属性同样会删除import的css模块，所以需要对css文件做设置。
- PurgeCSS
可以使用PurgeCSS插件来实现CSS的tree-shaking，帮助我们删除未使用的CSS样式。
```PurgeCSS-config
new PurgeCssPlugin({
   path:glob.sync(`${resolveApp("./src")}/**/*`) //配置路径地址
   safelist: function() {
      return {
         standard:["body"] //设置安全的样式，不会被删除
      }
   }
})
```

## 6.8 文件压缩
使用CompressionPlugin对打包文件进行压缩，打包成不同格式压缩大小的文件，使资源加载速度加快
[文档查看](https://webpack.js.org/plugins/compression-webpack-plugin/#root)
## 6.9 HTML压缩
```HtmlWebpackPlugin-config
new HtmlWebpackPlugin({
   template:"./index.html",
   inject:'' //设置注入位置
   cache:"" //使用之前的缓存
   minify :{
      removeComments: false //是否移除注释
      removeRedundantAttribbutes: false //是否移除多余的属性
      removeEmptyAttributes: true //是否移除一些空属性
   }
})
```
[htmlwebpack文档](https://github.com/jantimon/html-webpack-plugin#options)查看

---
### 7. webpack打包原理
## 7.1 speed-measure-plugin插件
可以使用该组件测量打包的时间
## 7.2 webpack启动流程
npx webpack执行的是bin目录下的webpack文件夹
- 1.定义CLI对象
- 2.判断CLI是否安装
- 3.根据webpack-cli的package.json文件进行安装，执行文件夹中的bin目录cli.js
- 4.创建webpackCLI对象
- 5.合并参数生成配置文件
- 6.最后生成一个compiler，执行compiler.run

## 7.3 自定义loader
loader本质是导出一个函数。通过配置路径去访问本地自定义loader，然后执行。
```loader
const reg = /(console.log()(.*)())/g; //手写一个清除console语句的loader
module.exports = function(source) {
    // 通过正则表达式将当前处理内容中的console替换为空字符串
    source = source.replace(reg, "")
    // 再把处理好的内容return出去，坚守输入输出都是字符串的原则，并可达到链式调用的目的供下一个loader处理
    return source
}

resolveLoader:{ //配置loader查找路径，需要绝对路径
   modules:["node_modules","./hy-loaders"]
}
```
## 7.4 loader执行顺序
loader有两种类型，一种normal，一种pitch-loader。
会优先按从左到右，从上到下顺序执行pitch-loader，然后从右到左，从下到上执行pitch-loader。
也可以通过enforce去强行改变loader的执行顺序。
- 默认loader都是normal
- 在行内设置的loader是inline
- 设置pre优先执行
- 设置post最后执行

pitching的执行顺序：
post，inline，normal，pre
normal的执行顺序：
pre，normal，inline，post

## 7.6 自定义Plugin
webpack创建了Tapable库中的各种hook实例。Tapable有同步和异步Hook。
1. 通过hook注册事件，然后在特定的时期调用插件。
2. 注册插件时会调用插件函数或者插件对象的apply方法
3. 插件方法会接收compiler对象，我们可以通过compiler对象来注册Hook的事件
4. 某些插件也会传入一个compilation的对象，我们也可以监听compilation的Hook事件

自定义plugin需要使用Tapable库进行一个生命周期的注入与监听。执行事件。
---
### 8. react-cli
create-react-app 执行的是react-script
npm run eject 暴露react的webpack配置

---
### 9. vue-cli
vue inspect >a 输出webpack配置到a文件

---
### 10. rollup
了解，后面学习。
vue源码与react源码都是使用rollup打包的。

---
### 11. ESBuild
打包速度最快
- 使用Go语言编写，直接转换成机器代码，无需经过字节码。
- 充分利用CPU的多内核，尽可能让它们饱和运行。
- 内容是从零编写，不使用第三方
