# demo-01 使用npm脚本启动webpack

## 问题概述
上一节我们是通过命令`./node_modules/.bin/webpack`来启动webpack，因为笔者的开发环境是Mac，所以这个命令是没问题的，但是Windows的小伙伴表示很受伤，运行命令出现以下错误：

```
'.' 不是内部或外部命令，也不是可运行的程序
或批处理文件。
```

那么Windows下怎么输入这个命令呢？正确答案是，把'/'换成'\'： `.\node_modules\.bin\webpack`

问题来了，这种平台相关的命令，是否可以统一起来？

## 解决方案

npm提供了run-script能力，其中有一个非常重要的就是：
> In addition to the shell's pre-existing PATH, npm run adds node_modules/.bin to the PATH provided to scripts. Any binaries provided by locally-installed dependencies can be used without the node_modules/.bin prefix. 

简单的讲就是，npm run把node_modules/.bin目录添加到PATH环境变量中了。

那么，我们就可以在package.json中添加以下代码：

```
"build": "webpack"
```

这时，在控制台输入`npm run build`即可完成webpack打包，经测试类Unix系统和Win系统下都可以正常允许。

## 详细测试
注意，在官方文档中，只说了把`node_modules/.bin`添加到环境变量中，那么Win平台下是怎么表现呢？我们做如下一个测试：

### 类unix环境下
 - 在`node_modules/.bin/`文件夹下创建**getPATH**文件，内容为`echo $PATH`
 - 使用`chmod +x node_modules/.bin/getPATH`，给其添加可执行权限
 - 在package.json中添加run script: `"getPATH": "getPATH"`

执行`echo $PATH`命令，输出控制台下的PATH环境变量值：

```
/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/mysql/bin:/usr/local/mysql/bin
```

执行`npm run getPATH`命令，输出npm run命令下的PATH环境变量值：

```
/usr/local/lib/node_modules/npm/bin/node-gyp-bin:/Users/nfer/git/github/nfer/webpack-demo/demo-01/node_modules/.bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/mysql/bin:/usr/local/mysql/bin
```

通过对比，我们发现当前目录下的`node_modules/.bin`已经添加到环境变量PATH的值中，并且位置是在系统环境变量之前。

### Win环境下
 - 在`node_modules\.bin\`文件夹下创建**getPATH.bat**文件，内容为`echo %PATH%`
 - 在package.json中添加run script: `"getPATH": "getPATH"`

执行`echo %PATH%`命令，输出控制台下的PATH环境变量值：

```
C:\Windows\system32;C:\Windows;C:\Windows\System32\Wbem;C:\Windows\System32\WindowsPowerShell\v1.0\;C:\Program Files (x86)\NVIDIA Corporation\PhysX\Common;%NVM_HOME%;%NVM_SYMLINK%;C:\Program Files\TortoiseGit\bin;C:\Program Files\Git\cmd;C:\Users\nfer\AppData\Roaming\npm;C:\Users\nfer\AppData\Roaming\nvm;C:\Program Files\nodejs
```

执行`npm run getPATH`命令，输出npm run命令下的PATH环境变量值：

```
C:\Users\nfer\AppData\Roaming\nvm\v6.12.2\node_modules\npm\bin\node-gyp-bin;E:\git\github\nfer\webpack-demo\demo-00\node_modules\.bin;C:\Windows\system32;C:\Windows;C:\Windows\System32\Wbem;C:\Windows\System32\WindowsPowerShell\v1.0\;C:\Program Files (x86)\NVIDIA Corporation\PhysX\Common;%NVM_HOME%;%NVM_SYMLINK%;C:\Program Files\TortoiseGit\bin;C:\Program Files\Git\cmd;C:\Users\nfer\AppData\Roaming\npm;C:\Users\nfer\AppData\Roaming\nvm;C:\Program Files\nodejs
```

结果同样显示，在win环境下，运行npm run脚本时，`node_modules\.bin`会自动的加入到环境变量下。
