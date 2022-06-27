## commit 基于容器制作镜像 [#](http://zhufengpeixun.com/strong/html/125.11.docker.html#t4314. commit制作个性化镜像)

- docker commit :从容器创建一个新的镜像。
- docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]
  - -a :提交的镜像作者
  - -c :使用Dockerfile指令来创建镜像
  - -m :提交时的说明文字
  - -p :在commit时，将容器暂停
- 停止容器后不会自动删除这个容器，除非在启动容器的时候指定了 --rm 标志
- 使用 docker ps -a 命令查看 Docker 主机上包含停止的容器在内的所有容器
- 停止状态的容器的可写层仍然占用磁盘空间。要清理可以使用 `docker container prune` 命令

```shell
docker container commit -m"我的nginx" -a"lashiyong" fa972d488e65 lashiyong/mynginx:v1
docker image ls
docker container run lashiyong/mynginx /bin/bash # lashiyong/mynginx 可能会不成功 写镜像ID
docker container prune 
docker image rmi c79ef5b3f5fc # 删除镜像
```

