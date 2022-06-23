[TOC]

## 0.参考文档

http://zhufengpeixun.com/strong/html/125.11.docker.html#t7318.compose

## 1. docker-compose

- Compose 通过一个配置文件来管理多个Docker容器

## 2. 安装docker-compose

```shell
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose # 添加文件权限
docker-compose -versio # 查看版本 docker-compose version 1.25.0, build 0a186604
```

## 3. 常用命令

| 命令                            | 服务                        |
| :------------------------------ | :-------------------------- |
| docker-compose up               | 启动所有的服务              |
| docker-compose up -d            | 后台启动所有的服务          |
| docker-compose ps               | 打印所有的容器              |
| docker-compose stop             | 停止所有服务 但不会删除容器 |
| docker-compose logs -f          | 持续跟踪日志                |
| docker-compose exec nginx1 bash | 进入nginx1服务系统          |
| docker-compose rm nginx1        | 删除服务容器                |
| docker network ls               | 查看网络网络不会删除        |
| docker-compose down             | 删除所有的网络和容器        |

## 3. 编写配置文件

- networks 指定自定义网络
- volumes 指定数据卷
- 数据卷在宿主机的位置 `/var/lib/docker/volumes/nginx-compose_[数据卷名称]/_data`
-  docker-compose.yml  配置文件名称 固定

```yml
version: '3'
services:
  nginx1:
    image: nginx
    container_name: nginx1 # 容器名称
    ports:
      - "8081:80" # 宿主机端口:容器端口
    networks:
      - "newweb" # 使用的网络
    volumes:
      - "nginx1:/data" 
      #宿主机:容器 /var/lib/docker/volumes/nginx-compose_nginx1_data :/data
      - "./nginx1:/usr/share/nginx/html" # 当前./nginx1 目录 : 容器/usr/share/nginx/html
  nginx2:
    image: nginx
    container_name: nginx2
    ports:
      - "8082:80"
    networks:
      - "default"
    volumes:
      - "nginx2:/data"
      #宿主机:容器 /var/lib/docker/volumes/nginx-compose_nginx_nginx2 :/data
      - "./nginx2:/usr/share/nginx/html"
  nginx3:
    image: nginx
    container_name: nginx3
    ports:
      - "8083:80"
    networks:
      - "default"
      - "newweb"
    volumes:
      - "nginx3:/data"
      #宿主机:容器 /var/lib/docker/volumes/nginx-compose_nginx_nginx3 :/data
      - "./nginx3:/usr/share/nginx/html"
networks: # 自定义网络
  newweb:
    driver: bridge
volumes: # 创建数据卷
  nginx1:
    driver: local # cd 
  nginx2:
    driver: local
  nginx3:
    driver: local
```

```shell
docker volume ls  # 创建了三个数据卷
# DRIVER    VOLUME NAME
# local     docker-compose_data
# local     docker-compose_nginx1
# local     docker-compose_nginx2
# local     docker-compose_nginx3

docker network ls # 查看是否创建好自定义网络
```

