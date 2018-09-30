# demo-00 Hello Webpack

按照惯例，从**hello webpack**开始我们的第一个demo。

## 文件结构

 - index.html: 页面入口文件
 - index.js: js入口文件
 - hello.js: js逻辑文件
 - package.json: 项目描述文件
 - webpack.config.js: webpack配置文件

## 源码解析

 - index.html

```html
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

index.html页面唯一的逻辑就是引入了"./dist/index.js"文件。

 - index.js

```js
require('./hello.js');
```

index.js只是引入了hello.js文件。

 - hello.js

```js
var textnode = document.createTextNode("hello webpack");
document.body.appendChild(textnode);
```

真正的输出逻辑在这里：创建了一个text节点并插入到body中。

 - webpack.config.js

```js
module.exports = {
    entry: './index.js',
    output: {
        path: __dirname + '/dist/',
        filename: 'index.js'
    }
}
```

webpack配置描述：

 - entry指定了webpack打包的入口文件
 - output指定了打包后的文件名以及目录

## 运行步骤

```shell
git clone https://github.com/nfer/webpack-demo.git
cd webpack-demo/demo-00
npm install
./node_modules/.bin/webpack
```

然后，在浏览器中打开index.html即可。

## 踩坑记录

### 1. webpack配置中的output输出路径必须是绝对地址

如果在webpack.config.js中设置output.path使用相对地址：

```js
module.exports = {
    entry: './index.js',
    output: {
        path: './dist/',
        filename: 'index.js'
    }
}
```

运行webpack会报以下错误：

```console
Invalid configuration object. Webpack has been initialised using a configuration object that does not match the API schema.
 - configuration.output.path: The provided value "./dist/" is not an absolute path!
   -> The output directory as **absolute path** (required).
```

参考链接：[webpack wiki](https://github.com/webpack/docs/wiki/configuration#outputpath)

### 2. webpack配置中的entry必须给出确切路径

你可以使用相对路径的方式来定义entry，`entry: './index.js'`；也可以使用绝对路径的方式来定义，`entry: __dirname + '／index.js'`。但是不指定路径的情况下，webpack是找不到index.js文件的。

```js
module.exports = {
    entry: 'index.js',
    output: {
        path: './dist/',
        filename: 'index.js'
    }
}
```

运行webpack会报以下错误：

```console
ERROR in Entry module not found: Error: Can't resolve 'index.js' in 'webpack-demo/demo-00'
```

### 3. require引入文件时必须给出确切路径

这个坑和上面的一样，都是webpack打包的时候找不到指定文件。

```js
require('hello.js');
```

运行webpack会报以下错误：

```console
ERROR in ./index.js
Module not found: Error: Can't resolve 'hello.js' in 'webpack-demo/demo-00'
 @ ./index.js 1:0-19
```

