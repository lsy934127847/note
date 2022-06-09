## 1.nginx应用场景

- 静态资源服务器
- 反向代理服务
- API接口服务(Lua&Javascript)

## 2.nginx优势 [#](http://zhufengpeixun.com/strong/html/125.10.nginx.html#t12.nginx优势)

- 高并发高性能
- 可扩展性好
- 高可靠性
- 热布署
- 开源许可证

## 3. 环境确认

### 3.1 关闭防火墙

| 功能           | 命令                                |
| :------------- | :---------------------------------- |
| 停止防火墙     | systemctl stop firewalld.service    |
| 永久关闭防火墙 | systemctl disable firewalld.service |

### 3.2 确认停用 selinux

- 安全增强型 Linux（Security-Enhanced Linux）简称 SELinux，它是一个 Linux 内核模块，也是 Linux 的一个安全子系统。
- SELinux 主要作用就是最大限度地减小系统中服务进程可访问的资源（最小权限原则）。



| 功能     | 命令                                                         |
| :------- | :----------------------------------------------------------- |
| 检查状态 | getenforce                                                   |
| 检查状态 | /usr/sbin/sestatus -v                                        |
| 临时关闭 | setenforce 0                                                 |
| 永久关闭 | /etc/selinux/config SELINUX=`enforcing` 改为SELINUX=`disabled` |

### 4.2  工作流程

- Nginx 采用的是多进程(单线程)和多路IO复用模型

1. Nginx 在启动后，会有一个 `master` 进程和多个相互独立的 `worker` 进程。
2. 接收来自外界的信号,向各`worker`进程发送信号,每个进程都有可能来处理这个连接。
3. master 进程能监控 worker 进程的运行状态，当 worker 进程退出后(异常情况下)，会自动启动新的 worker 进程。

![nginx架构](http://img.zhufengpeixun.cn/nginxcomplex.png)

- worker 进程数，一般会设置成机器 cpu 核数。因为更多的worker 数，只会导致进程相互竞争 cpu，从而带来不必要的上下文切换
- 使用多进程模式，不仅能提高并发率，而且进程之间相互独立，一个 worker 进程挂了不会影响到其他 worker 进程

