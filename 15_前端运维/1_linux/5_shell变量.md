[TOC]



# 变量

## 1.1 什么是变量

- 可以变化的量

## 1.2 数据类型

- 字符串
- 整型
- 浮点型
- 日期型

## 1.3 定义变量注意点

- 变量必须以字母或下划线开头，名字中间只能由字母，数字和下划线组成
- 变量名的长度不得超过255个字符
- 变量名在有效范围内必须唯一
- 变量默认类型都是字符串
- 变量名不能为数字开头
- 等号左右两边不能有空格

## 1.4 局部变量

- 只能在当前shell中访问 例如bash 进入到子shell中 则访问不到

### 1.4.1 定义局部变量

```shell
nam=lashiyong
age=30
```

### 1.4.2 获取局部变量

```shell
echo $name    // lashiyong
echo "$name" very good // lashiyongvery good
set           // 获取全部变量
set | grep name // 过滤查看name变量
bash;echo $name // 进入到子shel 访问不到name
```

### 1.4.3 删除局部变量

```shell
unset name      // 删除name变量
```



## 1.5 全局变量 环境变量

- 环境变量是全局变量，而自定义变量是局部变量
- 自定义变量会在当前的shell中生效，而环境变量会在当前shell以及其子shell中生效
- 在其他shell中不能访问

### 1.5.1 定义全局变量

```shell
export name_env=lashiyong
```

### 1.5.2 获取全局变量

```shell
env   // 查看全部全局变量
env | grep name_env  // 帅选出name_env
echo $name_env      // lashiyong
base;echo $name_env  // 子shell也可以获取到 // lashiyong
```

#### 1.5.3 常用环境变量 

| 变量名     | 含义                                                | 示例                              |
| :--------- | :-------------------------------------------------- | :-------------------------------- |
| HOSTNAME   | 主机名                                              | HOSTNAME=localhost                |
| SHELL      | 当前的shell                                         | SHELL=/bin/bash                   |
| HISTSIZE   | 历史命令条数                                        | HISTSIZE=1000                     |
| SSH_CLIENT | 当前操作环境如果是用SSH连接的话，这里会记录客户端IP | SSH_CLIENT=192.168.1.100 57596 22 |
| USER       | 当前登录的用户                                      |                                   |

```shell
echo $HOSTNAME
echo $SHELL
echo $HISTSIZE
echo $SSH_CLIENT
echo $USER    // root
```

## 1.6 位置参数变量

- 从命令行向脚本当中传递参数或数据的,变量名不能自定义,变量作用是固定的

| 位置参数变量 | 作用                                                         |
| :----------- | :----------------------------------------------------------- |
| $n           | n为数字，$0代表命令本身，$1-$9代表第1到第9个参数，10以上的参数需要用大括号包含,如${10} |
| $*           | 这个变量代表命令中所有的参数，$*把所有的变看数看成一个整体   |
| $@           | 这个变量也代表命令行中所有的参数，不过$@把每个参数进行区分   |
| $#           | 这个变量代表命令行中所有参数的个数                           |

编写脚本hello.sh

```shell
#! /bin/bash
echo $0
echo $1
echo $2
echo $*
echo $@
echo $#
```

执行命令

```shell
sh hello.sh 1 2 3 4
/*
hello.sh
1
2
1 2 3 4
1 2 3 4
4

*/
```

```shell
for i in "$#"
 do
   echo "i=$i"
 done
/*
 i=4
*/
```

```shell
for i in "$@"
 do
   echo "i=$i"
 done
 /*
 i=2
 i=3
 i=4
 i=5

*/
```

```shell
for i in "$*"
 do
   echo "i=$i"
 done
  /*
 i=2 3 4 5
*/
```

## 1.7 预定义变量

- 是脚本中已经定义好的变量，变量名不能自定义，变量作用也是固定的

| 位置参数变量 | 作用                                                         |
| :----------- | :----------------------------------------------------------- |
| $?           | 最后一次执行的命令的返回状态。0表示正确执行，非0表示不正确执行 |
| $$           | 当前进程的进程号(PID)                                        |

```shell
echo $?
echo $$
```

## 1.8 read

- 让用户在命令行输入内容 并在脚本中获取 默认回车执行

| 选项 | 含义                                                         |
| :--- | :----------------------------------------------------------- |
| -p   | 提示信息，在等待read输入时，输出提示信息                     |
| -t   | 秒数: read命令会一直等待用户输入，使用此选项可以指定等待时间 |
| -n   | 字符数，read命令只接受指定的字符数，就会执行                 |
| -s   | 隐藏输入的数据，适用于机密信息的输入                         |

```shell
#!/bin/bash
read -p 'please input your name:' -t 5 name
echo -e "\n"
read -p 'please input you gender[m/f]:' -n 1 gender
echo -e "\n"
read -p 'please input your password:' -s password
echo -e "\n"
echo $name,$gender,$password
```

