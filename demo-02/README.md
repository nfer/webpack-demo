# demo-01 webpack插件

## 引言

注意，在demo-00中的index.html文件，这个文件简单的可怕：

```
<!DOCTYPE html>
<html>
<head>
    <title>webpack-demo-00</title>
</head>
<body>
    <script type="text/javascript" src="./dist/index.js"></script>
</body>
</html>
```

这个文件几乎没做任何事情，要它何用！那么webpack是否可以自动创建出需要的index.html文件吗？

## html-webpack-plugin插件

有一个神奇的插件，也是webpack使用频率最高的插件之一：[html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin)， 官方文档有如下说明：

> This is a webpack plugin that simplifies creation of HTML files to serve your webpack bundles.

首先，使用命令`npm install --save-dev html-webpack-plugin`安装插件，并修改webpack.config.js配置文件：

```
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './index.js',
    output: {
        path: __dirname + '/dist/',
        filename: 'index.js'
    },
    plugins: [new HtmlWebpackPlugin()]
}
```

注意，我们引入了html-webpack-plugin插件，并创建了一个实例插入到webpack的plugins数组中。

再次执行打包命令：`npm run build`，命令运行后在dist目录下这次多了一个index.html文件。通过对比，生成的index.html和我们手动创建的index.html文件*除了代码风格外*几乎完全一致，但是还有一处小小的不同：生成的index.html文件title字段为**Webpack App**，这和我们预期的**webpack-demo-00**可不一样。

html-webpack-plugin插件提供了`title`配置项，修改该配置项为预期标题：

```
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack-demo-02'
        })
    ]
```

再次执行`npm run build`打包命令，这次发现生成的index.html文件完全满足需求。

从另一个角度来讲，生成的index.html和index.js文件都在dist目录下，这样也便于输出文件的最终交付。而对于外层的index.html文件，这个时候就没有任何用处了，delete it！

## webpack插件概念

> They also serve the purpose of doing anything else that a loader cannot do.

从官方文档来看，插件的定义是相对于loader的，换句话说，能用loader的尽量用loader，不能用loader的plugin是全都包了（doing anything else)。
