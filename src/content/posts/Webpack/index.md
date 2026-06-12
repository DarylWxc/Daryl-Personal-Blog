---
title: Webpack
date: 2021-04-27 09:02:04
tags:
 - 工程化
 - webpack
categories: Web前端
---
### 1. 背景
实现模块化，更高效管理和维护项目的每一个资源。
* 模块化
最早是将功能及其相关状态数据各自单独放到不同的JS文件中，然后分别引入到页面。一个script对应一个模块。但是模块都是在全局中工作，大量模块成员污染了环境，模块与模块之间没有依赖关系、维护困难、没有私有空间等问题。
如今流行使用CommonJS、ES Modules
### 2. 问题
* 通过模块化的方式来开发
* 使用一些高级的特性来加快我们的开发效率或者安全性，比如通过ES6+TypeScript开发脚本逻辑，通过sass、less编写样式
* 监听文件的变化来反映到浏览器上，提高开发效率
* JS代码需要模块化，HTML和CSS这些资源文件也会面临需要被模块化的问题
* 开发完成后将代码进行压缩、合并以及其他相关的优化
### 3. 是什么？
用于现代JS应用程序的静态模块打包工具。
将可以被webpack直接引用的资源打包(bundle.js)
内部构建一个依赖图，反射到各个模块，生成一个或多个bundle。
* 编译代码能力，提高效率，解决浏览器兼容问题
* 模块整合能力，提高性能，可维护性，解决浏览器频繁请求文件的问题
* 万物皆可模块能力，维护性增强
### 4. 构建流程
## 4.1 运行流程
运行是串行的过程，将各个插件串联起来。插件监听他关心的事件，就能加入webpack机制，改变webpack运作。
启动到结束会依次执行以下三大步骤：
* 初始化流程：从配置文件和Shell语句中读取与合并参数，并初始化需要使用的插件和配置插件等执行环境所需要的的参数
* 编译构建流程：从Entry发出，针对每个Module串行调用对应的Loader去翻译文件内容，再找到该Module依赖的Module，递归地进行编译处理
* 输出流程：对编译后的Module组合成Chunk，把Chunk转换成文件，输出到文件系统
## 4.2 初始化流程
从配置文件和Shell语句中读取与合并参数，得出最终的参数。
配置文件默认为webpack.config.js，或通过命令的形式指定配置文件，主要作用：激活webpack的加载项和插件
```
var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');

module.exports = {
  // 入口文件，是模块构建的起点，同时每一个入口文件对应最后生成的一个 chunk。
  entry: './path/to/my/entry/file.js'，
  // 文件路径指向(可加快打包过程)。
  resolve: {
    alias: {
      'react': pathToReact
    }
  },
  // 生成文件，是模块构建的终点，包括输出文件与输出路径。
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  // 这里配置了处理各模块的 loader ，包括 css 预处理 loader ，es6 编译 loader，图片处理 loader。
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ],
    noParse: [pathToReact]
  },
  // webpack 各插件对象，在 webpack 的事件流中执行对应的方法。
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
```
webpack将配置文件中的各个配置项拷贝到options对象中，并加载用户配置的plugins，然后开始初始化Compiler编译对象，该对象掌控webpack生命周期，不执行具体的任务，进行调度工作。
```
class Compiler extends Tapable { //Complier对象继承Tapable，初始化时定义了钩子函数
    constructor(context) {
        super();
        this.hooks = {
            beforeCompile: new AsyncSeriesHook(["params"]),
            compile: new SyncHook(["params"]),
            afterCompile: new AsyncSeriesHook(["compilation"]),
            make: new AsyncParallelHook(["compilation"]),
            entryOption: new SyncBailHook(["context", "entry"])
            // 定义了很多不同类型的钩子
        };
        // ...
    }
}

function webpack(options) {
  var compiler = new Compiler();
  ...// 检查options,若watch字段为true,则开启watch线程
  return compiler;
}
...
```
## 4.3 编译构建流程
```
module.exports = {
    entry: './src/file.js' //根据配置中的entry找入口文件
}
```
初始化完成后调用Compiler的run来启动webpack构建流程，如下：
* compile开始编译
run后首先触发compile，主要是构建一个Compilation对象。
该对象是编译阶段的主要执行者，主要会依次下述流程：执行模块创建、依赖收集、分块、打包等主要任务的对象
* make从入口点分析模块及其依赖的模块，创建这些模块对象
从entry开始读取，执行_addModuleChain()函数
```
_addModuleChain(context, dependency, onModule, callback) {
   ...
   // 根据依赖查找对应的工厂函数
   const Dep = /** @type {DepConstructor} */ (dependency.constructor);
   const moduleFactory = this.dependencyFactories.get(Dep);
   
   // 调用工厂函数NormalModuleFactory的create来生成一个空的NormalModule对象
   moduleFactory.create({
       dependencies: [dependency]
       ...
   }, (err, module) => {
       ...
       const afterBuild = () => {
        this.processModuleDependencies(module, err => {
         if (err) return callback(err);
         callback(null, module);
           });
    };
       
       this.buildModule(module, false, null, null, err => {
           ...
           afterBuild();
       })
   })
}
```
该函数接收参数dependency传入的入口依赖，使用对应的create生成空的module对象，然后回调将module存入compilation.modules对象和dependencies.modules对象中，compilation.entrire也会保存，然后执行buildModule进行真正的构建模块module内容
* build-module构建模块
调用配置的loaders，将模块转成标准的JS模块。
在用Loader对一个模块转换完后，使用acorn解析转换后的内容，输出对应的抽象语法树(AST)，以方便webpack后面对代码的分析
从配置的入口模块开始，分析其AST，当遇到require等导入其他模块语句时，便将其加入到依赖的模块列表，同时对新找出的依赖模块递归分析，最终搞清所有模块的依赖关系
* seal封装构建结果
这步开始进行输出，seal主要生成chunks，对chunks进行一系列的优化操作，并生成要输出的代码。(chunk可以理解为配置在entry中的模块，或者是动态引入的模块)根据入口和模块之间的依赖关系，组成一个个包含多个模块的Chunk，再把每个Chunk转换成一个单独的文件加入到到输出列表。
* emit把各个chunk输出到结果文件
确定好输出内容后，根据配置确定输出的路径和文件名
```
output: {
    path: path.resolve(__dirname, 'build'),
        filename: '[name].js'
}
```
在Compiler开始生成文件前，钩子emit会被执行，这是修改最终文件的最后一个机会。打包过程结束。
## 4.4 小结
![Webpack打包流程](webpack打包流程.png)
### 5. loader
## 5.1 是什么？
loader用于对模块的源代码进行转换，在import或加载模块时预处理文件。
默认情况下只打包js文件，css、sass、png等类型文件，需要配置对应的loader进行解析，在碰到该类型文件则会在配置中找解析规则。
配置loader方式：
* 配置方式(推荐)：在webpack.config.js文件中指定loader
rules是一个数组的形式，我们可以配置很多个loader
每一个loader对应一个对象的形式，对象属性test为匹配的规则，一般情况为正则表达式
属性use针对匹配到文件类型，调用对应的loader进行处理
```
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          { loader: 'sass-loader' }
        ]
      }
    ]
  }
};
```
* 内联方式：在每个import语句中显式指定loader
* CLI方式：在shell命令中指定它们
## 5.2 特性
loader支持链式调用，链中的每个loader会处理之前已处理过的资源，最终变为JS代码。顺序为相反的顺序执行(sass-css-style)。
* loader可以是同步的，也可以是异步的
* loader运行在node.js中，并且能够执行任何操作
* 除了常见的通过package.json的main来讲一个npm模块导出为loader，还可以在module.rules中使用loader字段直接引用一个模块
* 插件(plugin)可以为loader带来更多特性
* loader能够产生额外的任意文件
## 5.3 常见的loader
* style-loader：将css添加到DOM的内联样式标签style里
* css-loader：允许将css文件通过require的方式引入，并返回css代码
* less-loader：处理less
* sass-loader：处理sass
* postcss-loader：用postcss来处理CSS
* autoprefixer-loader：处理CSS3属性前缀，已弃用
* file-loader：分发文件到output目录，并返回相对路径
* url-loader：和file-loader相似，文件小于设定可以返回一个Data url
* html-minify-loader：压缩HTML
* babel-loader：用babel来转换ES6到ES
* 具体例子详看loader篇
### 6. Plugin
## 6.1 是什么？
Plugin是一种计算机应用程序，和主应用程序互相交互，以提供特定的功能。
遵循一定规范的应用程序编写的程序，运行在程序规定的系统下，调用原系统提供的函数库或者数据。用于解决loader无法实现的事。
## 6.2 配置方式
```
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 访问内置的插件
module.exports = { 
  ...
  plugins: [ //通过配置文件导出对象中plugins属性传入new实例对象
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
};
```
## 6.3 特性
本质是一个具有apply方法的js对象，apply被webpack compiler调用，并且在整个编译生命周期都可以访问compiler对象
```
const pluginName = 'ConsoleOnBuildWebpackPlugin';
class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, (compilation) => { //tap方法的第一个函数，应该是驼峰式命名的插件
      console.log('webpack 构建过程开始！');
    });
  }
}

module.exports = ConsoleLogOnBuildWebpackPlugin;
```
编译声明周期钩子：
* entry-option：初始化option
* run
* compile：真正开始的编译，在创建compilation对象之前
* compilation：生成好了compilation
* make从entry开始递归分析依赖，准备对每个模块进行build
* after-emit：在将内存中assets内容写到磁盘文件夹之后
* done：完成所有的编译过程
* failed：编译失败的时候
## 6.4 常见Plugin
![常见Plugins](plugin.jpg)
常见用法详看plugin篇
### 7. Loader与Plugin的区别
## 7.1 区别
Loader：文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中
Plugin：赋予了webpack各种灵活的功能，例如打包优化、资源管理、环境变量注入等，目的是解决loader无法实现的其他事
## 7.2 编写loader
loader本质为函数，this作为上下文会被webpack填充，不能将loader设为一个箭头函数，loader接收一个source参数，为文件源内容。this是webpack提供的对象，能获取当前loader所需要的各种信息，函数中有异步或同步操作，异步操作通过this.callback返回，返回值要求为string或者Buffer
```
module.exports = function(source) {
    const content = doSomeThing2JsString(source);
    
    // 如果 loader 配置了 options 对象，那么this.query将指向 options
    const options = this.query;
    
    // 可以用作解析其他模块路径的上下文
    console.log('this.context');
    
    /*
     * this.callback 参数：
     * error：Error | null，当 loader 出错时向外抛出一个 error
     * content：String | Buffer，经过 loader 编译后需要导出的内容
     * sourceMap：为方便调试生成的编译后内容的 source map
     * ast：本次编译生成的 AST 静态语法树，之后执行的 loader 可以直接使用这个 AST，进而省去重复生成 AST 的过程
     */
    this.callback(null, content); // 异步
    return content; // 同步
}
```
一般编写loader，保持功能单一，避免做多种功能，如less文件转换成css也是经过几个loader的链式调用才能完成转换
## 7.3 编写plugin
webpack基于发布订阅模式，在生命周期通过监听执行插件任务。
webpack编译会创建两个核心对象：
compiler：包含了环境所有的配置信息
compilation：plugin内置事件回调函数的参数，包含了模块资源等，检测到变化则创建新的compilation
实现plugin也需要一定规范：
插件必须是一个函数或者是一个包含apply方法的对象，这样才能访问compiler实例
传给每个插件的compiler和compilation对象都是同一个引用，不建议修改
异步的事件需要在插件处理完任务时调用回调函数进入下一个流程
```
class MyPlugin {
    // Webpack 会调用 MyPlugin 实例的 apply 方法给插件实例传入 compiler 对象
  apply (compiler) {
    // 找到合适的事件钩子，实现自己的插件功能
    compiler.hooks.emit.tap('MyPlugin', compilation => {
        // compilation: 当前打包构建流程的上下文
        console.log(compilation);
        
        // do something...
    })
  }
}
```
在emit事件发生时，代表源文件的转换和组装已经完成，可以读取到最终将输出的资源、代码块、模块及其依赖，并且可以修改输出资源的内容
