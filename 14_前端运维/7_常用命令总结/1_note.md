[TOC]

## 1. 查看端口是否被占用 根据端口杀死进程

```shell
netstat -anp |grep 8888 # 查看8888端口的占用情况
lsof -i :8888 # 查看占用此端口的进程PID
ps aux | grep 767476 # 根据pid查看进程情况
kill -9 767476 # 杀死进程
```

