[TOC]

## 0. 参考文档

http://zhufengpeixun.com/strong/html/125.11.docker.html#t6417.%20%E7%BD%91%E7%BB%9C

## 1. 网络

安装Docker时，它会自动创建三个网络，bridge（创建容器默认连接到此网络）、 none 、host

- None：该模式关闭了容器的网络功能,对外界完全隔离
- host：容器将不会虚拟出自己的网卡，配置自己的IP等，而是使用宿主机的IP和端口。
- bridge 桥接网络，此模式会为每一个容器分配IP

## 2. 常用命令

```shell
docker network ls #列出当前的网络
docker inspect bridge #查看当前的桥连网络 可以看到容器对应的ip

docker inspect [containerId] # 查看容器的详情 可以看到对应的网络 ip等

docker run -d --name=nginx_none --net=bridge nginx # --net指定网络为bridge 
```

## 3. 自定义网络

```shell
# 创建自定义网络
docker network create --driver bridge myweb

# 查看自定义网络中的主机
docker network inspect myweb

# 创建容器的时候指定网络
docker run -d --name mynginx1  --net myweb nginx


docker run -d --name mynginx3   nginx
# 连接到指定网络 docker network connect 网络名 容器名
docker network connect  myweb mynginx3
# 解绑指定网络 docker network disconnect 网络名 容器名
docker network disconnect myweb mynginx3

# 移除网络
docker network rm myweb
```

