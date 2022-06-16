## 1. 命令总览

| 命令    | 含义                                          | 语法                                                         | 案例                                              |
| :------ | :-------------------------------------------- | :----------------------------------------------------------- | :------------------------------------------------ |
| ls      | 查看全部镜像                                  | docker image ls                                              |                                                   |
| search  | 查找镜像                                      | docker search [imageName]                                    |                                                   |
| history | 查看镜像历史                                  | docker history [imageName]                                   |                                                   |
| inspect | 显示一个或多个镜像详细信息                    | docker inspect [imageName]                                   |                                                   |
| pull    | 拉取镜像                                      | docker pull [imageName]                                      |                                                   |
| push    | 推送一个镜像到镜像仓库                        | docker push [imageName]                                      |                                                   |
| rmi     | 删除镜像                                      | docker rmi [imageName] docker image rmi 2                    |                                                   |
| prune   | 移除未使用的镜像，没有标记或补任何容器引用    | docker image prune                                           | docker image prune                                |
| tag     | 标记本地镜像，将其归入某一仓库                | docker tag [OPTIONS] IMAGE[:TAG] [REGISTRYHOST/][USERNAME/]NAME[:TAG] | docker tag centos:7 zhangrenyang/centos:v1        |
| export  | 将容器文件系统作为一个tar归档文件导出到STDOUT | docker export [OPTIONS] CONTAINER                            | docker export -o hello-world.tar b2712f1067a3     |
| import  | 导入容器快照文件系统tar归档文件并创建镜像     | docker import [OPTIONS] file/URL/- [REPOSITORY[:TAG]]        | docker import hello-world.tar                     |
| save    | 将指定镜像保存成`tar`文件                     | docker save [OPTIONS] IMAGE [IMAGE...]                       | docker save -o hello-world.tar hello-world:latest |
| load    | 加载tar文件并创建镜像                         |                                                              | docker load -i hello-world.tar                    |
| build   | 根据Dockerfile构建镜像                        | docker build [OPTIONS] PATH / URL / -                        | docker build -t zf/ubuntu:v1 .                    |

## 2. 查看镜像

```shell
docker image ls
```

| 字段       | 含义     |
| :--------- | :------- |
| REPOSITORY | 仓库地址 |
| TAG        | 标签     |
| IMAGE_ID   | 镜像ID   |
| CREATED    | 创建时间 |
| SIZE       | 镜像大小 |

## 3. 查找镜像

```shell
docker search ubuntu
```

| 字段        | 含义       |
| :---------- | :--------- |
| NAME        | 名称       |
| DESCRIPTION | 描述       |
| STARTS      | 星星的数量 |
| OFFICIAL    | 是否官方源 |

## 4. 拉取镜像

```shell
docker  pull docker.io/hello-world
```

- docker image pull是抓取 image 文件的命令
- docker.io/hello-world是 image 文件在仓库里面的位置，其中`docker.io`是 image的作者，hello-world是 image 文件的名字
- Docker 官方提供的 image 文件，都放在`docker.io`组里面，所以它的是默认组，可以省略 `docker image pull hello-world`

## 5. 删除镜像

```shell
docker rmi  hello-world
```

