



# 运算符和数据类型

- 默认定义的变量是 弱类型并且默认值是字符串类型

## 1.1 declare 声明变量类型

| 选项 | 含义                       |
| :--- | :------------------------- |
| -    | 给变量设定类型属性         |
| +    | 取消变量的类型属性         |
| -a   | 将变量声明为数组类型       |
| -i   | 将变量声明为整数型         |
| -x   | 将变量声明为环境变量       |
| -r   | 将变量声明为只读变量       |
| -p   | 显示指定变量的被声明的类型 |

### 1.1.1 声明为整形

```shell
	declare -i a=1 //声明成整型
	declare -i b
	b=2
	c=$a+$b
	echo $c // 3
	
```

### 1.1.2 声明为数组

```shell
declare -a names;
names[0]=zhangsan
names[1]=lisi
//默认只打印第一个元素
echo ${names}
zhangsan
//打印第2个元素
echo ${names[1]}
lisi
//打印全部
echo ${names[*]}
zhangsan lisi
```

### 1.1.3 声明为环境变量

- export最终执行的是`declare -x`命令
- `declare -p` 可以查看所有的类型

```shell
declare -x NAME=YOUYOU
```

### 1.1.4 只读属性

```shell
declare -r gender=m
gender=f
// -bash: gender: readonly variable
```

### 1.1.4 查看变量属性

```shell
declare -p gender // declare -r gender="m" -r得知为只读
declare -p  // 查看全部
```

## 1.2 数值运算

```shell
// expr + 号两边必须有空格 否则还是会当整块输出
num1=2
num2=3
sum=$(expr $num1 + $num2)
echo $sum   // 5
```

```shell
sum2=$(($num1+$num2))
echo $sum2  // 5

sum3=$[$num1+$num2]
echo $sum3  // 5


d=$(date)
echo $d    // Tue May 24 07:38:17 PM CST 2022
```

## 1.3 优先级

![](http://img.zhufengpeixun.cn/priority.png)

