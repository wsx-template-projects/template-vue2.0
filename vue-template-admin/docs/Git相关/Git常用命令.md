# 常用 git 命令

```bash
# 拉取代码前，执行如下命令，重置一下空格符格式(window拉取代码空格符默认为CRLF,切记、切记、切记)
git config --global core.autocrlf input


```

```bash

git --help

git checkout 分支  #切换分支

git checkout -b 分支名   #创建新的分支并切换到创建的分支上

git branch           #查看本地所有分支

git branch -r       #查看远程所有分支

git branch -a       #查看本地及远程的所有分支，如下图

git fetch   #将某个远程主机的更新，全部取回本地：

git branch -d 分支名  #删除本地分支

git push origin -d 分支名  #删除远程分支:

git merge 需要合并的分支名 #例如：当前分支master，合并develop到master分支，git merge develop 注意：该合并方式，不会保留节点

git merge - m "merge text" --no-ff 需要合并的分支名 #推荐这样合并，可以保留合并的节点

git remote show origin  #查看远程分支和本地分支的对应关系

git remote prune origin  #删除远程已经删除过的分支

git remote update origin --prune   #更新远程分支列表,这里要注意下，如果你的remote branch不是在origin下，按你得把origin换成你的名字。

git reflog #查看历史变更记录

git reset --hard HEAD@{n}  #进行回退操作（n就是你要回退到的引用位置）

==>https://blog.csdn.net/qq_39400546/article/details/100150320

```

## 可能用到的命令

```bash
git log -p FETCH_HEAD  #本地查看更新的信息(包括更新的文件名、更新的作者和时间、以及更新的代码，可以通过这些信息判断是否会产生冲突，确定是否将更新merge到当前分支)，
==》注意：git log后，可以在英文状态下，输入字母q即可退出
```

## 注意

```bash

git常见命令

git remote -v

查看不到远程别人创建的git分支；

可以执行命令：git fetch ==> 先用fetch命令更新remote索引。

再查看remote分支，发现已经可以看到目标分支dev; git branch -a;

最后切换分支 ==》 git checkout dev;
或

# 取远程分支并分化一个新分支
$ git checkout -b mybranch origin/mybranch


# 命令
git stash  ==> git stash apply


```

## git stash

```bash

前提：必须是处于git下的文件，未add到git的文件无法使用。


git stash [save message]
保存，save为可选项，message为本次保存的注释

git stash list
所有保存的记录列表

git stash pop stash@{num}
恢复，num是可选项，通过git stash list可查看具体值。只能恢复一次

git stash apply stash@{num}
恢复，num是可选项，通过git stash list可查看具体值。可回复多次

git stash drop stash@{num}
删除某个保存，num是可选项，通过git stash list可查看具体值

git stash clear
删除所有保存

```
