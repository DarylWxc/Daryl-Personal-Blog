---
title: Configuration of Clash
date: 2023-09-26 16:26:46
tags:
 - notes
categories:
 - Personality
---
# my record for learning Clash software
## configuration of profiles

```configuration
# HTTP 代理服务器端口
port: 7890

# SOCKS5 代理服务器端口
socks-port: 7891

# 允许局域网连接
allow-lan: true

# 规则模式，Rule(规则) / Global(全局代理) / Direct(全局直连)

# 设置日志等级(silent / info / warning / error / debug)
log-level: info

# 外部控制器的控制端口
external-controller: 127.0.0.1:9090

# 代理节点，可以有多个
proxies:
 - name: "节点1"
   type: ss // 协议类型
   server: servername // IP地址
   port: 8388
   cipher: auto // 破译
   password: "yourpassword"

# 代理节点组，可以根据需要自定义
proxy-groups:
 - name: "自动选择"
   type: select(url-test(延迟最低) / fallback(故障转移) / select(手动) / load-balance(负载均衡))
   proxies:
     - "节点1"
   url: 'http://www.gstatic.com/generate_204'
   interval: 300

# 规则，决定哪些请求通过哪个代理节点或直接连接
rules:
 - DOMAIN-SUFFIX,google.com,自动选择  // 请求google走自动选择
 - DOMAIN-KEYWORD,facebook,微软服务  // 请求facebook走微软服务
 - GEOIP,CN,Direct  // 请求大陆IP直连
 - MATCH,漏网之鱼  // 不符合以上任何规则，走漏网之鱼
```

## Information of Configuration of Rules
### Proxy-groups
策略组(type)有：延迟最低、故障转移、手动选择、负载均衡 四种模式。

延迟最低(url-test)，顾名思义，每隔一段时间进行延迟测试，选择延迟最低的节点。

故障转移(fallback)，每次都选组内第一个节点，无法使用再换到第二个，依次类推。

手动选择(select)，顾名思义，没有特殊功能。

负载均衡(load-balance)，每个节点都用用，由于很多机场都有连接数的限制，因此实际使用较少
### 配置规则
format(格式):TYPE,Contet,Proxy of Policy
1. Type
 - DOMAIN-SUFFIX：
匹配域名后缀，例：访问www.google.com时,匹配到域名后缀为 google.com
 - DOMAIN：
匹配域名,例：
访问 www.google.com 时，域名为 www.google.com，不会匹配。
访问 google.com 时，域名为 google.com，可以匹配。
 - DOMAIN-KEYWORD：
域名关键词，只能匹配域名的关键词
访问 google.com 时，匹配到关键字 google。
访问 www.google.com 时，匹配到关键字 google
 - IP-CIDR：
IP段进行分流，根据解析IP属于某一IP段下，则匹配
 - SRC-IP-CIDR：
通过源IP所属的IP段进行分流
 - GEOIP：
通过解析的IP所属地进行分流，主要针对大陆IP，如：GEOIP,CN,🎯 全球直连
 - DST-PORT：
通过目标端口进行分流，走content端口的则匹配
 - SRC-PORT：
通过源端口进行分流
 - MATCH：
全匹配，用来捕捉漏网之鱼，如： - MATCH,🐟 漏网之鱼

### document
[英文文档](https://lancellc.gitbook.io/clash/)
