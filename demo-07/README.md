# demo-07 打包文件名

## 引言

在缓存处理的demo中，我们在打包输出的文件名中增加了`[hash:7]`字段，用来解决缓存和更新的问题。注意，这里的`[hash:7]`字段是一个动态的属性值，是会在webpack打包的时候自动计算生成。

那么，除了hash字段，还有哪些是我们可以使用的呢？这一个demo，我们试一下另外一个动态字段：`[name]`。

## 使用方法

代码修改如下：

```
    output: {
        path: __dirname + '/dist/',
        filename: '[name].[hash:7].js'
    },
    ...
            new ExtractTextPlugin('[name].[hash:7].css'),
```

重新允许命令`npm run build`，编译输出后，生成的文件如下：

```
$ ls dist/
index.html              main.dfeb893.css        main.dfeb893.js
```

注意，这里生成的bundle文件名是main，而并不是我们期望的index。

那么如何修改bundle名呢？那就需要修改entry的配置：

```
    entry: {
        index: './index.js',
    },
```

这样就明确指定了bundle名以及入口文件。再次执行`npm run build`命令，发现这次打包生成的文件名如下：

```
$ ls dist/
index.1926c7a.css       index.1926c7a.js        index.html              main.dfeb893.css        main.dfeb893.js
```

打开页面，发现加载的也是index.xxx.js和index.xxx.css文件。