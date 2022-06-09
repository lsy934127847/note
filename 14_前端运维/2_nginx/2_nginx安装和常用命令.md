[TOC]



## 1. yum 安装

```shell
yum install -y nginx
nginx -v // 查看nginx版本
systemctl start nginx.service  // 启动nginx服务
ps -le | grep nginx  // 查看是否有nginx进程
netstat -tunl | grep 80 // 查看是否监听80端口
```

## 2. 常用命令

| 命令                            | 含义                                              |
| ------------------------------- | ------------------------------------------------- |
| nginx -v                        | 查看安装版本                                      |
| rpm -ql nginx                   | 查看nginx安装的配置文件和目录                     |
| systemctl start nginx.service   | 启动nginx服务 监听80端口 开启master和worker子进程 |
| systemctl stop nginx.service    | 停止nginx服务                                     |
| systemctl restart nginx.service |                                                   |
| systemctl reload nginx.service  | 重新加载 nginx -s reload                          |
| systemctl status nginx.service  | 查看状态                                          |
| netstat -tunl                   | 查看网络状态 查看端口占用情况                     |
| ps -le \| grep nginx            | 查看nginx进程情况                                 |

- 修改配置文件后要 重新加载 systemctl reload nginx.service
- systemctl start nginx.service 命令只有 采用yum 下载方式才会有 源码下载方式没有这种启动方式

## 3. 目录

### 3.1 编译参数

```shell
nginx -V //查看编译时的参数
/*
configure arguments: --prefix=/usr/share/nginx --sbin-path=/usr/sbin/nginx --modules-path=/usr/lib64/nginx/modules --conf-path=/etc/nginx/nginx.conf --error-log-path=/var/log/nginx/error.log --http-log-path=/var/log/nginx/access.log --http-client-body-temp-path=/var/lib/nginx/tmp/client_body --http-proxy-temp-path=/var/lib/nginx/tmp/proxy --http-fastcgi-temp-path=/var/lib/nginx/tmp/fastcgi --http-uwsgi-temp-path=/var/lib/nginx/tmp/uwsgi --http-scgi-temp-path=/var/lib/nginx/tmp/scgi --pid-path=/run/nginx.pid --lock-path=/run/lock/subsys/nginx --user=nginx --group=nginx --with-compat --with-debug --with-file-aio --with-google_perftools_module --with-http_addition_module --with-http_auth_request_module --with-http_dav_module --with-http_degradation_module --with-http_flv_module --with-http_gunzip_module --with-http_gzip_static_module --with-http_image_filter_module=dynamic --with-http_mp4_module --with-http_perl_module=dynamic --with-http_random_index_module --with-http_realip_module --with-http_secure_link_module --with-http_slice_module --with-http_ssl_module --with-http_stub_status_module --with-http_sub_module --with-http_v2_module --with-http_xslt_module=dynamic --with-mail=dynamic --with-mail_ssl_module --with-pcre --with-pcre-jit --with-stream=dynamic --with-stream_ssl_module --with-stream_ssl_preread_module --with-threads --with-cc-opt='-O2 -g -pipe -Wall -Wp,-D_FORTIFY_SOURCE=2 -fexceptions -fstack-protector-strong --param=ssp-buffer-size=4 -grecord-gcc-switches -specs=/usr/lib/rpm/redhat/redhat-hardened-cc1 -m64 -mtune=generic' --with-ld-opt='-Wl,-z,relro -specs=/usr/lib/rpm/redhat/redhat-hardened-ld -Wl,-E'
*/
```

| 配置                                      | 含义              |
| ----------------------------------------- | ----------------- |
| --prefix=/usr/share/nginx                 | nginx安装目录     |
| --sbin-path=/usr/sbin/nginx               | 可执行文件路径    |
| --modules-path=/usr/lib64/nginx/modules   | 安装模块          |
| --conf-path=/etc/nginx/nginx.conf         | 配置文件路径      |
| --error-log-path=/var/log/nginx/error.log | 错误日志          |
| --http-log-path=/var/log/nginx/access.log | 访问日志          |
| --pid-path=/var/run/nginx.pid             | 进程ID            |
| --lock-path=/var/run/nginx.lock           | 加锁对象          |
| --user=nginx                              | 启动nginx的用户   |
| --group=nginx                             | 启动nginx的用户组 |

