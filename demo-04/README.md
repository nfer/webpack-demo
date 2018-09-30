# demo-04 把css打包成文件

## 引言

在上一个示例中我们是通过插入style的方式来使用css，而另外一种通过link的方式则需要将css打包成独立的文件并自动插入到html中。

## mini-css-extract-plugin插件

> Extract text from a bundle, or bundles, into a separate file.

webpack核心仓库提供了这样一个插件，作用就是从bundle中提取文件，然后输出到文件中。

### 使用方法

 - 安装插件

```
npm i --save-dev mini-css-extract-plugin
```

 - 在webpack中引入插件

```
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
```

 - 创建提取loader

```
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
        ]
```

注意，这里和上一个demo差不多，都是通过链式的方式，先经过css-loader处理，然后再进行下一个loader处理。

 - 设置输出文件的参数

```
        new MiniCssExtractPlugin({
          filename: "index.css"
        })
```

注意，mini-css-extract-plugin插件只负责把css文件提取出来并打包到指定文件，而把css文件插入到html中的则是之前的demo就提到的html-webpack-plugin插件。
