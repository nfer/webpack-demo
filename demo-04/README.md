# demo-04 把css打包成文件

## 引言

在上一个示例中我们是通过插入style的方式来使用css，而另外一种通过link的方式则需要将css打包成独立的文件并自动插入到html中。

## extract-text-webpack-plugin插件

> Extract text from a bundle, or bundles, into a separate file.

webpack核心仓库提供了这样一个插件，作用就是从bundle中提取文件，然后输出到文件中。

### 使用方法

 - 安装插件

```shell
npm i --save-dev extract-text-webpack-plugin
```

 - 在webpack中引入插件

```js
var ExtractTextPlugin = require('extract-text-webpack-plugin');
```

 - 创建提取loader

```js
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader']
                })
            },
        ]
```

 - 设置输出文件的参数

```js
        new ExtractTextPlugin('index.css'),
```

运行`npm run build`之后打开index.html页面可以看到，字体的颜色变为红色。并且使用编辑器打开生成的index.html文件，可以看到在head部分引入了index.css外部文件，具体内容和hello.css的内容一致。

注意，extract-text-webpack-plugin插件只负责把css文件提取出来并打包到指定文件，而把css文件插入到html中的则是之前的demo就提到的html-webpack-plugin插件。完整的webpack配置如下：

```js
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './index.js',
    output: {
        path: __dirname + '/dist/',
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader']
                })
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack-demo-04'
        }),

        new ExtractTextPlugin('index.css'),
    ]
}
```
