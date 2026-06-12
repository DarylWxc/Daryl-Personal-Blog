---
title: Nginx服务器的部署
date: 2020-08-25 16:05:41
tags:
 - 前端开发
categories: 环境配置
---
### Nginx服务器对Vue项目的部署

## 1.在本地下载Nginx
直接百度nginx，进入官网，选择Stable（稳定版），windows（版本）下载

## 2.解压下载的压缩包
解压压缩包在磁盘（合理规划磁盘）

## 3.配置nginx文件
在解压出的文件夹中有conf文件，进入，选择nginx.conf文件进行配置
```bash
 server {
        listen       8100; //此为端口,如果端口有被占用请更改
        server_name  localhost;//服务器名

        location ^~ /wms { // 配置，用到正则表达式
            alias   E:/nginx-1.18.0/html/dist//如使用alias，则不会进行路径拼接，会进行替换，直接在该绝对路径中寻找index下的文件
            root   E:/nginx-1.18.0/html/dist;//根目录，root代表路径，会跟上面的/wms进行拼接，为绝对路径
            index  index.html index.htm;//从上面得到的绝对路径中寻找index.html文件，如查找不到则报403 forbidden错误，即为文件不存在
        }
        location /dev-api/{ //webpack不会打包代理请求路径，需自己配置
            proxy_pass http://192.168.1.58:8888/; // 在nginx上部署的项目请求服务器地址代理
        }
```
## history模式下的问题
在router使用history模式下，部署nginx的项目刷新会出现404，找不到页面的情况
这时候需要进行重定位
```bash
location / {
　　root  /；
　　index index.html;
　　try_files $uri $uri/ /index.html //根目录的情况下
}
location /xx/xx/ {
　　root  /；
　　index index.html;
　　try_files $uri $uri/ /xx/xx/index.html //特定目录情况下
}
location /payfor/ {
       root /home/web;
       index index.html;
       try_files $uri $uri/ /payfor/index.html; //例子
}
```
[参考链接：匹配规则](https://www.cnblogs.com/jpfss/p/10418150.html)
---

重点：路径配置规则需了解