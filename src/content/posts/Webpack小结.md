---
title: Webpack小结
date: 2022-01-06 16:58:50
tags:
 - 工程化
 - webpack
categories: Web前端
---
### 1. Webpack
webpack是自动化打包解决方案，也是一个模块打包机。将浏览器不能直接运行的语言或资源打包为合适的格式供浏览器使用。
webpack能做到：
- 代码转换：TypeScript编译成JavaScript、SCSS，LESS编译成CSS
- 文件优化：压缩JavaScript、CSS、HTML代码，压缩合并图片
- 代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载
- 模块合并：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件
- 自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器
---
### 2. Webpack常见配置有哪些
- Entry：入口，Webpack执行构建的第一步将从Entry开始，可抽象成输入。
- Output：输出结果，在Webpack经过一系列处理并得出最终想要的代码后输出结果。
- mode：提供mode配置选项，告知webpack使用相应模式的内置优化。
- Module：模块，在Webpack里一切皆模块，一个模块对应着一个文件。
- Chunk：代码块，一个Chunk由多个模块组合而成，用于代码合并与分割。
- Loader：模块转换器，用于把模块原内容按照需求转换成新内容。
- Plugin：扩展插件，在Webpack构建流程中的特定时机注入扩展逻辑来改变构建结果或者你想要的事情。
---
### 3. webpack工作流程
- 参数解析：从配置文件和Shell语句中读取与合并参数，得出最终的参数
- 找到入口文件：从Entry里配置的Module，开始递归解析Entry依赖的所有Module
- 调用Loader编译文件：每找到一个Module，就会根据配置的Loader去找出对应的转换规则
- 遍历AST，收集依赖：对Module进行转换后，再解析出当前Module依赖的Module
- 生成Chunk：这些模块会以Entry为单位进行分组，一个Entry和其所有依赖的Module被分到一个组也就是一个Chunk
- 输出文件：最后Webpack会把所有Chunk转换成文件输出
---
### 4. 常见Loader配置以及工作流程
```
// webpack.config.js
module.exports = {
  module: {
    rules: [
     {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      { test: /\.js$/, use: 'babel-loader' },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
        ]
      }
    ]
  }
};
```
1. webpack.config.js里配置了一个模块的Loader
2. 遇到对应模块文件时，触发了该模块的Loader
3. loader接受了一个表示该模块文件内容的source
4. loader使用webpack提供的一系列api对source进行转换，得到一个result
5. 将result返回或者传递到下一个loader，直到处理完毕
```
let less = require('less'); //less-loader例子
module.exports = function (source) {
    const callback = this.async();
    //this.async() 返回一个回调函数，用于异步执行
    less.render(source, (err, result) => {
    //使用less处理对应的less文件的source
        callback(err, result.css);
    });
}
```
---
### 5. 常见plugin配置以及简易原理
1.extract-text-webpack-plugin
webpack默认将css当做一个模块打包到一个chunk中，extract-text-webpack-plugin的作用就是将css提取成独立的css文件
```
const ExtractTextPlugin = require('extract-text-webpack-plugin');
new ExtractTextPlugin({
    filename: 'css/[name].css',
})
{
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
        use: ['css-loader','postcss-loader','less-loader'],
        fallback: 'vue-style-loader',  #使用vue时要用这个配置
    })
},
```
2.html-webpack-plugin
该插件作用是创建HMTL页面文件到你的输出目录，还能将webpack打包后的chunk自动引入到这个HTML中
```
const HtmlPlugin = require('html-webpack-plugin')
new HtmlPlugin({
    filename: 'index.html',
    template: 'pages/index.html'
}
```
3.DefinePlugin定义全局常量
```
new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    },
    PRODUCTION: JSON.stringify(PRODUCTION),
    APP_CONFIG: JSON.stringify(appConfig[process.env.NODE_ENV]),
})
```
4.UglifyJsPlugin js压缩
```
new webpack.optimize.UglifyJsPlugin() //webpack4 已经移除了该插件，用 optimization.minimize 替代
```
5.CommonsChunkPlugin 
该插件主要用来提取第三方库(jQuery)和公共模块(js,css)，常用于多页面应用程序，生成公共chunk，避免重复引用。
```
{
    entry: {
        vendor: 'index.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor','runtime'],
            filename: '[name].js'
        }),
    ]
}
//webpack4 已经移除了该插件，用 optimization.SplitChunks 替代
```
6.插件原理
插件相当于在特定的时机对生产线上的资源做处理。编译过程中，会触发一系列Tapable钩子事件，在对应的钩子上挂自己的任务，注册事件后，随着钩子的触发而执行。
webpack插件由以下组成：
- 一个JavaScript命名函数
- 在插件函数的prototype上定义一个apply方法
- 指定一个绑定到webpack自身的事件钩子
- 处理webpack内部实例的特定数据
- 功能完成后调用webpack提供的回调

