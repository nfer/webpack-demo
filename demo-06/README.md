# demo-06 CSS扩展语法

## 引言

css语言发展了这么长时间，也出现了几种扩展语法，比如less就是其中的一种，这里我们就以less为例说明如何在webpack中打包css扩展语法。

## 使用用法

 - 安装less-loader和less

```
npm install --save-dev less-loader less
```

 - 重命名hello.css为hello.less，并修改其内容为less语法

```
@nice-blue: #5B83AD;
@light-blue: @nice-blue + #111;

body {
  color: @light-blue;
}
```

 - 在index.js中引入hello.less文件

```
require('./hello.js');
require('./hello.less');
```

 - 修改webpack配置文件，使用less-loader预处理

```
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'less-loader']
                })
            },
```

再次运行`npm run build`命令，我们发现less文件也可以最终打包成功。

## 后记

除了less扩展语法，常用的还有sass和Stylus，它们的使用方式我们这里暂时不给出更多的示例，后面我们会在专门的文章来细讲。