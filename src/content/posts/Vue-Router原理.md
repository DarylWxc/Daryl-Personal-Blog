---
title: Vue-Router原理
date: 2022-01-05 16:03:43
tags:
 - 前端框架
 - Vue
categories: Web前端
---
### 1.路由注册
Vue-router可以通过vue.use进行注册，在use中，会将router当成插件install，然后存储到installedPlugins中。
```
Vue.mixin({ //通过混入将router对象与options合并，混入时会调用init初始化
    beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this
        this._router = this.$options.router
        this._router.init(this)
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
      registerInstance(this, this)
    },
    destroyed () {
      registerInstance(this)
    }
  })

  Object.defineProperty(Vue.prototype, '$router', { //劫持$router数据，返回router对象
    get () { return this._routerRoot._router }
  })

  Object.defineProperty(Vue.prototype, '$route', { //劫持$route实例，返回当前route信息
    get () { return this._routerRoot._route }
  })
```
然后定义了路由中的钩子函数

---
### 2.Router对象
```
//Router类
this.matcher = createMatcher(options.routes || [], this) //创建matcher对象
//其中matcher对象的match函数用于路由匹配
switch (mode) { //根据mode设置路由模式，默认hash模式
    case 'history':
      this.history = new HTML5History(this, options.base)
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback)
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base)
      break
    default:
      if (process.env.NODE_ENV !== 'production') {
        assert(false, `invalid mode: ${mode}`)
      }
  }
//根据不同模式进行URL的监听
addRoutes (routes: Array<RouteConfig>) {
    this.matcher.addRoutes(routes) //调用addRoutes根据传进来的Router对象进行路由添加
    if (this.history.current !== START) {
      this.history.transitionTo(this.history.getCurrentLocation())
    }
  }
```
---
### 3. Matcher
```
export type Matcher = {
  match: (raw: RawLocation, current?: Route, redirectedFrom?: Location) => Route;
  addRoutes: (routes: Array<RouteConfig>) => void; //addRoutes方法将路由配置转换成一张路由映射表
};
```
Matcher中暴露了两个方法：match、addRoutes
## 3.1 addRoutes
```
//addRoutes调用了createRouteMap
 routes.forEach(route => {
    addRouteRecord(pathList, pathMap, nameMap, route)
  })//其中为每个route执行addRouteRecord生成一条记录
 const record: RouteRecord = {
  path: normalizedPath,
  regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
  components: route.components || { default: route.component },//这里为组件实例
  instances: {},
  name,
  parent, //由于可以嵌套路由，表示RouteRecord是一个树形结构
  matchAs,
  redirect: route.redirect,
  beforeEnter: route.beforeEnter,
  meta: route.meta || {},
  props: route.props == null
    ? {}
    : route.components
      ? route.props
      : { default: route.props }
}
```
addRoutes的主要作用是动态添加路由配置

## 3.2 match
match方法主要是根据Rawlocation对象和Route信息去计算路径返回，其中通过_createRoute函数创建定位信息
```
const route: Route = { //通过createRoute创建route对象信息返回
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery),
    matched: record ? formatMatch(record) : [] //根据matched匹配组件渲染
  }
```
---
### 4. 小结
vue在安装路由时，会通过mixin在组件钩子beforeCreate和destroyed钩子中将路由信息注册与重置，在路由注册期间，会将Options的路由信息merge合并到Vue实例的options当中，然后实例化VueRouter对象。在VueRouter对象中定义了一些常用的路由函数提供使用。
VueRouter对象中会创建Matcher对象并暴露出match和addRoutes两个函数：
- match函数用于根据Location对象和Route信息去计算路径并创建定位信息返回。
- addRoutes函数用于根据路由信息动态创建路由配置映射表方便路径匹配。



