

#git安装


    // git安装：官网下载，一直点下一步，完成
    // 检测git是否安装成功：cmd 输入 git --version/git -v  两种方式都试一试
                          //任意位置右击出现 Git GUI Here 和 Git Bash Here
//    git init 初始化版本库，文件夹中出现git目录
//    git config --list 查看当前git配置       config： 配置

// 在配置中新增两条信息
//    git config --global user.name "lisi"
//   git config [--global] user.email "lisi的邮箱"

//，–-global参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置
//  修改全局以上两条信息
        // -继续直接输入命令，修改名称，若不能成功输入   $  git config --global --replace-all user.email "输入你的邮箱" 
                                                   // $  git config --global --replace-all user.name "输入你的用户名"
  //  git status 查看工作区的文件状态
//   Untracked files ：未被管理/跟踪的文件 文件会被显示为红色
//  Changes to be committed 在暂存区，但未被提交到本地仓库/master分支/HEAD指针指向的分支/提交到暂存区的更改
//  Changes not staged for commit 在工作区修改了文件内容，未被提交到暂存区，未被提交到暂存区的更改



//  将文件添加到暂存区，形成一个历史版本
//  git add 文件名
//  文件夹中必须有文件，否则无法若添加到暂存区
//  git add 文件夹名
//  将工作区所有的文件添加到暂存区
//  get add --all /git add .

// 将暂存区形成的某个历史版本 添加到本地仓库/HEAD指针指向的master分支，再次形成一个历史版本
//  git commit -m "第一个版本"

//  git log ,可以看到当前版本和前面的版本，
//  git reflog 查看所有的版本，版本信息是简写形式

// 版本回退 把本地仓库的一个历史版本恢复到工作区，工作区的内容该版本要显示的内容
// git reset --hard Head 回到最新版
//  git reset --hard Head^ 回到最新版的前一个版本
//  git reset --hard 版本号  回到指定版本

// git diff 查看工作区和暂存区的区别/  查看尚未暂存的文件更新了哪些部分
//  git diff --cached 查看暂存区和本地仓库的区别 / 查看已经暂存起来的文件和上次提交的版本之间的差异
//  注意点：如果某版本曾经被add过，或者被commit过， 那么git diff 和git diff --cached 将没有区别

//  忽略文件，使得文件不被管理
// 工作区新建文件.gitignore 在此文件中添加要忽略的文件名

// 经理  创建远程共享版本库

// 工作区 git init --bare

//  注册github账号，登录成功，右上角有一个+的符号，点击选择New repository
//  填写远程仓库信息：
//  点击create repository
// code 远程仓库的https地址 https://github.com/lsy934127847/publicstore.git
//  给地址取一个别名
//  git remote add 别名 远程仓库的https地址
// 把本地仓库提交到远程仓库
//  git push 别名 本地分支名：远程分支名
// git push 别名 本地分支名

//  删除远程分支 git push 别名 --delete

// 下载远程仓库到本地
//  git clone 远程仓库地址

// 已经下载过这个地址，版本不是最新版
// 使用 git pull 远程仓库地址
//  git


//  git branch -r  查看所有远程分支

// git branch -a 列出所有本地分支和远程分支

 // git fetch origin 远程分支名字 拉去远程分支到本地


// git branch -d 本地分支  删除本地分支


// 分支操作
// 创建一个分支 git branch newjs
//  删除一个分支 git branch -d newjs
//支 git checkout/switch newjs
//  切换分支后 HEAD指针指向该分支，从暂缓区提交的修改也会提交到指向的分支中

//  查看分支 git branch /git branch -a / 带*表示当前分支
//  合并分支  -->指令:git merge 要合并的分支名称 -m '新版本的描述';
// -->如果忘记写-m '新版本的描述',会弹出文本编辑器,按:q退出

            //  ==>常用的分支命名
            //         ==>master:分支名,永远只存储一个可以稳定运行的版本,不能在这个分支上直接开发
            //         ==>develop:主要开发分支,主要用于所有功能开发的代码合并,记录一个一个的完整版本
            //             包含测试版本和稳定版本
            //             不要在这个分支上进行开发
            //         ==>feature-xxx:功能开发分支,从develop创建的分支
            //             主要作用是某一个功能的开发
            //             以自己功能来命名就行,例如:feature-login/feature-list
            //             开发完毕以后在合并到develop分支上
            //         ==>feature-xxx-fix:某一个分支出现bug以后,在当前分支下开启一个fix分支
            //             解决完bug以后,合并到当前功能分支上
            //             如果是功能分支已经合并之后发现可以直接在develop上开启分支
            //             修复完毕以后合并到develop分支上
            //         ==>hotfix-xxx:用于紧急bug修复
            //             直接在master分支上开启
            //             修复完成之后合并到master