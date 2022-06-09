## 1. rewrite [#](http://zhufengpeixun.com/strong/html/125.10.nginx.html#t10918. rewrite)

- 可以实现url重写及重定向

```js
syntax: rewrite regex replacement [flag]
Default: —
Context: server, location, if
```

- 如果正则表达式（regex）匹配到了请求的URI（request URI），这个URI会被后面的replacement替换
- rewrite的定向会根据他们在配置文件中出现的顺序依次执行
- 通过使用flag可以终止定向后进一步的处理

```js
rewrite ^/users/(.*)$ /show?user=$1? last;=
```

### 1.1 用途

- URL页面跳转
- 兼容旧版本
- SEO优化(伪静态)
- 维护(后台维护、流量转发)
- 安全(伪静态)

### 1.2 语法

| 类型   | 种类                             |
| :----- | :------------------------------- |
| 语法   | rewrite regex replacement [flag] |
| 默认   | -                                |
| 上下文 | server,location,if               |

- regex 正则表达式指的是要被改写的路径
- replacement 目标要替换成哪个URL
- flag 标识

实例

```js
rewrite ^(.*)$ /www/reparing.html break;
```

### 1.3 flag

- 标志位是标识规则对应的类型

| flag      | 含义                                                         |
| :-------- | :----------------------------------------------------------- |
| last      | 先匹配自己的location,然后通过rewrite规则新建一个请求再次请求服务端 |
| break     | 先匹配自己的location,然后生命周期会在当前的location结束,不再进行后续的匹配 |
| redirect  | 返回302昨时重定向,以后还会请求这个服务器                     |
| permanent | 返回301永久重定向,以后会直接请求永久重定向后的域名           |

#### 1.3.1 last

- 结束当前的请求处理,用替换后的URI重新匹配`location`
- 可理解为重写（rewrite）后，发起了一个新请求，进入server模块，匹配location
- 如果重新匹配循环的次数超过10次，nginx会返回500错误
- 返回302 http状态码
- 浏览器地址栏显示重定向后的url

#### 1.3.2 break

- 结束当前的请求处理，使用当前资源，不再执行location里余下的语句
- 返回302 http状态码
- 浏览器地址栏显示重定向后的url

#### 18.3.3 redirect

- 临时跳转，返回302 http状态码
- 浏览器地址栏显示重地向后的url

#### 1.3.4 permanent

- 永久跳转，返回301 http状态码；
- 浏览器地址栏显示重定向后的url

```js
location ~ ^/break {
    rewrite ^/break /test break;
    root /data/html;
}

location ~ ^/last {
    rewrite ^/last /test last;
}

location /test {
      default_type application/json;
      return 200 '{"code":0,"msg":"success"}';
}

location ~ ^/redirect {
 rewrite ^/redirect http://www.baidu.com redirect;
}
location ~ ^/permanent {
 rewrite ^/permanent http://www.baidu.com permanent;
}
curl http://115.29.148.6/break
test
curl http://115.29.148.6/last
{"code":0,"msg":"success"}
curl -vL http://115.29.148.6/redirect
curl -vL http://115.29.148.6/permanent
```