### 3.2 配置文件

- /etc/nginx/nginx.conf #主配置文件

- /etc/nginx/default..d/myserver.conf  一般在这里写自己的配置

  ![](./images\PTQ6@$DAI[XPSSSB]P`FAVN.png)

### 3.3 配置文件具体配置含义

- /etc/nginx/nginx.conf #主配置文件

```shell
user nginx;  #设置nginx服务的系统使用用户
worker_processes auto; #工作进程数,一般和CPU数量相同
error_log /var/log/nginx/error.log;#nginx的错误日志
pid /run/nginx.pid; #nginx服务启动时的进程ID

include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024; #每个进程允许的最大连接数 10000
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';  #日志记录格式

    access_log  /var/log/nginx/access.log  main;

    sendfile            on; #//启用sendfile
    tcp_nopush          on;#//懒发送
    tcp_nodelay         on;
    keepalive_timeout   65;#//超时时间是65秒
    types_hash_max_size 4096;

    include             /etc/nginx/mime.types; #文件后缀和类型类型的对应关系
    default_type        application/octet-stream;#//默认content-type
      #gzip  on; # 启用gzip压缩
    include /etc/nginx/conf.d/*.conf;# 单独的server 配置

    server {
        listen       80;#监听的端口号
        server_name  _;#域名方式访问的地址
        root         /usr/share/nginx/html;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        error_page 404 /404.html;#指定404错误页面
        location = /404.html {
        }

        error_page 500 502 503 504 /50x.html;# 指定500错误返回的页面
        location = /50x.html {
        }
    }


```

## 4. 核心模块

### 4.1 stub_status 监控nginx客户端的状态

vi  /etc/nginx/conf.d/default.conf

```diff
server {
+    location /status{
+       stub_status  on;
+    }
systemctl reload nginx.service

http://192.171.207.104/status

Active connections: 2            
server accepts handled requests  
 3 3 10 
Reading: 0 Writing: 1 Waiting: 1 
```

| 参数               | 含义                                                         |
| :----------------- | :----------------------------------------------------------- |
| Active connections | 当前nginx正在处理的活动连接数                                |
| accepts            | 总共处理的连接数                                             |
| handled            | 成功创建握手数                                               |
| requests           | 总共处理请求数                                               |
| Reading            | 读取到客户端的Header信息数                                   |
| Writing            | 返回给客户端的Header信息数                                   |
| Waiting            | 开启keep-alive的情况下,这个值等于 active – (reading + writing) |

### 4.2 sub_filter 内容替换 

- --with-http_sub_module 内容替换

#### 4.2.1 语法

```js
Syntax: sub_filter string replacement;
Default: --
Context: http,service,location
```

#### 4.2.2 实战

/etc/nginx/conf.d/default.conf

```diff
location / {
    root   /usr/share/nginx/html;
    index  index.html index.htm;
+   sub_filter 'name' 'zhufeng';  // 将index.html中的name 替换成zhufeng
}
```

### 4.3  连接限制

- --with-limit_conn_module 连接频率限制
- ngx_http_limit_conn_module模块会在NGX_HTTP_PREACCESS_PHASE阶段生效
- 针对全部的worker生效，依赖realip模块获得到的真实IP

#### 4.3.1 ab

- Apache的ab命令模拟多线程并发请求，测试服务器负载压力，也可以测试nginx、lighthttp、IIS等其它Web服务器的压力
  - -n 总共的请求数
  - -c 并发的请求数

```js
yum -y install httpd-tools
ab -n 40 -c 20 http://127.0.0.1/
```

#### 4.3.2 语法

- limit_conn_zone 定义共享内存(大小)，以及key关键字

```js
# 可以以IP为key zone为空间的名称 size为申请空间的大小
Syntax: limit_conn_zone key zone=name:size;   
Default: --
Context: http(定义在server以外)
```

limit_conn

```js
# zone名称 number限制的数量
Syntax: limit_conn  zone number;
Default: --
Context: http,server,location
Syntax: limit_conn_log_level  info|notice|warn|error;
Default: limit_conn_log_level error;
Context: http,server,location
Syntax: limit_conn_status  code;
Default: limit_conn_status 503;
Context: http,server,location
```

#### 4.3.3 案例

- $binary_remote_addr是二进制格式的，比较短

```js
limit_conn_zone $binary_remote_addr zone=conn_zone:10m;
server {
  location /{
      limit_conn_status 500;
      limit_conn_status warn;
      limit_rate 50; //每秒最多返回50字节
      limit_conn conn_zone 1; //并发连接数最多是1
  }
}
```

- 表明以ip为key，来限制每个ip访问文件时候，最多只能有1个在线，否则其余的都要返回不可用

### 4.4 请求限制

- ngx_http_limit_req_module模块是在NGX_HTTP_PREACCESS_PHASE阶段生效
- 生效算法是漏斗算法(Leaky Bucket) 把突出的流量限定为每秒恒定多少个请求
- Traffic Shaping的核心理念是`等待`，Traffic Policing的核心理念是`丢弃`
- limit_req生效是在limit_conn之前的

#### 4.4.1 语法

- limit_req_zone 定义共享内存，以及key和限制速度

```js
# 可以以IP为key zone为空间的名称 size为申请空间的大小
Syntax: limit_req_zone key zone=name:size rate=rate;   
Default: --
Context: http(定义在server以外)
```

limit_req 限制并发请求数

```js
# zone名称 number限制的数量
Syntax: limit_req  zone=name [burst=number] [nodelay];
Default: --
Context: http,server,location
```

- burst 是bucket的数量，默认为0
- nodelay是对burst中的请求不再采用延迟处理的做法，而是立刻处理

#### 4.4.2 案例

```js
limit_req_zone $binary_remote_addr zone=req_zone:10m rate=1r/s;
server {
  location /{
      //缓存区队列burst=3个,不延期，即每秒最多可处理rate+burst个.同时处理rate个
      //limit_req zone=req_zone;
      limit_req zone=one burst=5 nodelay;
  }
}
```

- $binary_remote_addr 表示远程的IP地址
- zone=req_zone:10m 表示一个内存区域大小为10m,并且设定了名称为`req_zone`
- rate=1r/s 表示允许相同标识的客户端的访问频次，这里限制的是每秒1次，即每秒只处理一个请求
- zone=req_zone 表示这个参数对应的全局设置就是req_zone的那个内存区域
- burst 设置一个大小为3的缓冲区,当有大量请求（爆发）过来时，超过了访问频次限制的请求可以先放到这个缓冲区内等待，但是这个等待区里的位置只有3个，超过的请求会直接报503的错误然后返回。
- nodelay 如果设置，会在瞬时提供处理(burst + rate)个请求的能力，请求超过（burst + rate）的时候就会直接返回503，永远不存在请求需要等待的情况,如果没有设置，则所有请求会依次等待排队

```js
netstat -n | awk '/^tcp/ {++S[$NF]} END {for(a in S) print a, S[a]}'
```

### 4.5 访问控制

- 基于IP的访问控制 -http_access_module
- 基于用户的信任登录 -http_auth_basic_module

#### 4.5.1 http_access_module

```js
Syntax: allow address|all;
Default: --
Context: http,server,location,limit_except
Syntax: deny address|CIDR|all;
Default: --
Context: http,server,location,limit_except

server {
+ location ~ ^/admin.html{
+      deny 192.171.207.100;
+      allow all;
+    }
}  
```