```
// 一个 JavaScript 命名函数。
function MyExampleWebpackPlugin() {
};
// 在插件函数的 prototype 上定义一个 apply 方法。
MyExampleWebpackPlugin.prototype.apply = function(compiler) {
// 指定一个挂载到 webpack 自身的事件钩子。
compiler.plugin('webpacksEventHook', function(compilation /* 处理 webpack 内部实例的特定数据。*/, callback) {
console.log("This is an example plugin!!!");
// 功能完成后调用 webpack 提供的回调。
callback();
复制代码
});
};
```
---
### 6. 如何提高webpack打包速度
1.缩小编译范围，减少不必要的编译功能，即modules、mainFields、noParse、includes、exclude、alias全部使用
```
const resolve = dir => path.join(__dirname, '..', dir);
resolve: {
    modules: [ // 指定以下目录寻找第三方模块，避免webpack往父级目录递归搜索
        resolve('src'),
        resolve('node_modules'),
        resolve(config.common.layoutPath)
    ],
    mainFields: ['main'], // 只采用main字段作为入口文件描述字段，减少搜索步骤
    alias: {
        vue$: "vue/dist/vue.common",
        "@": resolve("src") // 缓存src目录为@符号，避免重复寻址
    }
},
module: {
    noParse: /jquery|lodash/, // 忽略未采用模块化的文件，因此jquery或lodash将不会被下面的loaders解析
    // noParse: function(content) {
    //     return /jquery|lodash/.test(content)
    // },
    rules: [
        {
            test: /\.js$/,
            include: [ // 表示只解析以下目录，减少loader处理范围
                resolve("src"),
                resolve(config.common.layoutPath)
            ],
            exclude: file => /test/.test(file), // 排除test目录文件
            loader: "happypack/loader?id=happy-babel" // 后面会介绍
        },
    ]
}
```
2.webpack-parallel-uglify-plugin插件(优化js压缩过程)
该插件能够把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程，从而实现并发编译，进而大幅提升js压缩速度
```
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
// ...
optimization: {
minimizer: [
   new ParallelUglifyPlugin({ // 多进程压缩
   cacheDir: '.cache/',
   uglifyJS: {
      output: {
      comments: false,
      beautify: false
   },
   compress: {
      warnings: false,
      drop_console: true,
      collapse_vars: true,
      reduce_vars: true
   }
}}),
]
}
```
3.HappyPack
在webpack运行在node中打包的时候，happypack可以开启多个子进程去并发执行，子进程处理完后把结果交给主进程
```
const HappyPack = require('happypack');
module.exports = {
	entry: './src/index.js',
	output: {
		path: path.join(__dirname, './dist'),
		filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'happypack/loader?id=babel',
            },
        ]
    },
    plugins: [
        new HappyPack({
            id: 'babel',  //id值，与loader配置项对应
            threads: 4,  //配置多少个子进程
            loaders: ['babel-loader']  //用什么loader处理
        }),
    ]
}
```
4.DLL 动态链接
第三方库不是经常更新，打包的时候希望分开打包，来提升打包速度。打包dll需要新建一个webpack配置文件(webpack.dll.config.js)，在打包dll的时候，webpack做一个索引，写在mainfest文件中。然后打包项目文件时只需要读取manifest文件。
```
const webpack = require("webpack");
const path = require('path');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const dllPath = path.resolve(__dirname, "../src/assets/dll"); // dll文件存放的目录
复制代码module.exports = {
   entry: {
   // 把 vue 相关模块的放到一个单独的动态链接库
   vue: ["babel-polyfill", "fastclick", "vue", "vue-router", "vuex", "axios","element-ui"]
   },
   output: {
      filename: "[name]-[hash].dll.js", // 生成vue.dll.js
      path: dllPath,
      library: "dll[name]"
   },
   plugins: [
      new CleanWebpackPlugin(["*.js"], { // 清除之前的dll文件
      root: dllPath,
   }),
   new webpack.DllPlugin({
      name: "dll[name]",
      // manifest.json 描述动态链接库包含了哪些内容
      path: path.join(__dirname, "./", "[name].dll.manifest.json")
   }),
   ],
};
```
接着，需要在package.json中新增dll命令
```
"scripts": {
    "dll": "webpack --mode production --config build/webpack.dll.config.js"
}
```
运行npm run dll后，会生成 ./src/assets/dll/vue.dll-[hash].js 公共 js 和 ./build/vue.dll.manifest.json 资源说明文件，至此 dll 准备工作完成，接下来在 webpack 中引用即可。
```
externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'vuex',
    'elemenct-ui': 'ELEMENT',
    'axios': 'axios',
    'fastclick': 'FastClick'
},
plugins: [
    ...(config.common.needDll ? [
        new webpack.DllReferencePlugin({
            manifest: require("./vue.dll.manifest.json")
        })
    ] : [])
]
```
---
### 7. webpack如何优化前端性能
1. 第三方库按需加载、路由懒加载
```
//第三方ui库element，vant等库都提供来按需加载的方式，避免全部引入，加大项目体积
import { Button, Select } from 'element-ui';
复制代码//路由懒加载
const showImage = () => import('@/components/common/showImage');。
```
2. 代码分割
- 提取第三方库 [vendor]
```
module.exports = {
    entry: {
        main: './src/index.js',
        vendor: ['react', 'react-dom'],
    },
}
```
- 依赖库分离 [splitChunks]
```
optimization: {
  splitChunks: {
     chunks: "async", // 必须三选一： "initial" | "all"(推荐) | "async" (默认就是async)
     minSize: 30000, // 最小尺寸，30000
     minChunks: 1, // 最小 chunk ，默认1
     maxAsyncRequests: 5, // 最大异步请求数， 默认5
     maxInitialRequests : 3, // 最大初始化请求书，默认3
     automaticNameDelimiter: '~',// 打包分隔符
     name: function(){}, // 打包后的名称，此选项可接收 function
     cacheGroups:{ // 这里开始设置缓存的 chunks
         priority: 0, // 缓存组优先级
         vendor: { // key 为entry中定义的 入口名称
             chunks: "initial", // 必须三选一： "initial" | "all" | "async"(默认就是async)
             test: /react|lodash/, // 正则规则验证，如果符合就提取 chunk
             name: "vendor", // 要缓存的 分隔出来的 chunk 名称
             minSize: 30000,
             minChunks: 1,
             enforce: true,
             maxAsyncRequests: 5, // 最大异步请求数， 默认1
             maxInitialRequests : 3, // 最大初始化请求书，默认1
             reuseExistingChunk: true // 可设置是否重用该chunk
         }
     }
  }
 },
```

3. 删除冗余代码(Tree-Shaking)
```
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
plugins:[
   new UglifyJSPlugin()
]
//在webpack4中，只需要配置mode为'production'即可
```
