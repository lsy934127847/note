1. git安装

- git 官网 : https://git-scm.com/downloads


```shell
# git安装：官网下载，一直点下一步，完成
 git --version/git -v 
```
## 2 . 配置命令

```shell
git init # 初始化版本库，文件夹中出现.git目录
git config --global user.name "lisi" # 添加用户名
git config --global user.email "lisi的邮箱" # 添加邮箱
git config --list # 查看当前git配置，如邮箱用户名  

# 修改全局配置
 git config --global --replace-all user.email "新的邮箱"
 git config --global --replace-all user.email "新的用户名"
```

## 3 . 常用命令

```shell
 将暂存区形成的最新版本添加到本地仓库# 查看工作区的文件状态
# Untracked files ：未被管理/跟踪的文件 文件会被显示为红色
# Changes to be committed 在暂存区，但未被提交到本地仓库/master分支/HEAD指针指向的分支/提交到暂存区更改
# Changes not staged for commit 在工作区修改了文件内容，未被提交到暂存区，未被提交到暂存区的更改
git status

# 将文件添加到暂存区，形成一个历史版本
git add ./src # 将src下面的所有的文件和目录添加到暂存区
get add --all  # 将工作区所有的文件添加到暂存区
git add . # 将工作区所有的文件添加到暂存区

 # 将暂存区形成的最新版本添加到本地仓库
 git commit -m "第一个版本" 
 
 git log # 可以看到当前版本和前面的版本
 git reflog  # 查看所有的版本，版本信息是简写形式
 
 # 版本回退 把本地仓库的一个历史版本恢复到工作区，工作区的内容该版本要显示的内容
  git reset --hard Head 回到最新版
  git reset --hard Head^ 回到最新版的前一个版本
  git reset --hard [版本号]  回到指定版本
  
  

git clone [远程仓库地址] # 下载远程仓库到本地
git pull # 拉取最新代码

# 分支操作
git branch # 查看本地分支
git branch -r  # 查看所有远程分支
git branch -a  # 列出所有本地分支和远程分支
git fetch origin [远程分支名字] # 拉取远程分支到本地
git branch -d [本地分支名字]  # 删除本地分支
git branch newbranch # 创建一个本地分支 
git checkout newbranch # 切换分支
git merge test -m '新版本的描述' # 合并分支 将test分支合并到当前分支

```

