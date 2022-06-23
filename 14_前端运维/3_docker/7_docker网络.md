[TOC]



## 0. 参考文档

http://zhufengpeixun.com/strong/html/125.11.docker.html#t6417.%20%E7%BD%91%E7%BB%9C

## 1. 网络

- 安装Docker时，它会自动创建三个网络，bridge（创建容器默认连接到此网络）、 none 、host
  - None：该模式关闭了容器的网络功能,对外界完全隔离
  - host：容器将不会虚拟出自己的网卡，配置自己的IP等，而是使用宿主机的IP和端口。
  - bridge 桥接网络，此模式会为每一个容器分配IP
- 可以使用该`--network`标志来指定容器应连接到哪些网络

### 1.1 桥接 bridge

- bridge模式使用 `--net=bridge` 指定，默认为 bridge

```shell
docker network ls # 列出当前的所有的网络
docker inspect bridge #查看当前的桥连网络 可以看到容器所分配的ip
```

