[TOC]

# 1. 编写Dockerfile

## 1. 常用参数

- -t --tag list 镜像名称
- -f --file string 指定Dockerfile文件的位置

| 指令        | 含义                                                         | 示例                                                         |
| :---------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| FROM        | 构建的新镜像是基于哪个镜像                                   | FROM centos:6                                                |
| MAINTAINER  | 镜像维护者姓名或邮箱地址                                     | MAINTAINER zhufengjiagou                                     |
| RUN         | 构建镜像时运行的shell命令                                    | RUN yum install httpd                                        |
| CMD         | CMD 设置容器启动后默认执行的命令及其参数，但 CMD 能够被 docker run 后面跟的命令行参数替换 | CMD /usr/sbin/sshd -D                                        |
| EXPOSE      | 声明容器运行的服务器端口                                     | EXPOSE 80 443                                                |
| ENV         | 设置容器内的环境变量                                         | ENV MYSQL_ROOT_PASSWORD 123456                               |
| ADD         | 拷贝文件或目录到镜像中，如果是URL或者压缩包会自动下载和解压  | ADD ,ADD https://xxx.com/html.tar.gz /var/[www.html](http://www.html/), ADD html.tar.gz /var/www/html |
| COPY        | 拷贝文件或目录到镜像                                         | COPY ./start.sh /start.sh                                    |
| ENTRYPOINT  | 配置容器启动时运行的命令                                     | ENTRYPOINT /bin/bash -c '/start.sh'                          |
| VOLUME      | 指定容器挂载点到宿主自动生成的目录或其它容器                 | VOLUME ["/var/lib/mysql"]                                    |
| USER        | 为 RUN CMD和ENTRYPOINT执行命令指定运行用户                   | USER zhufengjiagou                                           |
| WORKDIR     | 为RUN CMD ENTRYPOINT COPY ADD 设置工作目录                   | WORKDIR /data                                                |
| HEALTHCHECK | 健康检查                                                     | HEALTHCHECK --interval=5m --timeout=3s --retries=3 CMS curl -f htp://localhost |
| ARG         | 在构建镜像时指定一些参数                                     | ARG user                                                     |

- cmd给出的是一个容器的默认的可执行体。也就是容器启动以后，默认的执行的命令。重点就是这个"默认"。意味着，如果`docker run`没有指定任何的执行命令或者`dockerfile`里面也没有`entrypoint`，那么，就会使用cmd指定的默认的执行命令执行。同时也从侧面说明了`entrypoint`的含义，它才是真正的容器启动以后要执行命令

## 2.示例

```shell
vi Dockerfile
```

```shell
# Dockerfile 写入如下内容
FROM node   # 基于node镜像构建
COPY ./app /app # 拷贝当前./app里面的内容 到 容器目录/app
WORKDIR /app # RUN CMD ENTRYPOINT COPY ADD 的工作目录
RUN npm install # 构建镜像的时候会执行
EXPOSE 3000  # 暴漏的端口 允许外部连接这个端口
CMD npm start # 创建容器后会执行 如果在创建容器的时候 有/bin/bash 那么此CMD 不会执行
```

```shell
docker build -t youapp:1.0.0 ./
```

- -t用来指定image镜像的名称，后面还可以加冒号指定标签，如果不指定默认就是latest
- `.` 表示Dockerfile文件的所有路径,`.`就表示当前路径

```shell
docker container run -p 3333:3000 -it youapp:1.0.0 /bin/bash # CMD不会执行
```

- `-p` 参数是将容器的3000端口映射为本机的3333端口
- `-it` 参数是将容器的shell容器映射为当前的shell,在本机容器中执行的命令都会发送到容器当中执行
- `express-demo` image的名称
- /bin/bash 容器启动后执行的第一个命令,这里是启动了bash容器以便执行脚本

### 3. 发布image

- [注册账户](https://hub.docker.com/)
- 83687401 Abc
- docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]

```js
docker login
docker image tag [imageName] [username]/[repository]:[tag]
docker image build -t [username]/[repository]:[tag] .

docker tag express-demo zhangrenyang/express-demo:v1
docker push zhangrenyang/express-demo:v1
```

